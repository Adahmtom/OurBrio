"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon, Home, Layers, Users, FolderOpen, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items?: NavItem[];
  className?: string;
}

const defaultItems: NavItem[] = [
  { name: "Home", url: "/", icon: Home },
  { name: "Services", url: "/services", icon: Layers },
  { name: "About", url: "/about", icon: Users },
  { name: "Case Studies", url: "/case-studies", icon: FolderOpen },
  { name: "Contact", url: "/contact", icon: Mail },
];

export function TubelightNavbar({ items = defaultItems, className }: NavBarProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set active tab based on current path
    const currentItem = items.find((item) => item.url === pathname);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [pathname, items]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:bottom-auto sm:top-6 left-1/2 -translate-x-1/2 z-50",
        className
      )}
    >
      <div className="flex items-center gap-1 bg-black/80 border border-white/10 backdrop-blur-xl py-2 px-2 rounded-full shadow-2xl shadow-emerald-500/10">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-4 md:px-5 py-2.5 rounded-full transition-all duration-300",
                "text-white/60 hover:text-white",
                isActive && "text-white"
              )}
            >
              <span className="hidden md:inline relative z-10">{item.name}</span>
              <span className="md:hidden relative z-10">
                <Icon size={20} strokeWidth={2} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="tubelight"
                  className="absolute inset-0 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                >
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full" />
                  
                  {/* Top light bar */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-emerald-400 rounded-full">
                    {/* Glow effects */}
                    <div className="absolute w-16 h-8 bg-emerald-400/30 rounded-full blur-lg -top-2 -left-2" />
                    <div className="absolute w-12 h-6 bg-emerald-400/40 rounded-full blur-md -top-1 left-0" />
                    <div className="absolute w-8 h-4 bg-emerald-300/50 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
