import React, { useState } from "react";
import { Sparkles, Calculator, Loader2, ClipboardCheck, MessageSquarePlus, RefreshCw } from "lucide-react";

interface EstimateCalculatorProps {
  onOpenConsultation: () => void;
}

export default function EstimateCalculator({ onOpenConsultation }: EstimateCalculatorProps) {
  // Modules
  const [modules, setModules] = useState([
    { id: "web", name: "Immersive Website / WebApp", cost: 25000, active: true },
    { id: "brand", name: "Bespoke Brand Identity System", cost: 12000, active: false },
    { id: "ai", name: "Cognitive AI Agents & Automation", cost: 35000, active: false },
    { id: "video", name: "Cinematic Videography & Drone Footage", cost: 8000, active: false },
    { id: "marketing", name: "Strategic Digital Growth & SEO", cost: 10000, active: false },
  ]);

  // Variables
  const [pages, setPages] = useState(5);
  const [animLevel, setAnimLevel] = useState("Cinema"); // Normal, High, Cinema
  const [integrations, setIntegrations] = useState(2);

  // Proposal variables
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [aiProposalText, setAiProposalText] = useState("");
  const [loadingProposal, setLoadingProposal] = useState(false);

  // Toggle Module
  const toggleModule = (id: string) => {
    setModules(
      modules.map((m) => {
        if (m.id === id) {
          // Keep at least one active
          const activeCount = modules.filter((mod) => mod.active).length;
          if (m.active && activeCount <= 1) return m;
          return { ...m, active: !m.active };
        }
        return m;
      })
    );
  };

  // Calculations
  const calculateTotal = () => {
    let base = modules.reduce((acc, m) => (m.active ? acc + m.cost : acc), 0);
    
    // Add page costs if web is active
    if (modules.find((m) => m.id === "web")?.active) {
      base += (pages - 1) * 1500;
    }

    // Animation levels multipliers
    if (animLevel === "Cinema") base += 8000;
    else if (animLevel === "High") base += 4000;

    // Integrations complexity
    base += integrations * 3000;

    const lowEstimate = Math.round(base * 0.9);
    const highEstimate = Math.round(base * 1.15);
    const months = Math.ceil(base / 18000);

    return {
      low: lowEstimate,
      high: highEstimate,
      months: months < 1 ? 1 : months,
    };
  };

  const { low, high, months } = calculateTotal();

  // Call Server Proposal API
  const handleGenerateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || loadingProposal) return;
    setLoadingProposal(true);
    setAiProposalText("");

    const activeServices = modules.filter((m) => m.active).map((m) => m.name).join(", ");
    const budgetRange = `$${low.toLocaleString()} - $${high.toLocaleString()}`;

    try {
      const response = await fetch("/api/ai/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          company: clientCompany,
          email: clientEmail,
          projectType: activeServices,
          budget: budgetRange,
          message: projectBrief || `Requesting a luxury ${activeServices} system to be launched in ${months} months.`,
        }),
      });

      const data = await response.json();
      setAiProposalText(data.text);
    } catch (err) {
      console.error(err);
      setAiProposalText("Strategic brief compilation error. We will email you instead.");
    } finally {
      setLoadingProposal(false);
    }
  };

  return (
    <div id="calculator-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Input Form */}
      <div className="lg:col-span-7 bg-[#131313] border border-white/5 p-6 md:p-8 rounded-xl backdrop-blur-sm shadow-2xl space-y-6">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00d9ff]">INTERACTIVE SYSTEM</span>
          <h3 className="text-xl font-bold font-display uppercase tracking-wider text-white mt-1">CONFIGURATOR & ESTIMATOR</h3>
          <p className="text-xs text-[#bdbdbd] mt-2">
            Select your brand, immersive media, and cognitive automation capabilities. Our system calculates resource allocations in real-time.
          </p>
        </div>

        {/* Services Selectors */}
        <div className="space-y-3">
          <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50">ENGAGE CAPABILITIES</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modules.map((m) => (
              <button
                id={`calc-module-${m.id}`}
                key={m.id}
                onClick={() => toggleModule(m.id)}
                className={`p-4 rounded border text-left transition-all relative overflow-hidden flex flex-col justify-between h-24 cursor-pointer select-none ${
                  m.active
                    ? "bg-white/5 border-[#00d9ff] text-white shadow-[0_0_15px_rgba(0,217,255,0.05)]"
                    : "bg-black/40 border-white/5 text-[#bdbdbd] hover:border-white/10 hover:text-white"
                }`}
              >
                <span className="text-[11px] font-bold tracking-wider uppercase pr-4">{m.name}</span>
                <span className="text-xs font-mono text-[#00d9ff] font-semibold">
                  From ${m.cost.toLocaleString()}
                </span>
                {m.active && (
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#00d9ff] rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Adjustments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Slider for Pages (if website is active) */}
          <div className={modules.find((m) => m.id === "web")?.active ? "" : "opacity-30 pointer-events-none"}>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd]">SCOPE PAGES / VIEWS</label>
              <span className="text-xs font-mono font-bold text-[#00d9ff]">{pages} views</span>
            </div>
            <input
              id="calc-pages-slider"
              type="range"
              min="1"
              max="20"
              value={pages}
              onChange={(e) => setPages(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00d9ff]"
            />
          </div>

          {/* Slider for Integrations */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd]">CUSTOM API CHANNELS</label>
              <span className="text-xs font-mono font-bold text-[#00d9ff]">{integrations} links</span>
            </div>
            <input
              id="calc-integrations-slider"
              type="range"
              min="0"
              max="10"
              value={integrations}
              onChange={(e) => setIntegrations(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00d9ff]"
            />
          </div>
        </div>

        {/* Dropdown for Animation levels */}
        <div className="pt-2">
          <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">MOTION DESIGN PRECISION</label>
          <div className="grid grid-cols-3 gap-2">
            {["Functional", "High Fidelity", "Cinema"].map((lvl) => (
              <button
                id={`calc-motion-${lvl.replace(" ", "-")}`}
                key={lvl}
                onClick={() => setAnimLevel(lvl)}
                className={`py-2 px-3 border rounded text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  animLevel === lvl
                    ? "bg-[#00d9ff]/10 border-[#00d9ff] text-white"
                    : "bg-black/30 border-white/5 text-[#bdbdbd] hover:border-white/10 hover:text-white"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Live Estimate & AI Proposal Generation */}
      <div className="lg:col-span-5 space-y-6">
        {/* Dynamic Cost Panel */}
        <div className="bg-gradient-to-br from-[#131313] to-[#0d0d0d] border border-white/10 p-6 md:p-8 rounded-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00d9ff]/5 rounded-full blur-2xl"></div>
          
          <div className="flex items-center space-x-2 text-[#00d9ff] mb-4">
            <Calculator className="w-4 h-4" />
            <span className="text-[10px] uppercase font-mono tracking-widest">ALIGNED ESTIMATION RANGE</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl md:text-4xl font-display font-bold text-white tracking-tighter">
              ${low.toLocaleString()} — ${high.toLocaleString()}
            </span>
            <p className="text-[10px] text-[#bdbdbd] tracking-widest uppercase font-mono">ESTIMATED RESOURCE ALLOCATION</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-5 mt-5">
            <div>
              <span className="block text-[9px] uppercase tracking-widest font-mono text-white/40 mb-1">VELOCITY FOCUS</span>
              <span className="text-xs font-bold text-white uppercase">{months} to {months + 1} months</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest font-mono text-white/40 mb-1">QUALITY STANDARD</span>
              <span className="text-xs font-bold text-[#00d9ff] uppercase">Awwwards / AAA</span>
            </div>
          </div>
        </div>

        {/* Generate AI Proposal form */}
        <div className="bg-[#131313] border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center space-x-2 text-white">
            <Sparkles className="w-4 h-4 text-[#00d9ff] animate-pulse-slow" />
            <h4 className="text-xs uppercase font-display font-bold tracking-widest">Generate Strategic AI Proposal</h4>
          </div>

          <p className="text-[10px] text-[#bdbdbd] leading-relaxed">
            Provide your brief details. Our integrated server AI agent will construct a comprehensive executive deliverable summary instantaneously.
          </p>

          <form onSubmit={handleGenerateProposal} className="space-y-3 pt-1">
            <div className="grid grid-cols-2 gap-2">
              <input
                id="calc-client-name"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                placeholder="Your Name *"
                className="w-full bg-black border border-white/5 focus:border-[#00d9ff]/30 rounded p-2 text-xs text-white placeholder-white/20 focus:outline-none"
              />
              <input
                id="calc-client-company"
                type="text"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                placeholder="Company / Product"
                className="w-full bg-black border border-white/5 focus:border-[#00d9ff]/30 rounded p-2 text-xs text-white placeholder-white/20 focus:outline-none"
              />
            </div>
            <input
              id="calc-client-email"
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
              placeholder="Partner Email *"
              className="w-full bg-black border border-white/5 focus:border-[#00d9ff]/30 rounded p-2 text-xs text-white placeholder-white/20 focus:outline-none"
            />
            <textarea
              id="calc-client-brief"
              value={projectBrief}
              onChange={(e) => setProjectBrief(e.target.value)}
              placeholder="Optional: Enter unique features or target goals..."
              className="w-full h-16 bg-black border border-white/5 focus:border-[#00d9ff]/30 rounded p-2 text-xs text-white placeholder-white/20 focus:outline-none"
            ></textarea>

            <button
              id="btn-generate-ai-proposal"
              type="submit"
              disabled={loadingProposal || !clientName || !clientEmail}
              className="w-full py-3 bg-white hover:bg-[#00d9ff] disabled:bg-white/10 disabled:text-white/30 text-black font-bold font-display text-[10px] tracking-widest uppercase rounded transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              {loadingProposal ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>COMPILING PROPOSAL...</span>
                </>
              ) : (
                <>
                  <ClipboardCheck className="w-4 h-4" />
                  <span>COMPILE STRATEGIC BRIEF</span>
                </>
              )}
            </button>
          </form>

          {/* AI Proposal text output */}
          {aiProposalText && (
            <div className="mt-4 p-4 rounded-lg bg-black border border-white/10 max-h-[220px] overflow-y-auto no-scrollbar space-y-2 animate-fade-in">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[8px] uppercase tracking-widest font-mono text-[#00d9ff]">AI-GENERATED PROPOSAL PROTOTYPE</span>
                <button
                  id="calc-reset-proposal"
                  onClick={() => setAiProposalText("")}
                  className="text-[8px] uppercase font-mono text-white/40 hover:text-white flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" /> Reset
                </button>
              </div>
              <div className="text-[11px] text-[#bdbdbd] leading-relaxed whitespace-pre-line prose prose-invert font-light">
                {aiProposalText}
              </div>
              <div className="pt-3 border-t border-white/5 flex gap-2">
                <button
                  id="calc-book-with-proposal"
                  onClick={onOpenConsultation}
                  className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[9px] uppercase tracking-widest font-bold text-white text-center flex items-center justify-center gap-1 cursor-pointer"
                >
                  <MessageSquarePlus className="w-3 h-3 text-[#00d9ff]" /> Book consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
