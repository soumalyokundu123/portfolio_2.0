"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Cpu,
  Briefcase,
  MessageSquare,
  BookOpen,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

interface AdminSidebarProps {
  session?: any;
}

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Layers },
  { name: "Skills", href: "/admin/skills", icon: Cpu },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Blog Posts", href: "/admin/blog", icon: BookOpen },
  { name: "Messages", href: "/admin/messages", icon: Mail },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ session }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If we are on the login page, don't show the sidebar
  if (pathname === "/admin/login") {
    return null;
  }

  // If not logged in and not on login page, redirect
  if (!session && typeof window !== "undefined" && pathname !== "/admin/login") {
    router.push("/admin/login");
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0a0d14] border-b border-white/[0.08]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-bold text-xs">
            SK
          </div>
          <span className="font-display font-bold text-sm text-white">Admin Hub</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/[0.04] text-zinc-300"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`${
          mobileOpen ? "block" : "hidden"
        } md:flex flex-col w-full md:w-64 bg-[#090b10] border-r border-white/[0.08] p-6 shrink-0 z-40`}
      >
        {/* Brand */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-slate-900 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-extrabold text-sm shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            SK
          </div>
          <div>
            <h2 className="font-display font-bold text-sm text-white">Studio Admin</h2>
            <p className="text-[11px] font-mono text-emerald-400">Soumalyo Kundu</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,242,254,0.15)] font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-zinc-500"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/[0.08] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-cyan-300 hover:bg-white/[0.03] transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-4 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
