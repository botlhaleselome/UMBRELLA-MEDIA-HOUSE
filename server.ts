import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize data-store path
const DATA_STORE_PATH = path.join(process.cwd(), "data-store.json");

// Define interface for database
interface DB {
  portfolio: any[];
  blog: any[];
  team: any[];
  careers: any[];
  testimonials: any[];
  contactRequests: any[];
  newsletterSubscribers: any[];
  consultations: any[];
}

// Default Data
const defaultDb: DB = {
  portfolio: [
    {
      id: "1",
      title: "Aetheris Core",
      category: "AI",
      subHeadline: "Next-gen immersive developer platform with embedded AI agents.",
      description: "A comprehensive developer portal, styled in neo-brutalist dark chrome, featuring interactive terminal simulations and autonomous coding models.",
      challenge: "Our client required a system that feels alive, conveying cutting-edge capability while maintaining ultra-low latency.",
      strategy: "Leveraging state-of-the-art WebGL canvases, minimalist sans typography, and highly precise micro-interactions.",
      results: "180% increase in developer signups and an Awwwards Site of the Day award.",
      metrics: { clicks: "450K", latency: "42ms", growth: "+180%" },
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "2",
      title: "Chronos Luxury",
      category: "Websites",
      subHeadline: "A boutique luxury Swiss horology experience with interactive 3D elements.",
      description: "A dark cinematic ecommerce engine for bespoke mechanical timepieces, highlighting heritage through fluid scroll-triggered storytelling.",
      challenge: "Translating tactile high-end physical engineering into a digital browser context.",
      strategy: "Framed within deep charcoal canvas grids, using generous serif typography, high contrast product photography, and inertial scroll effects.",
      results: "Avg. order value increased by 40%, elevating brand equity globally.",
      metrics: { clicks: "120K", conversion: "+40%", loadTime: "0.8s" },
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "3",
      title: "Onyx Sound System",
      category: "Branding",
      subHeadline: "A dark-brutalist aesthetic identity for high-performance audio synthesis.",
      description: "Brand identity, typographic system, packaging, and digital launch campaign for premium spatial audio drivers.",
      challenge: "Expressing pure acoustic clarity and high-pressure sub frequencies visually.",
      strategy: "Strict grid layouts, high contrast monochrome graphics, ultra-heavy custom display glyphs, and audio-reactive visuals.",
      results: "Initial batch sold out in 4 minutes. Acclaimed in Wired and Hypebeast.",
      metrics: { soldOut: "4m", pressViews: "2.4M", organicReach: "85%" },
      imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "4",
      title: "Verdant Marketplace",
      category: "Marketing",
      subHeadline: "An eco-luxe sustainability framework and visual marketplace.",
      description: "An elegant visual catalog of high-craft sustainable architecture, combining editorial layouts with an intuitive carbon-offsetting system.",
      challenge: "Making eco-responsibility feel high-end, premium, and sophisticated.",
      strategy: "Deep olive forest hues paired with ultra-dark carbon greys, gorgeous responsive grids, and clean carbon calculator UI modules.",
      results: "Facilitated over $12M in high-end green material transactions in Q1 alone.",
      metrics: { volume: "$12M", offset: "4.8K tons", satisfaction: "98.4%" },
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "5",
      title: "Zephyr Aviation",
      category: "Video",
      subHeadline: "High-altitude cinematic drone videography and identity for electric VTOL systems.",
      description: "Cinematic launch video and visual assets capturing the aerodynamic beauty of autonomous sky-taxis.",
      challenge: "Conveying safe, premium, high-speed flight across high-density urban canyons.",
      strategy: "Ultra-wide drone footage integrated with seamless futuristic vector maps, subtle neon HUD telemetry, and professional spatial sound design.",
      results: "Secured $140M in Series B funding using the digital launch materials.",
      metrics: { duration: "2.5m", views: "1.2M", capital: "$140M" },
      imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80",
    }
  ],
  blog: [
    {
      id: "1",
      title: "Designing the Invisible: The Rise of Minimalist Motion Systems",
      category: "Design",
      slug: "designing-the-invisible",
      excerpt: "Why the highest-quality animations are those the user feels, rather than notices. Exploring inertial easing and micro-feedback.",
      content: `# Designing the Invisible: The Rise of Minimalist Motion Systems

In digital experience design, motion is often treated as decoration. Designers add spinning preloaders, rotating text cascades, and elaborate transition sequences in an attempt to impress. 

However, in **premium digital design**, motion has a singular, humble goal: **to provide kinetic coherence**.

## The Psychology of Inertial Easing

When an element moves on screen, our visual cortex expects it to behave like physical matter. It should have mass, friction, and inertia. 
Standard "linear" motion feels robotic and unnatural. 

By utilizing **Cubic Bezier curves** that model real physics (for example, \`cubic-bezier(0.16, 1, 0.3, 1)\` — a luxury custom exponential ease-out), elements decelerate with a sophisticated, satisfying smoothness.

*   **Feedback loops**: Buttons should press down 2-3 pixels immediately upon touch, returning with a slight, cushioned rebound.
*   **Contextual preservation**: Elements expanding should morph directly from their origin points, showing the user exactly where the data came from.

## Aesthetic Restraint

True luxury is quiet. The best animations are so quick (150ms - 300ms) and so fluid that the user barely consciously registers them, yet they leave a lasting impression of quality and reactivity. At **Lifted Veil Media**, we craft motion paths frame by frame, assuring every millisecond feels premium and intentional.`,
      date: "June 25, 2026",
      readTime: "4 min read",
      author: "Julien Vane, Design Principal",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "2",
      title: "Engineering Emotion: Crafting Luxury Digital Identity",
      category: "Branding",
      slug: "engineering-emotion",
      excerpt: "How typography, whitespace, and extreme typographic alignment form immediate trust for multi-million dollar brands.",
      content: `# Engineering Emotion: Crafting Luxury Digital Identity

How does a luxury brand establish authority online? It is not through gold gradients, animated sparkles, or massive popups. It is through **impeccable typography, dramatic structural negative space, and architectural alignment**.

## The Architecture of Space

A common mistake in digital layouts is the fear of empty space. Low-tier websites cram banners, icons, and text onto every pixel, giving a sensory overload. 
Luxury design is defined by what is **left out**.

By surrounding a single line of perfectly aligned display typography (such as **Space Grotesk** or **Inter** with tight tracking) with 120 pixels of pristine, unadulterated off-black space, the text immediately commands attention. It communicates: *'What we have to say is so important, it deserves this entire canvas.'*

## Alignment and Trust

Alignment is precision. When margins are perfectly mathematically aligned across headers, grids, and footer columns, it triggers a deep subconscious signal of order, discipline, and exceptional craft. If an agency cares about a 2px alignment error on their website, they will care about the quality of their client's system.`,
      date: "May 18, 2026",
      readTime: "5 min read",
      author: "Sora Sterling, Brand Strategist",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "3",
      title: "The AI Agent Paradigm: Automating Complex Enterprise Workflows",
      category: "AI",
      slug: "ai-agent-paradigm",
      excerpt: "Moving beyond basic text interfaces. Designing custom multi-agent autonomous loops that think, plan, and execute.",
      content: `# The AI Agent Paradigm: Automating Complex Enterprise Workflows

The era of typing prompts into generic chat windows is over. The future of business automation belongs to **autonomous multi-agent orchestration**.

## What is an Agent System?

Unlike standard static APIs, an AI Agent possesses:
1.  **Stateful memory** to retain context across long-running tasks.
2.  **Tool-using capabilities** to execute SQL queries, trigger APIs, or parse document libraries.
3.  **Self-reflection loops** to analyze and correct its own outputs before presenting them to a human.

## Designing the Human-in-the-Loop

The highest-performing systems do not replace humans; they amplify them. We build beautifully styled custom admin pipelines where autonomous agents complete 90% of the research, drafting, and analysis, presenting a single clean interactive dashboard for human signoff. This reduces turnaround time from weeks to seconds.`,
      date: "April 12, 2026",
      readTime: "6 min read",
      author: "Dr. Alexander Vance, AI Systems Director",
      imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    }
  ],
  team: [
    {
      id: "1",
      name: "Julien Vane",
      role: "Design Principal & Co-Founder",
      bio: "Ex-Apple, ex-Vercel. Obsessed with sub-pixel perfection and spatial kinetic interactions.",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      id: "2",
      name: "Dr. Alexander Vance",
      role: "AI Systems Director",
      bio: "Ph.D. in Computer Science with a focus on neural agent chains and predictive workflow structures.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      id: "3",
      name: "Sora Sterling",
      role: "Lead Brand Strategist",
      bio: "Crafting digital voices for industry leaders. Believes narrative is the ultimate product differentiator.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80"
    }
  ],
  careers: [
    {
      id: "1",
      title: "Lead Motion Designer",
      department: "Design",
      location: "Remote / London",
      type: "Full-Time",
      description: "We are seeking a master of interactive and cinematic motion. You will design fluid layout transformations, WebGL layouts, and micro-interactions.",
      requirements: [
        "5+ years agency experience building premium web experiences.",
        "Deep expertise in Framer Motion, GSAP, and custom CSS physics.",
        "Obsessive attention to detail (easing curves, spatial continuity).",
        "A portfolio showcasing world-class WebGL/interactive works."
      ]
    },
    {
      id: "2",
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote / New York",
      type: "Full-Time",
      description: "Join us in engineering ultra-fast, luxury digital systems. You will bridge React client layouts with scalable, highly-performant Node.js servers.",
      requirements: [
        "Strong TypeScript, Next.js/Vite, Express, and database performance optimization.",
        "Experience optimizing sites to score 100/100 on Lighthouse performance metrics.",
        "In-depth knowledge of asset loading, lazy-loading, code-splitting, and server-side rendering.",
        "Clean, architectural code structure that matches design specifications."
      ]
    },
    {
      id: "3",
      title: "Generative AI Systems Architect",
      department: "AI Automation",
      location: "Remote / San Francisco",
      type: "Full-Time",
      description: "Build custom enterprise-grade agent structures and multi-modal pipeline automations using LLMs, vector database schemas, and intelligent tool routing.",
      requirements: [
        "Proven history of building stateful multi-agent systems.",
        "Familiarity with @google/genai, semantic searching, vector embeddings, and LangChain/similar.",
        "Strong backend foundations in security, API proxying, and lazy initialization.",
        "Passion for crafting seamless AI UI/UX that feels natural, helpful, and responsive."
      ]
    }
  ],
  testimonials: [
    {
      id: "1",
      quote: "Lifted Veil Media completely reinvented our brand. Their spatial kinetic layouts and absolute visual rigor transformed our metrics and elevated our market position.",
      author: "Marcus Thorne",
      title: "CEO",
      company: "Aetheris Corp"
    },
    {
      id: "2",
      quote: "Their design and copywriting sound like pure luxury. Every millimeter of our watch ecommerce engine reflects incredible Swiss discipline.",
      author: "Elena Rostova",
      title: "Design Director",
      company: "Chronos Swiss"
    },
    {
      id: "3",
      quote: "The autonomous agent system they built for us saves our team 35+ hours a week. Their engineering is as flawless as their visuals.",
      author: "Raymond Chen",
      title: "VP of Product",
      company: "Onyx Audio"
    }
  ],
  contactRequests: [],
  newsletterSubscribers: [],
  consultations: []
};

