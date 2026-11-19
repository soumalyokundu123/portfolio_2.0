"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Sparkles, MessageCircle } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

interface ContactSectionProps {
  email?: string;
  phone?: string;
  location?: string;
}

export default function ContactSection({
  email = "soumalyokundu123@gmail.com",
  phone = "+91 98300 91233",
  location = "Kolkata, India",
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    projectType: "Backend REST API Development",
    budget: "$1,000 - $5,000",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit message");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        projectType: "Backend REST API Development",
        budget: "$1,000 - $5,000",
        message: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-[#07091a] via-[#090b24] to-[#050614] overflow-hidden">
      {/* Top Seamless Transition Divider */}
      <div className="section-divider" />

      {/* Deep Navy & Dark Violet Ambient Lighting */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-gradient-to-r from-cyan-600/12 via-indigo-600/12 to-violet-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Minimal Subtle Floating Micro-Particles */}
      <motion.div
        animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 left-[15%] w-2 h-2 rounded-full bg-cyan-400/30 blur-[1px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [12, -12, 12], x: [8, -8, 8] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-[12%] w-2.5 h-2.5 rounded-full bg-violet-400/30 blur-[1px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-[25%] w-1.5 h-1.5 rounded-full bg-emerald-400/30 blur-[1px] pointer-events-none"
      />

      {/* Subtle Animated Circuit Grid Overlay */}
      <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0c1432]/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.12)]">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                Let&apos;s Build Resilient Systems Together.
              </h2>
              <p className="mt-4 text-zinc-300 text-sm md:text-base leading-relaxed">
                Whether you have an engineering role, software development opportunity, backend microservice requirement, or want to discuss system architectures &mdash; I am always eager to connect.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <a
                href={`mailto:${email}`}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-[#0c1228]/60 border border-indigo-500/20 hover:border-cyan-400/50 backdrop-blur-xl transition-all group shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-inner">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-zinc-400">Direct Email</p>
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {email}
                  </p>
                </div>
              </a>

              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-[#0c1228]/60 border border-indigo-500/20 hover:border-emerald-400/50 backdrop-blur-xl transition-all group shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-inner">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-zinc-400">Phone</p>
                    <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {phone}
                    </p>
                  </div>
                </a>
              )}

              {location && (
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#0c1228]/60 border border-indigo-500/20 backdrop-blur-xl shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-zinc-400">Location Base</p>
                    <p className="text-sm font-semibold text-white">{location}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Premium Glassmorphism Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#0c1128]/80 border border-cyan-500/25 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,4,20,0.85)]">
              {/* Form Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-violet-500/5 to-transparent rounded-3xl pointer-events-none" />

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-6">
                Send a Message or Project Request
              </h3>

              {status === "success" && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center space-x-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Your message has been sent successfully! I will get back to you shortly.</span>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-300 flex items-center space-x-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Soumalyo Kundu"
                      className="w-full px-4 py-3 rounded-xl bg-[#080d20]/80 border border-white/[0.1] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white placeholder-zinc-500 text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#080d20]/80 border border-white/[0.1] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white placeholder-zinc-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Software Engineering Collaboration"
                    className="w-full px-4 py-3 rounded-xl bg-[#080d20]/80 border border-white/[0.1] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white placeholder-zinc-500 text-sm outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider">
                      Inquiry Category
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#080d20]/90 border border-white/[0.1] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white text-sm outline-none transition-all"
                    >
                      <option value="Backend REST API Development">Backend REST API Development</option>
                      <option value="Spring Boot / Java Architecture">Spring Boot / Java Architecture</option>
                      <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                      <option value="Engineering Job Opportunity">Engineering Job Opportunity</option>
                      <option value="Technical Consulting / Other">Technical Consulting / Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider">
                      Budget / Scope
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#080d20]/90 border border-white/[0.1] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white text-sm outline-none transition-all"
                    >
                      <option value="Flexible / Full-Time Employment">Flexible / Full-Time Employment</option>
                      <option value="<$1,000">&lt; $1,000</option>
                      <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your software project, timeline, or engineering opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-[#080d20]/80 border border-white/[0.1] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 text-white placeholder-zinc-500 text-sm outline-none transition-all resize-none"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-xl text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 text-slate-950 shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,255,135,0.5)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <span className="flex items-center justify-center space-x-2">
                    {status === "loading" ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
