import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dataSection?: string;
  dark?: boolean;
}

export function Section({
  children,
  className = "",
  id,
  dataSection,
  dark = true,
}: SectionProps) {
  return (
    <section
      id={id}
      data-section={dataSection}
      className={cn(
        "py-20 md:py-32",
        dark ? "bg-[#030303]" : "bg-[#0a0a0a]",
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}
