"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBorderCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function AnimatedBorderCard({
  children,
  className,
  containerClassName,
}: AnimatedBorderCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={cn("relative group", containerClassName)}
    >
      {/* Animated border gradient */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.4), transparent 40%)`
            : "none",
        }}
      />
      
      {/* Running light border */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <motion.div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(16, 185, 129, 0.8), transparent 30%)",
          }}
        />
      </div>

      {/* Card content */}
      <div
        className={cn(
          "relative rounded-2xl bg-black border border-white/10 overflow-hidden",
          "group-hover:border-transparent transition-colors duration-300",
          className
        )}
      >
        {/* Inner glow effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: isHovered
              ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1), transparent 40%)`
              : "none",
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}

// Section shadow divider
export function SectionShadow() {
  return (
    <div className="relative h-24 -mt-12 z-10 pointer-events-none">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    </div>
  );
}
