import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  Layers,
  Mail,
  MessageSquare,
  BookOpen,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverview() {
  const [
    projectsCount,
    messagesCount,
    unreadMessagesCount,
    testimonialsCount,
    postsCount,
    recentMessages,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.testimonial.count(),
    prisma.blogPost.count(),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const cards = [
    {
      title: "Projects",
      count: projectsCount,
      href: "/admin/projects",
      icon: Layers,
      color: "from-cyan-500/20 to-sky-500/20",
      textColor: "text-cyan-400",
      desc: "Backend & web systems",
    },
    {
      title: "Contact Inquiries",
      count: messagesCount,
      unread: unreadMessagesCount,
      href: "/admin/messages",
      icon: Mail,
      color: "from-emerald-500/20 to-teal-500/20",
      textColor: "text-emerald-400",
      desc: "Client submissions",
    },
    {
      title: "Testimonials",
      count: testimonialsCount,
      href: "/admin/testimonials",
      icon: MessageSquare,
      color: "from-purple-500/20 to-pink-500/20",
      textColor: "text-purple-400",
      desc: "Client endorsements",
    },
    {
      title: "Blog Articles",
      count: postsCount,
      href: "/admin/blog",
      icon: BookOpen,
      color: "from-amber-500/20 to-orange-500/20",
      textColor: "text-amber-400",
      desc: "Published tech thoughts",
    },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            System Overview & Metrics
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Real-time status of your portfolio database, projects, and contact communications.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_20px_rgba(0,255,135,0.4)] transition-all flex items-center space-x-1.5"
          >
            <span>+ New Project</span>
          </Link>
          <Link
            href="/admin/blog"
            className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.1] transition-all"
          >
            <span>Write Post</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.title}
              href={c.href}
              className="p-6 rounded-3xl bg-[#0c0f17] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 group shadow-lg flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${c.color} border border-white/[0.08] flex items-center justify-center ${c.textColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {c.unread !== undefined && c.unread > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                    {c.unread} New
                  </span>
                )}
              </div>

              <div>
                <div className="font-display font-extrabold text-3xl text-white mb-1">
                  {c.count}
                </div>
                <div className="text-xs font-medium text-zinc-300 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>{c.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] font-mono text-zinc-500 mt-1">{c.desc}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Contact Messages */}
      <div className="rounded-3xl bg-[#0c0f17] border border-white/[0.08] p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
          <div>
            <h2 className="font-display font-bold text-lg text-white">Recent Inquiries</h2>
            <p className="text-xs text-zinc-400">Incoming messages from prospective clients.</p>
          </div>
          <Link
            href="/admin/messages"
            className="text-xs font-mono uppercase tracking-widest text-cyan-400 hover:text-emerald-400 transition-colors"
          >
            View All ({messagesCount})
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <p className="text-zinc-500 text-xs py-6 text-center">No messages submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-zinc-500 font-mono uppercase tracking-wider border-b border-white/[0.06]">
                  <th className="pb-3">Sender</th>
                  <th className="pb-3">Project Type</th>
                  <th className="pb-3">Subject</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <div className="font-medium text-white">{msg.name}</div>
                      <div className="text-zinc-400 text-[11px] font-mono">{msg.email}</div>
                    </td>
                    <td className="py-4 text-zinc-300">{msg.projectType || "General"}</td>
                    <td className="py-4 text-zinc-300 max-w-xs truncate">{msg.subject}</td>
                    <td className="py-4 text-zinc-400 font-mono">{formatDate(msg.createdAt)}</td>
                    <td className="py-4 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono ${
                          msg.isRead
                            ? "bg-zinc-800 text-zinc-400"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {msg.isRead ? "Read" : "Unread"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
