import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Monitor,
  Camera,
  Layers,
  Search,
  MessageSquare,
  ChevronRight,
  Check,
  Calendar,
  DollarSign,
  User,
  Mail,
  Briefcase,
  Phone,
  Clock,
  MapPin,
  Compass,
  FileText,
  Trash2,
  Plus,
  LogOut,
  ChevronDown,
  X,
  Lock,
  Globe,
  Settings,
  ShieldCheck,
  Award,
  BookOpen,
  Sliders,
  Type,
  RefreshCw,
  PlayCircle,
  Send
} from "lucide-react";

import { motion } from "motion/react";

// Sub-components
import Navigation from "./components/Navigation";
import ClientPortal from "./components/ClientPortal";
import AIAssistant from "./components/AIAssistant";
import EstimateCalculator from "./components/EstimateCalculator";
import BrandGateway from "./components/BrandGateway";
import LiftedVeilSite from "./components/LiftedVeilSite";
import FluencyTechSite from "./components/FluencyTechSite";
import { PortfolioItem, BlogItem, TeamMember, CareerItem, TestimonialItem, ContactRequest, ConsultationBooking } from "./types";

export default function App() {
  // Ecosystem Active Brand State
  const [activeBrand, setActiveBrand] = useState<"liftedveil" | "fluencytech" | null>(null);

  // Navigation State
  const [activeSection, setActiveSection] = useState("home");
  
  // DB Local Copy State
  const [db, setDb] = useState<{
    portfolio: PortfolioItem[];
    blog: BlogItem[];
    team: TeamMember[];
    careers: CareerItem[];
    testimonials: TestimonialItem[];
    contactRequests: ContactRequest[];
    newsletterSubscribers: any[];
    consultations: ConsultationBooking[];
  }>({
    portfolio: [],
    blog: [],
    team: [],
    careers: [],
    testimonials: [],
    contactRequests: [],
    newsletterSubscribers: [],
    consultations: []
  });

  // Modal control states
  const [portalOpen, setPortalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<PortfolioItem | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [applyingJob, setApplyingJob] = useState<CareerItem | null>(null);

  // Interactive Cinematic Reading Studio states
  const [readingFont, setReadingFont] = useState<"serif" | "sans" | "mono">("serif");
  const [readingSize, setReadingSize] = useState<"sm" | "base" | "lg">("base");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthProgress, setSynthProgress] = useState(0);
  const [synthSummary, setSynthSummary] = useState("");
  const [synthStepMsg, setSynthStepMsg] = useState("");
  const [inquiryText, setInquiryText] = useState("");
  const [inquiryResponse, setInquiryResponse] = useState("");
  const [inquiryLoading, setInquiryLoading] = useState(false);

  // Home Hero Tagline Rotator
  const taglines = [
    "The Future of Creative.",
    "Where Vision Meets Innovation.",
    "Designed Beyond Expectations."
  ];
  const [taglineIndex, setTaglineIndex] = useState(0);

  // Portfolio filters
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Blog states
  const [blogSearch, setBlogSearch] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("All");

  // Contact briefing form state
  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    budget: "$25,000 - $50,000",
    projectType: "Websites",
    timeline: "1-2 Months",
    message: ""
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [submittingContact, setSubmittingContact] = useState(false);

  // Newsletter form state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Career application form state
  const [careerForm, setCareerForm] = useState({
    name: "",
    email: "",
    resumeUrl: "",
    portfolioUrl: "",
    note: ""
  });
  const [careerSuccess, setCareerSuccess] = useState(false);

  // Consultation Booking state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    company: "",
    date: "2026-07-01",
    timeSlot: "10:00 AM - 11:00 AM",
    brief: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Admin section states
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminActiveTab, setAdminActiveTab] = useState<"requests" | "subscribers" | "consultations" | "portfolio" | "blog">("requests");

  // Admin CMS edit forms
  const [cmsEditPortfolio, setCmsEditPortfolio] = useState<Partial<PortfolioItem> | null>(null);
  const [cmsEditBlog, setCmsEditBlog] = useState<Partial<BlogItem> | null>(null);

  // Rotate Hero Tagline
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Fetch Database
  const fetchDb = async () => {
    try {
      const response = await fetch("/api/db");
      if (response.ok) {
        const data = await response.json();
        setDb(data);
      }
    } catch (err) {
      console.error("Database loading failure:", err);
    }
  };

  useEffect(() => {
    fetchDb();
  }, []);

  // Handle Essay Synthesis and AI deep inquiry
  const handleSynthEssay = () => {
    if (isSynthesizing || !selectedBlog) return;
    setIsSynthesizing(true);
    setSynthProgress(0);
    setSynthSummary("");
    
    const steps = [
      "Securing analytical access to essay contents...",
      "Extracting critical themes and rhetorical structure...",
      "Evaluating semantic relations against cognitive corpus...",
      "Synthesizing high-fidelity executive insights...",
      "Drafting final structured commentary..."
    ];
    setSynthStepMsg(steps[0]);

    const interval = setInterval(() => {
      setSynthProgress((prev) => {
        const next = prev + 5;
        const stepIndex = Math.min(Math.floor(next / 20), steps.length - 1);
        setSynthStepMsg(steps[stepIndex]);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSynthesizing(false);
            setSynthSummary(`### LIFTED VEIL COGNITIVE COMMENTARY\n\n* **Primary Thesis**: This essay critically evaluates the friction between human agency and structured automation. The author argues that premium aesthetic integration combined with rigorous semantic frameworks acts as the primary driver of digital authority.\n* **Key Takeaway**: To excel in the modern landscape, contemporary platforms must reject generic modular layouts in favor of intentional, custom-crafted digital architectures.\n* **Rhetorical Strength**: Written with elevated documentary prose, the text balances empirical technology standards with humanistic philosophical inquiry.`);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 80);
  };

  const handleBlogInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim() || inquiryLoading) return;
    setInquiryLoading(true);
    setInquiryResponse("");

    setTimeout(() => {
      setInquiryLoading(false);
      setInquiryResponse(`[COGNITIVE RESPONSE]: "In addressing '${inquiryText}', the essay's core logic highlights that aesthetic depth is not a cosmetic ornament, but rather an ontological layer. Truly explainable systems establish trust precisely because their visual and logical interfaces are designed with deliberate, transparent, and non-panderous intent."`);
    }, 1500);
  };

  // Handle Contact Submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingContact(true);
    setContactSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });
      if (response.ok) {
        setContactSuccess(true);
        setContactForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          budget: "$25,000 - $50,000",
          projectType: "Websites",
          timeline: "1-2 Months",
          message: ""
        });
        fetchDb();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingContact(false);
    }
  };

  // Handle Newsletter Submit
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });
      if (response.ok) {
        setNewsletterSuccess(true);
        setNewsletterEmail("");
        fetchDb();
        setTimeout(() => setNewsletterSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Booking Submit
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm)
      });
      if (response.ok) {
        setBookingSuccess(true);
        setBookingForm({
          name: "",
          email: "",
          company: "",
          date: "2026-07-01",
          timeSlot: "10:00 AM - 11:00 AM",
          brief: ""
        });
        fetchDb();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Admin Login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: adminUsername, password: adminPassword })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setAdminLoggedIn(true);
        setAdminUsername("");
        setAdminPassword("");
      } else {
        setAdminError(data.error || "Access Denied.");
      }
    } catch (err) {
      setAdminError("Authentication server offline.");
    }
  };

  // CMS: Delete item
  const handleDeleteCmsItem = async (collection: "portfolio" | "blog", id: string) => {
    if (!confirm(`Are you certain you wish to purge this item from the ${collection} ledger?`)) return;
    try {
      const response = await fetch("/api/cms/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection, id })
      });
      if (response.ok) {
        fetchDb();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CMS: Save Portfolio Item
  const handleSavePortfolioItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmsEditPortfolio) return;

    const completeItem = {
      id: cmsEditPortfolio.id || Date.now().toString(),
      title: cmsEditPortfolio.title || "New Platform",
      category: cmsEditPortfolio.category || "Websites",
      subHeadline: cmsEditPortfolio.subHeadline || "Bespoke automation system",
      description: cmsEditPortfolio.description || "No description provided.",
      challenge: cmsEditPortfolio.challenge || "No challenge defined.",
      strategy: cmsEditPortfolio.strategy || "No strategy defined.",
      results: cmsEditPortfolio.results || "No results provided.",
      metrics: cmsEditPortfolio.metrics || { conversion: "+20%" },
      imageUrl: cmsEditPortfolio.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
    };

    try {
      const response = await fetch("/api/cms/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: "portfolio", item: completeItem })
      });
      if (response.ok) {
        setCmsEditPortfolio(null);
        fetchDb();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CMS: Save Blog Item
  const handleSaveBlogItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmsEditBlog) return;

    const completeItem = {
      id: cmsEditBlog.id || Date.now().toString(),
      title: cmsEditBlog.title || "Unveiled Thought",
      category: cmsEditBlog.category || "Design",
      slug: cmsEditBlog.slug || "unveiled-thought",
      excerpt: cmsEditBlog.excerpt || "Short reading snippet",
      content: cmsEditBlog.content || "# Unveiled Thought\n\nFull essay text goes here.",
      date: cmsEditBlog.date || "June 29, 2026",
      readTime: cmsEditBlog.readTime || "3 min read",
      author: cmsEditBlog.author || "Lead Architect",
      imageUrl: cmsEditBlog.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
    };

    try {
      const response = await fetch("/api/cms/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: "blog", item: completeItem })
      });
      if (response.ok) {
        setCmsEditBlog(null);
        fetchDb();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00d9ff]/20 selection:text-white font-sans flex flex-col relative overflow-hidden">
      
      {/* Dynamic Brand Rendering Switcher */}
      {activeBrand === null ? (
        <BrandGateway 
          onSelectBrand={(brand) => {
            setActiveBrand(brand);
            document.body.className = brand === "liftedveil" ? "brand-liftedveil" : "brand-fluencytech";
          }} 
        />
      ) : activeBrand === "liftedveil" ? (
        <LiftedVeilSite
          db={db}
          onReturnToGateway={() => {
            setActiveBrand(null);
            document.body.className = "";
          }}
          onOpenPortal={() => setPortalOpen(true)}
          onOpenAdmin={() => setAdminOpen(true)}
          onSelectCaseStudy={setSelectedCaseStudy}
          onSelectBlog={setSelectedBlog}
          onBookConsultation={() => setBookingOpen(true)}
          contactForm={contactForm}
          setContactForm={setContactForm}
          contactSuccess={contactSuccess}
          submittingContact={submittingContact}
          onContactSubmit={handleContactSubmit}
          newsletterEmail={newsletterEmail}
          setNewsletterEmail={setNewsletterEmail}
          newsletterSuccess={newsletterSuccess}
          onNewsletterSubmit={handleNewsletterSubmit}
        />
      ) : (
        <FluencyTechSite
          db={db}
          onReturnToGateway={() => {
            setActiveBrand(null);
            document.body.className = "";
          }}
          onOpenPortal={() => setPortalOpen(true)}
          onOpenAdmin={() => setAdminOpen(true)}
          onSelectBlog={setSelectedBlog}
          contactForm={contactForm}
          setContactForm={setContactForm}
          contactSuccess={contactSuccess}
          submittingContact={submittingContact}
          onContactSubmit={handleContactSubmit}
          newsletterEmail={newsletterEmail}
          setNewsletterEmail={setNewsletterEmail}
          newsletterSuccess={newsletterSuccess}
          onNewsletterSubmit={handleNewsletterSubmit}
        />
      )}

      {false && (
        <>
          {/* Immersive Atmospheric Radial Glow Backgrounds */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#00D9FF]/5 blur-[140px] animate-pulse-slow"></div>
            <div className="absolute top-[30%] left-[-15%] w-[500px] h-[500px] rounded-full bg-white/2 blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[10%] w-[700px] h-[700px] rounded-full bg-[#00D9FF]/3 blur-[160px]"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          </div>

          {/* Main Sticky Navigation */}
          <Navigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            openPortal={() => setPortalOpen(true)}
            openAdmin={() => setAdminOpen(true)}
          />

      {/* ----------------- HOME HERO SECTION ----------------- */}
      <header id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto w-full pt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Headline Block */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="flex items-center space-x-3 text-[#00d9ff]">
              <span className="w-12 h-[1px] bg-[#00d9ff]"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] font-mono animate-pulse">
                {taglines[taglineIndex]}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-display font-bold leading-[0.95] tracking-tighter uppercase">
                WE REVEAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-700">
                  EXTRAORDINARY.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#bdbdbd] max-w-xl font-light leading-relaxed">
                Lifted Veil Media helps forward-thinking enterprises, creators, and brands reveal their true authority online. We build world-class brands, responsive digital identities, and scalable cognitive AI systems.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#contact"
                onClick={() => setActiveSection("contact")}
                className="px-8 py-4 bg-white hover:bg-[#00d9ff] text-black font-bold text-xs tracking-widest uppercase rounded-sm hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-all duration-300 text-center"
              >
                Start Your Project
              </a>
              <a
                href="#portfolio"
                onClick={() => setActiveSection("portfolio")}
                className="px-8 py-4 border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold text-xs tracking-widest uppercase rounded-sm transition-all text-center"
              >
                View Our Work
              </a>
            </div>
          </div>

          {/* Luxury Graphic Interactive Visual (Bento Preview) */}
          <div className="lg:col-span-5 flex flex-col justify-end space-y-4">
            <div className="glass-panel border border-white/5 p-6 rounded-xl relative overflow-hidden shadow-2xl animate-glow">
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse"></div>
              <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">System Core Status</span>
              
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60 font-mono">PRIMARY DOMAIN</span>
                  <span className="text-white font-bold font-mono">LIFTED_VEIL_ONLINE</span>
                </div>
                <div className="h-[1px] bg-white/5"></div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60 font-mono">AI AGENT ENGINE</span>
                  <span className="text-[#00d9ff] font-bold font-mono">ACTIVE (VEILAI)</span>
                </div>
                <div className="h-[1px] bg-white/5"></div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60 font-mono">DURABLE SECURE PERSISTENCE</span>
                  <span className="text-emerald-400 font-bold font-mono">CONNECTED</span>
                </div>
              </div>
            </div>

            {/* Minor highlights row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#131313] border border-white/5">
                <span className="block text-xl font-display font-bold text-[#00d9ff]">+180%</span>
                <span className="text-[9px] text-[#bdbdbd] uppercase tracking-wider">Avg Brand Value Growth</span>
              </div>
              <div className="p-4 rounded-lg bg-[#131313] border border-white/5">
                <span className="block text-xl font-display font-bold text-white">99.8%</span>
                <span className="text-[9px] text-[#bdbdbd] uppercase tracking-wider">Lighthouse Speed Rating</span>
              </div>
            </div>
          </div>

        </div>

        {/* Brand partners row (Trusted By) */}
        <div className="mt-24 border-t border-white/5 pt-12">
          <p className="text-[10px] text-[#bdbdbd] uppercase tracking-[0.3em] text-center mb-8 font-mono">
            TRUSTED BY ELITE GLOBAL TEAMS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale contrast-200">
            {["AETHERIS", "CHRONOS SWISS", "ONYX SOUND", "VERDANT CO", "ZEPHYR AV", "FLUENCYTECH"].map((b, i) => (
              <span key={i} className="font-display font-black tracking-[0.25em] text-sm select-none hover:text-white hover:opacity-100 transition-all">
                {b}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ----------------- ABOUT SECTION (INCORPORATING BLUEPRINT PHILSOPHY) ----------------- */}
      <section id="about" className="py-32 border-t border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00d9ff]">OUR ETHOS</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight uppercase text-white mt-2">
                WE DO NOT PANDER <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bdbdbd] to-white">
                  WE REVEAL.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-end">
              <p className="text-md text-[#bdbdbd] leading-relaxed font-light">
                As detailed in our **Media Ecosystem Blueprint**, most media and technical agencies either over-complicate processes or dumb insight down behind gatekeepers. We exist to close that gap. Our core focus combines critical social commentary with highly advanced technical execution.
              </p>
            </div>
          </div>

          {/* Core Philosophy Column Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { t: "Truth Over Comfort", d: "We publish and design what can be defended. Accuracy and honesty are non-negotiable architectural mandates." },
              { t: "Depth Over Virality", d: "We focus on long-form, timeless relevance, ignoring standard modular news cycles and fleeting micro-trends." },
              { t: "Independence Over Approval", d: "Zero corporate sponsors dictating output. No algorithmic compromise or low-quality content mills." },
              { t: "Craft Over Content Farms", d: "Form matters precisely as much as content. Every layout and line of code is produced with strict intention." }
            ].map((p, idx) => (
              <div key={idx} className="p-6 bg-[#131313]/50 border border-white/5 rounded-xl space-y-3 glass-panel-hover transition-all duration-300">
                <span className="font-mono text-xs text-[#00d9ff]">0{idx + 1}</span>
                <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white">{p.t}</h4>
                <p className="text-xs text-[#bdbdbd] leading-relaxed font-light">{p.d}</p>
              </div>
            ))}
          </div>

          {/* Meet The Team Section */}
          <div className="pt-12 space-y-8">
            <div className="text-center">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#bdbdbd]">THE INTELLECTUAL COGNITIVE CORE</span>
              <h3 className="text-2xl font-display font-bold uppercase text-white mt-1">MEET OUR PRINCIPALS</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {db.team?.map((mem) => (
                <div key={mem.id} className="group flex flex-col items-center text-center space-y-4">
                  <div className="w-40 h-40 rounded-full overflow-hidden border border-white/10 group-hover:border-[#00d9ff]/40 transition-all duration-500 relative">
                    <img src={mem.imageUrl} alt={mem.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#00d9ff]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm uppercase text-white tracking-wider">{mem.name}</h5>
                    <p className="text-[11px] font-mono text-[#00d9ff] uppercase tracking-widest">{mem.role}</p>
                    <p className="text-xs text-[#bdbdbd] mt-2 font-light max-w-xs">{mem.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- SERVICES SECTION ----------------- */}
      <section id="services" className="py-32 bg-[#0D0D0D] border-t border-b border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00d9ff]">CAPABILITIES DIRECTORY</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white mt-2">TECHNICAL SOLUTIONS</h2>
            </div>
            <p className="text-xs text-[#bdbdbd] max-w-md font-light leading-relaxed">
              We deliver complete digital transformations, bridging editorial luxury design with state-of-the-art server-side integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Monitor className="w-6 h-6 text-[#00d9ff]" />,
                title: "Website Design & Development",
                list: ["Immersive SPA / Next.js builds", "Inertial scroll systems", "Responsive multi-viewport fit", "Pixel-perfect grid alignment"]
              },
              {
                icon: <Cpu className="w-6 h-6 text-[#00d9ff]" />,
                title: "Cognitive AI Automation",
                list: ["Autonomous multi-agent chains", "Server-side LLM secure proxying", "Custom Prompt Engineering", "Lead intelligence qualifying"]
              },
              {
                icon: <Layers className="w-6 h-6 text-[#00d9ff]" />,
                title: "Brand Strategy & Identity",
                list: ["Bespoke Typographic blueprints", "Space Grotesk pairing", "Monochrome asset vector guides", "Authority alignment planning"]
              },
              {
                icon: <Camera className="w-6 h-6 text-[#00d9ff]" />,
                title: "Media Content Production",
                list: ["Cinematic documentary film", "High-altitude drone capture", "Editorial horizontal imagery", "Audio-reactive micro-synthesizers"]
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-[#00d9ff]" />,
                title: "Growth Optimization & SEO",
                list: ["100/100 Lighthouse execution", "Topic-cluster indexing architecture", "Semantic keyword matching", "W3C accessibility guidelines"]
              },
              {
                icon: <Sparkles className="w-6 h-6 text-[#00d9ff]" />,
                title: "Business Strategy & Consultation",
                list: ["Dual-brand structure planning", "Monetization pathway drafting", "Targeted audience capture analysis", "Burnout mitigation pipelines"]
              }
            ].map((srv, i) => (
              <div key={i} className="p-8 rounded-xl bg-[#131313] border border-white/5 space-y-6 glass-panel-hover relative overflow-hidden group">
                <div className="w-12 h-12 rounded bg-black flex items-center justify-center border border-white/5 group-hover:border-[#00d9ff]/30 transition-all duration-300">
                  {srv.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-md font-display font-bold uppercase tracking-wider text-white">
                    {srv.title}
                  </h3>
                  <div className="h-[1px] w-12 bg-[#00d9ff] group-hover:w-full transition-all duration-500"></div>
                </div>

                <ul className="space-y-2 text-xs text-[#bdbdbd] font-light">
                  {srv.list.map((li, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#00d9ff] rounded-full"></span>
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- PORTFOLIO SECTION ----------------- */}
      <section id="portfolio" className="py-32 relative z-10 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00d9ff]">OUR CHRONICLES</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white mt-2">FEATURED WORKS</h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {["All", "Websites", "Branding", "Video", "AI"].map((cat) => (
                <button
                  id={`portfolio-filter-${cat}`}
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase border transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#00d9ff]/15 border-[#00d9ff] text-white"
                      : "bg-[#131313]/40 border-white/5 text-[#bdbdbd] hover:border-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {db.portfolio
              ?.filter((item) => activeCategory === "All" || item.category === activeCategory)
              ?.map((item) => (
                <div
                  id={`portfolio-card-${item.id}`}
                  key={item.id}
                  onClick={() => setSelectedCaseStudy(item)}
                  className="group rounded-xl overflow-hidden bg-[#131313]/60 border border-white/5 cursor-pointer relative flex flex-col justify-between h-[450px]"
                >
                  {/* Image wrapper */}
                  <div className="h-56 w-full overflow-hidden relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#050505]/30 group-hover:bg-[#050505]/10 transition-colors"></div>
                    <span className="absolute top-4 left-4 bg-black/70 border border-white/10 text-[#00d9ff] text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  {/* Context wrapper */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-display font-bold uppercase tracking-wider text-white group-hover:text-[#00d9ff] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#bdbdbd] line-clamp-2 leading-relaxed font-light">
                        {item.subHeadline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      {/* Show metrics values */}
                      <div className="flex gap-4">
                        {Object.entries(item.metrics || {}).slice(0, 2).map(([key, val]) => (
                          <div key={key}>
                            <span className="block text-[8px] uppercase tracking-wider text-white/40 font-mono">{key}</span>
                            <span className="text-[11px] font-mono font-semibold text-[#00d9ff]">{val}</span>
                          </div>
                        ))}
                      </div>

                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] group-hover:text-white transition-colors flex items-center gap-1">
                        VIEW METHOD <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* ----------------- INTERACTIVE ESTIMATOR & CALCULATOR ----------------- */}
      <section className="py-32 bg-[#0D0D0D] border-t border-b border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00d9ff]">BUDGET CALCULATOR</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-white">ALIGN YOUR ALLOCATIONS</h2>
            <p className="text-xs text-[#bdbdbd] font-light leading-relaxed">
              Estimate your branding systems, immersive web platforms, and custom cognitive agent loops. Get instant range feedback and optionally compile an AI strategic proposal briefing.
            </p>
          </div>

          <EstimateCalculator onOpenConsultation={() => setBookingOpen(true)} />
        </div>
      </section>

      {/* ----------------- INSIGHTS / BLOG SECTION ----------------- */}
      <section id="blog" className="py-32 relative z-10 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00d9ff]">PUBLISHED INK</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white mt-2">LATEST ESSAYS</h2>
            </div>

            {/* Filters and search box */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/30" />
                <input
                  id="blog-search-input"
                  type="text"
                  placeholder="Search articles..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="bg-[#131313] border border-white/5 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30 w-52"
                />
              </div>

              <div className="flex gap-1.5">
                {["All", "Design", "Branding", "AI"].map((cat) => (
                  <button
                    id={`blog-cat-${cat}`}
                    key={cat}
                    onClick={() => setSelectedBlogCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-[9px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                      selectedBlogCategory === cat
                        ? "bg-white text-black"
                        : "bg-[#131313] border border-white/5 text-[#bdbdbd] hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Articles list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {db.blog
              ?.filter((art) => selectedBlogCategory === "All" || art.category === selectedBlogCategory)
              ?.filter((art) => art.title.toLowerCase().includes(blogSearch.toLowerCase()) || art.excerpt.toLowerCase().includes(blogSearch.toLowerCase()))
              ?.map((art) => (
                <article
                  id={`blog-card-${art.id}`}
                  key={art.id}
                  onClick={() => setSelectedBlog(art)}
                  className="p-6 rounded-xl bg-[#131313]/40 border border-white/5 space-y-4 hover:border-white/10 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="h-44 rounded-lg overflow-hidden relative">
                      <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-black/80 px-2.5 py-1 rounded text-[9px] text-white/60 font-mono tracking-widest uppercase">
                        {art.category}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-[#00d9ff] uppercase tracking-widest block">{art.date}</span>
                      <h3 className="text-md font-display font-bold uppercase tracking-wider text-white hover:text-[#00d9ff] transition-colors leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-[#bdbdbd] line-clamp-3 leading-relaxed font-light">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">{art.readTime}</span>
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">By {art.author.split(",")[0]}</span>
                  </div>
                </article>
              ))}
          </div>

          {/* Newsletter Sign Up Box */}
          <div className="p-8 rounded-xl bg-gradient-to-r from-[#131313] to-[#0D0D0D] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
            <div className="space-y-2 max-w-xl">
              <span className="text-[9px] font-mono text-[#00d9ff] uppercase tracking-[0.25em] block">THE CURATED VEIL</span>
              <h3 className="text-xl font-display font-bold uppercase text-white tracking-wider">SUBSCRIBE TO OUR THINKING</h3>
              <p className="text-xs text-[#bdbdbd] font-light leading-relaxed">
                Join our private ledger of thinkers, creators, and engineers receiving weekly briefings on digital commentary ("Why") and system tutorials ("How").
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto shrink-0">
              <input
                id="newsletter-email-input"
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Partner email pin"
                className="bg-black border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30 w-full md:w-64"
              />
              <button
                id="btn-newsletter-subscribe"
                type="submit"
                className="px-6 py-3 bg-white text-black hover:bg-[#00d9ff] font-bold text-xs uppercase tracking-widest rounded transition-colors cursor-pointer whitespace-nowrap"
              >
                {newsletterSuccess ? "SUBSCRIBED" : "SUBSCRIBE"}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ----------------- CAREERS SECTION ----------------- */}
      <section id="careers" className="py-32 bg-[#0D0D0D] border-t border-b border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00d9ff]">VACANT LEDGERS</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-white">BUILD WITH INTENTION</h2>
            <p className="text-xs text-[#bdbdbd] font-light">
              We seek masters of motion design, scalable enterprise architecture, and generative pipeline choreographers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {db.careers?.map((car) => (
              <div
                id={`career-card-${car.id}`}
                key={car.id}
                className="p-6 rounded-xl bg-[#131313] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-[#00d9ff]/25 transition-all duration-300"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-mono uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#00d9ff]">
                      {car.department}
                    </span>
                    <span className="text-[9px] font-mono uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#bdbdbd]">
                      {car.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold uppercase tracking-wider text-white group-hover:text-[#00d9ff] transition-colors">
                    {car.title}
                  </h3>
                  <p className="text-xs text-[#bdbdbd] font-light leading-relaxed">
                    {car.description}
                  </p>
                </div>

                <button
                  id={`btn-apply-career-${car.id}`}
                  onClick={() => setApplyingJob(car)}
                  className="px-6 py-3 bg-white/5 hover:bg-white border border-white/10 text-white hover:text-black font-bold text-[10px] tracking-widest uppercase rounded transition-all cursor-pointer whitespace-nowrap self-stretch md:self-center text-center"
                >
                  APPLY POSITION
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- CONTACT SECTION & BRACE SYSTEM ----------------- */}
      <section id="contact" className="py-32 relative z-10 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Col: Details & FAQ */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#00d9ff]">SECURE COMMUNIQUE</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white leading-none">
                  INITIATE A BRIEFING
                </h2>
                <p className="text-xs text-[#bdbdbd] font-light leading-relaxed">
                  We answer tailored briefings within 4 hours. Connect with our leading strategist today.
                </p>
              </div>

              {/* Business details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-xs">
                  <Mail className="w-4.5 h-4.5 text-[#00d9ff]" />
                  <span className="font-mono text-white hover:text-[#00d9ff] cursor-pointer">partner@liftedveilmedia.com</span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <MapPin className="w-4.5 h-4.5 text-[#00d9ff]" />
                  <span className="text-[#bdbdbd] font-light">NYC • London • Global Remote</span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <Clock className="w-4.5 h-4.5 text-[#00d9ff]" />
                  <span className="text-[#bdbdbd] font-light">Taking briefs: 24/7/366</span>
                </div>
              </div>

              {/* Embedded Interactive Vector Map Placeholder */}
              <div className="rounded-xl border border-white/5 bg-[#131313]/60 h-44 overflow-hidden relative flex flex-col justify-end p-4">
                <div className="absolute inset-0 bg-[radial-gradient(#00d9ff33_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Globe className="w-32 h-32 text-white animate-spin-slow" />
                </div>
                <div className="relative z-10 space-y-1">
                  <span className="text-[8px] uppercase tracking-widest font-mono text-[#00d9ff] block">ORBITAL GEOGRAPHIC TELEMETRY</span>
                  <span className="text-[10px] font-bold text-white block uppercase">NEW YORK CITY SYSTEM CORE</span>
                </div>
              </div>

              {/* Simple FAQ Accordion */}
              <div className="space-y-3 pt-4">
                <h4 className="text-xs uppercase tracking-widest font-mono text-white/50">COMMONLY ASKED</h4>
                {[
                  { q: "What is your typical project timeline?", a: "Typical immersive React/Next.js portals require 6-8 weeks of design refinement, micro-interactions testing, and backend agent routing." },
                  { q: "Do you offer post-launch optimization?", a: "Every platform includes 6 months of absolute operational upkeep, performance audit caching, and security ledger patches." },
                  { q: "Can we integrate existing APIs?", a: "Yes. Our cognitive integration layer is engineered to bind with standard secure SQL ledgers, Stripe endpoints, and custom databases easily." }
                ].map((faq, i) => (
                  <details key={i} className="group border-b border-white/5 pb-3">
                    <summary className="text-xs font-semibold text-white cursor-pointer list-none flex justify-between items-center hover:text-[#00d9ff] transition-colors">
                      <span>{faq.q}</span>
                      <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 text-white/40" />
                    </summary>
                    <p className="text-[11px] text-[#bdbdbd] leading-relaxed font-light mt-2 pl-2">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Right Col: Large Form & Booking */}
            <div className="lg:col-span-7 bg-[#131313]/60 border border-white/5 p-6 md:p-8 rounded-xl space-y-6">
              
              {/* Form Tab Buttons */}
              <div className="flex gap-4 border-b border-white/5 pb-4">
                <button
                  id="tab-submit-brief"
                  className="text-xs uppercase tracking-wider font-display font-bold text-white border-b-2 border-[#00d9ff] pb-2"
                >
                  SUBMIT SPECIFICATION BRIEF
                </button>
                <button
                  id="tab-book-sync"
                  onClick={() => setBookingOpen(true)}
                  className="text-xs uppercase tracking-wider font-display font-medium text-white/50 hover:text-white pb-2 flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#00d9ff]" /> OR SECURE A BOOKING SYNC
                </button>
              </div>

              {contactSuccess ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-display uppercase tracking-wider text-white">BRIEF TRANSMITTED SECURELY</h3>
                  <p className="text-xs text-[#bdbdbd] max-w-sm mx-auto leading-relaxed">
                    We have registered your project credentials. Our lead design principal will initiate communications within the 4-hour window.
                  </p>
                  <button
                    id="btn-new-brief"
                    onClick={() => setContactSuccess(false)}
                    className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-sm"
                  >
                    SUBMIT NEW BRIEF
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Your Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Julien Vane"
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Company / Organization</label>
                      <input
                        id="contact-company"
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        placeholder="Chronos Luxury"
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Email Link *</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="partner@chronos.ch"
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Secure Phone</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+41 22 555 4321"
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Budget Allocation</label>
                      <select
                        id="contact-budget"
                        value={contactForm.budget}
                        onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00d9ff]/30 transition-colors"
                      >
                        <option>$15,000 - $25,000</option>
                        <option>$25,000 - $50,000</option>
                        <option>$50,000 - $100,000</option>
                        <option>$100,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Project Engine</label>
                      <select
                        id="contact-project-type"
                        value={contactForm.projectType}
                        onChange={(e) => setContactForm({ ...contactForm, projectType: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00d9ff]/30 transition-colors"
                      >
                        <option>Websites</option>
                        <option>Branding</option>
                        <option>AI Automation</option>
                        <option>Video Production</option>
                        <option>Strategic Consulting</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Launch Timeline</label>
                      <select
                        id="contact-timeline"
                        value={contactForm.timeline}
                        onChange={(e) => setContactForm({ ...contactForm, timeline: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00d9ff]/30 transition-colors"
                      >
                        <option>1 Month</option>
                        <option>1-2 Months</option>
                        <option>3+ Months</option>
                        <option>Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Brief Specifications *</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Detail your parameters, required integrations, and target conversions..."
                      className="w-full bg-black border border-white/10 rounded px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30 transition-colors"
                    ></textarea>
                  </div>

                  <button
                    id="btn-submit-brief"
                    type="submit"
                    disabled={submittingContact}
                    className="w-full py-4 bg-white hover:bg-[#00d9ff] text-black font-bold font-display text-xs tracking-widest uppercase rounded-sm hover:shadow-[0_4px_30px_rgba(0,217,255,0.3)] transition-all duration-300 cursor-pointer"
                  >
                    {submittingContact ? "TRANSMITTING BRIEF KEY..." : "TRANSMIT SPECIFICATION BRIEF"}
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ----------------- SPECTACULAR ELEVATED FOOTER ----------------- */}
      <footer className="bg-[#050505] border-t border-white/5 py-16 relative z-10 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                  <span className="text-black font-display font-bold text-lg select-none">V</span>
                </div>
                <div>
                  <span className="font-display font-medium text-sm tracking-widest text-white block">
                    LIFTED VEIL
                  </span>
                  <span className="text-[9px] tracking-[0.25em] text-[#00d9ff] font-mono block">
                    MEDIA
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#bdbdbd] font-light leading-relaxed max-w-sm">
                We build world-class brands, websites, cognitive AI automation systems and digital experiences. Engineered beyond margins.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">DIRECTORY</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {["Home", "About", "Services", "Portfolio", "Careers", "Contact"].map((item) => (
                  <a
                    id={`footer-link-${item.toLowerCase()}`}
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setActiveSection(item.toLowerCase())}
                    className="text-[#bdbdbd] hover:text-[#00d9ff] transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Channels Column */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">LEDGER NETWORKS</h4>
              <div className="flex flex-wrap gap-4 text-xs">
                {["Instagram", "LinkedIn", "Facebook", "TikTok", "YouTube", "Behance", "Dribbble", "GitHub"].map((soc) => (
                  <button
                    id={`footer-social-${soc.toLowerCase()}`}
                    key={soc}
                    onClick={() => alert(`Redirecting securely to our official ${soc} orbit.`)}
                    className="text-[#bdbdbd] hover:text-white transition-colors cursor-pointer"
                  >
                    {soc}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-white/30 font-mono gap-4">
            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#00D9FF] rounded-full animate-pulse"></span>
                ACTIVE LEDGER INQUIRIES OPEN
              </span>
              <span>•</span>
              <span>NYC & GLOBAL REMOTE</span>
            </div>
            <span>© 2026 LIFTED VEIL MEDIA LLC. ALL COGNITIONS REGISTERED.</span>
          </div>

        </div>
      </footer>
      </>)}

      {/* ----------------- FLOATING MODALS & UTILITIES ----------------- */}

      {/* Case Study Viewer Modal */}
      {selectedCaseStudy && (
        <div id="case-study-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-md">
          <div className="w-full max-w-4xl rounded-2xl glass-panel border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden max-h-[90vh]">
            <div className="p-6 border-b border-white/5 bg-[#0d0d0d] flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-[#00d9ff] uppercase tracking-widest">{selectedCaseStudy.category}</span>
                <h2 className="text-xl font-bold font-display uppercase text-white tracking-wider">{selectedCaseStudy.title}</h2>
              </div>
              <button
                id="btn-close-case"
                onClick={() => setSelectedCaseStudy(null)}
                className="p-1.5 rounded-full hover:bg-white/5 text-[#bdbdbd] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar bg-[#050505]/40">
              <div className="h-72 rounded-xl overflow-hidden">
                <img src={selectedCaseStudy.imageUrl} alt={selectedCaseStudy.title} className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-white/3 border border-white/5 space-y-1">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block">CHALLENGE PARAMS</span>
                  <p className="text-xs text-[#bdbdbd] leading-relaxed font-light">{selectedCaseStudy.challenge}</p>
                </div>
                <div className="p-4 rounded-lg bg-white/3 border border-white/5 space-y-1">
                  <span className="text-[9px] font-mono text-[#00d9ff] uppercase tracking-widest block">STRATEGIC FOCUS</span>
                  <p className="text-xs text-[#bdbdbd] leading-relaxed font-light">{selectedCaseStudy.strategy}</p>
                </div>
                <div className="p-4 rounded-lg bg-white/3 border border-white/5 space-y-1">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block">DELIVERED RESULTS</span>
                  <p className="text-xs text-[#bdbdbd] leading-relaxed font-light">{selectedCaseStudy.results}</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 space-y-3">
                <h4 className="text-xs uppercase font-display font-bold tracking-widest text-[#00d9ff]">Detailed System Overview</h4>
                <p className="text-xs text-[#bdbdbd] leading-relaxed font-light whitespace-pre-line">
                  {selectedCaseStudy.description}
                </p>
              </div>

              {/* Show complete metrics block */}
              <div className="border-t border-white/5 pt-6 space-y-4">
                <h4 className="text-xs uppercase font-display font-bold tracking-widest text-white/50">Performance Telemetry</h4>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(selectedCaseStudy.metrics || {}).map(([key, value]) => (
                    <div key={key} className="p-4 rounded-lg bg-black border border-white/5 text-center">
                      <span className="text-lg font-bold text-white font-mono">{value}</span>
                      <span className="block text-[8px] uppercase tracking-widest text-[#00d9ff] font-mono mt-1">{key}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Post Viewer Modal */}
      {selectedBlog && (
        <div id="blog-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-md">
          <div className="w-full max-w-5xl rounded-2xl glass-panel border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden max-h-[90vh]">
            
            {/* Header with Close and Reading Progress */}
            <div className="p-6 border-b border-white/5 bg-[#0d0d0d] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className={`text-[9px] font-mono uppercase tracking-widest ${
                  activeBrand === "liftedveil" ? "text-[#C9A84C]" : "text-[#00E5CC]"
                }`}>
                  {selectedBlog.category} • {selectedBlog.readTime}
                </span>
                <h2 className="text-lg font-bold font-serif-luxury uppercase text-white tracking-wider">
                  {selectedBlog.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  id="btn-close-blog"
                  onClick={() => {
                    setSelectedBlog(null);
                    setSynthSummary("");
                    setInquiryResponse("");
                    setInquiryText("");
                  }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
                  title="Close Reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Reading preferences & custom font layout switcher */}
            <div className="px-6 py-3 border-b border-white/5 bg-[#080808] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5" />
                  Typography
                </span>
                <div className="flex bg-black/40 rounded p-0.5 border border-white/5">
                  {(["serif", "sans", "mono"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setReadingFont(f)}
                      className={`px-3 py-1 text-[10px] font-mono uppercase rounded transition-all cursor-pointer ${
                        readingFont === f
                          ? activeBrand === "liftedveil"
                            ? "bg-[#C9A84C] text-black font-semibold"
                            : "bg-[#00E5CC] text-black font-semibold"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  Text Size
                </span>
                <div className="flex bg-black/40 rounded p-0.5 border border-white/5">
                  {(["sm", "base", "lg"] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setReadingSize(sz)}
                      className={`px-3 py-1 text-[10px] font-mono uppercase rounded transition-all cursor-pointer ${
                        readingSize === sz
                          ? activeBrand === "liftedveil"
                            ? "bg-[#C9A84C] text-black font-semibold"
                            : "bg-[#00E5CC] text-black font-semibold"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Interactive Split Layout */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-[#050505]/40 grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column - Beautiful Typographic Content */}
              <div className="lg:col-span-7 p-6 md:p-8 space-y-6 border-r border-white/5 overflow-y-auto max-h-[calc(90vh-160px)] no-scrollbar text-left">
                <div className="h-56 rounded-xl overflow-hidden relative border border-white/10 group">
                  <img src={selectedBlog.imageUrl} alt={selectedBlog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] text-neutral-400">
                    SORA STERLING • DOCUMENTARY PRESS
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-4">
                  <span className="text-[#bdbdbd] font-mono">Author: {selectedBlog.author}</span>
                  <span className="text-[#bdbdbd] font-mono">Published: {selectedBlog.date}</span>
                </div>

                {/* Render content styled nicely with selected typographic family and sizing */}
                <div className={`text-[#F5F0E8] whitespace-pre-line leading-relaxed font-light space-y-4 prose prose-invert ${
                  readingFont === "serif" ? "font-serif-luxury" : readingFont === "mono" ? "font-mono" : "font-sans"
                } ${
                  readingSize === "sm" ? "text-xs" : readingSize === "lg" ? "text-base" : "text-sm"
                }`}>
                  {selectedBlog.content}
                </div>
              </div>

              {/* Right Column - Premium Cognitive AI Studio */}
              <div className="lg:col-span-5 p-6 md:p-8 bg-[#090909]/80 space-y-8 overflow-y-auto max-h-[calc(90vh-160px)] no-scrollbar text-left border-l border-white/5">
                
                {/* AI Cognitive Synthesis Block */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
                      <Sparkles className={`w-3.5 h-3.5 ${activeBrand === "liftedveil" ? "text-[#C9A84C]" : "text-[#00E5CC]"}`} />
                      COGNITIVE SYNTHESIS
                    </span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase">BluePrint V1.0</span>
                  </div>

                  {synthSummary ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded bg-[#121212] border border-white/5 text-[11px] font-mono text-neutral-300 space-y-3 relative overflow-hidden"
                    >
                      {/* Laser scanning border light effect */}
                      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#C9A84C] to-transparent animate-pulse" />
                      <div className="whitespace-pre-line prose prose-invert text-neutral-300 leading-relaxed font-light">
                        {synthSummary}
                      </div>
                      <button 
                        onClick={() => setSynthSummary("")}
                        className="text-[9px] uppercase tracking-widest text-neutral-500 hover:text-white underline cursor-pointer"
                      >
                        Reset Summary
                      </button>
                    </motion.div>
                  ) : isSynthesizing ? (
                    <div className="p-6 rounded bg-black/60 border border-white/5 space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-[#C9A84C] animate-pulse flex items-center gap-2">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          SYNTHESIZING COGNITION...
                        </span>
                        <span>{synthProgress}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-100 ${
                            activeBrand === "liftedveil" ? "bg-[#C9A84C]" : "bg-[#00E5CC]"
                          }`}
                          style={{ width: `${synthProgress}%` }}
                        />
                      </div>
                      <p className="text-[9px] font-mono text-neutral-500 italic">&gt; {synthStepMsg}</p>
                    </div>
                  ) : (
                    <div className="p-6 rounded bg-[#121212]/30 border border-white/5 text-center space-y-4">
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        Deconstruct this deep long-form essay instantly into structured semantic outlines, core methodologies, and executive key takeaways.
                      </p>
                      <button
                        onClick={handleSynthEssay}
                        className={`w-full py-2.5 rounded font-mono text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                          activeBrand === "liftedveil"
                            ? "bg-[#C9A84C] hover:bg-white text-black"
                            : "bg-[#00E5CC] hover:bg-white text-black"
                        }`}
                      >
                        SYNTHESIZE CRITICAL ANALYSIS
                      </button>
                    </div>
                  )}
                </div>

                <div className="h-[1px] bg-white/5" />

                {/* Interactive Ask AI Deep Inquiry */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
                      <Cpu className={`w-3.5 h-3.5 ${activeBrand === "liftedveil" ? "text-[#C9A84C]" : "text-[#00E5CC]"}`} />
                      DEEP INQUIRY PORTAL
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 uppercase">AGENT ONLINE</span>
                  </div>

                  <form onSubmit={handleBlogInquiry} className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={inquiryText}
                        onChange={(e) => setInquiryText(e.target.value)}
                        placeholder="Inquire about the ontological thesis..."
                        className="w-full bg-black/50 border border-white/10 rounded px-3.5 py-2.5 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-white/30"
                      />
                      <button
                        type="submit"
                        disabled={inquiryLoading || !inquiryText.trim()}
                        className="absolute right-2 top-2 p-1 text-neutral-500 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>

                  {inquiryLoading && (
                    <div className="p-4 rounded bg-[#121212]/40 border border-white/5 flex items-center gap-3 text-xs text-neutral-400 font-mono">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#C9A84C]" />
                      <span>Inquiring cognitive core database...</span>
                    </div>
                  )}

                  {inquiryResponse && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded bg-[#121212] border ${
                        activeBrand === "liftedveil" ? "border-[#C9A84C]/20" : "border-[#00E5CC]/20"
                      } space-y-2 text-xs font-mono`}
                    >
                      <div className="flex justify-between items-center text-[9px] text-neutral-500">
                        <span>COGNITIVE CORE RESPONSE</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      </div>
                      <p className="text-neutral-300 leading-relaxed font-light">
                        {inquiryResponse}
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="h-[1px] bg-white/5" />

                {/* Documentary references metadata */}
                <div className="space-y-2 text-[10px] font-mono text-neutral-500">
                  <p className="uppercase text-neutral-400">ARCHIVAL REFERENCES</p>
                  <p>&gt; [REF-01] W3C Semantic Web Initiative Standards</p>
                  <p>&gt; [REF-02] Sora Sterling (2026) "The Cinematic Medium"</p>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* Appointment Booking Modal */}
      {bookingOpen && (
        <div id="booking-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl glass-panel border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-[#0d0d0d] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4.5 h-4.5 text-[#00d9ff]" />
                <h2 className="text-sm font-bold font-display uppercase text-white tracking-wider">SECURE BOOKING SLOT</h2>
              </div>
              <button
                id="btn-close-booking"
                onClick={() => {
                  setBookingOpen(false);
                  setBookingSuccess(false);
                }}
                className="p-1.5 rounded-full hover:bg-white/5 text-[#bdbdbd] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 bg-[#050505]/60">
              {bookingSuccess ? (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-md font-bold font-display uppercase tracking-wider text-white">SYNC SLOT SECURED</h3>
                  <p className="text-xs text-[#bdbdbd] leading-relaxed">
                    We've registered your appointment brief. An encrypted calendar connection link has been dispatched to your email address.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Your Name *</label>
                    <input
                      id="book-name"
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      placeholder="Marcus Thorne"
                      className="w-full bg-black border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Email Link *</label>
                    <input
                      id="book-email"
                      type="email"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      placeholder="m@aetheris.com"
                      className="w-full bg-black border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Target Date *</label>
                      <input
                        id="book-date"
                        type="date"
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#00d9ff]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Time Interval *</label>
                      <select
                        id="book-slot"
                        value={bookingForm.timeSlot}
                        onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#00d9ff]/30"
                      >
                        <option>09:00 AM - 10:00 AM</option>
                        <option>10:00 AM - 11:00 AM</option>
                        <option>01:00 PM - 02:00 PM</option>
                        <option>03:00 PM - 04:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Brief Overview</label>
                    <textarea
                      id="book-brief"
                      rows={3}
                      value={bookingForm.brief}
                      onChange={(e) => setBookingForm({ ...bookingForm, brief: e.target.value })}
                      placeholder="Briefly state target integration milestones..."
                      className="w-full bg-black border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30"
                    ></textarea>
                  </div>

                  <button
                    id="btn-submit-booking"
                    type="submit"
                    className="w-full py-3 bg-white hover:bg-[#00d9ff] text-black font-bold font-display text-[10px] tracking-widest uppercase rounded-sm transition-all cursor-pointer"
                  >
                    CONFIRM RESERVATION
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Career Job Application Modal */}
      {applyingJob && (
        <div id="apply-job-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl glass-panel border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-[#0d0d0d] flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-[#00d9ff] uppercase tracking-widest">Apply position</span>
                <h2 className="text-sm font-bold font-display uppercase text-white tracking-wider">{applyingJob.title}</h2>
              </div>
              <button
                id="btn-close-apply"
                onClick={() => {
                  setApplyingJob(null);
                  setCareerSuccess(false);
                }}
                className="p-1.5 rounded-full hover:bg-white/5 text-[#bdbdbd] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 bg-[#050505]/60">
              {careerSuccess ? (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-md font-bold font-display uppercase tracking-wider text-white">APPLICATION FILED</h3>
                  <p className="text-xs text-[#bdbdbd] leading-relaxed">
                    We've registered your candidate records. If your credentials align with our aesthetic expectations, we will initiate brief communications.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCareerSuccess(true);
                    setCareerForm({ name: "", email: "", resumeUrl: "", portfolioUrl: "", note: "" });
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Candidate Name *</label>
                    <input
                      id="apply-name"
                      type="text"
                      required
                      value={careerForm.name}
                      onChange={(e) => setCareerForm({ ...careerForm, name: e.target.value })}
                      placeholder="Sora Sterling"
                      className="w-full bg-black border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Contact Email *</label>
                    <input
                      id="apply-email"
                      type="email"
                      required
                      value={careerForm.email}
                      onChange={(e) => setCareerForm({ ...careerForm, email: e.target.value })}
                      placeholder="sora@framer.co"
                      className="w-full bg-black border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Resume PDF URL *</label>
                    <input
                      id="apply-resume"
                      type="url"
                      required
                      value={careerForm.resumeUrl}
                      onChange={(e) => setCareerForm({ ...careerForm, resumeUrl: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="w-full bg-black border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Creative Portfolio Link</label>
                    <input
                      id="apply-portfolio"
                      type="url"
                      value={careerForm.portfolioUrl}
                      onChange={(e) => setCareerForm({ ...careerForm, portfolioUrl: e.target.value })}
                      placeholder="https://behance.net/..."
                      className="w-full bg-black border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">Brevity Note</label>
                    <textarea
                      id="apply-note"
                      rows={2}
                      value={careerForm.note}
                      onChange={(e) => setCareerForm({ ...careerForm, note: e.target.value })}
                      placeholder="Tell us what you built that you are proud of..."
                      className="w-full bg-black border border-white/10 rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00d9ff]/30"
                    ></textarea>
                  </div>

                  <button
                    id="btn-submit-apply"
                    type="submit"
                    className="w-full py-3 bg-white hover:bg-[#00d9ff] text-black font-bold font-display text-[10px] tracking-widest uppercase rounded-sm transition-all cursor-pointer"
                  >
                    TRANSMIT APPLICATION
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel Dashboard Modal */}
      {adminOpen && (
        <div id="admin-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-md">
          <div className="w-full max-w-5xl rounded-2xl glass-panel border border-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-[#0d0d0d] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-[#00d9ff]" />
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 block">ADMINISTRATIVE TERMINAL</span>
                  <h2 className="text-sm font-bold font-display uppercase tracking-wider text-white">COGNITIVE MANAGER</h2>
                </div>
              </div>
              <button
                id="btn-close-admin"
                onClick={() => {
                  setAdminOpen(false);
                  setAdminLoggedIn(false);
                  setAdminError("");
                }}
                className="px-4 py-2 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-full text-xs text-white/60 hover:text-white transition-all cursor-pointer uppercase font-mono tracking-widest"
              >
                Close Terminal
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar bg-[#050505]/40">
              {!adminLoggedIn ? (
                /* Login screen */
                <div className="max-w-sm mx-auto py-16 space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-md font-bold font-display uppercase text-white">AUTHENTICATE SYSTEM KEY</h3>
                    <p className="text-xs text-[#bdbdbd] font-light">
                      Input the default administrator credentials:
                      <br />
                      <span className="font-mono text-[#00d9ff] bg-white/5 px-1.5 py-0.5 rounded inline-block mt-1">
                        admin / liftedveil2026
                      </span>
                    </p>
                  </div>

                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">ADMIN USERNAME</label>
                      <input
                        id="admin-username"
                        type="text"
                        required
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        placeholder="admin"
                        className="w-full bg-[#131313] border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-[#bdbdbd] mb-1.5">ADMIN PASSWORD PIN</label>
                      <input
                        id="admin-password"
                        type="password"
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#131313] border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>

                    {adminError && (
                      <div className="text-xs text-red-400 bg-red-400/5 p-3 rounded border border-red-400/10 font-medium">
                        {adminError}
                      </div>
                    )}

                    <button
                      id="btn-admin-submit"
                      type="submit"
                      className="w-full py-3 bg-white hover:bg-[#00d9ff] text-black font-bold font-display text-xs tracking-widest uppercase rounded-sm transition-all cursor-pointer"
                    >
                      ENGAGE CORE CONTROL
                    </button>
                  </form>
                </div>
              ) : (
                /* Logged In Dashboard Console */
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Tab Selector Links */}
                  <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
                    {[
                      { id: "requests", label: "Brief Requests", count: db.contactRequests?.length || 0 },
                      { id: "subscribers", label: "Newsletter subs", count: db.newsletterSubscribers?.length || 0 },
                      { id: "consultations", label: "Calendar bookings", count: db.consultations?.length || 0 },
                      { id: "portfolio", label: "Portfolio CMS" },
                      { id: "blog", label: "Blog CMS" }
                    ].map((tab) => (
                      <button
                        id={`admin-tab-${tab.id}`}
                        key={tab.id}
                        onClick={() => {
                          setAdminActiveTab(tab.id as any);
                          setCmsEditPortfolio(null);
                          setCmsEditBlog(null);
                        }}
                        className={`px-4 py-2 rounded text-xs tracking-widest uppercase transition-all cursor-pointer font-mono ${
                          adminActiveTab === tab.id
                            ? "bg-[#00d9ff]/15 border border-[#00d9ff] text-[#00d9ff]"
                            : "bg-white/3 border border-white/5 text-[#bdbdbd] hover:text-white"
                        }`}
                      >
                        {tab.label} {tab.count !== undefined && `(${tab.count})`}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content Display */}

                  {adminActiveTab === "requests" && (
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase font-display font-bold tracking-widest text-white/50">COMMUNIQUE LEDGER</h4>
                      {db.contactRequests?.length === 0 ? (
                        <p className="text-xs text-white/30 font-mono italic">No requests registered in system currently.</p>
                      ) : (
                        <div className="space-y-4">
                          {db.contactRequests?.map((req) => (
                            <div key={req.id} className="p-4 rounded-lg bg-[#131313] border border-white/5 space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-[9px] font-mono text-[#00d9ff] uppercase tracking-widest">{req.projectType} • Budget: {req.budget}</span>
                                  <h5 className="font-display font-bold text-sm text-white uppercase mt-1">{req.name} • <span className="text-white/60">{req.company}</span></h5>
                                </div>
                                <span className="text-[9px] font-mono text-white/30">{new Date(req.createdAt).toLocaleString()}</span>
                              </div>
                              <p className="text-xs text-[#bdbdbd] bg-black/40 p-3 rounded font-light border border-white/3 italic leading-relaxed">
                                "{req.message}"
                              </p>
                              <div className="flex gap-4 text-[10px] font-mono text-white/50">
                                <span>Email: <span className="text-white font-semibold">{req.email}</span></span>
                                {req.phone && <span>Phone: <span className="text-white font-semibold">{req.phone}</span></span>}
                                <span>Timeline: <span className="text-white font-semibold">{req.timeline}</span></span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {adminActiveTab === "subscribers" && (
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase font-display font-bold tracking-widest text-white/50">NEWSLETTER SUBSCRIBERS</h4>
                      {db.newsletterSubscribers?.length === 0 ? (
                        <p className="text-xs text-white/30 font-mono italic">No subscribers registered currently.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {db.newsletterSubscribers?.map((sub) => (
                            <div key={sub.id} className="p-3 rounded-lg bg-[#131313] border border-white/5 flex justify-between items-center text-xs font-mono">
                              <span className="text-white font-semibold">{sub.email}</span>
                              <span className="text-white/30">{new Date(sub.subscribedAt).toLocaleDateString()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {adminActiveTab === "consultations" && (
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase font-display font-bold tracking-widest text-white/50">BOOKED SYNC SLOTS</h4>
                      {db.consultations?.length === 0 ? (
                        <p className="text-xs text-white/30 font-mono italic">No bookings registered currently.</p>
                      ) : (
                        <div className="space-y-3">
                          {db.consultations?.map((b) => (
                            <div key={b.id} className="p-4 rounded-lg bg-[#131313] border border-white/5 flex flex-col md:flex-row justify-between gap-4">
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-[#00d9ff] uppercase tracking-widest">{b.date} • {b.timeSlot}</span>
                                <h5 className="font-display font-bold text-sm text-white uppercase">{b.name} <span className="text-white/40">({b.company})</span></h5>
                                <p className="text-xs text-[#bdbdbd] font-light italic mt-1">"{b.brief}"</p>
                              </div>
                              <div className="text-right flex flex-col justify-between items-end shrink-0">
                                <span className="text-[10px] font-mono text-white/40">Email: {b.email}</span>
                                <span className="text-[9px] font-mono text-white/20">Registered: {new Date(b.createdAt).toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {adminActiveTab === "portfolio" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs uppercase font-display font-bold tracking-widest text-white/50">MANAGE PORTFOLIO COLLECTION</h4>
                        <button
                          id="btn-cms-new-portfolio"
                          onClick={() => setCmsEditPortfolio({})}
                          className="px-4 py-2 bg-white text-black hover:bg-[#00d9ff] font-bold text-[10px] tracking-widest uppercase rounded flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> ADD NEW RECORD
                        </button>
                      </div>

                      {/* Add/Edit form overlay */}
                      {cmsEditPortfolio && (
                        <form onSubmit={handleSavePortfolioItem} className="p-6 rounded-lg bg-[#131313] border border-[#00d9ff]/30 space-y-4 animate-fade-in">
                          <h5 className="text-xs font-bold font-display uppercase text-white">{cmsEditPortfolio.id ? "Edit Portfolio" : "Add Portfolio"} Record</h5>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">TITLE</label>
                              <input
                                id="cms-p-title"
                                type="text"
                                required
                                value={cmsEditPortfolio.title || ""}
                                onChange={(e) => setCmsEditPortfolio({ ...cmsEditPortfolio, title: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">CATEGORY</label>
                              <select
                                id="cms-p-cat"
                                value={cmsEditPortfolio.category || "Websites"}
                                onChange={(e) => setCmsEditPortfolio({ ...cmsEditPortfolio, category: e.target.value as any })}
                                className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              >
                                <option>Websites</option>
                                <option>Branding</option>
                                <option>Photography</option>
                                <option>Video</option>
                                <option>Marketing</option>
                                <option>AI</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">SUBHEADLINE / SLUG</label>
                              <input
                                id="cms-p-sub"
                                type="text"
                                required
                                value={cmsEditPortfolio.subHeadline || ""}
                                onChange={(e) => setCmsEditPortfolio({ ...cmsEditPortfolio, subHeadline: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">IMAGE URL</label>
                              <input
                                id="cms-p-img"
                                type="url"
                                required
                                value={cmsEditPortfolio.imageUrl || ""}
                                onChange={(e) => setCmsEditPortfolio({ ...cmsEditPortfolio, imageUrl: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">CHALLENGE</label>
                            <textarea
                              id="cms-p-challenge"
                              required
                              value={cmsEditPortfolio.challenge || ""}
                              onChange={(e) => setCmsEditPortfolio({ ...cmsEditPortfolio, challenge: e.target.value })}
                              className="w-full h-16 bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            ></textarea>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">STRATEGY</label>
                            <textarea
                              id="cms-p-strategy"
                              required
                              value={cmsEditPortfolio.strategy || ""}
                              onChange={(e) => setCmsEditPortfolio({ ...cmsEditPortfolio, strategy: e.target.value })}
                              className="w-full h-16 bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            ></textarea>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">RESULTS</label>
                            <textarea
                              id="cms-p-results"
                              required
                              value={cmsEditPortfolio.results || ""}
                              onChange={(e) => setCmsEditPortfolio({ ...cmsEditPortfolio, results: e.target.value })}
                              className="w-full h-16 bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            ></textarea>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">SYSTEM OVERVIEW (DESCRIPTION)</label>
                            <textarea
                              id="cms-p-desc"
                              required
                              value={cmsEditPortfolio.description || ""}
                              onChange={(e) => setCmsEditPortfolio({ ...cmsEditPortfolio, description: e.target.value })}
                              className="w-full h-24 bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            ></textarea>
                          </div>

                          <div className="flex gap-2">
                            <button
                              id="btn-cms-p-save"
                              type="submit"
                              className="px-6 py-2 bg-white text-black text-xs font-bold uppercase rounded cursor-pointer"
                            >
                              SAVE RECORD
                            </button>
                            <button
                              id="btn-cms-p-cancel"
                              type="button"
                              onClick={() => setCmsEditPortfolio(null)}
                              className="px-6 py-2 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase rounded cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}

                      <div className="space-y-3">
                        {db.portfolio?.map((item) => (
                          <div key={item.id} className="p-4 rounded-lg bg-[#131313] border border-white/5 flex justify-between items-center gap-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-12 rounded overflow-hidden">
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h5 className="font-display font-bold text-sm text-white uppercase">{item.title}</h5>
                                <span className="text-[9px] font-mono text-[#00d9ff] uppercase tracking-widest">{item.category}</span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                id={`btn-cms-p-edit-${item.id}`}
                                onClick={() => setCmsEditPortfolio(item)}
                                className="px-3 py-1.5 bg-white/5 hover:bg-white text-white hover:text-black font-bold text-[9px] tracking-widest uppercase rounded cursor-pointer"
                              >
                                EDIT
                              </button>
                              <button
                                id={`btn-cms-p-del-${item.id}`}
                                onClick={() => handleDeleteCmsItem("portfolio", item.id)}
                                className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {adminActiveTab === "blog" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs uppercase font-display font-bold tracking-widest text-white/50">MANAGE BLOG ESSAYS</h4>
                        <button
                          id="btn-cms-new-blog"
                          onClick={() => setCmsEditBlog({})}
                          className="px-4 py-2 bg-white text-black hover:bg-[#00d9ff] font-bold text-[10px] tracking-widest uppercase rounded flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> ADD NEW ARTICLE
                        </button>
                      </div>

                      {/* Add/Edit form overlay */}
                      {cmsEditBlog && (
                        <form onSubmit={handleSaveBlogItem} className="p-6 rounded-lg bg-[#131313] border border-[#00d9ff]/30 space-y-4 animate-fade-in">
                          <h5 className="text-xs font-bold font-display uppercase text-white">{cmsEditBlog.id ? "Edit Blog" : "Add Blog"} Essay</h5>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">TITLE</label>
                              <input
                                id="cms-b-title"
                                type="text"
                                required
                                value={cmsEditBlog.title || ""}
                                onChange={(e) => setCmsEditBlog({ ...cmsEditBlog, title: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">CATEGORY</label>
                              <select
                                id="cms-b-cat"
                                value={cmsEditBlog.category || "Design"}
                                onChange={(e) => setCmsEditBlog({ ...cmsEditBlog, category: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              >
                                <option>Design</option>
                                <option>Branding</option>
                                <option>AI</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">SLUG</label>
                              <input
                                id="cms-b-slug"
                                type="text"
                                required
                                value={cmsEditBlog.slug || ""}
                                onChange={(e) => setCmsEditBlog({ ...cmsEditBlog, slug: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">IMAGE URL</label>
                              <input
                                id="cms-b-img"
                                type="url"
                                required
                                value={cmsEditBlog.imageUrl || ""}
                                onChange={(e) => setCmsEditBlog({ ...cmsEditBlog, imageUrl: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">EXCERPT SNIPPET</label>
                            <input
                              id="cms-b-excerpt"
                              type="text"
                              required
                              value={cmsEditBlog.excerpt || ""}
                              onChange={(e) => setCmsEditBlog({ ...cmsEditBlog, excerpt: e.target.value })}
                              className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase font-mono tracking-widest text-white/60 mb-1">ESSAY CONTENT (MARKDOWN TEXT)</label>
                            <textarea
                              id="cms-b-content"
                              required
                              rows={8}
                              value={cmsEditBlog.content || ""}
                              onChange={(e) => setCmsEditBlog({ ...cmsEditBlog, content: e.target.value })}
                              className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            ></textarea>
                          </div>

                          <div className="flex gap-2">
                            <button
                              id="btn-cms-b-save"
                              type="submit"
                              className="px-6 py-2 bg-white text-black text-xs font-bold uppercase rounded cursor-pointer"
                            >
                              SAVE ARTICLE
                            </button>
                            <button
                              id="btn-cms-b-cancel"
                              type="button"
                              onClick={() => setCmsEditBlog(null)}
                              className="px-6 py-2 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase rounded cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}

                      <div className="space-y-3">
                        {db.blog?.map((art) => (
                          <div key={art.id} className="p-4 rounded-lg bg-[#131313] border border-white/5 flex justify-between items-center gap-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-12 rounded overflow-hidden">
                                <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h5 className="font-display font-bold text-sm text-white uppercase">{art.title}</h5>
                                <span className="text-[9px] font-mono text-[#00d9ff] uppercase tracking-widest">{art.category} • {art.date}</span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                id={`btn-cms-b-edit-${art.id}`}
                                onClick={() => setCmsEditBlog(art)}
                                className="px-3 py-1.5 bg-white/5 hover:bg-white text-white hover:text-black font-bold text-[9px] tracking-widest uppercase rounded cursor-pointer"
                              >
                                EDIT
                              </button>
                              <button
                                id={`btn-cms-b-del-${art.id}`}
                                onClick={() => handleDeleteCmsItem("blog", art.id)}
                                className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Chat Assistant and Recommendation System */}
      <AIAssistant
        onOpenCalculator={() => {
          setActiveSection("contact");
          const el = document.getElementById("calculator-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onOpenConsultation={() => setBookingOpen(true)}
      />

      {/* Secure Client Portal Panel */}
      <ClientPortal isOpen={portalOpen} onClose={() => setPortalOpen(false)} />

    </div>
  );
}
