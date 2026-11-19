"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#090b1e] via-[#0b0e26] to-[#080c1c] overflow-hidden">
      {/* Top Seamless Transition Divider */}
      <div className="section-divider" />

      {/* Atmospheric Radial Blooms */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Matrix Dots */}
      <div className="absolute inset-0 bg-dot-matrix-subtle opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#101438]/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.12)]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Endorsements</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            Client & Collaborator Words
          </h2>
        </div>

        {/* Carousel Card with Glassmorphic Indigo Depth */}
        <div className="relative rounded-3xl bg-[#0c1228]/80 border border-indigo-500/25 p-8 sm:p-14 shadow-[0_20px_60px_rgba(3,6,22,0.8)] backdrop-blur-2xl">
          <Quote className="w-14 h-14 text-cyan-400/20 absolute top-8 left-8" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 space-y-6"
            >
              {/* Rating stars */}
              <div className="flex items-center space-x-1.5">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-base sm:text-xl text-zinc-200 font-light leading-relaxed italic">
                &ldquo;{current.content}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/[0.08]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-cyan-400/30 bg-slate-900 shadow-sm">
                  <Image
                    src={
                      current.avatarUrl ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    }
                    alt={current.clientName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{current.clientName}</h4>
                  <p className="text-xs text-cyan-300 font-mono">
                    {current.designation} &bull; {current.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-white/[0.06]">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-[#101636] hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-300 border border-white/[0.08] hover:border-cyan-500/40 transition-colors"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-[#101636] hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-300 border border-white/[0.08] hover:border-cyan-500/40 transition-colors"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
