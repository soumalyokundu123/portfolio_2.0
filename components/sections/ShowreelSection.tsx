"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, Terminal, Code2, Layers } from "lucide-react";

interface ShowreelSectionProps {
  videoUrl?: string | null;
  posterUrl?: string | null;
}

export default function ShowreelSection({
  videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screens-43097-large.mp4",
  posterUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80",
}: ShowreelSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <section id="showcase" className="relative py-32 bg-gradient-to-b from-[#060914] via-[#080d24] to-[#070a1a] overflow-hidden">
      {/* Top Transition Divider */}
      <div className="section-divider" />

      {/* Atmospheric Ambient Glow behind Video Showcase */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-cyan-600/15 via-blue-600/10 to-indigo-600/15 blur-[170px] pointer-events-none" />

      {/* Subtle Circuit Grid */}
      <div className="absolute inset-0 bg-cyber-grid-subtle opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0c1632]/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.12)]">
            <Terminal className="w-3.5 h-3.5" />
            <span>Engineering Showcase</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            System Architecture in Action
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base leading-relaxed">
            A dynamic technical walkthrough of scalable backend services, RESTful API design, database migrations, and responsive web integration.
          </p>
        </div>

        {/* Video Player Frame with Cyber Frame */}
        <div
          ref={containerRef}
          className="relative group rounded-3xl overflow-hidden bg-slate-950 border border-cyan-500/30 shadow-[0_20px_70px_rgba(0,10,35,0.9)] aspect-video max-w-5xl mx-auto"
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src={videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screens-43097-large.mp4"}
            poster={posterUrl || undefined}
            loop
            muted={isMuted}
            playsInline
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />

          {/* Big Center Play Trigger (when paused) */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-[#060814]/50 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group-hover:bg-[#060814]/35 transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-400 to-emerald-400 text-slate-950 flex items-center justify-center shadow-[0_0_40px_rgba(0,242,254,0.6)] cursor-pointer"
              >
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </motion.div>
            </div>
          )}

          {/* Bottom Floating Control Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-[#060814]/90 via-[#060814]/60 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-xl bg-white/[0.1] hover:bg-cyan-500/30 text-white hover:text-cyan-300 backdrop-blur-md transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2.5 rounded-xl bg-white/[0.1] hover:bg-cyan-500/30 text-white hover:text-cyan-300 backdrop-blur-md transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-xl bg-white/[0.1] hover:bg-cyan-500/30 text-white hover:text-cyan-300 backdrop-blur-md transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
