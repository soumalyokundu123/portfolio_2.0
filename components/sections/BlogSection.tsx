"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogSectionProps {
  posts?: BlogPost[];
}

export default function BlogSection({ posts = [] }: BlogSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#080c1c] via-[#091026] to-[#07091a] overflow-hidden">
      {/* Top Transition Divider */}
      <div className="section-divider" />

      {/* Subtle Background Circuit Grid */}
      <div className="absolute inset-0 bg-cyber-grid-subtle opacity-25 pointer-events-none" />

      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/3 right-[5%] w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-[5%] w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0c1635]/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.12)]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Insights</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
              Thoughts on Architecture, APIs & Systems
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 hover:text-emerald-400 transition-colors"
          >
            <span>View All Articles</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Posts Grid with Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group rounded-3xl bg-[#0c1328]/75 border border-white/[0.08] hover:border-cyan-400/50 backdrop-blur-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_45px_rgba(0,242,254,0.14)]"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#060814]/85 backdrop-blur-md border border-cyan-500/30 text-cyan-300">
                    {post.category?.name || "Architecture"}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1328] via-transparent to-transparent opacity-85" />
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-xs font-mono text-zinc-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    {post.readingTime && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{post.readingTime}</span>
                      </div>
                    )}
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-400">
                    By {post.author}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-mono text-cyan-400 group-hover:text-cyan-300"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
