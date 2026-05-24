"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type Contact = {
  _id: Id<"contactSubmissions">;
  _creationTime: number;
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  status: string;
};

const statusColors: Record<string, string> = {
  NEW: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  READ: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  REPLIED: "bg-green-500/10 text-green-400 border-green-500/20",
  ARCHIVED: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

export default function ContactsPage() {
  const contacts = useQuery(api.contacts.list, {}) as Contact[] | undefined;
  const updateStatus = useMutation(api.contacts.updateStatus);

  const [selected, setSelected] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = async (contact: Contact) => {
    setSelected(contact);
    if (contact.status === "NEW") {
      try {
        await updateStatus({ id: contact._id, status: "READ" });
      } catch {
        // silent
      }
    }
  };

  const filtered = (contacts ?? []).filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
        <p className="text-zinc-400 mt-1">Messages from the contact form</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
        />
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        {contacts === undefined ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-zinc-500">No messages found</div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {filtered.map((contact) => (
              <div
                key={contact._id}
                onClick={() => handleSelect(contact)}
                className="p-6 hover:bg-zinc-800/30 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-white">{contact.name}</p>
                    <p className="text-zinc-500 text-sm">{contact.email}</p>
                    <p className="text-zinc-400 mt-2 line-clamp-2">{contact.message}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs border ${statusColors[contact.status]}`}
                    >
                      {contact.status}
                    </span>
                    <span className="text-zinc-500 text-sm">
                      {format(new Date(contact._creationTime), "MMM d")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl"
          >
            <div className="border-b border-zinc-800 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Message from {selected.name}</h2>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400 text-sm">Email</p>
                  <p className="text-white">{selected.email}</p>
                </div>
                {selected.company && (
                  <div>
                    <p className="text-zinc-400 text-sm">Company</p>
                    <p className="text-white">{selected.company}</p>
                  </div>
                )}
                {selected.service && (
                  <div>
                    <p className="text-zinc-400 text-sm">Service</p>
                    <p className="text-white">{selected.service}</p>
                  </div>
                )}
                {selected.budget && (
                  <div>
                    <p className="text-zinc-400 text-sm">Budget</p>
                    <p className="text-white">{selected.budget}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-zinc-400 text-sm mb-2">Message</p>
                <p className="text-white bg-zinc-800/50 p-4 rounded-xl">{selected.message}</p>
              </div>
              <a
                href={`mailto:${selected.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400"
              >
                Reply via Email
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
