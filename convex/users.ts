import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { createAccount, getAuthUserId } from "@convex-dev/auth/server";
import { api } from "./_generated/api";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db.get(userId);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const currentUser = await ctx.db.get(userId);
    if (currentUser?.role !== "ADMIN") throw new Error("Forbidden");

    return await ctx.db.query("users").collect();
  },
});

export const updateRole = mutation({
  args: {
    id: v.id("users"),
    role: v.union(v.literal("USER"), v.literal("ADMIN")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const currentUser = await ctx.db.get(userId);
    if (currentUser?.role !== "ADMIN") throw new Error("Forbidden");

    await ctx.db.patch(args.id, { role: args.role });
  },
});

/**
 * Remove a user and all their auth records (sessions + accounts).
 * This fully revokes their access — any active sessions are invalidated immediately.
 */
export const remove = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const currentUser = await ctx.db.get(userId);
    if (currentUser?.role !== "ADMIN") throw new Error("Forbidden");

    // Prevent self-deletion
    if (args.id === userId) throw new Error("Cannot remove your own account.");

    // Delete all active sessions (revokes access immediately)
    const sessions = await ctx.db
      .query("authSessions")
      .withIndex("userId", (q) => q.eq("userId", args.id))
      .collect();
    await Promise.all(sessions.map((s) => ctx.db.delete(s._id)));

    // Delete all linked auth accounts (password, oauth, etc.)
    const accounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", args.id))
      .collect();
    await Promise.all(accounts.map((a) => ctx.db.delete(a._id)));

    // Delete the user record
    await ctx.db.delete(args.id);
  },
});

/**
 * Admin-only: create a new user account with email + password.
 * Bypasses public self-registration, which is blocked in convex/auth.ts.
 */
export const createUser = action({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Verify the caller is an authenticated admin
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const currentUser = await ctx.runQuery(api.users.getCurrentUser);
    if (currentUser?.role !== "ADMIN") throw new Error("Forbidden");

    await createAccount(ctx, {
      provider: "password",
      account: { id: args.email, secret: args.password },
      profile: {
        email: args.email,
        ...(args.name ? { name: args.name } : {}),
        role: "ADMIN" as const,
      },
    });
  },
});
