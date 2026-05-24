import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(v.union(v.literal("USER"), v.literal("ADMIN"))),
  }).index("email", ["email"]),

  projectInquiries: defineTable({
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
    status: v.union(
      v.literal("NEW"),
      v.literal("CONTACTED"),
      v.literal("IN_PROGRESS"),
      v.literal("COMPLETED"),
      v.literal("CANCELLED"),
    ),
    notes: v.optional(v.string()),
  }).index("status", ["status"]),

  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    service: v.optional(v.string()),
    budget: v.optional(v.string()),
    message: v.string(),
    status: v.union(
      v.literal("NEW"),
      v.literal("READ"),
      v.literal("REPLIED"),
      v.literal("ARCHIVED"),
    ),
    notes: v.optional(v.string()),
  }).index("status", ["status"]),

  caseStudies: defineTable({
    title: v.string(),
    slug: v.string(),
    category: v.string(),
    description: v.string(),
    challenge: v.optional(v.string()),
    solution: v.optional(v.string()),
    results: v.array(v.string()),
    image: v.string(),
    images: v.array(v.string()),
    tags: v.array(v.string()),
    client: v.optional(v.string()),
    testimonial: v.optional(v.string()),
    published: v.boolean(),
    featured: v.boolean(),
  })
    .index("slug", ["slug"])
    .index("published", ["published"])
    .index("featured", ["featured"]),

  testimonials: defineTable({
    name: v.string(),
    role: v.string(),
    company: v.optional(v.string()),
    image: v.optional(v.string()),
    text: v.string(),
    rating: v.number(),
    published: v.boolean(),
    featured: v.boolean(),
  }).index("published", ["published"]),

  blockedDates: defineTable({
    date: v.string(),
    reason: v.optional(v.string()),
  }).index("date", ["date"]),

  availableSlots: defineTable({
    dayOfWeek: v.number(),
    startTime: v.string(),
    endTime: v.string(),
    isActive: v.boolean(),
  }).index("dayOfWeek", ["dayOfWeek"]),

  siteSettings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("key", ["key"]),

  bookings: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    date: v.string(), // "YYYY-MM-DD"
    time: v.string(), // "10:00 AM"
    message: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
    ),
    notes: v.optional(v.string()),
  })
    .index("by_date", ["date"])
    .index("by_status", ["status"])
    .index("by_email", ["email"]),
});
