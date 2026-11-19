"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Briefcase, Calendar, MapPin, X, AlertCircle } from "lucide-react";
import type { Experience } from "@/types";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "Kolkata, India",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    achievements: "",
    technologies: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      if (data.success) {
        setExperiences(data.experiences || []);
      }
    } catch (err) {
      console.error("Failed to load experience:", err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingExp(null);
    setFormData({
      company: "",
      position: "",
      location: "Kolkata, India",
      startDate: "2026",
      endDate: "Present",
      isCurrent: true,
      description: "",
      achievements: "",
      technologies: "Java, Spring Boot, PostgreSQL, Three.js",
    });
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExp(exp);
    let achString = exp.achievements || "";
    try {
      const parsed = JSON.parse(achString);
      if (Array.isArray(parsed)) achString = parsed.join("\n");
    } catch {}

    setFormData({
      company: exp.company,
      position: exp.position,
      location: exp.location || "",
      startDate: exp.startDate,
      endDate: exp.endDate || "",
      isCurrent: exp.isCurrent,
      description: exp.description,
      achievements: achString,
      technologies: exp.technologies || "",
    });
    setError("");
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Format achievements as JSON string array if multi-line
      const achArray = formData.achievements
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      const payload = {
        ...formData,
        achievements: JSON.stringify(achArray),
      };

      const url = editingExp ? `/api/experience/${editingExp.id}` : "/api/experience";
      const method = editingExp ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save experience");
      }

      setModalOpen(false);
      fetchExperience();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, company: string) => {
    if (!confirm(`Delete experience record for "${company}"?`)) return;

    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchExperience();
      } else {
        alert(data.error || "Failed to delete experience");
      }
    } catch (err) {
      alert("Error deleting experience");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Work Experience Timeline
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Manage your professional engineering internships, positions, and company milestones.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.5)] transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="py-20 text-center text-xs text-zinc-500">Loading experience history...</div>
      ) : experiences.length === 0 ? (
        <div className="py-20 text-center text-xs text-zinc-500">No experience records found.</div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-3xl bg-[#0c0f17] border border-white/[0.08] hover:border-cyan-500/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-display font-bold text-lg text-white">{exp.position}</h3>
                  {exp.isCurrent && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-emerald-400">{exp.company}</p>
                <div className="flex items-center space-x-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>
                    {exp.startDate} &mdash; {exp.endDate || "Present"}
                  </span>
                  {exp.location && <span>&bull; {exp.location}</span>}
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => openEditModal(exp)}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-cyan-300 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id, exp.company)}
                  className="p-2 rounded-xl bg-red-950/30 hover:bg-red-950/60 text-red-400 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0d1017] border border-white/[0.1] p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-5">
              <h3 className="font-display font-bold text-lg text-white">
                {editingExp ? "Edit Experience" : "Add Experience"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Position / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Start Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    placeholder="e.g. July 2026"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="e.g. Present or August 2026"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="ASP.NET Core, C#, Entity Framework, PostgreSQL"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Key Achievements (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  placeholder="• Developed backend modules&#10;• Integrated JWT role security"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <label className="flex items-center space-x-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
                  className="rounded bg-white/[0.05] border-white/[0.1] text-cyan-400 focus:ring-0"
                />
                <span className="text-zinc-300">Currently Working Here</span>
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
                  {submitting ? "Saving..." : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
