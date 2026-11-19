"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server, Database, Sparkles, Award, Cpu, ShieldCheck, Terminal, CheckCircle2, Activity } from "lucide-react";
import type { Profile } from "@/types";

interface AboutSectionProps {
  profile?: Profile | null;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const [activeConsoleTab, setActiveConsoleTab] = useState<"runtime" | "stack" | "internships">("runtime");

  const stats = [
    { label: "Academic YGPA", value: "9.38" },
    { label: "Technical Internships", value: "2+" },
    { label: "Projects Built", value: "15+" },
    { label: "Core Technologies", value: "18+" },
  ];

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-[#060709] via-[#090c1c] to-[#070b18] overflow-hidden">
      {/* Seamless Top Gradient Divider from Hero */}
      <div className="section-divider" />

      {/* Faint Geometric Grid Pattern */}
      <div className="absolute inset-0 bg-circuit-grid opacity-35 pointer-events-none" />

      {/* Soft Blue and Violet Ambient Atmosphere */}
      <div className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-900/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle Floating Decorative Elements */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [0, 45, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 right-[15%] w-3 h-3 rounded border border-cyan-400/30 opacity-40 pointer-events-none"
      />
      <motion.div
        animate={{ y: [6, -10, 6], rotate: [0, -45, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-28 left-[10%] w-2.5 h-2.5 rounded-full border border-violet-400/40 opacity-40 pointer-events-none"
      />
      <motion.div
        animate={{ y: [-12, 12, -12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-[8%] w-1.5 h-1.5 rounded-full bg-cyan-400/40 blur-[1px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0e1630]/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.1)]">
            <Code2 className="w-3.5 h-3.5" />
            <span>Developer Profile</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            Building High-Performance & Deterministic Software
          </h2>
        </div>

        {/* Grid: Developer Terminal Console & Detailed Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive System Kernel Console (Replaces Photo) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Subtle Glow directly behind the Terminal Console */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-violet-600/20 to-blue-500/10 rounded-3xl blur-2xl -z-10" />

            <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-indigo-500/15 to-violet-500/25 shadow-2xl backdrop-blur-xl">
              <div className="relative rounded-[22px] bg-[#0a0e1f]/95 overflow-hidden border border-white/[0.08]">
                {/* Terminal Window Header Bar */}
                <div className="px-5 py-3.5 bg-[#060814]/90 border-b border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-[11px] font-mono text-zinc-400 pl-2">
                      soumalyo@kernel-core:~
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ONLINE</span>
                  </div>
                </div>

                {/* Console Navigation Tabs */}
                <div className="flex border-b border-white/[0.06] bg-[#070a18]/60 px-3 pt-2">
                  <button
                    onClick={() => setActiveConsoleTab("runtime")}
                    className={`px-3 py-1.5 text-[11px] font-mono rounded-t-lg transition-colors ${
                      activeConsoleTab === "runtime"
                        ? "bg-[#0a0e1f] text-cyan-300 border-t border-x border-cyan-500/30 font-semibold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    sys_spec.json
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab("stack")}
                    className={`px-3 py-1.5 text-[11px] font-mono rounded-t-lg transition-colors ${
                      activeConsoleTab === "stack"
                        ? "bg-[#0a0e1f] text-cyan-300 border-t border-x border-cyan-500/30 font-semibold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    architecture.sh
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab("internships")}
                    className={`px-3 py-1.5 text-[11px] font-mono rounded-t-lg transition-colors ${
                      activeConsoleTab === "internships"
                        ? "bg-[#0a0e1f] text-cyan-300 border-t border-x border-cyan-500/30 font-semibold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    experience.log
                  </button>
                </div>

                {/* Terminal Body */}
                <div className="p-5 font-mono text-xs text-zinc-300 space-y-2.5 min-h-[260px] bg-[#070b1a]/70">
                  {activeConsoleTab === "runtime" && (
                    <div className="space-y-2">
                      <p className="text-zinc-500 text-[11px]">// Developer System Identity</p>
                      <p>
                        <span className="text-cyan-400">const</span> developer = &#123;
                      </p>
                      <p className="pl-4">
                        <span className="text-zinc-400">name:</span>{" "}
                        <span className="text-emerald-300">&quot;Soumalyo Kundu&quot;</span>,
                      </p>
                      <p className="pl-4">
                        <span className="text-zinc-400">role:</span>{" "}
                        <span className="text-cyan-300">&quot;Software Developer &bull; Java Backend&quot;</span>,
                      </p>
                      <p className="pl-4">
                        <span className="text-zinc-400">education:</span>{" "}
                        <span className="text-sky-300">&quot;MCKV Institute of Engineering (2027)&quot;</span>,
                      </p>
                      <p className="pl-4">
                        <span className="text-zinc-400">ygpa:</span>{" "}
                        <span className="text-yellow-400">9.38</span>,
                      </p>
                      <p className="pl-4">
                        <span className="text-zinc-400">location:</span>{" "}
                        <span className="text-zinc-300">&quot;Kolkata, India&quot;</span>,
                      </p>
                      <p className="pl-4">
                        <span className="text-zinc-400">status:</span>{" "}
                        <span className="text-emerald-400">&quot;Available for Software Engineering Roles&quot;</span>
                      </p>
                      <p>&#125;;</p>
                    </div>
                  )}

                  {activeConsoleTab === "stack" && (
                    <div className="space-y-2">
                      <p className="text-zinc-500 text-[11px]">// Core Architecture & Backend Engine</p>
                      <p className="text-cyan-400">$ systemctl --type=service</p>
                      <p className="text-emerald-300 flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>spring-boot-3.x &bull; Java 17 Microservices</span>
                      </p>
                      <p className="text-emerald-300 flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>aspnetcore-webapi &bull; C# & EF Core</span>
                      </p>
                      <p className="text-emerald-300 flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>postgresql-db &bull; Relational ACID & Migrations</span>
                      </p>
                      <p className="text-emerald-300 flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>spring-security &bull; JWT & Role-Based Auth</span>
                      </p>
                      <p className="text-emerald-300 flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>gemini-api &bull; LLM Assistant Integrations</span>
                      </p>
                    </div>
                  )}

                  {activeConsoleTab === "internships" && (
                    <div className="space-y-2">
                      <p className="text-zinc-500 text-[11px]">// Production Engineering Experience</p>
                      <div className="p-2 rounded bg-black/40 border border-white/[0.05]">
                        <p className="text-cyan-300 font-semibold text-[11px]">National Informatics Centre (NIC)</p>
                        <p className="text-zinc-400 text-[10px]">Backend Development Intern &bull; July 2026 – Present</p>
                        <p className="text-zinc-300 text-[10px] mt-1">&rarr; Dearness Allowance (DA) Management System (C#, ASP.NET, PostgreSQL, JWT)</p>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-white/[0.05]">
                        <p className="text-emerald-300 font-semibold text-[11px]">ARMB Technologies</p>
                        <p className="text-zinc-400 text-[10px]">Java Backend Intern &bull; Feb 2026 – Aug 2026</p>
                        <p className="text-zinc-300 text-[10px] mt-1">&rarr; ERP Scheduling & Timetable Engine (Java 17, Spring Boot, JPA, REST)</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex items-center space-x-2 text-[11px] text-cyan-400">
                    <span>user@backend-terminal:~$</span>
                    <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
                  </div>
                </div>

                {/* Telemetry Status Bar */}
                <div className="p-4 bg-[#060814]/90 border-t border-white/[0.08] grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#0e142c]/70 border border-white/[0.06] backdrop-blur-sm">
                    <span className="text-zinc-400 block mb-0.5 font-mono text-[10px]">Architecture</span>
                    <span className="text-white font-medium text-xs">REST & Microservices</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0e142c]/70 border border-white/[0.06] backdrop-blur-sm">
                    <span className="text-zinc-400 block mb-0.5 font-mono text-[10px]">Response Time</span>
                    <span className="text-emerald-400 font-medium text-xs font-mono">&lt; 15ms Optimal</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Technical Depth */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug drop-shadow-sm">
              Specialized in backend microservices, transactional relational databases, and enterprise API design.
            </h3>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              I am a Computer Science & Engineering undergraduate graduating in 2027 from <strong>MCKV Institute of Engineering</strong> (YGPA: 9.38 upto 5th semester) with software development experience gained through technical internships and production-grade projects.
            </p>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Experienced in <strong>Java (Core Java, Java 17), Spring Boot, ASP.NET Core, REST APIs, PostgreSQL, and MongoDB</strong>, with a strong foundation in Data Structures & Algorithms, Object-Oriented Programming, and database management. I have developed secure, maintainable, and database-driven applications with academic exposure to AWS services including EC2, S3, Lambda, and IAM.
            </p>

            {/* Glass-like Specialization Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-[#0c1228]/60 border border-indigo-500/20 hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 shadow-[0_8px_30px_rgba(2,6,23,0.4)] group">
                <Server className="w-6 h-6 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-white text-sm mb-1">Backend & API Engineering</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Java 17, Spring Boot, Spring Security, JWT authentication, role-based authorization, centralized exception handling, and Swagger/OpenAPI.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0c1228]/60 border border-indigo-500/20 hover:border-emerald-400/50 backdrop-blur-xl transition-all duration-300 shadow-[0_8px_30px_rgba(2,6,23,0.4)] group">
                <Database className="w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-white text-sm mb-1">Databases & Full-Stack</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  PostgreSQL, Relational Database Design, JPA/Hibernate, ASP.NET Core, Entity Framework Core, MongoDB, Next.js, and React.
                </p>
              </div>
            </div>

            {/* Live Counter Stats in Glass Container */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.08]">
              {stats.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#0b1024]/50 border border-white/[0.05] space-y-1">
                  <div className="font-display font-extrabold text-2xl md:text-3xl bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
