import { internalMutation } from "./_generated/server";

export const seedInitialData = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Seed default available time slots (Mon-Fri, 9-5)
    const defaultSlots = [
      { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
      { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" },
      { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" },
      { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" },
      { dayOfWeek: 5, startTime: "09:00", endTime: "17:00" },
    ];

    const existingSlots = await ctx.db.query("availableSlots").collect();
    if (existingSlots.length === 0) {
      for (const slot of defaultSlots) {
        await ctx.db.insert("availableSlots", { ...slot, isActive: true });
      }
    }

    // Sample testimonials
    const existingTestimonials = await ctx.db.query("testimonials").collect();
    if (existingTestimonials.length === 0) {
      await ctx.db.insert("testimonials", {
        name: "Sarah Chen",
        role: "CEO",
        company: "TechStart Inc",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        text: "SiteTact transformed our digital presence. Their strategic approach delivered results beyond our expectations.",
        rating: 5,
        published: true,
        featured: true,
      });
      await ctx.db.insert("testimonials", {
        name: "Michael Torres",
        role: "Operations Director",
        company: "ScaleUp Co",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        text: "The automation systems they built have saved us countless hours. Highly recommend for any business looking to scale.",
        rating: 5,
        published: true,
        featured: true,
      });
      await ctx.db.insert("testimonials", {
        name: "Emily Watson",
        role: "Marketing Manager",
        company: "BrandBoost",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        text: "Professional, responsive, and incredibly skilled. SiteTact understood our vision and brought it to life perfectly.",
        rating: 5,
        published: true,
        featured: false,
      });
    }

    // Sample case studies
    const existingCaseStudies = await ctx.db.query("caseStudies").collect();
    if (existingCaseStudies.length === 0) {
      await ctx.db.insert("caseStudies", {
        title: "E-Commerce Platform Redesign",
        slug: "ecommerce-platform-redesign",
        category: "Web Development",
        description:
          "Complete redesign and development of a modern e-commerce platform that increased conversions by 150%.",
        challenge:
          "The client's existing website was outdated, slow, and had a poor mobile experience leading to high bounce rates.",
        solution:
          "We redesigned the entire platform with a mobile-first approach, implemented a headless CMS, and optimized the checkout flow.",
        results: ["+150% Conversions", "40% Faster Load Time", "200% Mobile Traffic"],
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        images: [],
        tags: ["Next.js", "Shopify", "Tailwind CSS"],
        client: "Fashion Retail Co",
        published: true,
        featured: true,
      });
      await ctx.db.insert("caseStudies", {
        title: "FinTech Mobile Application",
        slug: "fintech-mobile-application",
        category: "Mobile App",
        description:
          "Native mobile app for a financial technology startup that achieved 50K+ downloads in the first month.",
        challenge:
          "The startup needed a secure, user-friendly mobile app to compete with established players in the market.",
        solution:
          "We developed a React Native app with biometric authentication, real-time notifications, and seamless payment integration.",
        results: ["50K+ Downloads", "4.8 App Store Rating", "98% Crash-Free Users"],
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
        images: [],
        tags: ["React Native", "Node.js", "AWS"],
        client: "FinanceFlow",
        published: true,
        featured: true,
      });
      await ctx.db.insert("caseStudies", {
        title: "Marketing Automation System",
        slug: "marketing-automation-system",
        category: "Automation",
        description:
          "End-to-end marketing automation system that tripled lead generation for a B2B company.",
        challenge: "Manual marketing processes were time-consuming and leads were falling through the cracks.",
        solution:
          "We implemented HubSpot with custom integrations, automated email sequences, and lead scoring workflows.",
        results: ["3x Lead Generation", "60% Time Saved", "45% Higher Email Open Rate"],
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        images: [],
        tags: ["HubSpot", "Zapier", "Custom API"],
        client: "B2B Solutions Ltd",
        published: true,
        featured: false,
      });
    }
  },
});
