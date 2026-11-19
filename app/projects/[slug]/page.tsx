import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Calendar, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Soumalyo Kundu`,
    description: project.tagline || project.overview.slice(0, 160),
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      media: { orderBy: { orderIndex: "asc" } },
    },
  });

  if (!project) {
    notFound();
  }

  const nextProject = await prisma.project.findFirst({
    where: {
      published: true,
      orderIndex: { gt: project.orderIndex },
    },
    orderBy: { orderIndex: "asc" },
  });

  const prevProject = await prisma.project.findFirst({
    where: {
      published: true,
      orderIndex: { lt: project.orderIndex },
    },
    orderBy: { orderIndex: "desc" },
  });

  const techList = project.technologies.split(",").map((t) => t.trim());

  return (
    <main className="min-h-screen bg-[#060709] text-white selection:bg-cyan-500 selection:text-black">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <article className="pt-32 pb-24">
        {/* Top Breadcrumb & Navigation */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{project.category?.name || "Software System"}</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-zinc-300 text-lg sm:text-xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Quick Meta Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/[0.08] text-xs">
            <div>
              <span className="text-zinc-500 block font-mono uppercase tracking-wider mb-1">Year</span>
              <span className="text-white font-medium">{project.year}</span>
            </div>
            <div>
              <span className="text-zinc-500 block font-mono uppercase tracking-wider mb-1">Client / Purpose</span>
              <span className="text-white font-medium">{project.client || "Independent Studio Work"}</span>
            </div>
            <div>
              <span className="text-zinc-500 block font-mono uppercase tracking-wider mb-1">Timeline</span>
              <span className="text-white font-medium">{project.duration || "4 Weeks"}</span>
            </div>
            <div className="flex items-center space-x-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors flex items-center space-x-1"
                >
                  <span>Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-lg bg-white/[0.05] text-zinc-300 border border-white/[0.1] hover:text-white transition-colors flex items-center space-x-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Hero Visual Media */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] bg-black aspect-video shadow-2xl">
            {project.videoPreview ? (
              <video
                src={project.videoPreview}
                poster={project.thumbnail}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            )}
          </div>
        </div>

        {/* Deep Dive Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Main Narrative */}
          <div className="lg:col-span-8 space-y-12">
            <section className="space-y-4">
              <h2 className="font-display font-bold text-2xl text-white">Project Overview</h2>
              <p className="text-zinc-300 text-base leading-relaxed whitespace-pre-line">
                {project.overview}
              </p>
            </section>

            {project.creativeProcess && (
              <section className="space-y-4">
                <h2 className="font-display font-bold text-2xl text-white">Creative Process & Architecture</h2>
                <p className="text-zinc-300 text-base leading-relaxed whitespace-pre-line">
                  {project.creativeProcess}
                </p>
              </section>
            )}

            {(project.challenges || project.solutions) && (
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {project.challenges && (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                    <h3 className="font-semibold text-rose-400 text-base flex items-center space-x-2">
                      <span>Challenges Faced</span>
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {project.challenges}
                    </p>
                  </div>
                )}

                {project.solutions && (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                    <h3 className="font-semibold text-emerald-400 text-base flex items-center space-x-2">
                      <span>Solutions Implemented</span>
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {project.solutions}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* Gallery Images */}
            {project.media && project.media.length > 0 && (
              <section className="space-y-6 pt-6">
                <h2 className="font-display font-bold text-2xl text-white">Visual Breakdown & Renders</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.media.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-video bg-black"
                    >
                      <Image
                        src={item.url}
                        alt={item.caption || "Project Render"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                      {item.caption && (
                        <div className="absolute bottom-0 inset-x-0 p-3 bg-black/70 backdrop-blur-sm text-[11px] text-zinc-300">
                          {item.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 rounded-3xl bg-[#0c0f17] border border-white/[0.08] space-y-6 sticky top-28">
              <div>
                <h3 className="font-display font-bold text-lg text-white mb-3">Technologies Deployed</h3>
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-cyan-300 border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.credits && (
                <div className="pt-4 border-t border-white/[0.06]">
                  <h3 className="font-display font-bold text-sm text-white mb-2">Credits & Team</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{project.credits}</p>
                </div>
              )}

              <div className="pt-4 border-t border-white/[0.06]">
                <Link
                  href="/#contact"
                  className="block w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.4)] transition-all"
                >
                  Commission Similar Work
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Next / Previous Project Navigation */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 border-t border-white/[0.08] flex items-center justify-between">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center space-x-3 text-left"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                  Previous Project
                </span>
                <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                  {prevProject.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center space-x-3 text-right"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                  Next Project
                </span>
                <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