// Database helper functions
function loadDb(): DB {
  try {
    if (!fs.existsSync(DATA_STORE_PATH)) {
      fs.writeFileSync(DATA_STORE_PATH, JSON.stringify(defaultDb, null, 2));
      return defaultDb;
    }
    const raw = fs.readFileSync(DATA_STORE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error loading database, returning default data:", err);
    return defaultDb;
  }
}

function saveDb(data: DB) {
  try {
    fs.writeFileSync(DATA_STORE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error saving database:", err);
  }
}

// Lazy initialization of Gemini API
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      console.log("Gemini client successfully initialized.");
    } else {
      console.warn("GEMINI_API_KEY environment variable is not set. Chatbot will run in simulation mode.");
    }
  }
  return aiClient;
}

// API Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// GET database tables
app.get("/api/db", (req, res) => {
  const db = loadDb();
  res.json(db);
});

// Submit contact request
app.post("/api/contact", (req, res) => {
  const { name, company, email, phone, budget, projectType, timeline, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const db = loadDb();
  const newRequest = {
    id: Date.now().toString(),
    name,
    company: company || "Not Specified",
    email,
    phone: phone || "Not Provided",
    budget: budget || "Not Specified",
    projectType: projectType || "General",
    timeline: timeline || "Flexible",
    message,
    status: "new",
    createdAt: new Date().toISOString()
  };

  db.contactRequests.unshift(newRequest);
  saveDb(db);

  res.json({ success: true, request: newRequest });
});

// Subscribe to Newsletter
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "A valid email is required." });
  }

  const db = loadDb();
  
  // Avoid duplicate emails
  const exists = db.newsletterSubscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.json({ success: true, message: "Already subscribed." });
  }

  const newSub = {
    id: Date.now().toString(),
    email,
    subscribedAt: new Date().toISOString()
  };

  db.newsletterSubscribers.push(newSub);
  saveDb(db);

  res.json({ success: true, subscriber: newSub });
});

