"use client";

import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { GlowingFeatureSection } from "@/components/ui/glowing-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { EnhancedCTA, GlowingCTA } from "@/components/ui/enhanced-cta";
import { AnimatedBorderCard, SectionShadow } from "@/components/ui/animated-border-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ContactFormSection } from "@/components/ui/contact-form-section";

const crmPlatforms = [
  { name: "HubSpot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hubspot/hubspot-original.svg" },
  { name: "Salesforce", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/salesforce/salesforce-original.svg" },
  { name: "Mailchimp", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mailchimp/mailchimp-original.svg" },
  { name: "Zapier", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zapier/zapier-original.svg" },
  { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg" },
  { name: "Notion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
];

const methodologyCards = [
  {
    step: "01",
    label: "Diagnose",
    title: "The Diagnosis",
    description:
      "A structured audit of your current digital systems, tools, workflows, and gaps. You walk away with a clear picture of what's working, what isn't, and exactly what to do next.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    step: "02",
    label: "Prescribe",
    title: "The Prescription",
    description:
      "A custom roadmap built from your Diagnosis results. No generic recommendations — just a prioritized plan that aligns technology decisions with your actual business goals.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
  },
  {
    step: "03",
    label: "Build",
    title: "The Build",
    description:
      "We build exactly what was prescribed — websites, apps, automations, or integrations. Platform-agnostic. Scope-controlled. No bloat, no upsells you didn't ask for.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=400&fit=crop",
  },
  {
    step: "04",
    label: "Optimize",
    title: "The Optimization",
    description:
      "Ongoing support, performance monitoring, and iteration as your business grows. We stay close so your systems keep up.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Diagnose",
    description:
      "A structured audit of your digital systems, tools, and workflows. We map what you have, identify gaps, and surface the real blockers to growth.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop",
  },
  {
    step: "02",
    title: "Prescribe",
    description:
      "A custom roadmap built from your Diagnosis. Prioritized, platform-agnostic recommendations that match your goals — not what's easiest for us to sell.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&h=350&fit=crop",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Execution against the prescription. Websites, apps, automations, integrations — built lean and purpose-first. No scope creep, no templates.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=350&fit=crop",
  },
  {
    step: "04",
    title: "Optimize",
    description:
      "Ongoing monitoring, iteration, and support. Your business evolves — your digital systems should too. We stay in the picture.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        data-section="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
            alt="Hero background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/75 to-black/60" />
        </div>

        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-green-500/[0.05]" />

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 border border-emerald-500/20 rounded-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-60 h-60 border border-green-500/20 rounded-3xl"
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-40 h-40 bg-emerald-500/10 rounded-3xl blur-xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-green-500/10 rounded-full blur-xl"
          />
        </div>

        {/* Hero content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400 font-medium">
              Diagnose. Prescribe. Build.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-white">Your business has outgrown</span>
            <br />
            <TypingAnimation
              words={[
                "the systems that got you here.",
                "the tools your business needs.",
                "your old digital foundation.",
                "the guesswork in your strategy.",
              ]}
              className="text-emerald-400"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Most businesses don&apos;t have a tech problem — they have a clarity
            problem. We diagnose what&apos;s broken, prescribe what&apos;s
            needed, and build only what moves you forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton>
              <EnhancedCTA href="/contact" variant="primary" size="xl">
                Book a Diagnosis Call
              </EnhancedCTA>
            </MagneticButton>
            <MagneticButton>
              <GlowingCTA href="/services">Explore Our Services</GlowingCTA>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <SectionShadow />

      {/* Platforms Section */}
      <section data-section="platforms" className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Platform-agnostic by design.
              </h2>
              <p className="text-white/50 text-lg">
                We work across Kajabi, GoHighLevel, Kartra, Webflow, WordPress,
                and more — matching the right tool to your actual needs, not our
                preferences.
              </p>
            </div>
          </ScrollReveal>

          <InfiniteSlider gap={40} duration={20} className="py-8">
            {crmPlatforms.map((platform, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 relative">
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-white/80 font-semibold text-lg whitespace-nowrap">
                  {platform.name}
                </span>
              </motion.div>
            ))}
          </InfiniteSlider>
        </div>
      </section>

      <SectionShadow />

      {/* About Section */}
      <section
        data-section="about"
        className="py-24 md:py-32 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0 section-accent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-sm text-emerald-400 font-medium">
                    About Us
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  We&apos;re not an agency. We&apos;re a{" "}
                  <span className="gradient-text">diagnostic partner.</span>
                </h2>
                <p className="text-white/60 text-xl leading-relaxed">
                  Most agencies skip to the build. We don&apos;t. We start every
                  engagement with a structured Diagnosis — a deep audit of your
                  systems, goals, and gaps. Only then do we prescribe what&apos;s
                  needed and build it. No guesswork, no waste.
                </p>
                <MagneticButton>
                  <EnhancedCTA href="/about" variant="primary" size="lg">
                    Learn More About Us
                  </EnhancedCTA>
                </MagneticButton>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <TiltCard>
                <div className="p-10 rounded-3xl bg-black border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <blockquote className="text-2xl md:text-3xl font-medium text-white/80 italic leading-relaxed">
                    &ldquo;Diagnose what&apos;s broken. Prescribe what&apos;s
                    needed. Build only what moves you forward.&rdquo;
                  </blockquote>
                  <p className="mt-6 text-emerald-400 font-medium">
                    The OurBrio Methodology
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionShadow />

      {/* How We Work Section */}
      <GlowingFeatureSection className="py-24 md:py-32 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="text-sm text-emerald-400 font-medium">
                  How We Work
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Our Methodology
              </h2>
              <p className="text-white/60 text-xl">
                A structured approach that starts with diagnosis — not
                assumptions.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologyCards.map((card, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedBorderCard>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-5xl font-bold text-emerald-500/50">
                        {card.step}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-emerald-400 text-sm font-semibold mb-2 uppercase tracking-wider">
                      {card.label}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm">
                      {card.description}
                    </p>
                  </div>
                  </motion.div>
                </AnimatedBorderCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-16">
              <MagneticButton>
                <EnhancedCTA href="/services" variant="outline" size="xl">
                  View All Services
                </EnhancedCTA>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </GlowingFeatureSection>

      <SectionShadow />

      {/* Process Section */}
      <section
        data-section="process"
        className="py-24 md:py-32 bg-black relative"
      >
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="text-sm text-emerald-400 font-medium">
                  Our Process
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Diagnose. Prescribe. Build. Optimize.
              </h2>
              <p className="text-white/60 text-xl">
                A methodology built around clarity — not assumptions.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 10 }}
                  className={`flex flex-col lg:flex-row items-center gap-12 p-8 rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-all bg-white/[0.01] ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full lg:w-2/5">
                    <div className="relative rounded-2xl overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={500}
                        height={350}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span className="absolute bottom-6 left-6 text-7xl font-bold text-emerald-500/40">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <div className="w-full lg:w-3/5 text-center lg:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-xl leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionShadow />

      {/* Testimonials Section */}
      <section
        data-section="testimonials"
        className="py-24 md:py-32 bg-black relative"
      >
        <div className="absolute inset-0 section-accent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="text-sm text-emerald-400 font-medium">
                  Testimonials
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                What Our Clients Say
              </h2>
              <p className="text-white/60 text-xl">
                Real results from real businesses we&apos;ve diagnosed and built
                for.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-full">
            <Script
              src="https://testimonial.to/js/iframeResizer.min.js"
              strategy="lazyOnload"
              onLoad={() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const w = window as any;
                if (w.iFrameResize) {
                  w.iFrameResize(
                    { log: false, checkOrigin: false },
                    "#testimonialto-e792f543-c85b-4174-9788-2c4498715dca"
                  );
                }
              }}
            />
            <iframe
              id="testimonialto-e792f543-c85b-4174-9788-2c4498715dca"
              src="https://embed-v2.testimonial.to/w/abeeb-akinpelu?id=e792f543-c85b-4174-9788-2c4498715dca"
              frameBorder={0}
              scrolling="no"
              width="100%"
              style={{ minHeight: "700px" }}
              title="Client testimonials"
            />
          </div>
        </div>
      </section>

      <SectionShadow />

      <ContactFormSection />
    </>
  );
}
