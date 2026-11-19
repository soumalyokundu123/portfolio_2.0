"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import type { Profile, SiteSettings, SocialLink } from "@/types";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState<Partial<Profile>>({
    fullName: "",
    title: "",
    tagline: "",
    bio: "",
    aboutDescription: "",
    avatarUrl: "",
    resumeUrl: "",
    showreelUrl: "",
    showreelPoster: "",
    yearsExperience: 3,
    projectsCompleted: 28,
    technologiesCount: 22,
    clientsCount: 16,
    email: "",
    phone: "",
    location: "",
  });

  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    siteName: "",
    siteTitle: "",
    siteDescription: "",
    keywords: "",
    primaryColor: "#00f2fe",
    accentColor: "#00ff87",
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.success && data.data) {
        if (data.data.profile) setProfile(data.data.profile);
        if (data.data.settings) setSettings(data.data.settings);
        if (data.data.socialLinks) setSocialLinks(data.data.socialLinks);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          settings,
          socialLinks,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update settings");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "An error occurred while saving settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSocialChange = (index: number, url: string) => {
    const updated = [...socialLinks];
    updated[index].url = url;
    setSocialLinks(updated);
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-zinc-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Website Configuration & Profile
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Global studio profile, bio narrative, showreel assets, SEO parameters, and social handles.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.5)] transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save All Changes"}</span>
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center space-x-3 text-emerald-300 text-xs">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Settings and Profile updated successfully! Changes are immediately live on the frontend.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center space-x-3 text-red-300 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        {/* Profile Card */}
        <div className="rounded-3xl bg-[#0c0f17] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
          <h2 className="font-display font-bold text-lg text-white pb-3 border-b border-white/[0.06]">
            Developer Profile Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={profile.fullName || ""}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Professional Title *
              </label>
              <input
                type="text"
                required
                value={profile.title || ""}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-zinc-400 uppercase tracking-wider block">
              Hero Headline Tagline *
            </label>
            <input
              type="text"
              required
              value={profile.tagline || ""}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-zinc-400 uppercase tracking-wider block">
              Short Bio (Hero section) *
            </label>
            <textarea
              rows={2}
              required
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-zinc-400 uppercase tracking-wider block">
              About Description Narrative *
            </label>
            <textarea
              rows={4}
              required
              value={profile.aboutDescription || ""}
              onChange={(e) => setProfile({ ...profile, aboutDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Avatar Image URL
              </label>
              <input
                type="url"
                value={profile.avatarUrl || ""}
                onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Resume PDF URL / Path
              </label>
              <input
                type="text"
                value={profile.resumeUrl || ""}
                onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Stats Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06]">
            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Years Exp.
              </label>
              <input
                type="number"
                value={profile.yearsExperience || 0}
                onChange={(e) => setProfile({ ...profile, yearsExperience: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Projects Count
              </label>
              <input
                type="number"
                value={profile.projectsCompleted || 0}
                onChange={(e) => setProfile({ ...profile, projectsCompleted: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Tech Mastered
              </label>
              <input
                type="number"
                value={profile.technologiesCount || 0}
                onChange={(e) => setProfile({ ...profile, technologiesCount: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Clients Count
              </label>
              <input
                type="number"
                value={profile.clientsCount || 0}
                onChange={(e) => setProfile({ ...profile, clientsCount: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white"
              />
            </div>
          </div>
        </div>

        {/* Media Assets (Showreel) */}
        <div className="rounded-3xl bg-[#0c0f17] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
          <h2 className="font-display font-bold text-lg text-white pb-3 border-b border-white/[0.06]">
            Showreel Media Assets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Showreel Video URL (MP4 / WebM)
              </label>
              <input
                type="url"
                value={profile.showreelUrl || ""}
                onChange={(e) => setProfile({ ...profile, showreelUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Showreel Poster Image URL
              </label>
              <input
                type="url"
                value={profile.showreelPoster || ""}
                onChange={(e) => setProfile({ ...profile, showreelPoster: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="rounded-3xl bg-[#0c0f17] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
          <h2 className="font-display font-bold text-lg text-white pb-3 border-b border-white/[0.06]">
            Social & Portfolio Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map((sl, idx) => (
              <div key={sl.id} className="space-y-1.5">
                <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                  {sl.platform} URL
                </label>
                <input
                  type="url"
                  value={sl.url}
                  onChange={(e) => handleSocialChange(idx, e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SEO Meta */}
        <div className="rounded-3xl bg-[#0c0f17] border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl">
          <h2 className="font-display font-bold text-lg text-white pb-3 border-b border-white/[0.06]">
            Global SEO & Metadata
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Meta Title *
              </label>
              <input
                type="text"
                value={settings.siteTitle || ""}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                Meta Description *
              </label>
              <textarea
                rows={3}
                value={settings.siteDescription || ""}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider block">
                SEO Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={settings.keywords || ""}
                onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.5)] disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save All Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