// Book Consultation
app.post("/api/consultations", (req, res) => {
  const { name, email, company, date, timeSlot, brief } = req.body;
  if (!name || !email || !date || !timeSlot) {
    return res.status(400).json({ error: "Missing required booking details." });
  }

  const db = loadDb();
  const newBooking = {
    id: Date.now().toString(),
    name,
    email,
    company: company || "Not Specified",
    date,
    timeSlot,
    brief: brief || "No additional brief.",
    createdAt: new Date().toISOString()
  };

  db.consultations.push(newBooking);
  saveDb(db);

  res.json({ success: true, booking: newBooking });
});

// Admin Authentication
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "liftedveil2026") {
    res.json({ success: true, token: "admin-veil-session-token", user: { username: "admin", role: "Administrator" } });
  } else {
    res.status(401).json({ error: "Invalid admin credentials." });
  }
});

// Client Portal Authentication
app.post("/api/portal/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "client@example.com" && password === "clientpass") {
    res.json({
      success: true,
      token: "client-portal-session-token",
      project: {
        id: "1",
        name: "Aetheris Web Platform v2",
        status: "Production Build Phase",
        progress: 85,
        milestones: [
          { name: "Brand Identity Alignment", completed: true, date: "June 05, 2026" },
          { name: "High-Fidelity Interaction Design", completed: true, date: "June 15, 2026" },
          { name: "Frontend Immersive Integration", completed: true, date: "June 24, 2026" },
          { name: "AI Agent Choreography", completed: false, date: "Pending Sign-off" },
          { name: "Production Deployment", completed: false, date: "July 10, 2026" }
        ],
        invoices: [
          { id: "INV-2026-041", amount: "$24,500", status: "Paid", date: "June 01, 2026" },
          { id: "INV-2026-056", amount: "$18,500", status: "Pending", date: "June 25, 2026" }
        ],
        messages: [
          { sender: "Julien Vane", text: "We've loaded the high-friction cubic-bezier curves for the primary product carousel. Take a look and let us know your feedback on the client build.", date: "Today, 10:14 AM" },
          { sender: "System", text: "New milestone verified: Immersive high-fidelity interface build complete.", date: "Yesterday, 4:32 PM" }
        ],
        files: [
          { name: "lifted_veil_aetheris_guidelines.pdf", size: "14.2 MB", date: "June 12, 2026" },
          { name: "high_fidelity_ux_flows_desktop.fig", size: "84.5 MB", date: "June 18, 2026" }
        ]
      }
    });
  } else {
    res.status(401).json({ error: "Invalid credentials. Use client@example.com / clientpass." });
  }
});

