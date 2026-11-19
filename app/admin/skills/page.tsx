"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Cpu, Star, AlertCircle, X } from "lucide-react";
import type { Skill, SkillCategory } from "@/types";

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    proficiency: 90,
    featured: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
        setSkills(data.skills || []);
      }
    } catch (err) {
      console.error("Failed to load skills:", err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({
      name: "",
      categoryId: categories[0]?.id || "",
      proficiency: 90,
      featured: true,
    });
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      categoryId: skill.categoryId,
      proficiency: skill.proficiency,
      featured: skill.featured,
    });
    setError("");
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const url = editingSkill ? `/api/skills/${editingSkill.id}` : "/api/skills";
      const method = editingSkill ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save skill");
      }

      setModalOpen(false);
      fetchSkills();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete skill "${name}"?`)) return;

    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchSkills();
      } else {
        alert(data.error || "Failed to delete skill");
      }
    } catch (err) {
      alert("Error deleting skill");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Technical Skills Arsenal
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Manage programming languages, backend frameworks, databases, and core computer science competencies.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.5)] transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills by Category */}
      {loading ? (
        <div className="py-20 text-center text-xs text-zinc-500">Loading skills...</div>
      ) : (
        <div className="space-y-8">
          {categories.map((cat) => (
            <div key={cat.id} className="rounded-3xl bg-[#0c0f17] border border-white/[0.08] p-6 shadow-xl">
              <h2 className="font-display font-bold text-lg text-white mb-4 pb-3 border-b border-white/[0.06] flex items-center justify-between">
                <span>{cat.name}</span>
                <span className="text-xs font-mono text-zinc-500">
                  {cat.skills?.length || 0} skills
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.skills?.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between group hover:border-cyan-500/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-white text-xs">{skill.name}</span>
                        {skill.featured && (
                          <Star className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500 mt-1">
                        Proficiency: <span className="text-cyan-400 font-semibold">{skill.proficiency}%</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => openEditModal(skill)}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-cyan-300"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id, skill.name)}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-950/60 text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
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
                {editingSkill ? "Edit Skill" : "Add New Skill"}
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
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Unreal Engine 5 or WebGPU"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Category *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0e121c] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Proficiency ({formData.proficiency}%)
                  </label>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <label className="flex items-center space-x-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded bg-white/[0.05] border-white/[0.1] text-cyan-400 focus:ring-0"
                />
                <span className="text-zinc-300">Feature in main skill cards</span>
              </label>

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
                  {submitting ? "Saving..." : "Save Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
