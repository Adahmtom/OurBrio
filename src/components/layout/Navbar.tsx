"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Layers, Users, FolderOpen, Mail, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Services", url: "/services", icon: Layers },
  { name: "About", url: "/about", icon: Users },
  { name: "Case Studies", url: "/case-studies", icon: FolderOpen },
  { name: "Contact", url: "/contact", icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    const currentItem = navItems.find((item) => item.url === pathname);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Tubelight Navbar */}
      <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className={cn(
            "flex items-center gap-2 py-3 px-3 rounded-full border transition-all duration-300",
            isScrolled
              ? "bg-black/90 backdrop-blur-xl border-white/10 shadow-2xl shadow-emerald-500/10"
              : "bg-black/50 backdrop-blur-md border-white/5"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-5 py-2.5">
            <Image src="/logo.svg" alt="OurBrio" width={140} height={52} className="h-13 w-auto" priority />
          </Link>

          {/* Nav Items */}
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-base font-medium px-6 py-3 rounded-full transition-all duration-300",
                  "text-white/60 hover:text-white",
                  isActive && "text-white"
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="tubelight-desktop"
                    className="absolute inset-0 rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  >
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full" />
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-14 h-1 bg-emerald-400 rounded-full">
                      <div className="absolute w-18 h-8 bg-emerald-400/30 rounded-full blur-lg -top-2 -left-2" />
                      <div className="absolute w-14 h-6 bg-emerald-400/40 rounded-full blur-md -top-1 left-0" />
                    </div>
                  </motion.div>
                )}
              </Link>
            );
          })}

          {/* Start Project Button */}
          <Link href="/start-project">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 ml-2 px-6 py-3 rounded-full bg-emerald-500 text-black font-semibold text-base hover:bg-emerald-400 transition-colors"
            >
              <Rocket className="w-5 h-5" />
              Start Project
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-5">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="OurBrio" width={140} height={52} className="h-13 w-auto" priority />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-around py-4 px-3 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl transition-all",
                  isActive ? "text-emerald-400" : "text-white/50"
                )}
              >
                <Icon size={24} strokeWidth={2} />
                {isActive && (
                  <motion.div
                    layoutId="tubelight-mobile"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-400 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  >
                    <div className="absolute w-10 h-4 bg-emerald-400/30 rounded-full blur-md -top-1 -left-1" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="relative z-10 pt-24 px-6"
            >
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.url}
                        onClick={() => {
                          setActiveTab(item.name);
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "flex items-center gap-4 px-5 py-4 rounded-xl transition-all",
                          isActive 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : "text-white/70 hover:bg-white/5"
                        )}
                      >
                        <Icon size={22} />
                        <span className="font-medium text-lg">{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4"
                >
                  <Link
                    href="/start-project"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-emerald-500 text-black font-semibold text-lg"
                  >
                    <Rocket className="w-5 h-5" />
                    Start a Project
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
