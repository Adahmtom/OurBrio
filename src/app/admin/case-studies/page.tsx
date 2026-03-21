"use client";

import { motion } from "framer-motion";
import { Edit, Eye, EyeOff, Plus, Save, Star, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  challenge?: string;
  solution?: string;
  results: string[];
  image: string;
  tags: string[];
  client?: string;
  published: boolean;
  featured: boolean;
}

const emptyStudy: Partial<CaseStudy> = {
  title: "", slug: "", category: "", description: "", challenge: "", solution: "",
  results: [], image: "", tags: [], client: "", published: false, featured: false
};

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<CaseStudy> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => { fetchStudies(); }, []);

  const fetchStudies = async () => {
    try {
      const res = await fetch("/api/case-studies");
      const data = await res.json();
      setStudies(Array.isArray(data) ? data : []);
    } catch { toast.error("Failed to load"); }
    finally { setLoading(false); }
  };

  const saveStudy = async () => {
    if (!editing) return;
    try {
      const method = isNew ? "POST" : "PATCH";
      const url = isNew ? "/api/case-studies" : `/api/case-studies/${editing.id}`;
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      toast.success(isNew ? "Created!" : "Updated!");
      setEditing(null);
      fetchStudies();
    } catch { toast.error("Failed to save"); }
  };

  const deleteStudy = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    try {
      await fetch(`/api/case-studies/${id}`, { method: "DELETE" });
      toast.success("Deleted!");
      fetchStudies();
    } catch { toast.error("Failed to delete"); }
  };

  const togglePublished = async (study: CaseStudy) => {
    try {
      await fetch(`/api/case-studies/${study.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !study.published })
      });
      fetchStudies();
    } catch { toast.error("Failed"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Case Studies</h1>
          <p className="text-zinc-400 mt-1">Manage your portfolio</p>
        </div>
        <button onClick={() => { setEditing(emptyStudy); setIsNew(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400">
          <Plus size={20} /> Add New
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : studies.length === 0 ? (
          <div className="col-span-full text-center py-16 text-zinc-500">No case studies yet</div>
        ) : (
          studies.map((study) => (
            <div key={study.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden group">
              <div className="relative h-48">
                <Image src={study.image} alt={study.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-3 right-3 flex gap-2">
                  {study.featured && <span className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-400"><Star size={14} /></span>}
                  <span className={`p-1.5 rounded-lg ${study.published ? "bg-green-500/20 text-green-400" : "bg-zinc-500/20 text-zinc-400"}`}>
                    {study.published ? <Eye size={14} /> : <EyeOff size={14} />}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs">{study.category}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2">{study.title}</h3>
                <p className="text-zinc-400 text-sm line-clamp-2">{study.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
                  <button onClick={() => togglePublished(study)} className="text-zinc-400 hover:text-white text-sm">
                    {study.published ? "Unpublish" : "Publish"}
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditing(study); setIsNew(false); }} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"><Edit size={16} /></button>
                    <button onClick={() => deleteStudy(study.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{isNew ? "New Case Study" : "Edit Case Study"}</h2>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Title</label>
                  <input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Slug</label>
                  <input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Category</label>
                  <input value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Client</label>
                  <input value={editing.client || ""} onChange={(e) => setEditing({ ...editing, client: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Image URL</label>
                <input value={editing.image || ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50" />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Description</label>
                <textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50 resize-none" />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Results (comma separated)</label>
                <input value={editing.results?.join(", ") || ""} onChange={(e) => setEditing({ ...editing, results: e.target.value.split(",").map(s => s.trim()) })} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50" placeholder="+150% Conversions, 2x Revenue" />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.published || false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500" />
                  <span className="text-white">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.featured || false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500" />
                  <span className="text-white">Featured</span>
                </label>
              </div>
              <button onClick={saveStudy} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400">
                <Save size={20} /> Save Case Study
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
