"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, GraduationCap, Award, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import type { Education } from "@/types";

interface ResumeSectionProps {
  education?: Education[];
  resumeUrl?: string | null;
}

export default function ResumeSection({
  education = [],
  resumeUrl = "/Soumalyo_Kundu_Resume.pdf",
}: ResumeSectionProps) {
  const achievements = [
    {
      title: "Smart India Hackathon (SIH)",
      desc: "Participated and cleared the internal screening round twice with real-world software solutions.",
    },
    {
      title: "Math Mania 2026",
      desc: "Secured 2nd Position at MCKV Institute of Engineering in an aptitude competition.",
    },
    {
      title: "IETE Student Member",
      desc: "Active student member of The Institution of Electronics and Telecommunication Engineers.",
    },
  ];

  return (
    <section id="education" className="relative py-32 bg-gradient-to-b from-[#070a18] via-[#0d0d28] to-[#090b1e] overflow-hidden">
      {/* Top Transition Divider */}
      <div className="section-divider" />

      {/* Muted Dark Purple & Midnight Blue Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-purple-600/12 via-indigo-600/10 to-transparent rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-[10%] w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />

      {/* Subtle Floating Geometric Shapes */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 left-[8%] w-4 h-4 border border-purple-400/30 rotate-45 opacity-35 pointer-events-none"
      />
      <motion.div
        animate={{ y: [12, -12, 12], rotate: [0, -90, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-36 right-[8%] w-5 h-5 border border-cyan-400/30 rotate-12 opacity-35 pointer-events-none"
      />

      {/* Subtle Circuit Grid Pattern */}
      <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Banner with Download Resume CTA - Deep Indigo Gradient */}
        <div
          id="resume"
          className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0d1028]/90 via-[#14153a]/90 to-[#0d1028]/90 border border-indigo-500/30 hover:border-cyan-400/40 backdrop-blur-2xl shadow-[0_15px_50px_rgba(5,7,25,0.7)] mb-20 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors"
        >
          {/* Subtle Glow Behind Resume Card */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-transparent rounded-3xl blur-xl -z-10" />

          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#10143a]/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest shadow-sm">
              <FileText className="w-3.5 h-3.5" />
              <span>Verified Resume</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-sm">
              Official Resume & Academic Coursework
            </h2>
            <p className="text-zinc-300 text-sm max-w-xl leading-relaxed">
              Download the official PDF resume highlighting internships at the National Informatics Centre (NIC) and ARMB, technical project repositories, and academic results at MCKV Institute of Engineering.
            </p>
          </div>

          <a href={resumeUrl || "/Soumalyo_Kundu_Resume.pdf"} target="_blank" download>
            <MagneticButton className="px-8 py-4 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 text-slate-950 shadow-[0_0_30px_rgba(0,242,254,0.45)] hover:shadow-[0_0_45px_rgba(0,255,135,0.65)] transition-all shrink-0">
              <span className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </span>
            </MagneticButton>
          </a>
        </div>

        {/* Education & Academic Honors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Education */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-[#121636]/90 border border-purple-500/30 text-cyan-300 shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu) => (
                <motion.div
                  key={edu.id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-2xl bg-[#0e112a]/75 border border-purple-500/20 hover:border-cyan-400/40 backdrop-blur-xl transition-all shadow-[0_8px_30px_rgba(2,5,20,0.5)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white text-base">{edu.institution}</h4>
                    <span className="text-xs font-mono text-cyan-400">
                      {edu.startDate} &mdash; {edu.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-400 font-medium mb-1">
                    {edu.degree} &bull; {edu.field}
                  </p>
                  {edu.grade && (
                    <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08] mb-3">
                      {edu.grade}
                    </span>
                  )}
                  {edu.highlights && (
                    <p className="text-xs text-zinc-400 leading-relaxed">{edu.highlights}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-[#121636]/90 border border-purple-500/30 text-emerald-300 shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white">Honors & Extracurriculars</h3>
            </div>

            <div className="space-y-6">
              {achievements.map((ach, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-2xl bg-[#0e112a]/75 border border-purple-500/20 hover:border-emerald-400/40 backdrop-blur-xl transition-all shadow-[0_8px_30px_rgba(2,5,20,0.5)]"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-1">{ach.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{ach.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
