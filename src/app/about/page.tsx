"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ContactFormSection } from "@/components/ui/contact-form-section";

const values = [
  {
    icon: Target,
    title: "Diagnosis-First Approach",
    description:
      "Every engagement starts with a structured audit of your systems, goals, and gaps. We diagnose before we prescribe — always. No assumptions, no guesswork.",
  },
  {
    icon: Lightbulb,
    title: "Platform-Agnostic by Design",
    description:
      "We have no preferred platform. We recommend Kajabi, GoHighLevel, Kartra, Webflow, WordPress, or custom code based solely on what's right for your business.",
  },
  {
    icon: Award,
    title: "Scope-Controlled Execution",
    description:
      "We build exactly what was prescribed — nothing more, nothing less. No feature creep, no upsells, no bloat. Every dollar you spend is accounted for.",
  },
  {
    icon: Users,
    title: "Methodology Partnership",
    description:
      "We're not a one-and-done contractor. We're a long-term technology partner who stays close as your business evolves — adapting your systems as you grow.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        data-section="hero"
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#030303]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=800&fit=crop"
            alt="About background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#030303]/95 via-[#030303]/80 to-[#030303]/65" />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 w-80 h-80 border border-emerald-500/20 rounded-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-16 -left-16 w-60 h-60 border border-green-500/[0.15] rounded-3xl"
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/4 w-40 h-40 bg-emerald-500/[0.06] rounded-full blur-2xl"
          />
        </div>

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
              We built a methodology,{" "}
              <span className="text-emerald-400">not just an agency.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
            >
              Most agencies start with a proposal. We start with a Diagnosis.
              The difference is everything.
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
                Methodology before methodology was a buzzword.
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  OurBrio exists because too many businesses were paying for
                  builds they never needed. We designed a process that starts
                  with clarity — a structured Diagnosis of your digital systems,
                  goals, and gaps — before a single platform is chosen or a line
                  of code is written.
                </p>
                <p>
                  We&apos;re platform-agnostic by design. We work across Kajabi,
                  GoHighLevel, Kartra, Webflow, WordPress, and custom code —
                  always recommending what&apos;s right for your business, not
                  what&apos;s most profitable for us.
                </p>
                <p>
                  Our clients are coaches, course creators, consultants, and
                  service-based businesses who&apos;ve outgrown their current
                  systems and need a clear path forward.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <TiltCard>
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-white/10 hover:border-emerald-500/40 transition-colors flex items-center justify-center">
                <div className="text-center p-8">
                  <blockquote className="text-xl md:text-2xl font-medium text-white/80 italic">
                    &ldquo;Our job is to make sure you never pay for something
                    you didn&apos;t actually need.&rdquo;
                  </blockquote>
                  <p className="mt-6 text-emerald-400 text-sm">
                    The OurBrio promise — clarity before commitment.
                  </p>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
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
              Four principles that define how we work — and why it works.
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
                  "We start with Diagnosis — never assumptions",
                  "Platform-agnostic and completely unbiased",
                  "Scope-controlled, no upsells or bloat",
                  "Specialists in coaching and course creator businesses",
                  "Long-term methodology partnership",
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
                Ready to get diagnosed?
              </h3>
              <p className="text-white/50 mb-8">
                Start with a $1,500 Diagnosis — a structured audit of your
                digital systems, goals, and gaps. You&apos;ll walk away with a
                clear roadmap whether or not we work together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <ButtonColorful label="Book a Diagnosis Call" />
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
