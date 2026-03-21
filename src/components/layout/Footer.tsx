"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  ArrowRight,
  ArrowUpRight,
  Rocket,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Web Development", href: "/services#web-development" },
    { label: "Mobile Apps", href: "/services#mobile-apps" },
    { label: "Marketing Automation", href: "/services#automation" },
    { label: "SEO Optimization", href: "/services#seo" },
  ],
  resources: [
    { label: "Start a Project", href: "/start-project" },
    { label: "FAQs", href: "/contact#faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Top CTA Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=600&fit=crop"
                alt="Office background"
                fill
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
            </div>

            {/* Animated glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]"
            />
            
            <div className="relative z-10 p-10 md:p-16 lg:p-20 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Ready to Transform Your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-300">
                  Digital Presence?
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10"
              >
                Let&apos;s discuss how we can help you achieve your business goals with a tailored digital strategy.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/start-project">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-emerald-500 text-black font-semibold text-sm sm:text-lg shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-all"
                  >
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                    Start a Project
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </Link>
                
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm sm:text-lg hover:bg-white/20 hover:border-emerald-500/50 transition-all"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    Contact Us
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Image src="/logo.svg" alt="OurBrio" width={120} height={40} className="h-10 w-auto" />
              </Link>
              <p className="text-white/50 leading-relaxed mb-8 max-w-sm">
                We design, build, and automate digital systems that help brands
                stand out and scale. Strategic solutions for modern businesses.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-white/50 hover:text-emerald-400 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Services</h3>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-white/50 hover:text-emerald-400 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:OurBrio@gmail.com"
                    className="flex items-center gap-3 text-white/50 hover:text-emerald-400 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                      <Mail size={16} />
                    </div>
                    <span className="text-sm">OurBrio@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+14376028100"
                    className="flex items-center gap-3 text-white/50 hover:text-emerald-400 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                      <Phone size={16} />
                    </div>
                    <span className="text-sm">+1 (437) 602-8100</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-white/50">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} />
                    </div>
                    <span className="text-sm">Remote-first, serving clients globally</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} OurBrio. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.resources.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/40 hover:text-emerald-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </footer>
  );
}
