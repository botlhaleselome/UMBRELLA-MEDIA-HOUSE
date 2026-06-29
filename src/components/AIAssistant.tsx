import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2, Compass, ArrowRight } from "lucide-react";

interface AIAssistantProps {
  onOpenCalculator: () => void;
  onOpenConsultation: () => void;
}

export default function AIAssistant({ onOpenCalculator, onOpenConsultation }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; text: string }>>([
    {
      role: "model",
      text: "Welcome to **Lifted Veil Media**. I am **VeilAI**, your digital strategy advisor.\n\nWe design and engineer bespoke web platforms, cinematic brands, and multi-agent AI ecosystems.\n\nHow may I help reveal your extraordinary potential today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [recInput, setRecInput] = useState("");
  const [recOutput, setRecOutput] = useState<any>(null);
  const [loadingRec, setLoadingRec] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "recommend">("chat");

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || loading) return;

    if (!textToSend) setInputValue("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          chatHistory: messages,
        }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I encountered a minor interruption in my transmission. Rest assured, our lead architects are standing by at **partner@liftedveilmedia.com**.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleGetRecommendation = async () => {
    if (!recInput.trim() || loadingRec) return;
    setLoadingRec(true);
    setRecOutput(null);

    try {
      const response = await fetch("/api/ai/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDetails: recInput }),
      });
      const data = await response.json();
      setRecOutput(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRec(false);
    }
  };

  const quickPrompts = [
    { label: "Request Proposal", text: "I'd like to request a strategic proposal briefing." },
    { label: "Calculate Budget", action: onOpenCalculator },
    { label: "View Credentials", text: "What are the demo login credentials for testing?" },
  ];

  return (
    <div id="ai-assistant-root" className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          id="ai-assistant-toggle"
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-black hover:bg-neutral-900 border border-[#00d9ff]/40 text-white px-5 py-4 rounded-full shadow-[0_0_30px_rgba(0,217,255,0.25)] hover:shadow-[0_0_40px_rgba(0,217,255,0.45)] hover:border-[#00d9ff] transition-all duration-300 group cursor-pointer"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#00d9ff] rounded-full animate-ping"></span>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#00d9ff] rounded-full"></span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-medium font-display">ASK VEILAI</span>
        </button>
      )}

      {/* Main Chat Assistant Panel */}
      {isOpen && (
        <div
          id="ai-assistant-panel"
          className="w-[400px] max-w-[calc(100vw-2rem)] h-[600px] rounded-2xl glass-panel border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-fade-in"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-[#0d0d0d] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded bg-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black animate-spin-slow" />
              </div>
              <div>
                <div className="text-xs font-bold font-display uppercase tracking-wider text-white flex items-center gap-1.5">
                  VeilAI Agent
                  <span className="w-1.5 h-1.5 bg-[#00d9ff] rounded-full animate-pulse"></span>
                </div>
                <div className="text-[10px] text-[#00d9ff] font-mono uppercase tracking-widest">Cognitive Advisor</div>
              </div>
            </div>
            <button
              id="ai-assistant-close"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/5 text-[#bdbdbd] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-[#050505] border-b border-white/5 text-xs">
            <button
              id="ai-tab-chat"
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-3 text-center tracking-widest font-display font-medium uppercase border-b ${
                activeTab === "chat" ? "text-[#00d9ff] border-[#00d9ff]" : "text-white/40 border-transparent hover:text-white"
              }`}
            >
              Consultant Chat
            </button>
            <button
              id="ai-tab-recommend"
              onClick={() => setActiveTab("recommend")}
              className={`flex-1 py-3 text-center tracking-widest font-display font-medium uppercase border-b ${
                activeTab === "recommend" ? "text-[#00d9ff] border-[#00d9ff]" : "text-white/40 border-transparent hover:text-white"
              }`}
            >
              AI Scope Recommender
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[#050505]/60">
            {activeTab === "chat" ? (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-white text-black font-medium rounded-tr-none shadow-md"
                          : "bg-[#131313] text-[#bdbdbd] border border-white/5 rounded-tl-none whitespace-pre-line"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-[#131313] text-white/50 border border-white/5 rounded-xl rounded-tl-none px-4 py-3 text-xs flex items-center space-x-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00d9ff]" />
                      <span className="font-mono text-[10px] tracking-widest uppercase">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messageEndRef} />
              </>
            ) : (
              <div className="space-y-4 py-2">
                <div className="text-xs text-[#bdbdbd] leading-relaxed">
                  Describe your business objectives or technical challenges. Our real-time agent will recommend a highly optimized architectural solution and budget match.
                </div>
                <div className="space-y-2">
                  <textarea
                    id="recommendation-input"
                    value={recInput}
                    onChange={(e) => setRecInput(e.target.value)}
                    placeholder="e.g. A high-end real estate portal with virtual interactive tours and custom lead qualifications..."
                    className="w-full h-24 bg-[#131313] border border-white/5 focus:border-[#00d9ff]/40 rounded-lg p-3 text-xs text-white placeholder-white/30 focus:outline-none transition-colors"
                  ></textarea>
                  <button
                    id="btn-run-recommendation"
                    onClick={handleGetRecommendation}
                    disabled={loadingRec || !recInput.trim()}
                    className="w-full py-2.5 bg-white text-black hover:bg-[#00d9ff] disabled:bg-white/20 disabled:text-white/40 font-bold font-display text-[11px] tracking-widest uppercase rounded transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {loadingRec ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin" />
                        <span>ANALYZING STRATEGY...</span>
                      </>
                    ) : (
                      <>
                        <Compass className="w-4 h-4" />
                        <span>GENERATE RECOMMANDATION</span>
                      </>
                    )}
                  </button>
                </div>

                {recOutput && (
                  <div className="mt-4 p-4 rounded-xl bg-[#131313] border border-white/10 space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd]">CAPABILITY MATCH</span>
                      <span className="text-sm font-bold text-[#00d9ff] font-display">{recOutput.matchScore}%</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[9px] uppercase font-mono tracking-widest text-white/40">SUGGESTED SOLUTIONS</div>
                      <div className="flex flex-wrap gap-1">
                        {recOutput.suggestedServices?.map((srv: string, i: number) => (
                          <span key={i} className="text-[9px] bg-white/5 border border-white/10 text-white px-2 py-0.5 rounded">
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[9px] uppercase font-mono tracking-widest text-white/40">TECH STANDARDS</div>
                      <div className="flex flex-wrap gap-1">
                        {recOutput.techStack?.map((tech: string, i: number) => (
                          <span key={i} className="text-[9px] bg-[#00d9ff]/10 text-[#00d9ff] px-2 py-0.5 rounded font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[9px] uppercase font-mono tracking-widest text-[#00d9ff]">CONSULTANT OPINION</div>
                      <p className="text-[11px] text-[#bdbdbd] leading-relaxed italic">
                        "{recOutput.consultantOpinion}"
                      </p>
                    </div>

                    <button
                      id="btn-rec-schedule"
                      onClick={() => {
                        setIsOpen(false);
                        onOpenConsultation();
                      }}
                      className="w-full mt-2 py-2 border border-white/10 hover:border-[#00d9ff]/30 hover:bg-white/5 rounded text-white text-[10px] font-bold tracking-widest uppercase flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <span>BOOK SYNC BRIEFING</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Prompts Panel */}
          {activeTab === "chat" && (
            <div className="px-4 py-2 bg-[#0d0d0d] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((p, idx) => (
                <button
                  id={`quick-prompt-${idx}`}
                  key={idx}
                  onClick={() => {
                    if (p.action) {
                      p.action();
                      setIsOpen(false);
                    } else if (p.text) {
                      handleSendMessage(p.text);
                    }
                  }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-[10px] text-white/70 hover:text-white transition-all cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          {activeTab === "chat" && (
            <div className="p-3 border-t border-white/5 bg-[#0d0d0d] flex items-center space-x-2">
              <input
                id="ai-chat-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                placeholder="Brief your consultant agent..."
                className="flex-1 bg-[#131313] text-xs text-white placeholder-white/30 rounded-lg px-3 py-2 border border-white/5 focus:outline-none focus:border-[#00d9ff]/40 transition-colors"
              />
              <button
                id="ai-send-message"
                onClick={() => handleSendMessage()}
                disabled={loading || !inputValue.trim()}
                className="p-2 bg-white disabled:bg-white/20 text-black disabled:text-white/40 rounded-lg hover:bg-[#00d9ff] transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
