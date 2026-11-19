"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, BookOpen, Clock, Calendar, AlertCircle, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost, BlogCategory } from "@/types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    published: true,
    author: "Soumalyo Kundu",
    readingTime: "5 min read",
    tags: "Three.js, WebGL, Next.js",
    seoTitle: "",
    seoDescription: "",
    categoryId: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog?all=true");
      const data = await res.json();
      if (data.success) {
        setPosts(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load blog posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/blog/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load blog categories:", err);
    }
  };

  const openCreateModal = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      published: true,
      author: "Soumalyo Kundu",
      readingTime: "5 min read",
      tags: "Three.js, WebGL, Next.js",
      seoTitle: "",
      seoDescription: "",
      categoryId: categories[0]?.id || "",
    });
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (p: BlogPost) => {
    setEditingPost(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage,
      published: p.published,
      author: p.author,
      readingTime: p.readingTime,
      tags: p.tags,
      seoTitle: p.seoTitle || "",
      seoDescription: p.seoDescription || "",
      categoryId: p.categoryId,
    });
    setError("");
    setModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingPost ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : "/api/blog";
      const method = editingPost ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save blog post");
      }

      setModalOpen(false);
      fetchPosts();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete blog article "${title}"?`)) return;

    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchPosts();
      } else {
        alert(data.error || "Failed to delete post");
      }
    } catch (err) {
      alert("Error deleting post");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Technical Blog & Articles
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Author and publish technical essays on Java Spring Boot, REST APIs, and full-stack system design.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.5)] transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Post</span>
        </button>
      </div>

      {/* Posts Table */}
      <div className="rounded-3xl bg-[#0c0f17] border border-white/[0.08] overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-xs text-zinc-500">Loading articles...</div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-xs text-zinc-500">No blog posts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-zinc-500 font-mono uppercase tracking-wider border-b border-white/[0.06] bg-white/[0.01]">
                  <th className="py-3 px-6">Post Title</th>
                  <th className="py-3 px-6">Category</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-900 border border-white/[0.1] shrink-0">
                          <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{p.title}</p>
                          <p className="text-[11px] text-zinc-500 font-mono">{p.readingTime}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-zinc-300 font-mono">
                      {p.category?.name || "Graphics"}
                    </td>
                    <td className="py-4 px-6 text-zinc-400 font-mono">{formatDate(p.createdAt)}</td>
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
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-950/60 text-red-400 transition-colors"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-3xl bg-[#0d1017] border border-white/[0.1] p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-5">
              <h3 className="font-display font-bold text-lg text-white">
                {editingPost ? "Edit Article" : "Write Article"}
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
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={formData.readingTime}
                    onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Short Excerpt *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  Content (Markdown / Text) *
                </label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 font-mono resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                    SEO Meta Description
                  </label>
                  <input
                    type="text"
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="rounded bg-white/[0.05] border-white/[0.1] text-emerald-400 focus:ring-0"
                />
                <span className="text-zinc-300">Published (Visible on site)</span>
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
                  {submitting ? "Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
