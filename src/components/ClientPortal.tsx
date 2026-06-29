import React, { useState } from "react";
import { Lock, CheckCircle2, Circle, Clock, CreditCard, Send, Download, LogOut, Check } from "lucide-react";
import { ClientPortalProject } from "../types";

interface ClientPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientPortal({ isOpen, onClose }: ClientPortalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [project, setProject] = useState<ClientPortalProject | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageText, setMessageText] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsLoggedIn(true);
        setProject(data.project);
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch (err) {
      setError("Server connection failure.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !project) return;
    const newMsg = {
      sender: "You (Partner)",
      text: messageText,
      date: "Just now"
    };
    setProject({
      ...project,
      messages: [...project.messages, newMsg]
    });
    setMessageText("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProject(null);
    setEmail("");
    setPassword("");
  };

  if (!isOpen) return null;

  return (
    <div id="client-portal-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-md font-sans">
      <div className="w-full max-w-4xl rounded-2xl glass-panel border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-[#0d0d0d] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded bg-[#00d9ff]/10 border border-[#00d9ff]/20 flex items-center justify-center">
              <Lock className="w-4.5 h-4.5 text-[#00d9ff]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/50 font-mono">SECURE PLATFORM</div>
              <h2 className="text-lg font-bold font-display uppercase text-white tracking-wider">CLIENT COGNITIVE SPACE</h2>
            </div>
          </div>
          <button
            id="portal-close"
            onClick={onClose}
            className="px-4 py-2 text-xs uppercase tracking-widest text-[#bdbdbd] hover:text-white hover:bg-white/5 border border-white/10 rounded-full transition-all cursor-pointer"
          >
            EXIT SPACE
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar bg-[#050505]/40">
          {!isLoggedIn ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-12">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold font-display text-white uppercase tracking-wider mb-2">ACCESS COGNITIVE PORTAL</h3>
                <p className="text-xs text-[#bdbdbd] leading-relaxed">
                  Enter your corporate partner keys below. For demonstration, utilize:
                  <br />
                  <span className="font-mono text-[#00d9ff] bg-white/5 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                    client@example.com / clientpass
                  </span>
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">PARTNER EMAIL</label>
                  <input
                    id="portal-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="client@example.com"
                    className="w-full bg-[#131313] border border-white/10 focus:border-[#00d9ff]/40 rounded-sm px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">PASSWORD PIN</label>
                  <input
                    id="portal-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#131313] border border-white/10 focus:border-[#00d9ff]/40 rounded-sm px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                  />
                </div>

                {error && (
                  <div className="text-xs text-red-400 bg-red-400/5 border border-red-400/10 rounded-sm p-3 font-medium">
                    {error}
                  </div>
                )}

                <button
                  id="portal-submit-login"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-white hover:bg-[#00d9ff] text-black font-bold font-display text-xs tracking-widest uppercase rounded-sm transition-all shadow-[0_4px_20px_rgba(255,255,255,0.05)] cursor-pointer"
                >
                  {loading ? "AUTHENTICATING KEY..." : "ENGAGE ACCESS PORTAL"}
                </button>
              </form>
            </div>
          ) : (
            /* Logged In Dashboard View */
            <div className="space-y-8">
              {/* Project Title and Progress Card */}
              {project && (
                <div className="p-6 rounded-xl bg-[#131313] border border-white/5 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#00d9ff] uppercase">{project.status}</span>
                      <h3 className="text-2xl font-bold font-display text-white tracking-wider uppercase mt-1">{project.name}</h3>
                    </div>
                    <button
                      id="portal-logout"
                      onClick={handleLogout}
                      className="flex items-center space-x-1.5 text-xs text-white/50 hover:text-[#00d9ff] transition-colors self-start md:self-center cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>LOGOUT</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#bdbdbd] uppercase tracking-wider">PROJECT VELOCITY</span>
                      <span className="text-white font-bold">{project.progress}% COMPLETE</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neutral-500 to-[#00d9ff] rounded-full transition-all duration-1000"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid: Milestones & Accounts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Milestones / Checklist */}
                <div className="p-6 rounded-xl bg-[#131313] border border-white/5 space-y-4">
                  <h4 className="text-xs uppercase font-display font-bold tracking-widest text-white/60">Milestone Map</h4>
                  <div className="space-y-3">
                    {project?.milestones.map((mil, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs">
                        {mil.completed ? (
                          <CheckCircle2 className="w-4.5 h-4.5 text-[#00d9ff] shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4.5 h-4.5 text-white/20 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`font-medium ${mil.completed ? "text-white" : "text-white/40"}`}>{mil.name}</p>
                          <p className="text-[10px] text-white/30 font-mono">{mil.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ledger / Payments */}
                <div className="p-6 rounded-xl bg-[#131313] border border-white/5 space-y-4">
                  <h4 className="text-xs uppercase font-display font-bold tracking-widest text-white/60">Ledger Status</h4>
                  <div className="space-y-3">
                    {project?.invoices.map((inv, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-4 h-4 text-white/40" />
                          <div>
                            <p className="text-xs font-mono font-medium text-white">{inv.id}</p>
                            <p className="text-[10px] text-white/30">{inv.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-white">{inv.amount}</p>
                          <span
                            className={`inline-block text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded mt-1 ${
                              inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                            }`}
                          >
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Grid: Shared Files & Messages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Secure Files Repository */}
                <div className="p-6 rounded-xl bg-[#131313] border border-white/5 space-y-4">
                  <h4 className="text-xs uppercase font-display font-bold tracking-widest text-white/60">Creative Assets</h4>
                  <div className="space-y-3">
                    {project?.files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-white/5">
                        <div className="min-w-0 flex-1 pr-3">
                          <p className="text-xs font-medium text-white truncate">{file.name}</p>
                          <p className="text-[10px] text-white/30 font-mono mt-0.5">{file.size} • {file.date}</p>
                        </div>
                        <button
                          onClick={() => alert(`Initiating secure download: ${file.name}`)}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-[#00d9ff] hover:text-white transition-colors cursor-pointer"
                          title="Download File"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Realtime Partner Message Stream */}
                <div className="p-6 rounded-xl bg-[#131313] border border-white/5 flex flex-col h-[280px]">
                  <h4 className="text-xs uppercase font-display font-bold tracking-widest text-white/60 mb-3">Sync Thread</h4>
                  <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-2 no-scrollbar">
                    {project?.messages.map((msg, idx) => (
                      <div key={idx} className={`p-2.5 rounded-lg text-xs leading-relaxed ${msg.sender.includes("You") ? "bg-white/5 border border-white/10 ml-6" : "bg-black/40 border border-white/5 mr-6"}`}>
                        <div className="flex justify-between items-center mb-1 text-[9px] font-mono text-white/40 uppercase">
                          <span className={msg.sender.includes("You") ? "text-[#00d9ff]" : "text-white/60"}>{msg.sender}</span>
                          <span>{msg.date}</span>
                        </div>
                        <p className="text-[#bdbdbd]">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                      placeholder="Add message to sync stream..."
                      className="flex-1 bg-black text-xs text-white placeholder-white/20 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-[#00d9ff]/30 transition-colors"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="p-2 bg-white disabled:bg-white/10 text-black disabled:text-white/30 rounded-lg hover:bg-[#00d9ff] transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
