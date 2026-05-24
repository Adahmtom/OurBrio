"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle2,
  FolderKanban,
  Globe,
  Mail,
  MessageSquare,
  Quote,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const statusColors: Record<string, string> = {
  NEW: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CONTACTED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  IN_PROGRESS: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  COMPLETED: "bg-green-500/10 text-green-400 border-green-500/20",
  READ: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  REPLIED: "bg-green-500/10 text-green-400 border-green-500/20",
};

const quickActions = [
  { label: "View Inquiries", href: "/admin/inquiries", icon: FolderKanban, color: "emerald" },
  { label: "Add Case Study", href: "/admin/case-studies", icon: Briefcase, color: "purple" },
  { label: "Manage Calendar", href: "/admin/calendar", icon: Calendar, color: "blue" },
  { label: "Add Testimonial", href: "/admin/testimonials", icon: Quote, color: "orange" },
];

export default function AdminDashboard() {
  const data = useQuery(api.dashboard.stats);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (data === undefined) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalLeads =
    (data?.stats?.inquiries?.total || 0) + (data?.stats?.contacts?.total || 0);
  const newLeads =
    (data?.stats?.inquiries?.new || 0) + (data?.stats?.contacts?.new || 0);

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold text-white"
          >
            Welcome back! 👋
          </motion.h1>
          <p className="text-zinc-400 mt-1">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700">
            <p className="text-zinc-400 text-sm">Current Time</p>
            <p className="text-white font-semibold">{format(currentTime, "h:mm a")}</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700">
            <p className="text-zinc-400 text-sm">Today</p>
            <p className="text-white font-semibold">{format(currentTime, "MMM d, yyyy")}</p>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              {newLeads > 0 && (
                <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                  +{newLeads} new
                </span>
              )}
            </div>
            <p className="text-zinc-400 text-sm">Total Leads</p>
            <p className="text-4xl font-bold text-white mt-1">{totalLeads}</p>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Active pipeline</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <FolderKanban className="w-6 h-6 text-blue-400" />
              </div>
              {(data?.stats.inquiries.new || 0) > 0 && (
                <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium animate-pulse">
                  {data?.stats.inquiries.new} pending
                </span>
              )}
            </div>
            <p className="text-zinc-400 text-sm">Project Inquiries</p>
            <p className="text-4xl font-bold text-white mt-1">
              {data?.stats.inquiries.total || 0}
            </p>
            <Link
              href="/admin/inquiries"
              className="flex items-center gap-1 mt-2 text-blue-400 text-sm hover:underline"
            >
              <span>View all</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-500/20">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
              <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                {data?.stats.caseStudies.published || 0} live
              </span>
            </div>
            <p className="text-zinc-400 text-sm">Case Studies</p>
            <p className="text-4xl font-bold text-white mt-1">
              {data?.stats.caseStudies.total || 0}
            </p>
            <Link
              href="/admin/case-studies"
              className="flex items-center gap-1 mt-2 text-purple-400 text-sm hover:underline"
            >
              <span>Manage portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/20"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-orange-500/20">
                <Quote className="w-6 h-6 text-orange-400" />
              </div>
              <span className="px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
                {data?.stats.testimonials.published || 0} published
              </span>
            </div>
            <p className="text-zinc-400 text-sm">Testimonials</p>
            <p className="text-4xl font-bold text-white mt-1">
              {data?.stats.testimonials.total || 0}
            </p>
            <Link
              href="/admin/testimonials"
              className="flex items-center gap-1 mt-2 text-orange-400 text-sm hover:underline"
            >
              <span>Manage reviews</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-emerald-500/50 transition-all cursor-pointer group"
              >
                <action.icon className="w-8 h-8 text-emerald-400 mb-3" />
                <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  {action.label}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-emerald-400" />
              Recent Project Inquiries
            </h2>
            <Link
              href="/admin/inquiries"
              className="text-emerald-400 text-sm hover:underline flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {data?.recent.inquiries.length === 0 ? (
            <div className="text-center py-12">
              <FolderKanban className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500">No inquiries yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data?.recent.inquiries.map((inquiry, index) => (
                <motion.div
                  key={inquiry._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Link
                    href="/admin/inquiries"
                    className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center text-emerald-400 font-bold">
                        {inquiry.businessName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                          {inquiry.businessName}
                        </p>
                        <div className="flex items-center gap-3 text-zinc-500 text-sm">
                          <span>{inquiry.contactName}</span>
                          <span>•</span>
                          <span className="hidden sm:inline">{inquiry.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs border ${statusColors[inquiry.status]}`}
                      >
                        {inquiry.status}
                      </span>
                      <span className="text-zinc-500 text-sm hidden sm:block">
                        {format(new Date(inquiry._creationTime), "MMM d")}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-6"
        >
          {/* Contact Messages */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                Messages
              </h2>
              <Link href="/admin/contacts" className="text-blue-400 text-sm hover:underline">
                View all
              </Link>
            </div>

            {data?.recent.contacts.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-10 h-10 text-zinc-700 mx-auto mb-2" />
                <p className="text-zinc-500 text-sm">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data?.recent.contacts.slice(0, 3).map((contact) => (
                  <div
                    key={contact._id}
                    className="p-3 rounded-xl bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white text-sm">{contact.name}</p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${statusColors[contact.status]}`}
                      >
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-xs mt-1">{contact.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Status */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-green-400" />
              System Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-green-400" />
                  <span className="text-zinc-300 text-sm">Website</span>
                </div>
                <span className="flex items-center gap-1 text-green-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Online
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-400" />
                  <span className="text-zinc-300 text-sm">Email Service</span>
                </div>
                <span className="flex items-center gap-1 text-green-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Active
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  <span className="text-zinc-300 text-sm">Database</span>
                </div>
                <span className="flex items-center gap-1 text-green-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Connected
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-800"
      >
        <p className="text-zinc-500 text-sm">
          OurBrio Admin Dashboard • Last updated: {format(new Date(), "h:mm a")}
        </p>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-zinc-400 hover:text-white text-sm flex items-center gap-1">
            <Globe className="w-4 h-4" /> View Website
          </Link>
          <Link
            href="/admin/calendar"
            className="text-zinc-400 hover:text-white text-sm flex items-center gap-1"
          >
            <Calendar className="w-4 h-4" /> Manage Availability
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
