"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const values = [
  {
    icon: Target,
    title: "Tailored Digital Strategies",
    description:
      "Every project begins with understanding. We design solutions based on your business goals, industry context, and operational needs.",
  },
  {
    icon: Lightbulb,
    title: "Scalable Technology",
    description:
      "We build systems that grow with your business, using modern, secure, and scalable technologies suitable for startups through enterprise organizations.",
  },
  {
    icon: Users,
    title: "Transparent Collaboration",
    description:
      "We prioritize clarity and accountability. Our clients remain informed and involved throughout every phase of the project lifecycle.",
  },
  {
    icon: Award,
    title: "User-Centered Design",
    description:
      "Our approach focuses on real user behavior, ensuring intuitive experiences that improve engagement, retention, and conversion.",
  },
];

const stats = [
  { value: "96+", label: "Successfully Delivered Projects" },
  { value: "30+", label: "Brands Supported Globally" },
  { value: "17+", label: "Years Combined Experience" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        data-section="hero"
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#030303]"
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
              <span className="text-sm text-emerald-400">About Us</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              We craft results-driven digital strategies that transform{" "}
              <span className="text-emerald-400">vision into impact</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
            >
              Enabling brands to succeed in a digital-first economy through
              strategic design, development, and automation solutions.
            </motion.p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Who We Are Section */}
      <Section dataSection="who-we-are" dark={false}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Enabling Brands to Succeed in a Digital-First Economy
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  In an increasingly complex digital environment, success requires
                  more than visibility. It demands clarity, strategy, and execution.
                </p>
                <p>
                  OurBrio is a technology and digital strategy firm
                  specializing in building scalable, user-centered solutions for
                  modern businesses. We partner with brands to design, develop, and
                  optimize digital platforms that support growth, efficiency, and
                  long-term performance.
                </p>
                <p>
                  From responsive websites and mobile applications to automation
                  systems and SEO-driven visibility, our work is grounded in
                  strategy, supported by data, and executed with precision.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-white/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <blockquote className="text-xl md:text-2xl font-medium text-white/80 italic">
                    &ldquo;Inspiring brands to think strategically, design
                    intelligently, and build systems that perform.&rdquo;
                  </blockquote>
                  <p className="mt-6 text-emerald-400 text-sm">
                    Where technology meets purpose, and execution drives results.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Impact Section */}
      <Section dataSection="impact">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Numbers that reflect our commitment to delivering measurable outcomes.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-10 rounded-3xl bg-white/[0.02] border border-white/10 text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-emerald-400 mb-4">
                  {stat.value}
                </div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* What We Deliver Section */}
      <Section dataSection="values" dark={false}>
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We Deliver
            </h2>
            <p className="text-white/50">
              Purpose-built solutions with measurable outcomes.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Why Choose Us Section */}
      <Section dataSection="why-us">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Why Partner with OurBrio?
              </h2>
              <div className="space-y-4">
                {[
                  "Strategic, business-focused solutions",
                  "Scalable and future-ready systems",
                  "Clear communication and structured execution",
                  "Expertise across design, development, and automation",
                  "Long-term partnership approach",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
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
                Ready to transform your digital presence?
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

      {/* CTA Section */}
      <Section dataSection="cta" dark={false} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-green-500/10" />
        <ScrollReveal>
          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Let&apos;s Build Something Great Together
            </h2>
            <p className="text-white/50 text-lg mb-10">
              We help organizations not only adapt to digital transformation, but
              lead within it.
            </p>
            <Link href="/contact">
              <ButtonColorful label="Get in Touch" />
            </Link>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
