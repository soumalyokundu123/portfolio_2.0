"use client";

import React, { useState, useEffect } from "react";
import { Mail, Trash2, CheckCircle2, Circle, Eye, X, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { ContactMessage } from "@/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (msg: ContactMessage) => {
    try {
      const res = await fetch(`/api/contact/${msg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !msg.isRead }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, isRead: !msg.isRead } : m))
        );
        if (activeMessage && activeMessage.id === msg.id) {
          setActiveMessage({ ...activeMessage, isRead: !msg.isRead });
        }
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete message from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (activeMessage && activeMessage.id === id) {
          setActiveMessage(null);
        }
      } else {
        alert(data.error || "Failed to delete message");
      }
    } catch (err) {
      alert("Error deleting message");
    }
  };

  const viewMessage = (msg: ContactMessage) => {
    setActiveMessage(msg);
    if (!msg.isRead) {
      toggleReadStatus(msg);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Client Inquiries & Messages
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Review incoming project proposals, collaboration invites, and commission requests.
          </p>
        </div>

        <span className="text-xs font-mono text-zinc-400">
          Total: {messages.length} messages &bull;{" "}
          <span className="text-emerald-400 font-bold">
            {messages.filter((m) => !m.isRead).length} unread
          </span>
        </span>
      </div>

      {/* Messages List */}
      <div className="rounded-3xl bg-[#0c0f17] border border-white/[0.08] overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-xs text-zinc-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="py-20 text-center text-xs text-zinc-500">No messages in inbox.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-zinc-500 font-mono uppercase tracking-wider border-b border-white/[0.06] bg-white/[0.01]">
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Sender</th>
                  <th className="py-3 px-6">Subject</th>
                  <th className="py-3 px-6">Project Type</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => viewMessage(msg)}
                    className={`cursor-pointer hover:bg-white/[0.02] transition-colors ${
                      !msg.isRead ? "bg-cyan-950/10" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleReadStatus(msg);
                        }}
                        className="text-zinc-400 hover:text-cyan-400"
                      >
                        {msg.isRead ? (
                          <CheckCircle2 className="w-4 h-4 text-zinc-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{msg.name}</div>
                      <div className="text-[11px] font-mono text-zinc-400">{msg.email}</div>
                    </td>
                    <td className="py-4 px-6 text-zinc-200 max-w-xs truncate">{msg.subject}</td>
                    <td className="py-4 px-6 text-cyan-300 font-mono">{msg.projectType || "General"}</td>
                    <td className="py-4 px-6 text-zinc-400 font-mono">{formatDate(msg.createdAt)}</td>
                    <td className="py-4 px-6 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => viewMessage(msg)}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-cyan-300"
                        title="View Full Message"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(msg.id, msg.name)}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-950/60 text-red-400"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#0d1017] border border-white/[0.1] p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div>
                <h3 className="font-display font-bold text-xl text-white">{activeMessage.subject}</h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  Received on {formatDate(activeMessage.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setActiveMessage(null)}
                className="p-2 rounded-lg bg-white/[0.04] text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div>
                  <span className="text-zinc-500 font-mono block">From</span>
                  <span className="text-white font-medium">{activeMessage.name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono block">Email</span>
                  <a
                    href={`mailto:${activeMessage.email}`}
                    className="text-cyan-400 font-medium hover:underline"
                  >
                    {activeMessage.email}
                  </a>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono block">Project Type</span>
                  <span className="text-zinc-300 font-medium">{activeMessage.projectType || "General"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono block">Budget Range</span>
                  <span className="text-emerald-400 font-medium font-mono">
                    {activeMessage.budget || "Not Specified"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-zinc-400 font-mono uppercase tracking-wider block">Message Content</span>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-zinc-200 text-sm leading-relaxed whitespace-pre-line font-sans">
                  {activeMessage.message}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`}
                  className="px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_20px_rgba(0,255,135,0.4)]"
                >
                  Reply via Email
                </a>

                <button
                  onClick={() => handleDelete(activeMessage.id, activeMessage.name)}
                  className="px-4 py-2.5 rounded-xl bg-red-950/30 hover:bg-red-950/60 text-red-400 font-semibold"
                >
                  Delete Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
