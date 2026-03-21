"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Zap,
  Search,
  Wrench,
  ArrowRight,
  CheckCircle,
  Layers,
  Palette,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactFormSection } from "@/components/ui/contact-form-section";

const services = [
  {
    id: "web-development",
    icon: Globe,
    title: "Responsive Website Design & Development",
    subtitle: "High-Performance, Responsive Web Solutions",
    description:
      "Your website is a critical business asset. We design and develop responsive websites that deliver consistent performance and usability across all devices and screen sizes.",
    details:
      "Our solutions are built with scalability, accessibility, and speed in mind, ensuring a professional digital presence that aligns with your brand and business objectives.",
    features: [
      {
        icon: Layers,
        title: "Concept & Discovery",
        description:
          "We conduct an in-depth analysis of your business, industry, and target audience to define a clear digital strategy.",
      },
      {
        icon: Palette,
        title: "UX / UI Design",
        description:
          "Intuitive, visually refined interfaces that prioritize usability and clarity.",
      },
      {
        icon: Code2,
        title: "Prototyping",
        description:
          "Interactive prototypes to validate user flows and ensure alignment before development.",
      },
    ],
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    title: "Mobile App Design & Development",
    subtitle: "Secure, Scalable Mobile Applications",
    description:
      "We design and develop mobile applications that deliver intuitive user experiences while meeting enterprise-level performance and security standards.",
    details:
      "Our mobile solutions are built to scale with your business needs while maintaining the highest standards of security and performance.",
    features: [
      {
        icon: Layers,
        title: "Strategy & Planning",
        description:
          "We define app objectives, user requirements, and technical architecture from the outset.",
      },
      {
        icon: Palette,
        title: "UI / UX Design",
        description:
          "Designs emphasizing usability, consistency, and accessibility across devices.",
      },
      {
        icon: Code2,
        title: "Development & QA",
        description:
          "Robust applications with rigorous testing to ensure stability and performance.",
      },
    ],
  },
  {
    id: "automation",
    icon: Zap,
    title: "Marketing Automation",
    subtitle: "Funnels, Workflows & System Integrations",
    description:
      "Modern marketing requires efficiency, precision, and personalization. We implement automation solutions that streamline customer journeys and support scalable growth.",
    details:
      "From lead generation to customer retention, we build systems that work around the clock to grow your business.",
    features: [
      {
        icon: Layers,
        title: "Funnel Strategy",
        description:
          "Conversion-focused funnels that support lead generation and revenue growth.",
      },
      {
        icon: Zap,
        title: "Automation & Workflows",
        description:
          "Automated workflows for email marketing, lead nurturing, and customer communication.",
      },
      {
        icon: Code2,
        title: "Platform Integrations",
        description:
          "Unified ecosystems connecting websites, CRMs, and third-party tools.",
      },
    ],
  },
  {
    id: "seo",
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    subtitle: "Strategic Optimization for Sustainable Visibility",
    description:
      "SEO has evolved into a multifaceted discipline requiring technical expertise and strategic execution. Our SEO services focus on improving visibility, relevance, and long-term performance.",
    details:
      "We don't just chase rankings — we build sustainable organic traffic that converts.",
    features: [
      {
        icon: Layers,
        title: "Keyword Research",
        description:
          "High-value keywords aligned with user intent, strategically integrated across your site.",
      },
      {
        icon: Code2,
        title: "Technical SEO",
        description:
          "Optimized metadata, indexing, internal linking, and technical configurations.",
      },
    ],
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Website Maintenance & Support",
    subtitle: "Ongoing Optimization & Reliability",
    description:
      "We provide continuous maintenance and support services to ensure your website remains secure, performant, and up to date.",
    details:
      "Your digital assets need ongoing care to perform at their best. We handle the technical details so you can focus on your business.",
    features: [
      {
        icon: CheckCircle,
        title: "Security Updates",
        description:
          "Regular security patches and updates to protect your digital assets.",
      },
      {
        icon: Zap,
        title: "Performance Optimization",
        description:
          "Continuous monitoring and optimization to maintain peak performance.",
      },
      {
        icon: Code2,
        title: "Content Updates",
        description:
          "Quick turnaround on content changes and feature additions.",
      },
    ],
  },
];

const whyChooseUs = [
  "Strategic, business-focused solutions",
  "Scalable and future-ready systems",
  "Clear communication and structured execution",
  "Expertise across design, development, and automation",
];

export default function ServicesPage() {
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
              <span className="text-sm text-emerald-400">Our Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Strategic Digital Solutions for{" "}
              <span className="text-emerald-400">Modern Businesses</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
            >
              We deliver strategic digital solutions designed to support business
              growth, operational efficiency, and long-term scalability.
            </motion.p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Services List */}
      {services.map((service, index) => (
        <Section
          key={service.id}
          id={service.id}
          dataSection={service.id}
          dark={index % 2 === 0}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <div className="sticky top-32">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {service.title}
                </h2>
                <p className="text-emerald-400 font-medium mb-4">
                  {service.subtitle}
                </p>
                <p className="text-white/60 leading-relaxed mb-4">
                  {service.description}
                </p>
                <p className="text-white/40 leading-relaxed">
                  {service.details}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white/80 mb-6">
                  Our Approach
                </h3>
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    whileHover={{ x: 8 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-white/50 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </Section>
      ))}

      {/* Why OurBrio Section */}
      <Section dataSection="why-ourbrio">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Why OurBrio?
              </h2>
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10"
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <span className="text-white/70">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="p-10 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Ready to get started?
              </h3>
              <p className="text-white/50 mb-8">
                Let&apos;s discuss how we can help you achieve your business
                objectives through strategic digital solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <ButtonColorful label="Start a Project" />
                </Link>
                <Link href="/case-studies">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <ContactFormSection />
    </>
  );
}
