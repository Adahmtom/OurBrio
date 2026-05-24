import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    businessName: v.string(),
    industry: v.string(),
    businessDescription: v.string(),
    targetAudience: v.string(),
    currentWebsite: v.optional(v.string()),
    selectedServices: v.array(v.string()),
    projectGoals: v.string(),
    competitors: v.optional(v.string()),
    inspirationSites: v.optional(v.string()),
    uniqueFeatures: v.optional(v.string()),
    budget: v.string(),
    timeline: v.string(),
    preferredDate: v.string(),
    preferredTime: v.string(),
    contactName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    howDidYouHear: v.optional(v.string()),
    additionalNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projectInquiries", {
      ...args,
      status: "NEW" as const,
    });
  },
});

export const list = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    let inquiries = await ctx.db
      .query("projectInquiries")
      .order("desc")
      .collect();

    if (args.status) {
      inquiries = inquiries.filter((i) => i.status === args.status);
    }

    return inquiries;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("projectInquiries"),
    status: v.union(
      v.literal("NEW"),
      v.literal("CONTACTED"),
      v.literal("IN_PROGRESS"),
      v.literal("COMPLETED"),
      v.literal("CANCELLED"),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("projectInquiries") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});
