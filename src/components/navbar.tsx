import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Founder", href: "#founder" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_URL =
  "https://wa.me/919566823666?text=Hi%2C%20I%20would%20like%20to%20book%20a%20session%20at%20Jeevalaya";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setScrolled(v > 0.02));
    return unsub;
  }, [scrollYProgress]);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b8860b] via-[#d4a843] to-[#4aab99] origin-left z-[100]"
        style={{ scaleX }}
      />
      <motion.nav
        className="fixed top-[3px] left-0 right-0 z-50 transition-all duration-500"
        animate={{
          backgroundColor: scrolled ? "rgba(10,61,46,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-heading text-xl text-white tracking-widest"
          >
            JEEVA<span className="text-[#d4a843]">LAYA</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-white/80 hover:text-[#d4a843] font-sans text-sm tracking-wider transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4a843] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2 text-sm font-semibold tracking-wider rounded-sm hover:bg-[#128C7E] transition-colors duration-200 shadow-lg"
            >
              <FaWhatsapp className="w-4 h-4" /> Book Now
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen((p) => !p)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0a3d2e]/95 backdrop-blur-md px-6 pb-6 flex flex-col gap-4 border-t border-white/10"
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-white/80 hover:text-[#d4a843] font-sans text-sm tracking-wider py-2 text-left transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3 text-sm font-semibold tracking-wider rounded-sm"
            >
              <FaWhatsapp className="w-4 h-4" /> Book a Session
            </a>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
