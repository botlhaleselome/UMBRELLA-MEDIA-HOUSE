import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, Globe, Compass, Monitor, Cpu, Layers, Camera, TrendingUp, BookOpen, 
  ArrowRight, Mail, Phone, Calendar, Lock, Settings, ChevronRight, Check, AlertCircle, PlayCircle 
} from "lucide-react";
import { PortfolioItem, BlogItem, TeamMember, CareerItem, TestimonialItem } from "../types";
import { InteractiveGridCanvas } from "./InteractiveGridCanvas";

interface LiftedVeilSiteProps {
  db: {
    portfolio: PortfolioItem[];
    blog: BlogItem[];
    team: TeamMember[];
    careers: CareerItem[];
    testimonials: TestimonialItem[];
  };
  onReturnToGateway: () => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
  onSelectCaseStudy: (item: PortfolioItem) => void;
  onSelectBlog: (item: BlogItem) => void;
  onBookConsultation: () => void;
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

export default function LiftedVeilSite({
  db,
  onReturnToGateway,
  onOpenPortal,
  onOpenAdmin,
  onSelectCaseStudy,
  onSelectBlog,
  onBookConsultation,
  contactForm,
  setContactForm,
  contactSuccess,
  submittingContact,
  onContactSubmit,
  newsletterEmail,
  setNewsletterEmail,
  newsletterSuccess,
  onNewsletterSubmit
}: LiftedVeilSiteProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

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

  const categories = ["All", "AI", "Websites", "Branding", "Marketing", "Video"];
  const filteredPortfolio = activeCategory === "All"
    ? db.portfolio
    : db.portfolio.filter((p) => p.category === activeCategory);

  return (
    <div className="brand-liftedveil min-h-screen bg-[#0A0A0A] text-[#F5F0E8] flex flex-col relative overflow-hidden selection:bg-[#C9A84C]/30 selection:text-white">
      <InteractiveGridCanvas brand="liftedveil" />
      {/* Dynamic Master Banner Switcher */}
      <div className="bg-black text-[10px] tracking-[0.25em] py-2 px-6 flex justify-between items-center border-b border-white/5 font-mono text-neutral-400 relative z-50">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></span>
          <span>ECOSYSTEM ACTIVE: LIFTED VEIL MEDIA</span>
        </div>
        <button 
          id="btn-return-to-umbrella-lv"
          onClick={onReturnToGateway}
          className="hover:text-white transition-colors uppercase cursor-pointer underline decoration-[#C9A84C]/50 underline-offset-4"
        >
          ← Return to Umbrella Gateway
        </button>
      </div>

      {/* Main Sticky Navigation */}
      <nav className={`fixed top-9 left-0 w-full z-40 transition-all duration-500 ${
        scrolled ? "py-4 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5" : "py-6 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div onClick={() => handleNavClick("home")} className="flex items-center space-x-2.5 cursor-pointer group">
            <div className="w-8 h-8 rounded-sm bg-[#C9A84C] flex items-center justify-center transition-transform duration-700 group-hover:rotate-180">
              <span className="text-black font-serif-luxury font-bold text-base">◈</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury font-medium text-sm tracking-widest text-[#F5F0E8]">LIFTED VEIL</span>
              <span className="text-[9px] tracking-[0.3em] text-[#C9A84C] font-mono">MEDIA</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {["home", "about", "portfolio", "essays", "contact"].map((sec) => (
              <button
                id={`lv-nav-${sec}`}
                key={sec}
                onClick={() => handleNavClick(sec)}
                className={`text-xs uppercase tracking-widest font-mono transition-colors cursor-pointer ${
                  activeSection === sec ? "text-[#C9A84C] font-medium" : "text-neutral-400 hover:text-white"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              id="lv-btn-portal"
              onClick={onOpenPortal}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]/20 text-[10px] font-mono text-neutral-200 hover:text-white transition-all cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#C9A84C]" />
              <span>PORTAL</span>
            </button>
            <button
              id="lv-btn-admin"
              onClick={onOpenAdmin}
              className="p-1.5 rounded-full hover:bg-white/5 text-neutral-500 hover:text-[#C9A84C] transition-colors cursor-pointer"
              title="Admin Dashboard"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto w-full pt-32 relative z-10">
        {/* Cinematic drifting ambient philosophy text ticker in the background */}
        <div className="absolute left-0 right-0 top-1/4 pointer-events-none overflow-hidden select-none opacity-[0.02] z-0">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap text-[12vw] font-serif-luxury font-black uppercase tracking-[0.15em]"
          >
            TRUTH • CLARITY • ESSENCE • FORM • AESTHETIC • INTELLECT • INDEPENDENCE • COGNITION • TRUTH • CLARITY • ESSENCE
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 18 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="flex items-center space-x-3 text-[#C9A84C]">
              <span className="w-12 h-[1px] bg-[#C9A84C]"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
                ASKING &quot;WHY&quot; — DIGITAL INTELLECT
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-serif-luxury font-bold leading-[0.95] tracking-tight uppercase text-white">
                WE REVEAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F0E8] via-[#C9A84C] to-neutral-700">
                  EXTRAORDINARY.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-400 max-w-xl font-light leading-relaxed">
                Lifted Veil Media helps forward-thinking enterprises, creators, and brands reveal their true authority online. We build world-class brands, responsive digital identities, and beautiful long-form publications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <motion.button
                id="lv-hero-cta"
                whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick("contact")}
                className="px-8 py-3.5 bg-[#C9A84C] hover:bg-[#F5F0E8] text-black font-semibold text-xs tracking-widest uppercase rounded-sm transition-all text-center cursor-pointer"
              >
                Inquire With Us
              </motion.button>
              <motion.button
                id="lv-hero-sub-cta"
                whileHover={{ scale: 1.02, borderColor: "#C9A84C" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick("portfolio")}
                className="px-8 py-3.5 border border-white/10 bg-white/5 hover:bg-white/10 text-[#F5F0E8] font-semibold text-xs tracking-widest uppercase rounded-sm transition-all text-center cursor-pointer"
              >
                View Our Portfolio
              </motion.button>
            </div>
          </motion.div>

          {/* Luxury Graphic Interactive Visual */}
          <div className="lg:col-span-5 flex flex-col justify-end space-y-4">
            <div className="glass-panel border border-[#C9A84C]/10 p-6 rounded-xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse"></div>
              <span className="text-[9px] font-mono text-neutral-500 tracking-widest uppercase">Ecosystem Core Status</span>
              
              <div className="mt-4 space-y-3 font-mono text-[11px] text-neutral-400">
                <div className="flex justify-between items-center">
                  <span>CHANNEL TYPE</span>
                  <span className="text-white font-semibold">EDITORIAL & PHILOSOPHY</span>
                </div>
                <div className="h-[1px] bg-white/5"></div>
                <div className="flex justify-between items-center">
                  <span>CURRENCY</span>
                  <span className="text-[#C9A84C] font-semibold">TRUTH & AUTHORITY</span>
                </div>
                <div className="h-[1px] bg-white/5"></div>
                <div className="flex justify-between items-center">
                  <span>DURABLE SECURE PERSISTENCE</span>
                  <span className="text-emerald-400 font-semibold">ONLINE</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#121212] border border-white/5">
                <span className="block text-xl font-serif-luxury font-bold text-[#C9A84C]">+180%</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Brand Value Expansion</span>
              </div>
              <div className="p-4 rounded-lg bg-[#121212] border border-white/5">
                <span className="block text-xl font-serif-luxury font-bold text-white">99.8%</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Lighthouse Performance</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Ethos Section */}
      <section id="about" className="py-24 border-t border-white/5 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#C9A84C]">THE EDITORIAL VISION</span>
              <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold tracking-tight uppercase text-white mt-2 leading-tight">
                WE DO NOT PANDER <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-[#F5F0E8]">
                  WE REVEAL.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-end">
              <p className="text-md text-neutral-400 leading-relaxed font-light">
                As detailed in our Media Ecosystem Blueprint, most contemporary platforms either dilute concepts behind gatekeepers or simplify narratives for quick clicks. We reject this. We combine cinematic brand integrity with rigorous critical analysis to produce experiences that feel permanent.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { t: "Truth Over Comfort", d: "We publish and design what can be defended. Accuracy and honesty are non-negotiable architectural mandates." },
              { t: "Depth Over Virality", d: "We focus on long-form, timeless relevance, ignoring standard modular news cycles and fleeting micro-trends." },
              { t: "Independence Over Approval", d: "Zero corporate sponsors dictating output. No algorithmic compromise or low-quality content mills." },
              { t: "Craft Over Content Farms", d: "Form matters precisely as much as content. Every layout and line of code is produced with strict intention." }
            ].map((p, idx) => (
              <div key={idx} className="p-6 bg-[#121212]/50 border border-white/5 rounded-xl space-y-3 hover:border-[#C9A84C]/20 transition-all duration-300">
                <span className="font-mono text-xs text-[#C9A84C]">0{idx + 1}</span>
                <h4 className="text-sm font-bold font-serif-luxury uppercase tracking-wider text-white">{p.t}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">{p.d}</p>
              </div>
            ))}
          </div>

          {/* Team Members */}
          <div className="pt-12 space-y-8">
            <div className="text-center">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C9A84C]">THE INTELLECTUAL COGNITIVE CORE</span>
              <h3 className="text-2xl font-serif-luxury font-bold uppercase text-white mt-1">MEET THE LEAD EDITORS</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {db.team.map((mem) => (
                <div key={mem.id} className="group flex flex-col items-center text-center space-y-4">
                  <div className="w-36 h-36 rounded-full overflow-hidden border border-white/10 group-hover:border-[#C9A84C]/40 transition-all duration-500 relative">
                    <img src={mem.imageUrl} alt={mem.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#C9A84C]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div>
                    <h5 className="font-serif-luxury font-bold text-sm uppercase text-white tracking-wider">{mem.name}</h5>
                    <p className="text-[10px] font-mono text-[#C9A84C] uppercase tracking-widest">{mem.role}</p>
                    <p className="text-xs text-neutral-400 mt-2 font-light max-w-xs">{mem.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Cases */}
      <section id="portfolio" className="py-24 bg-[#0F0F0F] border-t border-b border-white/5 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#C9A84C]">CAPABILITIES ARCHIVE</span>
              <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold uppercase text-white mt-1">EDITORIAL CASE STUDIES</h2>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 pt-4 md:pt-0">
              {categories.map((cat) => (
                <button
                  id={`lv-cat-btn-${cat}`}
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#C9A84C] text-black font-semibold"
                      : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <div 
                id={`lv-case-study-${item.id}`}
                key={item.id}
                onClick={() => onSelectCaseStudy(item)}
                className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-[#C9A84C]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[9px] font-mono text-[#C9A84C] border border-white/10 uppercase tracking-widest">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-grow">
                  <h4 className="text-md font-serif-luxury font-bold uppercase tracking-wide text-white group-hover:text-[#C9A84C] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {item.subHeadline}
                  </p>
                </div>

                <div className="p-6 pt-0 flex justify-between items-center text-[10px] font-mono text-[#C9A84C] border-t border-white/5">
                  <span className="uppercase tracking-widest">Read Strategic Brief</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Essays / Blog */}
      <section id="essays" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#C9A84C]">LONG-FORM REFLECTION</span>
            <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold uppercase text-white">THE UNVEILED DIARY</h2>
            <p className="text-xs text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
              Timeless digital essays examining structural philosophy, modern kinetic aesthetics, and the cognitive alignment of artificial agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {db.blog.slice(0, 3).map((art) => (
              <div 
                id={`lv-essay-${art.id}`}
                key={art.id}
                onClick={() => onSelectBlog(art)}
                className="bg-[#121212]/40 border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-[#C9A84C]/30 transition-all duration-300 group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-[#0A0A0A] px-2.5 py-1 rounded text-[8px] font-mono text-[#C9A84C]">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <span className="text-[9px] font-mono text-neutral-500 block uppercase tracking-widest">{art.date} • {art.readTime}</span>
                  <h3 className="text-base font-serif-luxury font-bold text-white group-hover:text-[#C9A84C] transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                  <div className="pt-2 flex items-center text-[10px] font-mono text-[#C9A84C] group-hover:underline decoration-[#C9A84C]/40 underline-offset-4 uppercase tracking-widest gap-1">
                    <span>Read Full Essay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast Player Promo */}
      <section className="py-20 bg-[#121212] border-t border-b border-white/5 px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[9px] font-mono text-[#C9A84C] tracking-widest uppercase">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>THE LIFTED VEIL COMMENTARY</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif-luxury font-semibold uppercase text-white leading-snug">
              THE INTELLECTUAL PODCAST STATION
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Tune into weekly audio essays questioning structural society, systems of automation, and media aesthetics. Hosted by design principal Sora Sterling.
            </p>
          </div>
          <button
            id="btn-lv-podcast-play"
            onClick={() => alert("Podcast player is initializing... Check back soon!")}
            className="px-6 py-3.5 bg-white text-black font-semibold text-xs tracking-widest font-mono uppercase hover:bg-[#C9A84C] hover:text-black transition-colors rounded-sm cursor-pointer whitespace-nowrap"
          >
            PLAY LATEST VOLUME
          </button>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#C9A84C]">SECURE TRANSMISSION</span>
            <h2 className="text-3xl md:text-4xl font-serif-luxury font-bold uppercase text-white">SUBMIT BRIEFING</h2>
            <p className="text-xs text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
              Initiate your creative strategy project. All transmissions are reviewed with absolute confidentiality.
            </p>
          </div>

          <form onSubmit={onContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#C9A84C] mb-2">FULL NAME</label>
                <input
                  id="lv-contact-name"
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="e.g. Julien Thorne"
                  className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-3 text-xs text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]/40 placeholder:text-neutral-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#C9A84C] mb-2">EMAIL ADDRESS</label>
                <input
                  id="lv-contact-email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="e.g. partner@example.com"
                  className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-3 text-xs text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]/40 placeholder:text-neutral-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-[#C9A84C] mb-2">PROJECT DESCRIPTION & ETHOS</label>
              <textarea
                id="lv-contact-msg"
                required
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Describe your vision, budget range, and timeline..."
                className="w-full bg-[#121212] border border-white/5 rounded-lg px-4 py-3 text-xs text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]/40 placeholder:text-neutral-600"
              ></textarea>
            </div>

            {contactSuccess && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Briefing submitted successfully. We will answer within 4 hours.</span>
              </div>
            )}

            <button
              id="btn-lv-contact-submit"
              type="submit"
              disabled={submittingContact}
              className="w-full py-4 bg-[#C9A84C] hover:bg-white text-black font-bold text-xs tracking-widest font-mono uppercase transition-colors rounded-lg cursor-pointer"
            >
              {submittingContact ? "TRANSMITTING BRIEFING..." : "SUBMIT BRIEFING SECURELY"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-6 border-t border-white/5 text-center space-y-6 text-xs text-neutral-500 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-serif-luxury text-sm font-semibold text-white tracking-widest">LIFTED VEIL MEDIA</span>
          </div>
          <div className="flex space-x-6 text-[10px] tracking-widest font-mono">
            <a href="#about" onClick={() => handleNavClick("about")} className="hover:text-white transition-colors">ETHOS</a>
            <a href="#portfolio" onClick={() => handleNavClick("portfolio")} className="hover:text-white transition-colors">ARCHIVE</a>
            <a href="#essays" onClick={() => handleNavClick("essays")} className="hover:text-white transition-colors">DIARY</a>
          </div>
        </div>
        <div className="text-[10px] text-neutral-600 font-mono max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 LIFTED VEIL MEDIA. UNVEILING EXTRAORDINARY REVELATIONS.</span>
          <span>UMBRELLA DIVISION • ENOTUMS</span>
        </div>
      </footer>
    </div>
  );
}
