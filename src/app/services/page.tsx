"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Zap,
  Target,
  Wrench,
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
    id: "diagnosis",
    icon: Target,
    title: "The Diagnosis",
    subtitle: "$1,500 — Digital System Roadmap",
    description:
      "Before we build anything, we diagnose. The Diagnosis is a structured audit of your digital systems, tools, workflows, and business goals — delivering a clear picture of what's working, what isn't, and exactly what needs to change.",
    details:
      "The Diagnosis is a standalone deliverable. You own the roadmap whether or not you continue to work with us.",
    features: [
      {
        icon: Layers,
        title: "Full System Audit",
        description:
          "A comprehensive review of your current platforms, tools, and automations — mapping exactly what exists and where the gaps are.",
      },
      {
        icon: Palette,
        title: "Gap & Goal Analysis",
        description:
          "We surface the disconnect between where you are and where you need to be — technically, operationally, and strategically.",
      },
      {
        icon: Code2,
        title: "Prioritized Roadmap",
        description:
          "A platform-agnostic, prioritized action plan delivered as a clear document — ready to execute immediately.",
      },
    ],
  },
  {
    id: "web-development",
    icon: Globe,
    title: "Website & Platform Build",
    subtitle: "Prescription-only. Platform-agnostic.",
    description:
      "We design and develop websites and platforms based on your Diagnosis prescription — not off-the-shelf templates. Whether it's a course site on Kajabi, a sales funnel on GoHighLevel, a membership on Kartra, or a custom-coded application — we match the tool to your actual needs.",
    details:
      "Platform-agnostic means we recommend what's right for your business — not what's easiest for us to build.",
    features: [
      {
        icon: Layers,
        title: "Platform Selection",
        description:
          "Kajabi, GoHighLevel, Kartra, Webflow, WordPress, custom code — we match the platform to your prescription.",
      },
      {
        icon: Palette,
        title: "UX / UI Design",
        description:
          "Conversion-focused interfaces aligned with your brand — designed to drive meaningful action.",
      },
      {
        icon: Code2,
        title: "Development & Launch",
        description:
          "Built for speed, reliability, and scalability. No bloat. No unnecessary complexity.",
      },
    ],
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    title: "Mobile App Development",
    subtitle: "Purposeful apps built to the prescription.",
    description:
      "We design and develop mobile applications that solve specific, diagnosed problems. If the Diagnosis says you need an app, we build it. If it doesn't, we'll tell you.",
    details:
      "Our mobile builds are scoped tightly against your roadmap — ensuring every feature has a purpose and every dollar is justified.",
    features: [
      {
        icon: Layers,
        title: "Strategy & Architecture",
        description:
          "App objectives, user flows, and technical architecture defined before a line of code is written.",
      },
      {
        icon: Palette,
        title: "UI / UX Design",
        description:
          "Clean, usable interfaces built for real humans across iOS and Android.",
      },
      {
        icon: Code2,
        title: "Development & QA",
        description:
          "Robust development with rigorous testing — shipped on time, with no scope creep.",
      },
    ],
  },
  {
    id: "automation",
    icon: Zap,
    title: "Automation & Integrations",
    subtitle: "Connect your systems. Remove the manual.",
    description:
      "We build automation workflows and system integrations that eliminate repetitive manual work and connect your platforms into a unified, efficient ecosystem.",
    details:
      "From CRM automations to Zapier workflows to custom API integrations — we build the connective tissue your business needs to scale.",
    features: [
      {
        icon: Layers,
        title: "Workflow Design",
        description:
          "Mapping and designing automated customer journeys, lead flows, and operational processes.",
      },
      {
        icon: Zap,
        title: "Platform Automation",
        description:
          "Email sequences, lead nurturing, follow-ups, and task automation — built to run on autopilot.",
      },
      {
        icon: Code2,
        title: "System Integrations",
        description:
          "Connecting your CRM, website, payment systems, and third-party tools into a unified ecosystem.",
      },
    ],
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Ongoing Support",
    subtitle: "A long-term technology partner, not a contractor.",
    description:
      "For clients who want more than a one-and-done build — we offer ongoing support, optimization, and iteration as your business grows and your needs evolve.",
    details:
      "We stay close to your systems so you can stay focused on your business.",
    features: [
      {
        icon: CheckCircle,
        title: "Proactive Monitoring",
        description:
          "Regular security patches, performance checks, and updates — handled before they become problems.",
      },
      {
        icon: Zap,
        title: "Continuous Optimization",
        description:
          "Ongoing improvements and feature iterations based on real performance data.",
      },
      {
        icon: Code2,
        title: "Priority Builds",
        description:
          "Fast-turnaround on new features, content updates, and integrations as your roadmap evolves.",
      },
    ],
  },
];

const whyChooseUs = [
  "Diagnosis-first — we never skip to the build",
  "Platform-agnostic recommendations",
  "Scope-controlled, no bloat or upsells",
  "Coach and course creator specialists",
  "Long-term methodology partnership",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        data-section="hero"
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#030303]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=800&fit=crop"
            alt="Services background"
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
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 w-80 h-80 border border-emerald-500/20 rounded-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-16 -left-16 w-60 h-60 border border-green-500/[0.15] rounded-3xl"
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/4 w-40 h-40 bg-emerald-500/[0.06] rounded-full blur-2xl"
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
              <span className="text-sm text-emerald-400">Our Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Everything is a prescription.{" "}
              <span className="text-emerald-400">Nothing is a template.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
            >
              We only build what your Diagnosis says you actually need.
              Platform-agnostic. Methodology-first. No guesswork.
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
                Ready to get diagnosed?
              </h3>
              <p className="text-white/50 mb-8">
                Start with a $1,500 Diagnosis — a structured audit of your
                digital systems, goals, and gaps. You&apos;ll walk away with a
                clear roadmap.
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
