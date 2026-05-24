import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("caseStudies")
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
        .query("caseStudies")
        .withIndex("published", (q) => q.eq("published", args.published!))
        .order("desc")
        .collect();
    }

    return await ctx.db.query("caseStudies").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    category: v.string(),
    description: v.string(),
    challenge: v.optional(v.string()),
    solution: v.optional(v.string()),
    results: v.array(v.string()),
    image: v.string(),
    images: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    client: v.optional(v.string()),
    testimonial: v.optional(v.string()),
    published: v.optional(v.boolean()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    return await ctx.db.insert("caseStudies", {
      ...args,
      images: args.images ?? [],
      tags: args.tags ?? [],
      published: args.published ?? false,
      featured: args.featured ?? false,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("caseStudies"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    challenge: v.optional(v.string()),
    solution: v.optional(v.string()),
    results: v.optional(v.array(v.string())),
    image: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    client: v.optional(v.string()),
    testimonial: v.optional(v.string()),
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
  args: { id: v.id("caseStudies") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});
