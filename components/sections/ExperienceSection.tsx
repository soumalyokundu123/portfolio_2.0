"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle, Award } from "lucide-react";
import type { Experience } from "@/types";

interface ExperienceSectionProps {
  experiences?: Experience[];
}

export default function ExperienceSection({ experiences = [] }: ExperienceSectionProps) {
  return (
    <section id="experience" className="relative py-32 bg-gradient-to-b from-[#07091c] via-[#080d22] to-[#070a18] overflow-hidden">
      {/* Top Transition Divider */}
      <div className="section-divider" />

      {/* Deep Ambient Lighting */}
      <div className="absolute top-1/3 right-[5%] w-[600px] h-[600px] bg-emerald-600/8 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />

      {/* Subtle Microdot Background Grid */}
      <div className="absolute inset-0 bg-dot-matrix-subtle opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0c1632]/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.12)]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            Work Experience & Milestones
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base leading-relaxed">
            Hands-on technical engineering experience architecting enterprise systems, high-concurrency microservices, and collaborative platforms.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative ml-4 sm:ml-8 space-y-12">
          {/* Subtle Vertical Light Beam behind the timeline */}
          <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-cyan-400 via-sky-400/70 to-emerald-400/80 shadow-[0_0_12px_rgba(0,242,254,0.6)]" />

          {experiences.map((exp, idx) => {
            let achievementsList: string[] = [];
            if (exp.achievements) {
              try {
                achievementsList = JSON.parse(exp.achievements);
              } catch {
                achievementsList = exp.achievements.split("\n").filter(Boolean);
              }
            }

            const techList = exp.technologies ? exp.technologies.split(",").map((t) => t.trim()) : [];

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative pl-8 sm:pl-12"
              >
                {/* Glowing Timeline Joint Node */}
                <div
                  className={`absolute left-0 top-3 w-4 h-4 rounded-full border-2 transition-all ${
                    exp.isCurrent
                      ? "bg-cyan-400 border-white shadow-[0_0_16px_rgba(0,242,254,1)] animate-pulse"
                      : "bg-[#080d22] border-emerald-400 shadow-[0_0_10px_rgba(0,255,135,0.7)]"
                  }`}
                />

                {/* Translucent Card with Subtle Blue Accent Line */}
                <div className="relative rounded-3xl bg-[#0c1228]/75 border border-blue-500/20 hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_35px_rgba(0,10,30,0.5)] overflow-hidden">
                  {/* Subtle Top Accent Glow Line */}
                  <div className="h-[1.5px] w-full bg-gradient-to-r from-cyan-400/50 via-sky-400/30 to-transparent" />

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-display font-bold text-xl text-white flex items-center space-x-2">
                          <span>{exp.position}</span>
                          {exp.isCurrent && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-sm">
                              Current
                            </span>
                          )}
                        </h3>
                        <p className="text-sm font-semibold text-emerald-400 mt-0.5">{exp.company}</p>
                      </div>

                      <div className="flex items-center space-x-4 text-xs font-mono text-zinc-400">
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>
                            {exp.startDate} &mdash; {exp.endDate || "Present"}
                          </span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center space-x-1.5">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    {/* Achievements Bullets */}
                    {achievementsList.length > 0 && (
                      <div className="space-y-2.5 mb-5 bg-[#090e20]/60 p-4 rounded-2xl border border-white/[0.04]">
                        {achievementsList.map((item, aIdx) => (
                          <div key={aIdx} className="flex items-start space-x-2.5 text-xs text-zinc-300 leading-relaxed">
                            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Technologies Used */}
                    {techList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {techList.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-cyan-950/30 text-cyan-300 border border-cyan-500/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