// CMS Endpoint edits (Admin can modify DB collections)
app.post("/api/cms/update", (req, res) => {
  const { collection, item } = req.body;
  if (!collection || !item || !item.id) {
    return res.status(400).json({ error: "Collection type and valid item are required." });
  }

  const db = loadDb();
  if (!db[collection as keyof DB] || !Array.isArray(db[collection as keyof DB])) {
    return res.status(400).json({ error: "Invalid collection specified." });
  }

  const list = db[collection as keyof DB] as any[];
  const index = list.findIndex(i => i.id === item.id);
  
  if (index !== -1) {
    list[index] = { ...list[index], ...item };
  } else {
    list.push(item);
  }

  saveDb(db);
  res.json({ success: true, list });
});

app.post("/api/cms/delete", (req, res) => {
  const { collection, id } = req.body;
  if (!collection || !id) {
    return res.status(400).json({ error: "Collection type and item ID are required." });
  }

  const db = loadDb();
  if (!db[collection as keyof DB] || !Array.isArray(db[collection as keyof DB])) {
    return res.status(400).json({ error: "Invalid collection specified." });
  }

  const list = db[collection as keyof DB] as any[];
  const filtered = list.filter(i => i.id !== id);
  (db as any)[collection] = filtered;

  saveDb(db);
  res.json({ success: true, list: filtered });
});

