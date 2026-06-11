import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_URL =
  "https://wa.me/919566823666?text=Hi%2C%20I%20would%20like%20to%20book%20a%20session%20at%20Jeevalaya";

export function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="button-whatsapp-float"
      aria-label="Book a session on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white shadow-2xl group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-50" />
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-30"
        style={{ animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite 0.7s" }}
      />
      <FaWhatsapp className="w-8 h-8 relative z-10" />
      <span className="absolute right-[4.5rem] bg-white text-gray-900 px-3 py-2 rounded-lg text-sm font-semibold shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap -translate-x-2 group-hover:translate-x-0">
        Book a Session
      </span>
    </motion.a>
  );
}
