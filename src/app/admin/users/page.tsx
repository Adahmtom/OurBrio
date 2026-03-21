"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Trash2,
  Shield,
  User,
  Mail,
  Eye,
  EyeOff,
  X,
  Crown,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface TeamMember {
  id: string;
  name: string | null;
  email: string | null;
  role: "ADMIN" | "USER";
  createdAt: string;
  image?: string | null;
}

const roleConfig = {
  ADMIN: {
    label: "Admin",
    icon: Crown,
    className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  },
  USER: {
    label: "Member",
    icon: User,
    className: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
  },
};

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN" as "ADMIN" | "USER",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch {
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to create user");
        return;
      }
      toast.success(`${form.name} added to the team!`);
      setShowModal(false);
      setForm({ name: "", email: "", password: "", role: "ADMIN" });
      fetchUsers();
    } catch {
      toast.error("Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = async (id: string, role: "ADMIN" | "USER") => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error();
      toast.success("Role updated");
      fetchUsers();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id: string, name: string | null) => {
    if (!confirm(`Remove ${name || "this user"} from the team?`)) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to remove user");
        return;
      }
      toast.success("User removed");
      fetchUsers();
    } catch {
      toast.error("Failed to remove user");
    }
  };

  const getInitials = (name: string | null, email: string | null) => {
    if (name) return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    if (email) return email[0].toUpperCase();
    return "?";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Members</h1>
          <p className="text-zinc-400 mt-1">Manage co-founders and team access to the dashboard</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all"
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Users size={18} className="text-emerald-400" />
            </div>
            <span className="text-zinc-400 text-sm">Total Members</span>
          </div>
          <p className="text-3xl font-bold text-white">{users.length}</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Crown size={18} className="text-yellow-400" />
            </div>
            <span className="text-zinc-400 text-sm">Admins</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {users.filter((u) => u.role === "ADMIN").length}
          </p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <User size={18} className="text-blue-400" />
            </div>
            <span className="text-zinc-400 text-sm">Members</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {users.filter((u) => u.role === "USER").length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20">
            <Users size={40} className="text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-500">No team members yet</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm hover:bg-emerald-500/20 transition"
            >
              Add your first member
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr>
                  <th className="text-left px-6 py-4 text-zinc-400 font-medium">Member</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-medium">Role</th>
                  <th className="text-left px-6 py-4 text-zinc-400 font-medium">Joined</th>
                  <th className="text-right px-6 py-4 text-zinc-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {users.map((user) => {
                  const isYou = session?.user?.id === user.id;
                  const RoleIcon = roleConfig[user.role].icon;
                  return (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-zinc-800/30"
                    >
                      {/* Member Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-black font-bold text-sm">
                              {getInitials(user.name, user.email)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-white">{user.name || "Unnamed"}</p>
                              {isYou && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-zinc-500 text-sm">
                              <Mail size={12} />
                              <span>{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        {isYou ? (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${roleConfig[user.role].className}`}>
                            <RoleIcon size={12} />
                            {roleConfig[user.role].label}
                          </span>
                        ) : (
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user.id, e.target.value as "ADMIN" | "USER")
                            }
                            className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                          >
                            <option value="ADMIN">Admin</option>
                            <option value="USER">Member</option>
                          </select>
                        )}
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                          <Calendar size={14} />
                          {format(new Date(user.createdAt), "MMM d, yyyy")}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          {!isYou && (
                            <button
                              onClick={() => handleDelete(user.id, user.name)}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-all"
                              title="Remove member"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role Info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Crown size={16} className="text-yellow-400" />
            <h3 className="text-white font-semibold">Admin Access</h3>
          </div>
          <ul className="space-y-1.5 text-zinc-400 text-sm">
            <li className="flex items-center gap-2"><Shield size={12} className="text-emerald-400" /> Full dashboard access</li>
            <li className="flex items-center gap-2"><Shield size={12} className="text-emerald-400" /> Manage project inquiries</li>
            <li className="flex items-center gap-2"><Shield size={12} className="text-emerald-400" /> Edit case studies & testimonials</li>
            <li className="flex items-center gap-2"><Shield size={12} className="text-emerald-400" /> Add & remove team members</li>
            <li className="flex items-center gap-2"><Shield size={12} className="text-emerald-400" /> Manage calendar availability</li>
          </ul>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <User size={16} className="text-blue-400" />
            <h3 className="text-white font-semibold">Member Access</h3>
          </div>
          <ul className="space-y-1.5 text-zinc-400 text-sm">
            <li className="flex items-center gap-2"><Shield size={12} className="text-emerald-400" /> View project inquiries</li>
            <li className="flex items-center gap-2"><Shield size={12} className="text-emerald-400" /> View contact messages</li>
            <li className="flex items-center gap-2"><Shield size={12} className="text-emerald-400" /> View case studies</li>
            <li className="flex items-center gap-2"><X size={12} className="text-red-400" /> Cannot manage team members</li>
            <li className="flex items-center gap-2"><X size={12} className="text-red-400" /> Cannot delete records</li>
          </ul>
        </div>
      </div>

      {/* Create User Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Add Team Member</h2>
                  <p className="text-zinc-400 text-sm mt-0.5">Create a dashboard account for your co-founder</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleCreate} className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Jane Smith"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@ourbrio.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-zinc-500 text-xs mt-1">Share this with your co-founder — they can use it to log in at ourbrio.com/admin</p>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Role
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, role: "ADMIN" })}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                        form.role === "ADMIN"
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                          : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:border-zinc-600"
                      }`}
                    >
                      <Crown size={16} />
                      <span className="font-medium">Admin</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, role: "USER" })}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                        form.role === "USER"
                          ? "bg-blue-500/10 border-blue-500/40 text-blue-400"
                          : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:border-zinc-600"
                      }`}
                    >
                      <User size={16} />
                      <span className="font-medium">Member</span>
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Plus size={16} />
                        Create Account
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
