"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function AnimatedLink({
  href,
  children,
  className,
  external = false,
}: AnimatedLinkProps) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      className={cn("group relative inline-block", className)}
      {...linkProps}
    >
      <span className="relative">
        {children}
        <motion.span
          className="absolute bottom-0 left-0 h-[1px] bg-emerald-400"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </span>
    </Link>
  );
}

// Navigation link with active indicator
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export function NavLink({ href, children, isActive, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-1 py-2 text-sm font-medium transition-colors",
        isActive ? "text-emerald-400" : "text-white/70 hover:text-white",
        className
      )}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="activeNav"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}
