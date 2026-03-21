"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface EnhancedCTAProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "lg" | "xl";
  className?: string;
  icon?: boolean;
}

export function EnhancedCTA({
  href,
  children,
  variant = "primary",
  size = "default",
  className,
  icon = true,
}: EnhancedCTAProps) {
  const variants = {
    primary: "bg-emerald-500 text-black font-semibold hover:bg-emerald-400 shadow-lg shadow-emerald-500/25",
    secondary: "bg-white text-black font-semibold hover:bg-white/90 shadow-lg shadow-white/25",
    outline: "bg-transparent border-2 border-emerald-500 text-emerald-400 font-semibold hover:bg-emerald-500 hover:text-black",
  };

  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg",
  };

  return (
    <Link href={href}>
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative group inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 overflow-hidden",
          variants[variant],
          sizes[size],
          className
        )}
      >
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          whileHover={{ translateX: "100%" }}
          transition={{ duration: 0.6 }}
        />
        
        <span className="relative z-10">{children}</span>
        
        {icon && (
          <motion.span
            className="relative z-10"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
}

// Glowing border CTA
interface GlowingCTAProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function GlowingCTA({ href, children, className }: GlowingCTAProps) {
  return (
    <Link href={href}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative group px-8 py-4 rounded-full font-semibold text-white overflow-hidden",
          className
        )}
      >
        {/* Animated border */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500 p-[2px]">
          <span className="absolute inset-[2px] rounded-full bg-black" />
        </span>
        
        {/* Rotating glow */}
        <motion.span
          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </motion.button>
    </Link>
  );
}
