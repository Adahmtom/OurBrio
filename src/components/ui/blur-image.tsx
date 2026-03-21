"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
}

export function BlurImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  containerClassName,
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Placeholder blur */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/10"
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer loading effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={
          isLoaded
            ? { translateX: "100%" }
            : { translateX: ["-100%", "100%"] }
        }
        transition={
          isLoaded
            ? { duration: 0 }
            : { duration: 1.5, repeat: Infinity, ease: "linear" }
        }
      />

      <motion.div
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.1 }}
        transition={{ duration: 0.4 }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={cn("object-cover", className)}
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </motion.div>
    </div>
  );
}
