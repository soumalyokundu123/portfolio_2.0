"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@soumalyo.dev");
  const [password, setPassword] = useState("Admin@Soumalyo2027");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#060709] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Cyber Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/5 to-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-4 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-slate-900 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-extrabold text-base shadow-[0_0_20px_rgba(0,242,254,0.3)]">
              SK
            </div>
          </Link>
          <h1 className="font-display font-extrabold text-2xl text-white tracking-tight">
            Admin Command Center
          </h1>
          <p className="text-zinc-400 text-xs mt-1">
            Sign in to manage portfolio projects, content, and inquiries.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-[#0c0f17] border border-white/[0.08] p-8 shadow-2xl relative">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center space-x-3 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@soumalyo.dev"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] focus:border-cyan-400 focus:outline-none text-white text-sm transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] focus:border-cyan-400 focus:outline-none text-white text-sm transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_25px_rgba(0,242,254,0.3)] hover:shadow-[0_0_35px_rgba(0,255,135,0.5)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick credentials hint */}
          <div className="mt-6 pt-5 border-t border-white/[0.06] text-center text-[11px] text-zinc-500">
            <span className="font-mono text-zinc-400">Default Credentials:</span>
            <div className="font-mono text-zinc-400 mt-0.5">
              admin@soumalyo.dev &bull; Admin@Soumalyo2027
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
