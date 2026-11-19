"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ShieldCheck, Terminal } from "lucide-react";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { name: "Projects", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Education", href: "/#education" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060709]/85 backdrop-blur-xl border-b border-white/[0.07] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-slate-900 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,242,254,0.3)]">
            <span className="font-display font-extrabold text-sm tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              SK
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-white tracking-wide text-sm md:text-base group-hover:text-cyan-300 transition-colors">
              Soumalyo Kundu
            </span>
            <span className="text-[11px] text-zinc-400 font-mono tracking-wider">
              Software Developer &bull; Java Backend
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-cyan-300 bg-cyan-950/40"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Let's Talk & Admin Link) */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/admin"
            className="flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-cyan-400 px-3 py-1.5 rounded-lg border border-white/[0.05] hover:border-cyan-500/30 transition-all"
            title="Admin Dashboard"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </Link>

          <Link href="/#contact">
            <MagneticButton className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.5)] transition-all">
              <span className="relative z-10 flex items-center space-x-1.5">
                <span>Contact Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </MagneticButton>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Link
            href="/admin"
            className="p-2 rounded-lg text-zinc-400 hover:text-cyan-400 border border-white/[0.08]"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-300 hover:text-white bg-white/[0.04] border border-white/[0.08]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0a0d14]/95 border-b border-white/[0.1] backdrop-blur-2xl px-6 py-6"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-cyan-300 hover:bg-white/[0.05] transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-white/[0.08] flex flex-col space-y-3">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-zinc-400 hover:text-cyan-400"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Gateway</span>
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
