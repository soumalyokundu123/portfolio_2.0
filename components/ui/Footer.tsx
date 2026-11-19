"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, ArrowUp, Mail, Phone, MapPin, Globe } from "lucide-react";

interface FooterProps {
  socialLinks?: Array<{ platform: string; url: string }>;
  email?: string;
  phone?: string;
  location?: string;
}

export default function Footer({
  socialLinks = [],
  email = "soumalyokundu123@gmail.com",
  phone = "+91 98300 91233",
  location = "Kolkata, India",
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#050614] to-[#03040a] border-t border-cyan-500/20 pt-20 pb-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-[140px] pointer-events-none" />

      {/* Subtle Micro-Grid */}
      <div className="absolute inset-0 bg-cyber-grid-subtle opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-slate-900 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.15)]">
                <span className="font-display font-extrabold text-sm text-cyan-300">SK</span>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-wide">
                Soumalyo Kundu
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              Software Developer & Java Backend Engineer with hands-on experience developing secure RESTful APIs, Spring Boot microservices, ASP.NET Core modules, and PostgreSQL databases.
            </p>
            <div className="flex items-center space-x-2 pt-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Software Engineering & Backend Roles</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300">Navigation Index</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/#projects" className="hover:text-cyan-400 transition-colors">
                  Software Projects
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-cyan-400 transition-colors">
                  Profile & Background
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-cyan-400 transition-colors">
                  Technical Stack
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-cyan-400 transition-colors">
                  Career Milestones
                </Link>
              </li>
              <li>
                <Link href="/#education" className="hover:text-cyan-400 transition-colors">
                  Academic Education
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-cyan-400 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300">Direct Inquiries</h4>
            <ul className="space-y-3 text-xs font-mono text-zinc-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-cyan-300 transition-colors truncate">
                  {email}
                </a>
              </li>
              {phone && (
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={`tel:${phone}`} className="hover:text-emerald-300 transition-colors">
                    {phone}
                  </a>
                </li>
              )}
              {location && (
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{location}</span>
                </li>
              )}
            </ul>

            <div className="pt-2">
              <Link
                href="/admin/login"
                className="text-[11px] font-mono text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                &bull; Admin Control Portal &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} Soumalyo Kundu. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-zinc-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
