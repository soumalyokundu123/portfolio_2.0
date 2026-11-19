import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User, Share2, Tag } from "lucide-react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${post.seoTitle || post.title} | Soumalyo Kundu`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!post) {
    notFound();
  }

  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      id: { not: post.id },
    },
    take: 2,
    orderBy: { createdAt: "desc" },
  });

  const tagList = post.tags.split(",").map((t) => t.trim());

  return (
    <main className="min-h-screen bg-[#060709] text-white selection:bg-cyan-500 selection:text-black">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <article className="pt-36 pb-24">
        {/* Navigation Breadcrumb */}
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-6 mb-12 space-y-6">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 inline-block">
            {post.category?.name || "Backend Architecture"}
          </span>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/[0.08] text-xs font-mono text-zinc-400">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-cyan-400" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] border border-white/[0.1] shadow-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>

        {/* Rich Body Content */}
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-invert prose-cyan max-w-none text-zinc-300 leading-relaxed text-base sm:text-lg space-y-6 whitespace-pre-line font-sans">
            {post.content}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-white/[0.08] flex items-center space-x-3">
            <Tag className="w-4 h-4 text-cyan-400" />
            <div className="flex flex-wrap gap-2">
              {tagList.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="max-w-5xl mx-auto px-6 mt-24 pt-16 border-t border-white/[0.08]">
            <h3 className="font-display font-bold text-2xl text-white mb-8">Related Reads</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="group block p-6 rounded-3xl bg-[#0c0f17] border border-white/[0.08] hover:border-cyan-500/30 transition-colors"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-900">
                    <Image
                      src={rPost.coverImage}
                      alt={rPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs font-mono text-cyan-400 block mb-1">
                    {rPost.readingTime}
                  </span>
                  <h4 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {rPost.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}
