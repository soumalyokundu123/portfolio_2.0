"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Code2, Database, Shield, Sparkles, Network } from "lucide-react";
import type { SkillCategory, Skill } from "@/types";

interface SkillsSectionProps {
  categories?: SkillCategory[];
}

export default function SkillsSection({ categories = [] }: SkillsSectionProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const displayCategories = categories.length > 0 ? categories : [];

  return (
    <section id="skills" className="relative py-32 bg-gradient-to-b from-[#070a1a] via-[#09112c] to-[#07091c] overflow-hidden">
      {/* Top Seamless Transition Divider */}
      <div className="section-divider" />

      {/* Subtle Glowing Blue Grid */}
      <div className="absolute inset-0 bg-cyber-grid-subtle opacity-35 pointer-events-none" />

      {/* Soft Radial Light Behind Skill Categories */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-b from-cyan-500/12 via-blue-600/8 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[170px] pointer-events-none" />

      {/* Faint Interconnected Network Node Pattern (SVG Overlay) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g stroke="rgba(0,242,254,0.15)" strokeWidth="1" strokeDasharray="3 3">
            <line x1="10%" y1="20%" x2="25%" y2="40%" />
            <line x1="25%" y1="40%" x2="45%" y2="30%" />
            <line x1="45%" y1="30%" x2="60%" y2="50%" />
            <line x1="60%" y1="50%" x2="80%" y2="35%" />
            <line x1="80%" y1="35%" x2="92%" y2="60%" />
            <line x1="25%" y1="40%" x2="35%" y2="75%" />
            <line x1="35%" y1="75%" x2="65%" y2="80%" />
            <line x1="65%" y1="80%" x2="85%" y2="70%" />
          </g>
          <circle cx="10%" cy="20%" r="3" fill="#00f2fe" />
          <circle cx="25%" cy="40%" r="4" fill="#00ff87" />
          <circle cx="45%" cy="30%" r="3" fill="#00f2fe" />
          <circle cx="60%" cy="50%" r="4" fill="#38bdf8" />
          <circle cx="80%" cy="35%" r="3" fill="#00ff87" />
          <circle cx="92%" cy="60%" r="3" fill="#00f2fe" />
          <circle cx="35%" cy="75%" r="4" fill="#00f2fe" />
          <circle cx="65%" cy="80%" r="3" fill="#38bdf8" />
          <circle cx="85%" cy="70%" r="4" fill="#00ff87" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0c1635]/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.12)]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Ecosystem</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            Software Engineering Stack
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base leading-relaxed">
            Core programming languages, backend frameworks, relational databases, security protocols, and computer science fundamentals.
          </p>
        </div>

        {/* Category Tabs */}
        {displayCategories.length > 0 && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#0c132c]/80 border border-cyan-500/25 backdrop-blur-xl shadow-lg overflow-x-auto max-w-full">
              {displayCategories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                    activeTab === idx
                      ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,242,254,0.4)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Category Skills Grid */}
        {displayCategories[activeTab] && (
          <motion.div
            key={displayCategories[activeTab].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {displayCategories[activeTab].skills?.map((skill: Skill) => (
              <motion.div
                key={skill.id}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="group relative p-6 rounded-2xl bg-[#0c142c]/70 border border-cyan-500/20 hover:border-cyan-400/60 backdrop-blur-xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,10,30,0.5)] hover:shadow-[0_10px_35px_rgba(0,242,254,0.18)] overflow-hidden"
              >
                {/* Subtle Hover Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono text-xs shadow-inner">
                      &lt;/&gt;
                    </div>
                    <span className="font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-cyan-400 font-medium">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Animated Level Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-900/80 overflow-hidden border border-white/[0.04]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 shadow-[0_0_8px_rgba(0,242,254,0.5)]"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