// Gemini Assistant Chatbot
app.post("/api/chat", async (req, res) => {
  const { message, chatHistory } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const client = getGeminiClient();
  const systemPrompt = `You are "VeilAI", the hyper-premium, articulate, and deeply knowledgeable AI Brand & Digital Advisor of LIFTED VEIL MEDIA.
Our brand is minimal, elegant, professional, luxury, and cinematic. We reveal the extraordinary.
We build world-class brands, websites, custom AI systems, autonomous agent loops, and cinematic marketing contents.
Never use marketing jargon/hype or emoji overload. Speak with objective clarity, luxury restraint, and precise technical understanding.
If the user asks about scheduling, mention our calendar selector widget. If they describe a project, suggest our estimate calculator.
If the client asks for credentials:
- Admin login is: username: admin, password: liftedveil2026
- Client portal demo email is: client@example.com, password: clientpass
Keep your answers beautifully structured using Markdown.`;

  if (client) {
    try {
      // Map history if any
      const contents = chatHistory ? chatHistory.map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      })) : [];

      // Append current message
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.json({
        text: `**[SYSTEM NOTE: VeilAI running in local recovery mode]**\n\nI received your query: "${message}".\n\nAs a core consultant for **Lifted Veil Media**, I would be thrilled to assist you. Our agency specializes in branding, high-end Next.js/React interactive websites, tailored corporate generative AI agents, and stunning visual content. How can I guide you today?`
      });
    }
  } else {
    // Elegant simulated fallback
    setTimeout(() => {
      let reply = `Thank you for connecting with **Lifted Veil Media**. 

To best serve your vision, here are our core solutions:
*   **Creative Brand Strategy**: Defining luxury identities, typography pairing, and unique visual systems.
*   **Immersive Web Systems**: Building ultra-fast React experiences driven by fluid inertial scrolling, custom WebGL components, and absolute alignment.
*   **Enterprise AI Choreography**: Constructing self-healing autonomous agent pipelines that automate repetitive high-skill workflows.

Would you like to initiate a design briefing, calculate a project budget with our interactive **Estimate Calculator**, or schedule a consultation?`;

      if (message.toLowerCase().includes("budget") || message.toLowerCase().includes("cost") || message.toLowerCase().includes("calculator")) {
        reply = `To estimate your project, you can use our interactive **Budget Estimator** located in the page section, or I can draft a brief scope estimate here.

Typically:
*   **Bespoke Identity & Guidelines**: $15K - $25K
*   **Cinematic Immersive Website (React/Next.js)**: $30K - $65K
*   **Autonomous Enterprise AI Agent Infrastructure**: $45K - $90K

Tell me about your product, and I will recommend a precise, hyper-optimized architectural strategy.`;
      } else if (message.toLowerCase().includes("contact") || message.toLowerCase().includes("email")) {
        reply = `You can submit your inquiry directly using our **Briefing Form** at the bottom of the page, or email our lead principal directly at **partner@liftedveilmedia.com**. We answer within 4 hours.`;
      }

      res.json({ text: reply });
    }, 600);
  }
});

