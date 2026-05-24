import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const [allInquiries, allContacts, allCaseStudies, allTestimonials] =
      await Promise.all([
        ctx.db.query("projectInquiries").collect(),
        ctx.db.query("contactSubmissions").collect(),
        ctx.db.query("caseStudies").collect(),
        ctx.db.query("testimonials").collect(),
      ]);

    const sortedInquiries = [...allInquiries].sort(
      (a, b) => b._creationTime - a._creationTime,
    );
    const sortedContacts = [...allContacts].sort(
      (a, b) => b._creationTime - a._creationTime,
    );

    return {
      stats: {
        inquiries: {
          total: allInquiries.length,
          new: allInquiries.filter((i) => i.status === "NEW").length,
        },
        contacts: {
          total: allContacts.length,
          new: allContacts.filter((c) => c.status === "NEW").length,
        },
        caseStudies: {
          total: allCaseStudies.length,
          published: allCaseStudies.filter((c) => c.published).length,
        },
        testimonials: {
          total: allTestimonials.length,
          published: allTestimonials.filter((t) => t.published).length,
        },
      },
      recent: {
        inquiries: sortedInquiries.slice(0, 5).map((i) => ({
          _id: i._id,
          businessName: i.businessName,
          contactName: i.contactName,
          email: i.email,
          status: i.status,
          _creationTime: i._creationTime,
        })),
        contacts: sortedContacts.slice(0, 5).map((c) => ({
          _id: c._id,
          name: c.name,
          email: c.email,
          status: c.status,
          _creationTime: c._creationTime,
        })),
      },
    };
  },
});
