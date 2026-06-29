import { motion } from "motion/react";
import { Sparkles, Globe, Compass, Terminal, ShieldCheck, Newspaper } from "lucide-react";

interface BrandGatewayProps {
  onSelectBrand: (brand: "liftedveil" | "fluencytech") => void;
}

export default function BrandGateway({ onSelectBrand }: BrandGatewayProps) {
  // Stagger variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 16 }
    }
  };

  const floatVariants1 = {
    animate: {
      x: [0, 30, -20, 0],
      y: [0, -50, 30, 0],
      scale: [1, 1.1, 0.95, 1],
      transition: {
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatVariants2 = {
    animate: {
      x: [0, -40, 40, 0],
      y: [0, 40, -40, 0],
      scale: [1, 0.9, 1.15, 1],
      transition: {
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Decorative ambient background glows with drift path motion */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          variants={floatVariants1}
          animate="animate"
          className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#C9A84C]/5 blur-[130px]"
        ></motion.div>
        <motion.div 
          variants={floatVariants2}
          animate="animate"
          className="absolute bottom-[5%] right-[15%] w-[600px] h-[600px] rounded-full bg-[#00A8E8]/5 blur-[150px]"
        ></motion.div>
        
        {/* Abstract floating matrix grid particles */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        {/* Interactive laser-like ambient horizon line */}
        <div className="absolute top-[50%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center border-b border-white/5 gap-4"
      >
        <div className="flex items-center space-x-3">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded bg-white flex items-center justify-center cursor-pointer"
          >
            <span className="text-black font-display font-black text-sm">◈</span>
          </motion.div>
          <div>
            <h1 className="font-display font-medium text-xs tracking-[0.25em] text-white">UMBRELLA MEDIA HOUSE</h1>
            <p className="text-[9px] tracking-widest text-neutral-500 font-mono">INTELLIGENCE & COGNITION CO.</p>
          </div>
        </div>
        <div className="text-[10px] tracking-[0.2em] text-neutral-400 font-mono flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>DUAL-PORTAL ACTIVE SYSTEM</span>
        </div>
      </motion.header>

      {/* Main Dual Gateways */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-2 max-w-7xl w-full mx-auto px-6 py-12 gap-8 items-center"
      >
        {/* Left Card: Lifted Veil Media */}
        <motion.div
          id="gateway-card-liftedveil"
          variants={itemVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.015,
            borderColor: "rgba(201, 168, 76, 0.45)",
            boxShadow: "0 20px 40px -15px rgba(201, 168, 76, 0.15)"
          }}
          whileTap={{ scale: 0.995 }}
          className="h-full min-h-[460px] bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden group shadow-2xl cursor-pointer transition-colors duration-500"
          onClick={() => onSelectBrand("liftedveil")}
        >
          {/* Accent lighting glow */}
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#C9A84C]/10 blur-[90px] group-hover:bg-[#C9A84C]/20 group-hover:blur-[110px] transition-all duration-700"></div>
          
          {/* Thin ambient sliding border indicator */}
          <div className="absolute left-0 top-0 w-[2px] h-0 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent group-hover:h-full transition-all duration-700 ease-out"></div>
          
          <div className="space-y-8 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#C9A84C] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full inline-block animate-pulse"></span>
                VOLUME I — THE CRITICAL PERSPECTIVE
              </span>
              <Newspaper className="w-5 h-5 text-[#C9A84C]/40 group-hover:text-[#C9A84C] group-hover:rotate-12 transition-all duration-500" />
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[10px] font-mono text-[#C9A84C] tracking-wider uppercase">
                <span>The Editorial Channel</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif-luxury font-semibold text-[#F5F0E8] leading-tight group-hover:text-white transition-colors duration-300">
                LIFTED VEIL <br />
                <span className="italic font-normal font-garamond text-neutral-400 group-hover:text-neutral-200 transition-colors duration-500">MEDIA</span>
              </h2>
              <div className="h-[1px] w-16 bg-[#C9A84C]/40 group-hover:w-full transition-all duration-700"></div>
              <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-md pt-2">
                Exploring digital culture, philosophy, media commentary, and future-society ethics. A quiet space designed for reflective, cinematic storytelling and independent long-form thoughts.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm pt-4">
              <div className="p-3.5 rounded-lg bg-[#121212] border border-white/5 group-hover:bg-[#121212]/90 group-hover:border-[#C9A84C]/20 transition-all duration-500">
                <span className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider">Aesthetic</span>
                <span className="text-[11px] text-neutral-400 font-light mt-0.5 block">Cinematic Editorial</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#121212] border border-white/5 group-hover:bg-[#121212]/90 group-hover:border-[#C9A84C]/20 transition-all duration-500">
                <span className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider">Inquiry Focus</span>
                <span className="text-[11px] text-neutral-400 font-light mt-0.5 block">Asks &quot;Why&quot;</span>
              </div>
            </div>
          </div>

          <div className="pt-8 relative z-10 flex items-center justify-between border-t border-white/5 mt-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]/80 group-hover:text-[#C9A84C] font-semibold transition-colors flex items-center gap-2">
              ENTER SYSTEM ◈
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
            <span className="text-[10px] font-mono text-neutral-500">FORMAT: SERIF / GOLD</span>
          </div>
        </motion.div>

        {/* Right Card: FluencyTech */}
        <motion.div
          id="gateway-card-fluencytech"
          variants={itemVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.015,
            borderColor: "rgba(0, 229, 204, 0.45)",
            boxShadow: "0 20px 40px -15px rgba(0, 229, 204, 0.15)"
          }}
          whileTap={{ scale: 0.995 }}
          className="h-full min-h-[460px] bg-[#0A1128] border border-white/5 rounded-2xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden group shadow-2xl cursor-pointer transition-colors duration-500"
          onClick={() => onSelectBrand("fluencytech")}
        >
          {/* Accent lighting glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#00E5CC]/10 blur-[90px] group-hover:bg-[#00E5CC]/20 group-hover:blur-[110px] transition-all duration-700"></div>
          
          {/* Futuristic matrix scanner laser overlay on hover */}
          <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00E5CC] to-transparent top-0 opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-all duration-300"></div>
          
          {/* Thin ambient sliding border indicator */}
          <div className="absolute right-0 top-0 w-[2px] h-0 bg-gradient-to-b from-transparent via-[#00E5CC] to-transparent group-hover:h-full transition-all duration-700 ease-out"></div>
          
          <div className="space-y-8 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-[0.3em] text-[#00E5CC] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#00E5CC] rounded-full inline-block animate-ping"></span>
                VOLUME II — THE APPLIED COGNITION
              </span>
              <Terminal className="w-5 h-5 text-[#00E5CC]/40 group-hover:text-[#00E5CC] group-hover:-translate-y-0.5 transition-all duration-500" />
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5CC]/10 border border-[#00E5CC]/20 text-[10px] font-mono text-[#00E5CC] tracking-wider uppercase">
                <span>The Engineering Hub</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white leading-tight uppercase tracking-tight">
                FLUENCY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] to-[#00A8E8] group-hover:from-white group-hover:to-[#00E5CC] transition-all duration-500">TECH</span>
              </h2>
              <div className="h-[1px] w-16 bg-[#00E5CC]/40 group-hover:w-full transition-all duration-700"></div>
              <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-md pt-2">
                Delivering high-performance developer tutorials, interactive AI toolkits, coding frameworks, and detailed technology explainers. Designed for engineers and curious digital architects.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm pt-4">
              <div className="p-3.5 rounded-lg bg-[#0F1D3A] border border-white/5 group-hover:bg-[#0F1D3A]/90 group-hover:border-[#00E5CC]/20 transition-all duration-500">
                <span className="block text-xs font-mono text-[#00E5CC] uppercase tracking-wider">Aesthetic</span>
                <span className="text-[11px] text-neutral-400 font-light mt-0.5 block">Futurist Grid</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0F1D3A] border border-white/5 group-hover:bg-[#0F1D3A]/90 group-hover:border-[#00E5CC]/20 transition-all duration-500">
                <span className="block text-xs font-mono text-[#00E5CC] uppercase tracking-wider">Inquiry Focus</span>
                <span className="text-[11px] text-neutral-400 font-light mt-0.5 block">Asks &quot;How&quot;</span>
              </div>
            </div>
          </div>

          <div className="pt-8 relative z-10 flex items-center justify-between border-t border-white/5 mt-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#00E5CC]/80 group-hover:text-[#00E5CC] font-semibold transition-colors flex items-center gap-2">
              LAUNCH SYSTEM ▲
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
            <span className="text-[10px] font-mono text-neutral-500">FORMAT: GEOMETRIC / CYAN</span>
          </div>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-neutral-500 font-mono gap-2"
      >
        <span>© 2026 UMBRELLA MEDIA HOUSE. ALL RIGHTS RESERVED.</span>
        <div className="flex space-x-6">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
            PORTAL_ACTIVE: YES
          </span>
          <span>SYSTEM_STABLE: 100%</span>
        </div>
      </motion.footer>
    </div>
  );
}

