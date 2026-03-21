"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Briefcase,
  Quote,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Project Inquiries", icon: FolderKanban },
  { href: "/admin/contacts", label: "Contact Messages", icon: MessageSquare },
  { href: "/admin/case-studies", label: "Case Studies", icon: Briefcase },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/calendar", label: "Calendar", icon: Calendar },
  { href: "/admin/users", label: "Team Members", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        className={cn(
          "fixed left-0 top-0 h-screen bg-zinc-950 border-r border-zinc-800 z-40",
          "flex flex-col transition-all duration-300",
          "max-lg:translate-x-[-100%] lg:translate-x-0",
          collapsed && "max-lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
                <span className="text-black font-bold">ST</span>
              </div>
              <span className="font-bold text-xl text-white">
                Our<span className="text-emerald-400">Brio</span>
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft
              size={20}
              className={cn("transition-transform", collapsed && "rotate-180")}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all"
          >
            <Settings size={20} />
            {!collapsed && <span className="font-medium">View Site</span>}
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
