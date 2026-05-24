"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Trash2,
  Shield,
  User,
  Mail,
  X,
  Crown,
  Calendar,
  UserPlus,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type TeamMember = {
  _id: Id<"users">;
  _creationTime: number;
  name?: string;
  email?: string;
  role?: "ADMIN" | "USER";
};

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
  const users = useQuery(api.users.list) as TeamMember[] | undefined;
  const currentUser = useQuery(api.users.getCurrentUser);
  const updateRole = useMutation(api.users.updateRole);
  const removeUser = useMutation(api.users.remove);
  const createUser = useAction(api.users.createUser);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleRoleChange = async (id: Id<"users">, role: "ADMIN" | "USER") => {
    try {
      await updateRole({ id, role });
      toast.success("Role updated");
    } catch {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id: Id<"users">, name?: string) => {
    if (!confirm(`Revoke access for ${name || "this user"}? This will immediately end all their active sessions.`)) return;
    try {
      await removeUser({ id });
      toast.success("Access revoked and user removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to remove user");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await createUser({
        email: newEmail,
        password: newPassword,
        name: newName || undefined,
      });
      toast.success(`Account created for ${newEmail}`);
      setShowAddModal(false);
      setNewEmail("");
      setNewPassword("");
      setNewName("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsCreating(false);
    }
  };

  const getInitials = (name?: string, email?: string) => {
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
          <p className="text-zinc-400 mt-1">
            Manage co-founders and team access to the dashboard
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-colors"
        >
          <UserPlus size={18} />
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
          <p className="text-3xl font-bold text-white">{users?.length ?? 0}</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Crown size={18} className="text-yellow-400" />
            </div>
            <span className="text-zinc-400 text-sm">Admins</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {users?.filter((u) => u.role === "ADMIN").length ?? 0}
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
            {users?.filter((u) => u.role === "USER").length ?? 0}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        {users === undefined ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20">
            <Users size={40} className="text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-500">No team members yet</p>
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
                  const isYou = currentUser?._id === user._id;
                  const role = user.role ?? "ADMIN";
                  const RoleIcon = roleConfig[role].icon;
                  return (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-zinc-800/30"
                    >
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

                      <td className="px-6 py-4">
                        {isYou ? (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${roleConfig[role].className}`}
                          >
                            <RoleIcon size={12} />
                            {roleConfig[role].label}
                          </span>
                        ) : (
                          <select
                            value={role}
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value as "ADMIN" | "USER")
                            }
                            className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                          >
                            <option value="ADMIN">Admin</option>
                            <option value="USER">Member</option>
                          </select>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                          <Calendar size={14} />
                          {format(new Date(user._creationTime), "MMM d, yyyy")}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          {!isYou && (
                            <button
                              onClick={() => handleDelete(user._id, user.name)}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-all"
                              title="Revoke access"
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

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Add Team Member</h2>
                  <p className="text-zinc-400 text-sm mt-1">
                    Create credentials and share them securely.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Full Name (optional)</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    placeholder="Jane Smith"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Temporary Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-zinc-500 text-xs mt-1.5">
                    Share these credentials securely. The user can change their password after signing in.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
