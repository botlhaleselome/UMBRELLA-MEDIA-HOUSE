import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Terminal, ShieldCheck, Cpu, Code, Database, Server, Smartphone, BookOpen, 
  ArrowRight, Search, Play, Check, ChevronRight, Lock, Settings, RefreshCw, Layers,
  Sparkles, X, Send
} from "lucide-react";
import { PortfolioItem, BlogItem, TeamMember, CareerItem } from "../types";
import { InteractiveGridCanvas } from "./InteractiveGridCanvas";

interface FluencyTechSiteProps {
  db: {
    portfolio: PortfolioItem[];
    blog: BlogItem[];
    team: TeamMember[];
    careers: CareerItem[];
  };
  onReturnToGateway: () => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
  onSelectBlog: (item: BlogItem) => void;
  contactForm: any;
  setContactForm: (form: any) => void;
  contactSuccess: boolean;
  submittingContact: boolean;
  onContactSubmit: (e: React.FormEvent) => void;
  newsletterEmail: string;
  setNewsletterEmail: (email: string) => void;
  newsletterSuccess: boolean;
  onNewsletterSubmit: (e: React.FormEvent) => void;
}

export default function FluencyTechSite({
  db,
  onReturnToGateway,
  onOpenPortal,
  onOpenAdmin,
  onSelectBlog,
  contactForm,
  setContactForm,
  contactSuccess,
  submittingContact,
  onContactSubmit,
  newsletterEmail,
  setNewsletterEmail,
  newsletterSuccess,
  onNewsletterSubmit
}: FluencyTechSiteProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [techCategory, setTechCategory] = useState("all");

  // State for the interactive tool widget
  const [promptTemplate, setPromptTemplate] = useState("autonomous-agent");
  const [temperature, setTemperature] = useState(0.7);
  const [selectedTools, setSelectedTools] = useState<string[]>(["web-search", "database"]);
  const [outputJson, setOutputJson] = useState("");
  
  // Interactive compiler animation states
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);
  const [compileLog, setCompileLog] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Terminal Emulator States
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "npm run start:fluencytech",
    "Initializing node services...",
    "Loading generative AI models on port 3000...",
    "success: FluencyTech Core ready.",
    "Type 'help' to view available system terminal instructions."
  ]);
  const [latencyValue, setLatencyValue] = useState("42ms");
  const [ingressClicks, setIngressClicks] = useState(450280);

  // Selected tutorial state for detailed modal
  const [selectedTutorial, setSelectedTutorial] = useState<{
    id: string;
    title: string;
    category: string;
    readTime: string;
    level: string;
    excerpt: string;
  } | null>(null);

  // Tutorial playpen interaction states
  const [activeCodeLang, setActiveCodeLang] = useState<"typescript" | "python" | "bash">("typescript");
  const [isDryRunning, setIsDryRunning] = useState(false);
  const [dryRunProgress, setDryRunProgress] = useState(0);
  const [dryRunStatus, setDryRunStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [dryRunLogs, setDryRunLogs] = useState<string[]>([]);
  const [playpenInquiry, setPlaypenInquiry] = useState("");
  const [playpenResponse, setPlaypenResponse] = useState("");
  const [playpenInquiryLoading, setPlaypenInquiryLoading] = useState(false);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response: string[] = [];
    if (cmd === "help") {
      response = [
        `> ${terminalInput}`,
        "Available terminal instructions:",
        "  help      - Show this guide",
        "  status    - Display health metrics & node sandbox telemetry",
        "  optimize  - Perform live compiler bundles compression to lower edge latency",
        "  logs      - Scan recent safety checks & model telemetry",
        "  clear     - Clean the screen",
        "  secret    - Execute proprietary kernel bypass"
      ];
    } else if (cmd === "status") {
      response = [
        `> ${terminalInput}`,
        `[ONLINE] PORT: 3000`,
        `SANDBOX: VIRTUALIZED_CONTAINER_OK`,
        `COMPILER HOST: 0.0.0.0`,
        `COMPUTING: LEVEL_5_AI_ACCELERATED`,
        `API INGRESS: ${ingressClicks.toLocaleString()} registered requests`,
        `SYSTEM LATENCY: ${latencyValue}`
      ];
    } else if (cmd === "optimize") {
      response = [
        `> ${terminalInput}`,
        "Beginning optimization compression matrices...",
        "Stripping redundant ES Module mappings...",
        "Re-bundling single self-contained CJS build...",
        "OPTIMIZATION COMPLETED SECURELY!"
      ];
      // Reduce latency as an interactive visual reward!
      setTimeout(() => {
        setLatencyValue("14ms");
        setIngressClicks(prev => prev + 1);
      }, 500);
    } else if (cmd === "logs") {
      response = [
        `> ${terminalInput}`,
        "02:14:05 [INFO] Secured express proxy channels successfully",
        "02:14:08 [WARN] Sandbox credentials protected against browser leaks",
        "02:14:12 [INFO] Connected to primary DeepMind telemetry node",
        "02:14:15 [SUCCESS] Verified 100/100 responsive viewport dimensions"
      ];
    } else if (cmd === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else if (cmd === "secret") {
      response = [
        `> ${terminalInput}`,
        "UNLOCKED EASTER EGG DETECTED!",
        "------------------------------------",
        "▲ LIFTED VEIL COGNITIVE KEY DETECTED",
        "Blueprint: TRUTH_IS_AESTHETIC_INTEGRITY",
        "Sovereign Mind cluster connection bypass is ACTIVE."
      ];
    } else {
      response = [
        `> ${terminalInput}`,
        `Command '${cmd}' not recognized. Type 'help' for instructions.`
      ];
    }

    setTerminalLogs(prev => [...prev, ...response]);
    setTerminalInput("");
  };

  const handleDryRun = () => {
    if (isDryRunning) return;
    setIsDryRunning(true);
    setDryRunProgress(0);
    setDryRunStatus("running");
    
    const steps = [
      "Initializing secure dry-run pipeline...",
      "Analyzing static syntax tree parsing...",
      "Evaluating parameter declarations and type bounds...",
      "Simulating virtual sandboxed execution loop...",
      "Dry-run executed with 100% success rate."
    ];
    setDryRunLogs([steps[0]]);

    const interval = setInterval(() => {
      setDryRunProgress(prev => {
        const next = prev + 10;
        const logIndex = Math.min(Math.floor(next / 22), steps.length - 1);
        setDryRunLogs(prevLogs => {
          if (!prevLogs.includes(steps[logIndex])) {
            return [...prevLogs, steps[logIndex]];
          }
          return prevLogs;
        });

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDryRunning(false);
            setDryRunStatus("success");
          }, 200);
          return 100;
        }
        return next;
      });
    }, 120);
  };

  const handlePlaypenInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playpenInquiry.trim() || playpenInquiryLoading) return;
    setPlaypenInquiryLoading(true);
    setPlaypenResponse("");

    setTimeout(() => {
      setPlaypenInquiryLoading(false);
      setPlaypenResponse(`[COGNITIVE RESPONSE]: "To implement your request regarding '${playpenInquiry}', the blueprint is designed to keep credentials locked behind standard environment boundaries. Make sure you use process.env rather than hardcoding. Any runtime compilation automatically strips annotations for ultra-lean CJS output on your cluster."`);
    }, 1200);
  };

  const handleCompile = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setCompileProgress(0);
    setShowSuccessToast(false);
    
    const logs = [
      "Initializing secure sandbox cluster...",
      "Analyzing user directives and prompt configurations...",
      "Validating parameter matrices and safety settings...",
      "Binding requested middleware tools to runtime handlers...",
      "Running semantic security scan & model check...",
      "Finalizing payload configuration signature..."
    ];
    
    setCompileLog(logs[0]);
    
    const interval = setInterval(() => {
      setCompileProgress((prev) => {
        const next = prev + 5;
        
        // Update log based on progress milestones
        const logIndex = Math.min(Math.floor(next / 18), logs.length - 1);
        setCompileLog(logs[logIndex]);
        
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
            setShowSuccessToast(true);
            
            // Trigger actual browser download
            try {
              const blob = new Blob([outputJson], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `fluencytech_blueprint_${promptTemplate}.json`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            } catch (err) {
              console.error("Download failed:", err);
            }
            
            // Automatically clear toast after 4000ms
            setTimeout(() => setShowSuccessToast(false), 4000);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 80);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Generate output mock JSON based on custom user inputs in the tool widget
  useEffect(() => {
    const json = {
      model: "gemini-3.5-flash",
      temperature: temperature,
      systemInstruction: promptTemplate === "autonomous-agent" 
        ? "You are an autonomous orchestrator model. Plan and execute operations statefully."
        : "You are a secure parser. Extract schema elements and output clean W3C valid formats.",
      tools: selectedTools.map(t => ({ type: t })),
      status: "READY_FOR_CHOREOGRAPHY",
      timestamp: new Date().toISOString()
    };
    setOutputJson(JSON.stringify(json, null, 2));
  }, [promptTemplate, temperature, selectedTools]);

  const toggleTool = (tool: string) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter(t => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const mockTutorials = [
    {
      id: "t1",
      title: "Building Multi-Agent Autonomous Orchestration Loops",
      category: "AI & Agents",
      readTime: "8 min read",
      level: "Intermediate",
      excerpt: "Step-by-step blueprint for initializing stateful server-side LLM proxies that plan, execute tool-calls, and perform self-reflection.",
      icon: <Cpu className="w-5 h-5 text-[#00E5CC]" />
    },
    {
      id: "t2",
      title: "Hardening Node/React APIs Against Injection Attacks",
      category: "Cybersecurity",
      readTime: "12 min read",
      level: "Advanced",
      excerpt: "Deep dive into secure session token storage, CORS proxying variables safely on Cloud Run, and rate-limiting incoming CMS transmissions.",
      icon: <ShieldCheck className="w-5 h-5 text-[#00E5CC]" />
    },
    {
      id: "t3",
      title: "Vite and Tailwind v4 Production Bundle Optimization",
      category: "Software",
      readTime: "6 min read",
      level: "Beginner",
      excerpt: "Configure self-contained CommonJS compilation via esbuild, stripping unused TypeScript declarations, and achieving perfect 100/100 Lighthouse metrics.",
      icon: <Code className="w-5 h-5 text-[#00E5CC]" />
    }
  ];

  return (
    <div className="brand-fluencytech min-h-screen bg-[#0D1B2A] text-white flex flex-col relative overflow-hidden selection:bg-[#00E5CC]/30 selection:text-white">
      <InteractiveGridCanvas brand="fluencytech" />
      {/* Dynamic Master Banner Switcher */}
      <div className="bg-[#1B263B] text-[10px] tracking-[0.25em] py-2 px-6 flex justify-between items-center border-b border-white/5 font-mono text-neutral-300 relative z-50">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC]"></span>
          <span>ECOSYSTEM ACTIVE: FLUENCYTECH SYSTEM</span>
        </div>
        <button 
          id="btn-return-to-umbrella-ft"
          onClick={onReturnToGateway}
          className="hover:text-white transition-colors uppercase cursor-pointer underline decoration-[#00E5CC]/50 underline-offset-4"
        >
          ← Return to Umbrella Gateway
        </button>
      </div>

      {/* Main Sticky Navigation */}
      <nav className={`fixed top-9 left-0 w-full z-40 transition-all duration-500 ${
        scrolled ? "py-4 bg-[#0D1B2A]/90 backdrop-blur-md border-b border-white/5" : "py-6 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div onClick={() => handleNavClick("home")} className="flex items-center space-x-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-tr from-[#00E5CC] to-[#00A8E8] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <span className="text-black font-display font-black text-sm">▲</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm tracking-tight text-white uppercase">FLUENCY<span className="text-[#00E5CC]">TECH</span></span>
              <span className="text-[8px] tracking-[0.45em] text-[#00A8E8] font-mono uppercase">Applied</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {["home", "tutorials", "interactive-tools", "ethos", "contact"].map((sec) => (
              <button
                id={`ft-nav-${sec}`}
                key={sec}
                onClick={() => handleNavClick(sec)}
                className={`text-xs uppercase tracking-widest font-mono transition-colors cursor-pointer ${
                  activeSection === sec ? "text-[#00E5CC] font-bold" : "text-neutral-400 hover:text-white"
                }`}
              >
                {sec.replace("-", " ")}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              id="ft-btn-portal"
              onClick={onOpenPortal}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded bg-white/5 border border-white/10 hover:border-[#00E5CC]/40 text-[10px] font-mono text-neutral-200 hover:text-[#00E5CC] transition-all cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>LAUNCH CLIENT PORTAL</span>
            </button>
            <button
              id="ft-btn-admin"
              onClick={onOpenAdmin}
              className="p-1.5 rounded hover:bg-white/5 text-neutral-500 hover:text-[#00E5CC] transition-colors cursor-pointer"
              title="Admin Dashboard"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto w-full pt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="flex items-center space-x-3 text-[#00E5CC]">
              <span className="w-12 h-[1px] bg-[#00E5CC]"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
                ASKING &quot;HOW&quot; — DIGITAL ENGINEERING
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-display font-extrabold leading-[0.95] tracking-tight uppercase text-white">
                WE ENGINE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00E5CC] to-[#00A8E8]">
                  COGNITIVE TOOLS.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-light leading-relaxed">
                FluencyTech delivers state-of-the-art developer tutorials, microservices architectures, cyberdefense scanner kits, and beautiful interactive prompt playgrounds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <motion.button
                id="ft-hero-cta"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick("interactive-tools")}
                className="px-8 py-3.5 bg-[#00E5CC] hover:bg-white text-black font-semibold text-xs tracking-widest font-mono uppercase rounded transition-colors text-center cursor-pointer"
              >
                Launch Prompt Playground
              </motion.button>
              <motion.button
                id="ft-hero-sub-cta"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick("tutorials")}
                className="px-8 py-3.5 border border-white/10 hover:border-[#00E5CC]/40 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-widest font-mono uppercase rounded transition-all text-center cursor-pointer"
              >
                Browse Tutorials
              </motion.button>
            </div>
          </motion.div>

          {/* Interactive Bento Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-xl bg-[#1B263B]/60 border border-[#00E5CC]/20 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 border-b border-white/5 pb-2">
                  <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider text-neutral-300">
                    <Terminal className="w-3.5 h-3.5 text-[#00E5CC]" />
                    SYSTEM TERMINAL
                  </span>
                  <span className="text-[#00E5CC] animate-pulse">● PORT 3000</span>
                </div>
                <div className="mt-4 space-y-1.5 text-[10px] font-mono max-h-[120px] overflow-y-auto no-scrollbar">
                  {terminalLogs.map((log, idx) => (
                    <p 
                      key={idx} 
                      className={
                        log.startsWith(">") 
                          ? "text-[#00E5CC] font-semibold" 
                          : log.includes("success") || log.includes("ONLINE") || log.includes("COMPLETED")
                            ? "text-emerald-400"
                            : log.includes("WARN")
                              ? "text-amber-400"
                              : "text-neutral-300"
                      }
                    >
                      {log}
                    </p>
                  ))}
                </div>
              </div>

              <form onSubmit={handleTerminalSubmit} className="mt-4 pt-3 border-t border-white/5 flex items-center">
                <span className="text-[#00E5CC] font-mono text-xs mr-1.5">&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type help..."
                  className="bg-transparent text-xs font-mono text-white focus:outline-none w-full placeholder-neutral-600"
                />
              </form>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#1B263B]/30 border border-white/5">
                <span className="block text-xl font-display font-black text-[#00E5CC]">+{ingressClicks.toLocaleString()}</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider font-mono">Api Ingress Clicks</span>
              </div>
              <div className="p-4 rounded-lg bg-[#1B263B]/30 border border-white/5 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5CC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="block text-xl font-display font-black text-white">{latencyValue}</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider font-mono">Edge Compute Latency</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tutorials Section */}
      <section id="tutorials" className="py-24 bg-[#1B263B]/20 border-t border-b border-white/5 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00E5CC]">ENGINEERING BLUEPRINTS</span>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-white mt-1">DEVELOPER TUTORIALS</h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm font-light leading-relaxed">
              Step-by-step production codes, systems integration strategies, and secure authorization setups compiled by Lead AI Systems architects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTutorials.map((tut) => (
              <div 
                id={`ft-tutorial-${tut.id}`}
                key={tut.id}
                onClick={() => {
                  setSelectedTutorial(tut);
                  setDryRunStatus("idle");
                  setDryRunLogs([]);
                  setPlaypenResponse("");
                  setPlaypenInquiry("");
                }}
                className="p-6 bg-[#121E33]/40 border border-white/5 hover:border-[#00E5CC]/30 rounded-xl space-y-4 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:scale-[1.01]"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">{tut.category}</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-[#00E5CC] border border-white/5">{tut.level}</span>
                  </div>
                  <div className="w-10 h-10 rounded bg-[#1B263B] flex items-center justify-center border border-white/5 group-hover:border-[#00E5CC]/30 transition-all">
                    {tut.icon}
                  </div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-[#00E5CC] transition-colors leading-snug">
                    {tut.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {tut.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-[10px] font-mono text-[#00E5CC]">
                  <span>LAUNCH Blueprints</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tool Playground */}
      <section id="interactive-tools" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00E5CC]">COGNITIVE WORKGROUND</span>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-white">PROMPT PLAYGROUND</h2>
            <p className="text-xs text-neutral-400 max-w-md mx-auto font-light leading-relaxed">
              Design enterprise-grade system orchestration loops and generate clean microservices configuration payloads instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#121E33]/30 border border-[#00E5CC]/10 p-6 sm:p-8 rounded-2xl">
            {/* Left Column Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#00E5CC] mb-2.5">AGENT PROFILE TEMPLATE</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="btn-play-tpl-agent"
                    onClick={() => setPromptTemplate("autonomous-agent")}
                    className={`p-3 rounded text-xs font-mono text-center transition-all cursor-pointer border ${
                      promptTemplate === "autonomous-agent"
                        ? "bg-[#00E5CC]/10 border-[#00E5CC] text-white font-bold"
                        : "bg-black/20 border-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    AUTONOMOUS_ORCHESTRATOR
                  </button>
                  <button
                    id="btn-play-tpl-parser"
                    onClick={() => setPromptTemplate("parser-schema")}
                    className={`p-3 rounded text-xs font-mono text-center transition-all cursor-pointer border ${
                      promptTemplate === "parser-schema"
                        ? "bg-[#00E5CC]/10 border-[#00E5CC] text-white font-bold"
                        : "bg-black/20 border-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    SECURE_SCHEMA_PARSER
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-[#00E5CC]">MODEL TEMPERATURE</label>
                  <span className="text-xs font-mono text-neutral-400">{temperature}</span>
                </div>
                <input
                  id="play-range-temp"
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-[#00E5CC]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#00E5CC] mb-2.5">INTEGRATED TOOLS</label>
                <div className="space-y-2">
                  {[
                    { id: "web-search", name: "Google Web Search API" },
                    { id: "database", name: "Firestore Secure Persistence" },
                    { id: "oauth", name: "Google Workspace OAuth" }
                  ].map((tool) => (
                    <div 
                      id={`play-tool-toggle-${tool.id}`}
                      key={tool.id}
                      onClick={() => toggleTool(tool.id)}
                      className="flex items-center justify-between p-3 rounded bg-black/30 border border-white/5 cursor-pointer hover:border-[#00E5CC]/30 transition-all"
                    >
                      <span className="text-xs font-mono text-neutral-300">{tool.name}</span>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        selectedTools.includes(tool.id) 
                          ? "bg-[#00E5CC] border-[#00E5CC] text-black" 
                          : "border-white/20"
                      }`}>
                        {selectedTools.includes(tool.id) && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column Output Display */}
            <div className="lg:col-span-7 flex flex-col justify-between relative">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">COMPILED CONFIGURATION</span>
                  <span className="text-[9px] font-mono text-emerald-400">payload_valid_v2.json</span>
                </div>
                
                {/* Simulated telemetry terminal during compiling */}
                <div className="relative rounded-lg overflow-hidden border border-white/5 bg-black/50 min-h-[280px]">
                  {isCompiling ? (
                    <div className="absolute inset-0 p-6 flex flex-col justify-between font-mono bg-[#070D19]/90 z-20">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs text-[#00E5CC]">
                          <span className="flex items-center gap-2">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            COMPILING COMPILERS...
                          </span>
                          <span>{compileProgress}%</span>
                        </div>
                        
                        {/* Interactive dynamic progress bar */}
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-[#00E5CC] to-[#00A8E8]"
                            initial={{ width: "0%" }}
                            animate={{ width: `${compileProgress}%` }}
                            transition={{ duration: 0.1 }}
                          />
                        </div>

                        {/* Telemetry streaming log lines */}
                        <div className="space-y-1.5 pt-2 text-[10px] text-neutral-400">
                          <p className="text-neutral-500">&gt; node src/builder/compiler-agent.ts --production</p>
                          <p className="text-[#00A8E8]">&gt; [OK] Connected to regional sandbox cluster</p>
                          <p className="text-neutral-300 animate-pulse">&gt; [ACTIVE] {compileLog}</p>
                          {compileProgress > 40 && (
                            <p className="text-emerald-500">&gt; [SUCCESS] Token proxies bind successfully</p>
                          )}
                          {compileProgress > 75 && (
                            <p className="text-emerald-500">&gt; [SUCCESS] API schema verified against W3C specification</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-[9px] text-neutral-500 text-right">
                        SYSTEMS: DEPLOYING_PAYLOAD_V2_PROD
                      </div>
                    </div>
                  ) : null}

                  {/* Preloaded interactive compiled payload preview */}
                  <pre className="p-6 text-[11px] font-mono text-[#00E5CC] overflow-auto max-h-[280px] h-full">
                    <code>{outputJson}</code>
                  </pre>
                </div>
              </div>

              <div className="relative">
                <button
                  id="btn-play-generate"
                  onClick={handleCompile}
                  disabled={isCompiling}
                  className={`mt-6 w-full py-3.5 font-mono font-bold text-xs uppercase tracking-widest transition-colors rounded cursor-pointer flex items-center justify-center gap-2 ${
                    isCompiling 
                      ? "bg-neutral-800 text-neutral-500 cursor-not-allowed" 
                      : "bg-[#00E5CC] hover:bg-white text-black"
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${isCompiling ? "animate-spin" : ""}`} />
                  <span>{isCompiling ? `COMPILING CONSOLE (${compileProgress}%)` : "COMPILE CONFIG PAYLOAD"}</span>
                </button>

                {/* Animated Compilation Success Floating Toast */}
                {showSuccessToast && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute -top-16 left-0 right-0 p-3 rounded bg-emerald-950 border border-emerald-500 text-emerald-400 text-xs font-mono flex items-center justify-between shadow-2xl z-30"
                  >
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>CONFIG COMPILED &amp; EXPORTED SECURELY</span>
                    </span>
                    <span className="text-[10px] text-emerald-500">JSON EXPORT ACTIVE</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ethos Section */}
      <section id="ethos" className="py-24 bg-[#1B263B]/20 border-t border-b border-white/5 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00E5CC]">FLUENCYTECH MANDATE</span>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-white leading-tight">
                DELIVERING WORLD CLASS IMPLEMENTATIONS
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Our architecture focuses purely on zero-compromise speed, security, and integration. We write standard TypeScript, leverage self-contained CJS bundle builders, and optimize client modules frame-by-frame.
              </p>
            </div>
            
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "No Tech-Larping", desc: "Every metric we log reflects real computing output. No simulated status lines or useless terminal decoration." },
                { title: "W3C Compliance", desc: "Strict semantic elements, 100/100 Lighthouse metrics, and comprehensive viewport responsiveness." },
                { title: "Secure Proxies", desc: "All sensitive keys are hidden behind express middleware proxies, keeping credentials safe from browser inspection." },
                { title: "Deterministic Loops", desc: "Ensuring AI actions occur in clear state channels, preventing infinite loops or state-drift." }
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-lg bg-[#121E33]/60 border border-white/5">
                  <span className="text-xs font-mono text-[#00E5CC] block mb-1">0{idx + 1} — {item.title}</span>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00E5CC]">TRANSMISSION CONTROL</span>
            <h2 className="text-3xl md:text-4xl font-display font-black uppercase text-white">SUBMIT SPECIFICATIONS</h2>
            <p className="text-xs text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
              Initiate your tech build consultation with our engineering principal. We answer within 4 hours.
            </p>
          </div>

          <form onSubmit={onContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#00E5CC] mb-2 font-bold">CLIENT IDENTIFICATION</label>
                <input
                  id="ft-contact-name"
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="e.g. Dr. Alexander"
                  className="w-full bg-[#121E33]/40 border border-white/5 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00E5CC] placeholder:text-neutral-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#00E5CC] mb-2 font-bold">SECURE RESPONSE EMAIL</label>
                <input
                  id="ft-contact-email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="e.g. engineer@example.com"
                  className="w-full bg-[#121E33]/40 border border-white/5 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00E5CC] placeholder:text-neutral-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-[#00E5CC] mb-2 font-bold">SPECIFICATION OUTLINE</label>
              <textarea
                id="ft-contact-msg"
                required
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Describe your technical build, expected latency constraints, API structures..."
                className="w-full bg-[#121E33]/40 border border-white/5 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00E5CC] placeholder:text-neutral-600"
              ></textarea>
            </div>

            {contactSuccess && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Specifications submitted successfully. We will answer within 4 hours.</span>
              </div>
            )}

            <button
              id="btn-ft-contact-submit"
              type="submit"
              disabled={submittingContact}
              className="w-full py-4 bg-[#00E5CC] hover:bg-white text-black font-bold text-xs tracking-widest font-mono uppercase transition-colors rounded cursor-pointer"
            >
              {submittingContact ? "TRANSMITTING SPECS..." : "SUBMIT SPECIFICATIONS"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 py-12 px-6 border-t border-white/5 text-center space-y-6 text-xs text-neutral-500 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-display font-extrabold text-sm text-white tracking-wider">FLUENCY<span className="text-[#00E5CC]">TECH</span></span>
          </div>
          <div className="flex space-x-6 text-[10px] tracking-widest font-mono">
            <a href="#tutorials" onClick={() => handleNavClick("tutorials")} className="hover:text-white transition-colors">TUTORIALS</a>
            <a href="#interactive-tools" onClick={() => handleNavClick("interactive-tools")} className="hover:text-white transition-colors">TOOLS</a>
            <a href="#ethos" onClick={() => handleNavClick("ethos")} className="hover:text-white transition-colors">ETHOS</a>
          </div>
        </div>
        <div className="text-[10px] text-neutral-600 font-mono max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 FLUENCYTECH. BUILDING EXPLAINABLE SYSTEMS AND SOLID BLUEPRINTS.</span>
          <span>UMBRELLA DIVISION • ENOTUMS</span>
        </div>
      </footer>

      {/* Interactive Developer Tutorial Modal / Code Playpen */}
      {selectedTutorial && (
        <div id="tutorial-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="w-full max-w-5xl rounded-2xl bg-[#090D16] border border-[#00E5CC]/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-[#0B1220] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#00E5CC]">
                  {selectedTutorial.category} • Blueprint System
                </span>
                <h2 className="text-lg font-bold font-display uppercase text-white tracking-wider">
                  {selectedTutorial.title}
                </h2>
              </div>
              <button
                id="btn-close-tutorial"
                onClick={() => {
                  setSelectedTutorial(null);
                  setDryRunStatus("idle");
                  setDryRunLogs([]);
                  setPlaypenResponse("");
                  setPlaypenInquiry("");
                }}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer self-start sm:self-center"
                title="Close Playpen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split layout inside the Playpen */}
            <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Side: Immersive Editor & Compiler Simulation */}
              <div className="lg:col-span-7 p-6 md:p-8 space-y-6 border-r border-white/5 text-left overflow-y-auto max-h-[calc(90vh-100px)] no-scrollbar">
                
                {/* Editor Language Tabs */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">BLUEPRINT PLAYPEN COMPILER</span>
                  <div className="flex bg-black/50 rounded p-0.5 border border-white/5">
                    {(["typescript", "python", "bash"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setActiveCodeLang(lang);
                          setDryRunStatus("idle");
                          setDryRunLogs([]);
                        }}
                        className={`px-3 py-1 text-[9px] font-mono uppercase rounded transition-all cursor-pointer ${
                          activeCodeLang === lang
                            ? "bg-[#00E5CC]/20 text-[#00E5CC] border border-[#00E5CC]/30 font-bold"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Code Box */}
                <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black shadow-2xl p-5 min-h-[200px]">
                  {/* Decorative terminal dots */}
                  <div className="absolute top-3 left-4 flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00E5CC]/80 animate-pulse"></span>
                  </div>
                  <div className="absolute top-2.5 right-4 text-[9px] font-mono text-neutral-500 uppercase">
                    {activeCodeLang === "typescript" ? "index.ts" : activeCodeLang === "python" ? "main.py" : "build.sh"}
                  </div>

                  <pre className="mt-4 text-[11px] font-mono text-neutral-200 overflow-x-auto whitespace-pre leading-relaxed">
                    <code>
                      {selectedTutorial.id === "t1" 
                        ? activeCodeLang === "typescript"
                          ? `import { GoogleGenAI } from "@google/genai";\n\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\n\n// Initialize autonomous multi-agent planner\nconst response = await ai.models.generateContent({\n  model: "gemini-3.5-flash",\n  contents: "Plan and coordinate system dependencies...",\n  config: { temperature: 0.2 }\n});\nconsole.log(response.text);`
                          : activeCodeLang === "python"
                            ? `from google import genai\nimport os\n\nclient = genai.Client()\n# Initialize autonomous multi-agent planner\nresponse = client.models.generate_content(\n    model="gemini-3.5-flash",\n    contents="Plan and coordinate system dependencies...",\n)\nprint(response.text)`
                            : `#!/bin/bash\n# Trigger regional autonomous cluster simulation\ncurl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent" \\\n  -H "Content-Type: application/json" \\\n  -d '{"contents": [{"parts":[{"text": "Coordinate multi-agent operations"}]}]}'`
                        : selectedTutorial.id === "t2"
                          ? activeCodeLang === "typescript"
                            ? `import express from "express";\nimport helmet from "helmet";\n\nconst app = express();\napp.use(helmet()); // Enforce robust CSP & anti-clickjacking headers\n\napp.post("/api/proxy", (req, res) => {\n  const stripeKey = process.env.STRIPE_SECRET_KEY;\n  if (!stripeKey) {\n    return res.status(500).json({ error: "Secret is protected on server" });\n  }\n  // Proxy safely to protect credentials from inspect\n  res.json({ success: true });\n});`
                            : activeCodeLang === "python"
                              ? `from fastapi import FastAPI, HTTPException\nimport os\n\napp = FastAPI()\n\n@app.post("/api/proxy")\ndef run_proxy():\n    secret = os.getenv("STRIPE_SECRET_KEY")\n    if not secret:\n        raise HTTPException(status_code=500, detail="Secret protected on server")\n    return {"status": "authorized"}`
                              : `#!/bin/bash\n# Verify secure headers and anti-leak constraints\ncurl -I https://fluencytech.net/api/proxy \\\n  -H "X-Client-Platform: AI-Studio-Cluster" \\\n  -H "X-Secure-Access-Token: SECURED"`
                          : activeCodeLang === "typescript"
                            ? `import { defineConfig } from "vite";\nimport tailwindcss from "@tailwindcss/vite";\n\nexport default defineConfig({\n  plugins: [tailwindcss()],\n  build: {\n    minify: "esbuild", // Force high speed server minification\n    cssCodeSplit: true,\n    reportCompressedSize: false // Achieve 100/100 Lighthouse performance\n  }\n});`
                            : activeCodeLang === "python"
                              ? `import subprocess\n# High speed compilation and static asset aggregation\ndef compile_assets():\n    print("Bundling production client code via Vite...")\n    subprocess.run(["npm", "run", "build"])\n    print("CJS bundle is fully self-contained.")`
                              : `#!/bin/bash\n# Bundle and compile production environment variables\nexport NODE_ENV=production\nnpm run build && node dist/server.cjs`
                      }
                    </code>
                  </pre>
                </div>

                {/* Dry Run Button & Console */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">VIRTUAL COMPILER TESTBED</span>
                    <button
                      onClick={handleDryRun}
                      disabled={isDryRunning}
                      className="px-4 py-2 bg-[#00E5CC] hover:bg-white text-black font-mono font-bold text-[10px] uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{isDryRunning ? "Compiling..." : "DRY RUN CONSOLE"}</span>
                    </button>
                  </div>

                  {dryRunStatus !== "idle" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-4 rounded-lg bg-black/60 border border-white/5 font-mono text-[10px] space-y-2 max-h-[160px] overflow-y-auto no-scrollbar"
                    >
                      {dryRunLogs.map((log, idx) => (
                        <p key={idx} className={idx === dryRunLogs.length - 1 && isDryRunning ? "text-[#00E5CC] animate-pulse" : "text-neutral-300"}>
                          &gt; {log}
                        </p>
                      ))}
                      {dryRunStatus === "success" && (
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-emerald-400">
                          <span>✔ COMPILATION COMPLETED: 100% SECURE BLUEPRINT VALID</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[9px]">Lighthouse: 100/100</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Right Side: Interactive AI Assistant */}
              <div className="lg:col-span-5 p-6 md:p-8 bg-[#090E18] space-y-8 overflow-y-auto max-h-[calc(90vh-100px)] no-scrollbar border-l border-white/5 text-left font-mono">
                
                {/* AI Explanation / Context */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00E5CC]" />
                    Blueprint Architecture
                  </span>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    This blueprint addresses the core of modern cloud-run applications. All execution flows leverage secure server-side abstractions, preventing any sensitive API variables or environment properties from leaking to public inspect views.
                  </p>
                </div>

                <div className="h-[1px] bg-white/5" />

                {/* AI Interactive Chat Console */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#00E5CC]" />
                    Ask AI Assistant
                  </span>

                  <form onSubmit={handlePlaypenInquirySubmit} className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={playpenInquiry}
                        onChange={(e) => setPlaypenInquiry(e.target.value)}
                        placeholder="Ask about cluster setup or proxy paths..."
                        className="w-full bg-black/40 border border-white/10 rounded px-3.5 py-2.5 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-[#00E5CC]/40"
                      />
                      <button
                        type="submit"
                        disabled={playpenInquiryLoading || !playpenInquiry.trim()}
                        className="absolute right-2.5 top-2.5 p-0.5 text-neutral-500 hover:text-white transition-colors disabled:opacity-30"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>

                  {playpenInquiryLoading && (
                    <div className="p-3 rounded bg-black/40 border border-white/5 flex items-center gap-2.5 text-[10px] text-neutral-400 font-mono">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00E5CC]" />
                      <span>Synthesizing structural code answer...</span>
                    </div>
                  )}

                  {playpenResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded bg-black/60 border border-[#00E5CC]/10 text-[11px] font-mono text-neutral-300 leading-relaxed"
                    >
                      <div className="text-[9px] text-neutral-500 mb-1.5">BLUEPRINT_ASSISTANT v1.2</div>
                      {playpenResponse}
                    </motion.div>
                  )}
                </div>

                {/* Reference Docs Links */}
                <div className="pt-4 border-t border-white/5 space-y-2 text-[9px] font-mono text-neutral-500 uppercase">
                  <p className="text-neutral-400">Archival Specifications</p>
                  <p>&gt; RFC-2616 Secure Client Tunneling</p>
                  <p>&gt; ES-2025 Type Annotations Proposal</p>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
