"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", service: "", budget: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section data-section="contact-cta" className="py-24 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-green-500/[0.05]" />
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
              Let&apos;s Work Together
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Start Your Project Today
            </h2>
            <p className="text-white/50 text-lg">
              Tell us about your goals and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
              <div className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                    <p className="text-white/50 mb-8">We&apos;ll get back to you within 24 hours.</p>
                    <Button
                      onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "" }); }}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Your Name *</label>
                        <input
                          type="text" name="name" value={formData.name} onChange={handleChange} required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Email Address *</label>
                        <input
                          type="email" name="email" value={formData.email} onChange={handleChange} required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Company Name</label>
                      <input
                        type="text" name="company" value={formData.company} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Service Interested In</label>
                        <select
                          name="service" value={formData.service} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#0a0a0a]">Select a service</option>
                          {services.map((s) => <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Budget Range</label>
                        <select
                          name="budget" value={formData.budget} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#0a0a0a]">Select budget range</option>
                          {budgetRanges.map((r) => <option key={r} value={r} className="bg-[#0a0a0a]">{r}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Project Details *</label>
                      <textarea
                        name="message" value={formData.message} onChange={handleChange} required rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
                    </div>
                    <Button
                      type="submit" disabled={isSubmitting}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-6 text-base rounded-xl"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full inline-block" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message <Send className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
