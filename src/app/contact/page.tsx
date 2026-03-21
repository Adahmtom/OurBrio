"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "OurBrio@gmail.com",
    link: "mailto:OurBrio@gmail.com",
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
  "Web Design & Development",
  "Mobile App Development",
  "Marketing Automation",
  "SEO Optimization",
  "Website Maintenance",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero Section */}
      <section
        data-section="hero"
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#030303]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-green-500/[0.05] blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-32 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
            >
              <span className="text-sm text-emerald-400">Contact Us</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Let&apos;s Build Something{" "}
              <span className="text-emerald-400">Great Together</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
            >
              Have a project in mind? We&apos;d love to hear about it. Get in
              touch and let&apos;s discuss how we can help.
            </motion.p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Contact Form & Info Section */}
      <Section dataSection="contact-form" dark={false}>
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-white/50">
                    Ready to transform your digital presence? Reach out and
                    let&apos;s start a conversation.
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
                        <p className="text-white/40 text-sm mb-1">
                          {item.title}
                        </p>
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
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-white/50 mb-8">
                      Thank you for reaching out. We&apos;ll get back to you
                      within 24 hours.
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

      {/* FAQ Section */}
      <Section dataSection="faq">
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
              q: "What is your typical project timeline?",
              a: "Project timelines vary based on scope and complexity. A typical website project takes 4-8 weeks, while mobile apps may take 8-16 weeks. We'll provide a detailed timeline during our initial consultation.",
            },
            {
              q: "Do you work with clients internationally?",
              a: "Yes! We're a remote-first agency and work with clients globally. We use modern collaboration tools to ensure seamless communication across time zones.",
            },
            {
              q: "What is your payment structure?",
              a: "We typically work with a 50% upfront deposit and 50% upon completion for smaller projects. Larger projects may have milestone-based payments. We're flexible and can discuss terms that work for both parties.",
            },
            {
              q: "Do you provide ongoing support after launch?",
              a: "Absolutely. We offer maintenance and support packages to ensure your digital assets remain secure, performant, and up-to-date. We view every project as a long-term partnership.",
            },
          ].map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.q}
                </h3>
                <p className="text-white/50 leading-relaxed">{faq.a}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
