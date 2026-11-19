"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Star, Check, X, AlertCircle } from "lucide-react";
import type { Testimonial } from "@/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    designation: "",
    company: "",
    avatarUrl: "",
    content: "",
    rating: 5,
    published: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials?all=true");
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      clientName: "",
      designation: "",
      company: "",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      content: "",
      rating: 5,
      published: true,
    });
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setEditingItem(t);
    setFormData({
      clientName: t.clientName,
      designation: t.designation,
      company: t.company,
      avatarUrl: t.avatarUrl || "",
      content: t.content,
      rating: t.rating,
      published: t.published,
    });
    setError("");
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const url = editingItem ? `/api/testimonials/${editingItem.id}` : "/api/testimonials";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save testimonial");
      }

      setModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchTestimonials();
      } else {
        alert(data.error || "Failed to delete testimonial");
      }
    } catch (err) {
      alert("Error deleting testimonial");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Client Testimonials & Endorsements
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Publish and manage reviews and feedback from creative directors and engineering leads.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.5)] transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-zinc-500">Loading testimonials...</div>
      ) : testimonials.length === 0 ? (
        <div className="py-20 text-center text-xs text-zinc-500">No testimonials found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-[#0c0f17] border border-white/[0.08] hover:border-cyan-500/30 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800">
                      <Image
                        src={t.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                        alt={t.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{t.clientName}</h3>
                      <p className="text-[11px] text-cyan-400 font-mono">
                        {t.designation} &bull; {t.company}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      t.published
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {t.published ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>

                <p className="text-zinc-300 text-xs italic leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-white/[0.06] mt-4">
                <button
                  onClick={() => openEditModal(t)}
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-cyan-300"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.clientName)}
                  className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-950/60 text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0d1017] border border-white/[0.1] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-5">
              <h3 className="font-display font-bold text-lg text-white">
                {editingItem ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Client / Lead Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Endorsement Content *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex items-center space-x-6 pt-1">
                <div className="flex items-center space-x-2">
                  <label className="font-mono text-zinc-400 uppercase">Rating:</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="px-2 py-1 rounded bg-[#0e121c] border border-white/[0.1] text-white"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded bg-white/[0.05] border-white/[0.1] text-emerald-400 focus:ring-0"
                  />
                  <span className="text-zinc-300">Published</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950"
                >
                  {submitting ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
