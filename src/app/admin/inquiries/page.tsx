"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Trash2, Mail, Phone, Building2, Calendar, X } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type Inquiry = {
  _id: Id<"projectInquiries">;
  _creationTime: number;
  businessName: string;
  industry: string;
  businessDescription: string;
  targetAudience: string;
  currentWebsite?: string;
  selectedServices: string[];
  projectGoals: string;
  budget: string;
  timeline: string;
  preferredDate: string;
  preferredTime: string;
  contactName: string;
  email: string;
  phone?: string;
  status: string;
};

const statusColors: Record<string, string> = {
  NEW: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CONTACTED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  IN_PROGRESS: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  COMPLETED: "bg-green-500/10 text-green-400 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

const serviceLabels: Record<string, string> = {
  web: "Web Development",
  mobile: "Mobile App",
  automation: "Automation",
  seo: "SEO",
  maintenance: "Maintenance",
  branding: "Branding",
};

export default function InquiriesPage() {
  const inquiries = useQuery(api.inquiries.list, {}) as Inquiry[] | undefined;
  const updateStatus = useMutation(api.inquiries.updateStatus);
  const removeInquiry = useMutation(api.inquiries.remove);

  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleUpdateStatus = async (id: Id<"projectInquiries">, status: string) => {
    try {
      await updateStatus({
        id,
        status: status as
          | "NEW"
          | "CONTACTED"
          | "IN_PROGRESS"
          | "COMPLETED"
          | "CANCELLED",
      });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id: Id<"projectInquiries">) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await removeInquiry({ id });
      toast.success("Deleted");
      if (selectedInquiry?._id === id) setSelectedInquiry(null);
    } catch {
      toast.error("Failed to delete");
    }
  };

  const filtered = (inquiries ?? []).filter((i) => {
    const matchesSearch =
      i.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? i.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Project Inquiries</h1>
        <p className="text-zinc-400 mt-1">Manage project requests from clients</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        {inquiries === undefined ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-zinc-500">No inquiries found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="text-left px-6 py-4 text-zinc-400 font-medium">Business</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-medium">Contact</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-medium">Status</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-medium">Date</th>
                  <th className="text-right px-6 py-4 text-zinc-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filtered.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-zinc-800/30">
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{inquiry.businessName}</p>
                      <p className="text-zinc-500 text-sm">{inquiry.industry}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white">{inquiry.contactName}</p>
                      <p className="text-zinc-500 text-sm">{inquiry.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleUpdateStatus(inquiry._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs border cursor-pointer ${statusColors[inquiry.status]}`}
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-sm">
                      {format(new Date(inquiry._creationTime), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry._id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{selectedInquiry.businessName}</h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800/50">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-zinc-400 text-sm">Business</p>
                    <p className="text-white">{selectedInquiry.businessName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800/50">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-zinc-400 text-sm">Email</p>
                    <p className="text-white">{selectedInquiry.email}</p>
                  </div>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800/50">
                    <Phone className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-zinc-400 text-sm">Phone</p>
                      <p className="text-white">{selectedInquiry.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800/50">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-zinc-400 text-sm">Scheduled</p>
                    <p className="text-white">
                      {selectedInquiry.preferredDate} at {selectedInquiry.preferredTime}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedInquiry.selectedServices.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm"
                    >
                      {serviceLabels[s] || s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Description</h3>
                <p className="text-zinc-400">{selectedInquiry.businessDescription}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Goals</h3>
                <p className="text-zinc-400">{selectedInquiry.projectGoals}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Budget</h3>
                  <p className="text-zinc-400">{selectedInquiry.budget}</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Timeline</h3>
                  <p className="text-zinc-400">{selectedInquiry.timeline}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
