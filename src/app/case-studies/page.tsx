"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// Placeholder case studies - you'll replace these with real content
const caseStudies = [
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    category: "Web Development",
    description:
      "Complete redesign and development of an e-commerce platform resulting in 150% increase in conversions.",
    image: "/placeholder-1.jpg",
    tags: ["React", "Next.js", "Shopify"],
    results: ["150% conversion increase", "40% faster load times", "2x mobile traffic"],
  },
  {
    id: 2,
    title: "FinTech Mobile Application",
    category: "Mobile App Development",
    description:
      "Secure, scalable mobile banking application with biometric authentication and real-time transactions.",
    image: "/placeholder-2.jpg",
    tags: ["React Native", "Node.js", "AWS"],
    results: ["50K+ downloads", "4.8 star rating", "99.9% uptime"],
  },
  {
    id: 3,
    title: "Marketing Automation System",
    category: "Marketing Automation",
    description:
      "End-to-end marketing automation system integrating CRM, email, and analytics platforms.",
    image: "/placeholder-3.jpg",
    tags: ["HubSpot", "Zapier", "Custom API"],
    results: ["60% time saved", "3x lead generation", "Unified data flow"],
  },
  {
    id: 4,
    title: "Healthcare Portal",
    category: "Web Development",
    description:
      "HIPAA-compliant patient portal with appointment scheduling, telehealth, and records management.",
    image: "/placeholder-4.jpg",
    tags: ["Next.js", "PostgreSQL", "Twilio"],
    results: ["30% fewer no-shows", "Patient satisfaction up 45%", "Streamlined operations"],
  },
  {
    id: 5,
    title: "SaaS Dashboard Redesign",
    category: "UI/UX Design",
    description:
      "Complete UX overhaul of a B2B SaaS platform resulting in improved user retention and satisfaction.",
    image: "/placeholder-5.jpg",
    tags: ["Figma", "React", "D3.js"],
    results: ["35% retention increase", "NPS score +40", "Reduced support tickets"],
  },
  {
    id: 6,
    title: "Restaurant Chain SEO Campaign",
    category: "SEO",
    description:
      "Comprehensive local SEO strategy for a 50+ location restaurant chain.",
    image: "/placeholder-6.jpg",
    tags: ["Local SEO", "Content Strategy", "Analytics"],
    results: ["200% organic traffic", "Top 3 rankings", "45% more reservations"],
  },
];

const categories = [
  "All",
  "Web Development",
  "Mobile App Development",
  "Marketing Automation",
  "UI/UX Design",
  "SEO",
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        data-section="hero"
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#030303]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-green-500/[0.05] blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
            >
              <span className="text-sm text-emerald-400">Case Studies</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Real Projects.{" "}
              <span className="text-emerald-400">Real Results.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
            >
              See how we help brands solve problems and scale through smart
              digital solutions. Explore how our strategy-first approach
              translates into measurable outcomes.
            </motion.p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Filter Section */}
      <Section dataSection="filters" className="py-8 md:py-12">
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? "bg-emerald-500 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Case Studies Grid */}
      <Section dataSection="case-studies" dark={false}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <ScrollReveal key={study.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-green-500/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/20 text-sm">
                      Image Coming Soon
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                      {study.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">
                    {study.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded bg-white/5 text-white/40 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-white/40 mb-2">Key Results:</p>
                    <div className="flex flex-wrap gap-2">
                      {study.results.map((result, i) => (
                        <span
                          key={i}
                          className="text-xs text-emerald-400/80"
                        >
                          {result}
                          {i < study.results.length - 1 && " •"}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View More Link */}
                  <motion.div
                    className="mt-6 flex items-center gap-2 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Load More */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Load More Projects
            </Button>
          </div>
        </ScrollReveal>
      </Section>

      {/* Stats Section */}
      <Section dataSection="stats">
        <ScrollReveal>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "96+", label: "Projects Completed" },
              { value: "30+", label: "Happy Clients" },
              { value: "150%", label: "Avg. Conversion Lift" },
              { value: "99%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* CTA Section */}
      <Section dataSection="cta" dark={false} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-green-500/10" />
        <ScrollReveal>
          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Let&apos;s discuss how we can help you achieve similar results for
              your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <ButtonColorful label="Start Your Project" />
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