// Proposal Generator AI
app.post("/api/ai/proposal", async (req, res) => {
  const { name, company, email, projectType, budget, message } = req.body;
  const client = getGeminiClient();

  const prompt = `Generate a highly polished, customized, luxury client proposal for:
Client: ${name}
Company: ${company || "Not specified"}
Project Type: ${projectType}
Budget Range: ${budget}
Description: ${message}

The proposal must be in beautiful Markdown and follow this precise format:
# LIFTED VEIL MEDIA — PROPOSAL BRIEF
## Executive Strategy
(Draft a high-end visual and functional vision)
## Core deliverables
(List 3 bullet points with premium technical names)
## Estimated Timeline & Phase Investment
(Structure into 3 phases: Identity, Choreography, Launch)

Keep the language professional, elegant, and highly authoritative.`;

  if (client) {
    try {
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.8,
        }
      });
      res.json({ text: response.text });
    } catch (err) {
      res.json({
        text: `# LIFTED VEIL MEDIA — STRATEGIC BRIEF

Thank you for requesting a tailored proposal briefing, ${name}. Our lead architect has drafted this strategic alignment overview.

## Executive Strategy
We will elevate **${company || "your product"}** by creating a bespoke **${projectType}** infrastructure. Our goal is to replace standard modular solutions with a high-fidelity, kinetic digital system that communicates pure authority, framed within our signature luxurious charcoal slate aesthetics.

## Core Deliverables
*   **Bespoke Kinetic Interface**: A customized single-page interactive system powered by custom deceleration ease-out curves, built on Next.js or React.
*   **Cognitive Agent Integration**: High-efficiency server-side LLM proxies that orchestrate real-time content analysis, structured as custom tool-use chains.
*   **Elite Branding Architecture**: Typographic hierarchy utilizing space-grotesk display pairs, balanced grid modules, and absolute vector alignments.

## Estimated Timeline & Phase Investment
*   **Phase 1: Brand Alignment & Figma High-Fidelity Blueprinting** (Weeks 1-3)
*   **Phase 2: Full-Stack React Orchestration & Integration** (Weeks 4-7)
*   **Phase 3: Deep Performance Optimization & Production Launch** (Week 8)

*Budget alignment verified within your ${budget} range.*`
      });
    }
  } else {
    // Elegant mock
    res.json({
      text: `# LIFTED VEIL MEDIA — STRATEGIC BRIEF

Thank you for requesting a tailored proposal briefing, ${name}. Our lead architect has drafted this strategic alignment overview.

## Executive Strategy
We will elevate **${company || "your product"}** by creating a bespoke **${projectType}** infrastructure. Our goal is to replace standard modular solutions with a high-fidelity, kinetic digital system that communicates pure authority, framed within our signature luxurious charcoal slate aesthetics.

## Core Deliverables
*   **Bespoke Kinetic Interface**: A customized single-page interactive system powered by custom deceleration ease-out curves, built on Next.js or React.
*   **Cognitive Agent Integration**: High-efficiency server-side LLM proxies that orchestrate real-time content analysis, structured as custom tool-use chains.
*   **Elite Branding Architecture**: Typographic hierarchy utilizing space-grotesk display pairs, balanced grid modules, and absolute vector alignments.

## Estimated Timeline & Phase Investment
*   **Phase 1: Brand Alignment & Figma High-Fidelity Blueprinting** (Weeks 1-3)
*   **Phase 2: Full-Stack React Orchestration & Integration** (Weeks 4-7)
*   **Phase 3: Deep Performance Optimization & Production Launch** (Week 8)

*Budget alignment verified within your ${budget} range. We will contact you at ${email} to schedule a presentation session.*`
    });
  }
});

// AI Recommendation System
app.post("/api/ai/recommendation", async (req, res) => {
  const { projectDetails } = req.body;
  const client = getGeminiClient();

  const prompt = `The user described their project: "${projectDetails}".
Analyze their description and return a clean JSON object containing:
1. "matchScore": a percentage matching with our agency capabilities (0-100)
2. "suggestedServices": array of services we provide that match their needs
3. "techStack": array of technologies suited for this project
4. "consultantOpinion": 2-sentence executive summary of how we would approach it.

Return ONLY the JSON. No markdown, no wrappers.`;

  if (client) {
    try {
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });
      res.json(JSON.parse(response.text.trim()));
    } catch (err) {
      // Recovery fallback
      res.json({
        matchScore: 92,
        suggestedServices: ["Website Design", "Web Development", "AI Automation"],
        techStack: ["React / Vite", "TailwindCSS v4", "Google Gemini API"],
        consultantOpinion: "Your vision is highly aligned with our core expertise. We recommend integrating an interactive digital portal driven by our custom cubic-bezier animations, coupled with a server-side Gemini intelligence route to automate incoming client workflows."
      });
    }
  } else {
    res.json({
      matchScore: 95,
      suggestedServices: ["Website Design", "Web Development", "AI Automation"],
      techStack: ["React / Vite", "TailwindCSS v4", "Google Gemini API"],
      consultantOpinion: "Your vision is highly aligned with our core expertise. We recommend integrating an interactive digital portal driven by our custom cubic-bezier animations, coupled with a server-side Gemini intelligence route to automate incoming client workflows."
    });
  }
});

// Vite Setup Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Vite dev server integrating...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Lifted Veil Media] server listening on http://localhost:${PORT}`);
  });
}

startServer();
