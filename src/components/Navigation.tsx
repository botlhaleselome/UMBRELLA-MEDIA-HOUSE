import { useState, useEffect } from "react";
import { Sparkles, Lock, Settings, Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  openPortal: () => void;
  openAdmin: () => void;
}

export default function Navigation({
  activeSection,
  setActiveSection,
  openPortal,
  openAdmin,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "careers", label: "Careers" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-[#050505]/80 backdrop-blur-md border-b border-white/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          id="nav-logo"
          onClick={() => handleNavClick("home")}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center transition-all duration-500 group-hover:rotate-180">
            <span className="text-black font-display font-bold text-lg select-none">V</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-medium text-sm tracking-widest text-white">
              LIFTED VEIL
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#00d9ff] font-mono">
              MEDIA
            </span>
          </div>
        </div>

        {/* Desktop Navigation Items */}
        <div id="desktop-nav" className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer ${
                activeSection === item.id
                  ? "text-[#00d9ff]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div id="nav-actions" className="hidden lg:flex items-center space-x-4">
          <button
            id="btn-client-portal"
            onClick={openPortal}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-[11px] font-medium tracking-wider text-white transition-all cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#00d9ff]" />
            <span>CLIENT PORTAL</span>
          </button>
          <button
            id="btn-admin-panel"
            onClick={openAdmin}
            className="flex items-center space-x-1 px-3 py-2 rounded-full hover:bg-white/5 text-white/40 hover:text-[#00d9ff] transition-all cursor-pointer"
            title="Admin Dashboard"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            id="mobile-btn-portal"
            onClick={openPortal}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:text-[#00d9ff] transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-[#00d9ff] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 py-6 px-6 space-y-6"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                id={`mobile-nav-item-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm uppercase tracking-widest font-medium transition-colors ${
                  activeSection === item.id ? "text-[#00d9ff]" : "text-white/60"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <button
              id="mobile-drawer-portal"
              onClick={() => {
                setMobileMenuOpen(false);
                openPortal();
              }}
              className="flex items-center space-x-2 text-xs font-medium tracking-widest text-white hover:text-[#00d9ff]"
            >
              <Lock className="w-4 h-4 text-[#00d9ff]" />
              <span>CLIENT PORTAL</span>
            </button>
            <button
              id="mobile-drawer-admin"
              onClick={() => {
                setMobileMenuOpen(false);
                openAdmin();
              }}
              className="flex items-center space-x-2 text-xs font-medium text-white/40 hover:text-[#00d9ff]"
            >
              <Settings className="w-4 h-4" />
              <span>ADMIN PANEL</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
