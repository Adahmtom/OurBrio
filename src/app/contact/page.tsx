"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  Linkedin,
  Twitter,
  Instagram,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BookingCalendar } from "@/components/ui/booking-calendar";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@ourbrio.com",
    link: "mailto:info@ourbrio.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (437) 602-8100",
    link: "tel:+14376028100",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Remote-first, Global",
    link: null,
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "Within 24 hours",
    link: null,
  },
];

const services = [
  "Diagnosis ($1,500 — Digital System Roadmap)",
  "Website or Platform Build",
  "App Development",
  "Automation & Integrations",
  "Ongoing Support",
  "Other",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
  "Not sure yet",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const createContact = useMutation(api.contacts.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createContact({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        service: formData.service || undefined,
        budget: formData.budget || undefined,
        message: formData.message,
      });
      setIsSubmitted(true);
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero Section */}
      <section
        data-section="hero"
        className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#030303]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=800&fit=crop"
            alt="Contact background"
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
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-16 -left-16 w-60 h-60 border border-green-500/[0.15] rounded-3xl"
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/3 w-40 h-40 bg-emerald-500/[0.06] rounded-full blur-2xl"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-green-500/[0.05] blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-32 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
            >
              <span className="text-sm text-emerald-400">Book a Call</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Start with a{" "}
              <span className="text-emerald-400">Diagnosis.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
            >
              A structured 60-minute audit of your digital systems, goals, and
              gaps — delivered as a written roadmap. Stop guessing. Start knowing.
            </motion.p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
      </section>

      {/* ── Booking Calendar Section ─────────────────────────────────────── */}
      <Section dataSection="booking" dark={false}>
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
              <Target className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400">Schedule Your Diagnosis Call</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pick a date that works for you
            </h2>
            <p className="text-white/45">
              Book a 60-minute session with our team. We&apos;ll walk through your
              business, identify the gaps, and hand you a clear prescription — no
              fluff, no pressure.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <BookingCalendar />
        </ScrollReveal>

        {/* What to expect */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 grid md:grid-cols-3 gap-5 max-w-2xl mx-auto">
            {[
              { emoji: "🔍", label: "Audit your systems", desc: "We map what you have and where it breaks down." },
              { emoji: "📋", label: "Written roadmap", desc: "You receive a clear, actionable prescription doc." },
              { emoji: "🚀", label: "No obligation", desc: "Build with us or take the roadmap and run." },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center"
              >
                <div className="text-2xl mb-3">{item.emoji}</div>
                <p className="text-white font-medium text-sm mb-1">{item.label}</p>
                <p className="text-white/40 text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Contact Info + Form ──────────────────────────────────────────── */}
      <Section dataSection="contact-form" dark={false}>
        {/* Divider with label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-sm whitespace-nowrap">Or send us a message</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
                  <p className="text-white/50">
                    Prefer to write? Fill out the form and we&apos;ll get back to you
                    within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white/40 text-sm mb-1">{item.title}</p>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-white hover:text-emerald-400 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-8 border-t border-white/10">
                  <p className="text-white/40 text-sm mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    {[
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Twitter, label: "Twitter" },
                      { icon: Instagram, label: "Instagram" },
                    ].map((social) => (
                      <motion.a
                        key={social.label}
                        href="#"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-emerald-400 hover:border-emerald-400/50 transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon size={18} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                    <p className="text-white/50 mb-8">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          service: "",
                          budget: "",
                          message: "",
                        });
                      }}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                        placeholder="Your Company"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">
                          Service Interested In
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#0a0a0a]">
                            Select a service
                          </option>
                          {services.map((service) => (
                            <option
                              key={service}
                              value={service}
                              className="bg-[#0a0a0a]"
                            >
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#0a0a0a]">
                            Select budget range
                          </option>
                          {budgetRanges.map((range) => (
                            <option
                              key={range}
                              value={range}
                              className="bg-[#0a0a0a]"
                            >
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 text-lg"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* ── FAQ Section ──────────────────────────────────────────────────── */}
      <Section dataSection="faq" id="faq">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-white/50">
              Answers to common questions about our process and services.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "What exactly is the Diagnosis?",
              a: "The Diagnosis is a $1,500 structured 60-minute audit session followed by a written roadmap. We map your existing digital systems, identify the gaps, and deliver a clear prescription — what to build, what to fix, what to stop. No fluff. No sales pitch.",
            },
            {
              q: "Do I have to build with you after the Diagnosis?",
              a: "Absolutely not. You own the roadmap. Many clients take it and run with their own team. Others choose to continue with us for the build — but that's entirely your call.",
            },
            {
              q: "What is your typical project timeline?",
              a: "Project timelines vary based on scope and complexity. A typical website project takes 4-8 weeks, while mobile apps may take 8-16 weeks. We'll provide a detailed timeline as part of the Diagnosis roadmap.",
            },
            {
              q: "Do you work with clients internationally?",
              a: "Yes. We're remote-first and work with clients globally. All Diagnosis calls are held via video conference — no travel required.",
            },
            {
              q: "What is your payment structure?",
              a: "The Diagnosis is a flat $1,500 engagement. For build projects, we typically work with a 50% upfront deposit and 50% upon completion for smaller scopes, with milestone-based payments for larger engagements.",
            },
          ].map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-white/50 leading-relaxed">{faq.a}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
