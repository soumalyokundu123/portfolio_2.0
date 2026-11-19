"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Code2, ArrowUpRight, Terminal } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

const HeroScene = dynamic(() => import("../canvas/HeroScene"), {
  ssr: false,
  loading: () => null,
});

interface HeroSectionProps {
  name?: string;
  title?: string;
  tagline?: string;
  bio?: string;
}

export default function HeroSection({
  name = "Soumalyo Kundu",
  title = "Software Developer | Java Backend Engineer",
  tagline = "Engineering Scalable Backends, RESTful APIs & Resilient Systems",
  bio = "Computer Science & Engineering undergraduate at MCKV Institute of Engineering (2027) with technical internship experience at NIC and ARMB. Experienced in Java 17, Spring Boot, ASP.NET Core, PostgreSQL, and full-stack software development.",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-20">
      {/* 3D Interactive Scene Layer (Crystalline Core, Wireframe Cage, Floating Nodes & Particles) */}
      <HeroScene />

      {/* Cyber Grid with Soft Opacity */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:48px_48px] opacity-15 pointer-events-none" />

      {/* Atmospheric Radial Gradient that blends the 3D scene with deep dark studio atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,7,9,0.45)_0%,_rgba(6,7,9,0.75)_55%,_rgba(6,7,9,0.98)_100%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center pointer-events-none">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0d1017]/90 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,242,254,0.2)] mb-6 pointer-events-auto backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-semibold">
            {title}
          </span>
        </motion.div>

        {/* Editorial Headline with Maximum Contrast and Depth */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)] max-w-5xl mx-auto"
        >
          Engineering Scalable{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(0,242,254,0.4)]">
            Backends & Systems
          </span>
        </motion.h1>

        {/* High-Readability Frosted Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 max-w-3xl mx-auto pointer-events-auto"
        >
          <div className="p-5 sm:p-6 rounded-2xl bg-[#060709]/80 border border-white/[0.12] hover:border-cyan-500/30 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.85)] transition-colors">
            <p className="text-zinc-100 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              {bio}
            </p>
          </div>
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
          <Link href="#projects">
            <MagneticButton className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 text-slate-950 shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,255,135,0.5)] transition-all">
              <span className="relative z-10 flex items-center space-x-2">
                <span>View Software Projects</span>
                <Code2 className="w-4 h-4" />
              </span>
            </MagneticButton>
          </Link>

          <Link href="#contact">
            <MagneticButton className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-[#0c1017]/90 hover:bg-[#121622] text-white border border-white/[0.15] hover:border-cyan-400/50 shadow-lg backdrop-blur-md transition-all">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Connect & Inquire</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </span>
            </MagneticButton>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14 flex flex-col items-center justify-center pointer-events-auto"
        >
          <Link
            href="#about"
            className="group flex flex-col items-center text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase mb-2">Scroll To Discover</span>
            <div className="w-5 h-9 rounded-full border border-white/[0.2] group-hover:border-cyan-400 flex items-start justify-center p-1 transition-colors">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
