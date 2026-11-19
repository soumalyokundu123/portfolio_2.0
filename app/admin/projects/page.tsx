"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Eye, Star, Search, Check, X, AlertCircle } from "lucide-react";
import type { Project, ProjectCategory } from "@/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    tagline: "",
    overview: "",
    creativeProcess: "",
    challenges: "",
    solutions: "",
    credits: "",
    year: "2026",
    client: "",
    duration: "",
    thumbnail: "",
    videoPreview: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    published: true,
    categoryId: "",
    technologies: "",
  });

  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects?all=true");
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/projects/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      tagline: "",
      overview: "",
      creativeProcess: "",
      challenges: "",
      solutions: "",
      credits: "",
      year: "2026",
      client: "",
      duration: "",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      videoPreview: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
      published: true,
      categoryId: categories[0]?.id || "",
      technologies: "Three.js, React, WebGL, GLSL",
    });
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      tagline: p.tagline,
      overview: p.overview,
      creativeProcess: p.creativeProcess || "",
      challenges: p.challenges || "",
      solutions: p.solutions || "",
      credits: p.credits || "",
      year: p.year,
      client: p.client || "",
      duration: p.duration || "",
      thumbnail: p.thumbnail,
      videoPreview: p.videoPreview || "",
      liveUrl: p.liveUrl || "",
      githubUrl: p.githubUrl || "",
      featured: p.featured,
      published: p.published,
      categoryId: p.categoryId,
      technologies: p.technologies,
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingProject ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save project");
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      setFormError(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchProjects();
      } else {
        alert(data.error || "Failed to delete project");
      }
    } catch (err) {
      alert("Error deleting project");
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Projects Portfolio Management
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Create, update, reorder and publish your 3D animations and full-stack creations.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.5)] transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title or tech..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <span className="text-xs font-mono text-zinc-400">
          Showing {filteredProjects.length} of {projects.length} projects
        </span>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl bg-[#0c0f17] border border-white/[0.08] overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-xs text-zinc-500">Loading portfolio projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-xs text-zinc-500">No projects found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-zinc-500 font-mono uppercase tracking-wider border-b border-white/[0.06] bg-white/[0.01]">
                  <th className="py-3 px-6">Project</th>
                  <th className="py-3 px-6">Category</th>
                  <th className="py-3 px-6">Year</th>
                  <th className="py-3 px-6">Featured</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-900 border border-white/[0.1] shrink-0">
                          <Image src={p.thumbnail} alt={p.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{p.title}</p>
                          <p className="text-[11px] text-zinc-400 font-mono truncate max-w-xs">{p.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-zinc-300 font-mono">
                      {p.category?.name || "Software System"}
                    </td>
                    <td className="py-4 px-6 text-zinc-400 font-mono">{p.year}</td>
                    <td className="py-4 px-6">
                      {p.featured ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                          <Star className="w-3 h-3 fill-cyan-400" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-zinc-500 text-[11px] font-mono">&mdash;</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono ${
                          p.published
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-cyan-300 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-950/60 text-red-400 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-3xl bg-[#0d1017] border border-white/[0.1] p-6 sm:p-8 shadow-2xl my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <h2 className="font-display font-bold text-xl text-white">
                {editingProject ? "Edit Project" : "Create New Project"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg bg-white/[0.04] text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center space-x-2 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Unique Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Short Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="One sentence punchline"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Category *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e121c] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Client / Studio
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Technologies (comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="Three.js, Blender, GLSL, React, WebGL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Thumbnail Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Video Preview URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.videoPreview}
                    onChange={(e) => setFormData({ ...formData, videoPreview: e.target.value })}
                    placeholder="https://...mp4"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Live Demo URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    GitHub Repo URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Detailed Overview *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Challenges Faced
                  </label>
                  <textarea
                    rows={2}
                    value={formData.challenges}
                    onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Solutions Implemented
                  </label>
                  <textarea
                    rows={2}
                    value={formData.solutions}
                    onChange={(e) => setFormData({ ...formData, solutions: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded bg-white/[0.05] border-white/[0.1] text-cyan-400 focus:ring-0"
                  />
                  <span className="text-zinc-300">Feature on Home</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded bg-white/[0.05] border-white/[0.1] text-emerald-400 focus:ring-0"
                  />
                  <span className="text-zinc-300">Published (Visible to public)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.4)] disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
