"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Sparkles, Layers } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.videoPreview) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && project.videoPreview) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const techList = project.technologies.split(",").map((t) => t.trim());

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl bg-[#0c1124]/75 border border-white/[0.08] hover:border-cyan-400/50 backdrop-blur-xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,242,254,0.14)]"
    >
      {/* Subtle Inner Ambient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/[0.04] via-transparent to-blue-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Media Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950/80">
        {/* Poster / Thumbnail Image */}
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          priority={priority}
          className={`object-cover object-center transition-all duration-700 ease-out ${
            isHovered && project.videoPreview ? "opacity-0" : "scale-100 group-hover:scale-105 opacity-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Video Preview on Hover if available */}
        {project.videoPreview && (
          <video
            ref={videoRef}
            src={project.videoPreview}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#060814]/85 backdrop-blur-md border border-cyan-500/25 text-cyan-300 shadow-md">
            {project.category?.name || "Software System"}
          </span>

          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-zinc-300 bg-[#060814]/85 backdrop-blur-md border border-white/[0.1] shadow-md">
            {project.year}
          </span>
        </div>

        {/* Gradient Shadow Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1124] via-transparent to-transparent opacity-90" />
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between relative z-10">
        <div className="space-y-3">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
            </h3>
          </Link>
          <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Tech Stack Pills & Links */}
        <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-12">
            {techList.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.06] group-hover:border-cyan-500/20 transition-colors"
              >
                {tech}
              </span>
            ))}
            {techList.length > 3 && (
              <span className="px-2 py-1 rounded-lg text-[10px] font-mono text-zinc-500">
                +{techList.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-300 border border-white/[0.06] hover:border-cyan-500/40 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-300 border border-white/[0.06] hover:border-emerald-500/40 transition-colors"
                title="Live Deployment"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
