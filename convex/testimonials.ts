import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .withIndex("published", (q) => q.eq("published", true))
      .order("desc")
      .collect();
  },
});

export const list = query({
  args: {
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    if (args.published !== undefined) {
      return await ctx.db
        .query("testimonials")
        .withIndex("published", (q) => q.eq("published", args.published!))
        .order("desc")
        .collect();
    }

    return await ctx.db.query("testimonials").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    company: v.optional(v.string()),
    image: v.optional(v.string()),
    text: v.string(),
    rating: v.optional(v.number()),
    published: v.optional(v.boolean()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    return await ctx.db.insert("testimonials", {
      ...args,
      rating: args.rating ?? 5,
      published: args.published ?? false,
      featured: args.featured ?? false,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("testimonials"),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    company: v.optional(v.string()),
    image: v.optional(v.string()),
    text: v.optional(v.string()),
    rating: v.optional(v.number()),
    published: v.optional(v.boolean()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});
