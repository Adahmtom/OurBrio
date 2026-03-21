"use client";

import { motion } from "framer-motion";
import { Edit, Eye, EyeOff, Plus, Save, Star, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
  text: string;
  rating: number;
  published: boolean;
  featured: boolean;
}

const emptyTestimonial: Partial<Testimonial> = {
  name: "", role: "", company: "", image: "", text: "", rating: 5, published: false, featured: false
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch { toast.error("Failed to load"); }
    finally { setLoading(false); }
  };

  const saveTestimonial = async () => {
    if (!editing) return;
    try {
      const method = isNew ? "POST" : "PATCH";
      const url = isNew ? "/api/testimonials" : `/api/testimonials/${editing.id}`;
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      toast.success(isNew ? "Created!" : "Updated!");
      setEditing(null);
      fetchTestimonials();
    } catch { toast.error("Failed to save"); }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      toast.success("Deleted!");
      fetchTestimonials();
    } catch { toast.error("Failed to delete"); }
  };

  const togglePublished = async (t: Testimonial) => {
    try {
      await fetch(`/api/testimonials/${t.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !t.published })
      });
      fetchTestimonials();
    } catch { toast.error("Failed"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Testimonials</h1>
          <p className="text-zinc-400 mt-1">Manage client testimonials</p>
        </div>
        <button onClick={() => { setEditing(emptyTestimonial); setIsNew(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400">
          <Plus size={20} /> Add New
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full text-center py-16 text-zinc-500">No testimonials yet</div>
        ) : (
          testimonials.map((t) => (
            <div key={t.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {t.image ? (
                    <Image src={t.image} alt={t.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-medium">{t.name[0]}</div>
                  )}
                  <div>
                    <p className="font-medium text-white">{t.name}</p>
                    <p className="text-zinc-500 text-sm">{t.role}{t.company && `, ${t.company}`}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {t.featured && <span className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-400"><Star size={14} /></span>}
                  <span className={`p-1.5 rounded-lg ${t.published ? "bg-green-500/20 text-green-400" : "bg-zinc-500/20 text-zinc-400"}`}>
                    {t.published ? <Eye size={14} /> : <EyeOff size={14} />}
                  </span>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} size={14} className={star <= t.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-700"} />
                ))}
              </div>
              <p className="text-zinc-400 text-sm line-clamp-3">{t.text}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
                <button onClick={() => togglePublished(t)} className="text-zinc-400 hover:text-white text-sm">
                  {t.published ? "Unpublish" : "Publish"}
                </button>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(t); setIsNew(false); }} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"><Edit size={16} /></button>
                  <button onClick={() => deleteTestimonial(t.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg">
            <div className="border-b border-zinc-800 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{isNew ? "New Testimonial" : "Edit Testimonial"}</h2>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Name</label>
                  <input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Role</label>
                  <input value={editing.role || ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Company</label>
                  <input value={editing.company || ""} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">Rating</label>
                  <select value={editing.rating || 5} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) })} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none">
                    {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} Star{r > 1 && "s"}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Image URL</label>
                <input value={editing.image || ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Testimonial Text</label>
                <textarea value={editing.text || ""} onChange={(e) => setEditing({ ...editing, text: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50 resize-none" />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.published || false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-emerald-500" />
                  <span className="text-white">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.featured || false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-emerald-500" />
                  <span className="text-white">Featured</span>
                </label>
              </div>
              <button onClick={saveTestimonial} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400">
                <Save size={20} /> Save Testimonial
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
