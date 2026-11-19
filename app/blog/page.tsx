import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowUpRight, Clock, Calendar, ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Engineering & Backend Architecture Articles | Soumalyo Kundu",
  description: "Technical writings on Java Spring Boot, REST APIs, PostgreSQL, Spring WebClient, AI integrations, and full-stack software architectures.",
};

export default async function BlogListingPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#060709] text-white selection:bg-cyan-500 selection:text-black">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <section className="pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-16 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Journal</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
              Architectures, APIs & System Design
            </h1>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Deep dives into Java 17, Spring Boot, Spring Security, microservice scalability, and transactional database optimizations.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-3xl bg-[#0c0f17] border border-white/[0.08] hover:border-cyan-500/30 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,242,254,0.1)]"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f17] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <span>&bull;</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400">
                      {post.category?.name || "Backend Architecture"}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-emerald-400 transition-colors flex items-center space-x-1"
                    >
                      <span>Read Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
