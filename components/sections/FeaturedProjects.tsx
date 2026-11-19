"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sparkles, Filter, Terminal } from "lucide-react";
import ProjectCard from "../ui/ProjectCard";
import type { Project, ProjectCategory } from "@/types";

interface FeaturedProjectsProps {
  initialProjects?: Project[];
  categories?: ProjectCategory[];
}

export default function FeaturedProjects({
  initialProjects = [],
  categories = [],
}: FeaturedProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return initialProjects;
    return initialProjects.filter(
      (p) => p.category?.slug === selectedCategory || p.categoryId === selectedCategory
    );
  }, [initialProjects, selectedCategory]);

  return (
    <section id="projects" className="relative py-32 bg-gradient-to-b from-[#070b18] via-[#090d1f] to-[#060914] overflow-hidden">
      {/* Seamless Glowing Section Separator */}
      <div className="section-divider" />

      {/* Fine Micro-Dot Matrix Background Texture */}
      <div className="absolute inset-0 bg-dot-matrix-subtle opacity-30 pointer-events-none" />

      {/* Subtle Spotlight Gradients Behind Project Gallery */}
      <div className="absolute top-20 right-[10%] w-[600px] h-[600px] bg-gradient-to-b from-cyan-600/10 via-sky-500/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-[650px] h-[650px] bg-gradient-to-t from-blue-700/10 via-indigo-600/5 to-transparent rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-900/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle Glowing Linear Grid Accent */}
      <div className="absolute inset-0 bg-cyber-grid-subtle opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0c142c]/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.12)]">
              <Terminal className="w-3.5 h-3.5" />
              <span>Engineered Systems</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
              Featured Software Projects
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
            Production-grade backend architectures, full-stack platforms, and AI integrations built with Java, Spring Boot, ASP.NET Core, PostgreSQL, and Next.js.
          </p>
        </div>

        {/* Category Filter Tabs with Futuristic Glass Styling */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,242,254,0.35)]"
                : "bg-[#0d1326]/70 text-zinc-400 hover:text-white border border-white/[0.08] hover:border-cyan-500/30 backdrop-blur-md"
            }`}
          >
            All Systems ({initialProjects.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat.slug
                  ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,242,254,0.35)]"
                  : "bg-[#0d1326]/70 text-zinc-400 hover:text-white border border-white/[0.08] hover:border-cyan-500/30 backdrop-blur-md"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid with Perspective Depth */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} priority={idx < 3} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 rounded-3xl bg-[#0c1224]/50 border border-white/[0.08] backdrop-blur-md">
            <p className="text-zinc-400 text-sm">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
