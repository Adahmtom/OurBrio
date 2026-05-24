import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

// ── Pure V8-safe time slot generator (no external deps) ─────────────────────
function generateTimeSlots(startTime: string, endTime: string): string[] {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const slots: string[] = [];
  let t = sh * 60 + sm;
  const end = eh * 60 + em;
  while (t < end) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    slots.push(`${dh}:${m.toString().padStart(2, "0")} ${ampm}`);
    t += 30;
  }
  return slots;
}

// ── Existing admin functions ─────────────────────────────────────────────────

export const get = query({
  args: {
    month: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    let blockedDates = await ctx.db.query("blockedDates").take(100);

    if (args.month) {
      blockedDates = blockedDates.filter((d) => d.date.startsWith(args.month!));
    }

    const allSlots = await ctx.db.query("availableSlots").take(10);
    const availableSlots = allSlots.filter((s) => s.isActive);

    return { blockedDates, availableSlots };
  },
});

export const getAllSlots = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    return await ctx.db.query("availableSlots").order("asc").take(10);
  },
});

export const blockDate = mutation({
  args: {
    date: v.string(),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    return await ctx.db.insert("blockedDates", args);
  },
});

export const unblockDate = mutation({
  args: { id: v.id("blockedDates") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});

export const updateSlot = mutation({
  args: {
    id: v.id("availableSlots"),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.patch(args.id, { isActive: args.isActive });
  },
});

// ── Public functions (no auth required) ─────────────────────────────────────

/** Returns blocked dates for a given "YYYY-MM" month string. */
export const getPublicBlockedDates = query({
  args: { month: v.string() },
  handler: async (ctx, args) => {
    const monthStart = args.month + "-01";
    const monthEnd = args.month + "-31";
    return await ctx.db
      .query("blockedDates")
      .withIndex("date", (q) => q.gte("date", monthStart).lte("date", monthEnd))
      .take(50);
  },
});

/** Returns the day-of-week numbers (0=Sun…6=Sat) that have active booking slots. */
export const getActiveDaysOfWeek = query({
  args: {},
  handler: async (ctx) => {
    const slots = await ctx.db.query("availableSlots").take(7);
    return slots.filter((s) => s.isActive).map((s) => s.dayOfWeek);
  },
});

/**
 * Returns available time slot strings for a given "YYYY-MM-DD" date.
 * Returns [] if the date is blocked, inactive, or fully booked.
 */
export const getPublicAvailability = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    // 1. Check if date is blocked
    const blocked = await ctx.db
      .query("blockedDates")
      .withIndex("date", (q) => q.eq("date", args.date))
      .first();
    if (blocked) return [];

    // 2. Determine day-of-week (use noon to avoid DST edge cases)
    const dateObj = new Date(args.date + "T12:00:00");
    const dayOfWeek = dateObj.getDay();

    // 3. Get active slot configs for this day of week
    const slotConfigs = await ctx.db
      .query("availableSlots")
      .withIndex("dayOfWeek", (q) => q.eq("dayOfWeek", dayOfWeek))
      .take(5);
    const activeConfigs = slotConfigs.filter((s) => s.isActive);
    if (activeConfigs.length === 0) return [];

    // 4. Generate all potential 30-minute time slots
    const allSlots: string[] = [];
    for (const config of activeConfigs) {
      allSlots.push(...generateTimeSlots(config.startTime, config.endTime));
    }

    // 5. Subtract already-booked (non-cancelled) slots
    const existingBookings = await ctx.db
      .query("bookings")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .take(50);

    const bookedTimes = new Set(
      existingBookings
        .filter((b) => b.status !== "cancelled")
        .map((b) => b.time),
    );

    return allSlots.filter((slot) => !bookedTimes.has(slot));
  },
});

/** Creates a new booking after checking availability. */
export const createBooking = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    date: v.string(),
    time: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Guard: date must not be blocked
    const blocked = await ctx.db
      .query("blockedDates")
      .withIndex("date", (q) => q.eq("date", args.date))
      .first();
    if (blocked) throw new Error("This date is not available for bookings.");

    // Guard: slot must not already be taken
    const existingBookings = await ctx.db
      .query("bookings")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .take(50);
    const conflict = existingBookings.find(
      (b) => b.time === args.time && b.status !== "cancelled",
    );
    if (conflict) throw new Error("This time slot is already booked. Please choose another.");

    const id = await ctx.db.insert("bookings", {
      ...args,
      status: "pending",
    });

    // Fire-and-forget: send confirmation email to customer + alert to admin
    await ctx.scheduler.runAfter(0, internal.emails.sendBookingConfirmation, {
      customerName: args.name,
      customerEmail: args.email,
      customerPhone: args.phone,
      date: args.date,
      time: args.time,
      message: args.message,
    });

    return id;
  },
});

// ── Admin booking management (auth required) ─────────────────────────────────

/** List bookings, optionally filtered by status. Admin only. */
export const listBookings = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("confirmed"),
        v.literal("cancelled"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    if (args.status !== undefined) {
      return await ctx.db
        .query("bookings")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .take(100);
    }
    return await ctx.db.query("bookings").order("desc").take(100);
  },
});

/** Update booking status and/or admin notes. Admin only. */
export const updateBooking = mutation({
  args: {
    id: v.id("bookings"),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("confirmed"),
        v.literal("cancelled"),
      ),
    ),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const patch: Partial<{ status: "pending" | "confirmed" | "cancelled"; notes: string }> = {};
    if (args.status !== undefined) patch.status = args.status;
    if (args.notes !== undefined) patch.notes = args.notes;
    await ctx.db.patch(args.id, patch);
  },
});

/** Hard-delete a booking. Admin only. */
export const deleteBooking = mutation({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});
