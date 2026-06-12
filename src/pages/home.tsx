import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Brain,
  Zap,
  Heart,
  Target,
  Users,
  Star,
  Sparkles,
  Building2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  BookOpen,
  Flame,
  Sun,
  Wind,
  Leaf,
  Moon,
  Shield,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import heroBg from "@/assets/hero-bg copy.png";
import natureLake from "@/assets/nature-lake.png";
import compassionHands from "@/assets/compassion-hands.png";
import mandalaSymbol from "@/assets/mandala-symbol.png";
import meditationWoman from "@/assets/meditation-woman.png";
const founderLetterhead = "/founder-radhisha.jpg";

const WHATSAPP =
  "https://wa.me/919566823666?text=Hi%2C%20I%20would%20like%20to%20book%20a%20session%20at%20Jeevalaya";

/* ─── Types ─────────────────────────────────────────────── */
interface Program {
  icon: React.ReactNode;
  title: string;
  tamil: string;
  desc: string;
  tags: string[];
  color: string;
  category: string;
}

/* ─── Data ──────────────────────────────────────────────── */
const PROGRAMS: Program[] = [
  {
    icon: <Brain className="w-7 h-7" />,
    title: "NLP Therapy & Coaching",
    tamil: "நியூரோ லிங்குவிஸ்டிக் புரோகிராமிங்",
    desc: "Rewires the language of your mind. Break limiting beliefs, overcome fears, and reprogram your thoughts for power and purpose.",
    tags: ["Individual Sessions", "Group Workshops", "Intensive 2-Day", "Online Available"],
    color: "#2a7c6f",
    category: "Mind",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Pranic Healing",
    tamil: "பிராண சக்தி சிகிச்சை",
    desc: "Advanced energy healing using prana — the life force — to accelerate physical and emotional healing from deep within.",
    tags: ["Distance Healing", "Chakra Balancing", "Aura Cleansing", "Stress Relief"],
    color: "#b8860b",
    category: "Energy",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Psychology & Counselling",
    tamil: "உளவியல் ஆலோசனை",
    desc: "Professional counselling for individuals, couples, children and families — addressing anxiety, depression, grief, and trauma.",
    tags: ["Individual", "Couples", "Child & Teen", "Family"],
    color: "#c0392b",
    category: "Mind",
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: "Life Coaching",
    tamil: "வாழ்க்கை பயிற்சி",
    desc: "Clarity. Direction. Action. Identify your purpose, set powerful goals, and create a life that truly reflects who you are.",
    tags: ["Career Clarity", "Goal Setting", "Confidence Building", "1-on-1 Mentoring"],
    color: "#2a7c6f",
    category: "Mind",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Women's Empowerment",
    tamil: "பெண்கள் சக்தியூட்டல்",
    desc: "For women navigating domestic struggles, self-worth issues, career rebuilding, toxic relationships and spiritual awakening.",
    tags: ["Weekend Retreats", "Support Circles", "Financial Independence", "Leadership"],
    color: "#8e44ad",
    category: "Empower",
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: "Child & Adolescent Healing",
    tamil: "குழந்தை மற்றும் இளையோர் சிகிச்சை",
    desc: "Specialized support for children facing anxiety, behavioral challenges, academic pressure, trauma, and family stress.",
    tags: ["Play Therapy", "Parenting Guidance", "School Struggles", "Emotional Safety"],
    color: "#e67e22",
    category: "Family",
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: "Spiritual Wellness & Retreats",
    tamil: "ஆன்மீக நலன் மற்றும் முகாம்கள்",
    desc: "Arhatic Yoga, Siddhar wisdom, Islamic spirituality and universal consciousness teachings in transformative retreats.",
    tags: ["Day Retreats", "Agam Thirandu", "VIMOCHAN Program", "Meditation"],
    color: "#2a7c6f",
    category: "Spirit",
  },
  {
    icon: <Building2 className="w-7 h-7" />,
    title: "Institutional & Corporate",
    tamil: "நிறுவன திட்டங்கள்",
    desc: "Life skills and mental wellness programs for schools, colleges, and corporate teams — building emotionally intelligent institutions.",
    tags: ["School Programs", "Teacher Training", "Corporate Wellness", "TNSDC Empanelled"],
    color: "#b8860b",
    category: "Corporate",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I came broken. I left whole. Radhisha didn't just counsel me — she helped me understand myself for the first time in 40 years.",
    author: "Mother of Two",
    location: "Tirupur",
  },
  {
    quote:
      "The NLP session changed the relationship with my son completely. One session revealed what years of arguments couldn't.",
    author: "Parent",
    location: "Coimbatore",
  },
  {
    quote:
      "As a teacher, I thought I knew everything about children. Jeevalaya showed me I didn't know myself. That was the real lesson.",
    author: "School Teacher",
    location: "Palladam",
  },
  {
    quote:
      "The Agam Thirandu retreat was not a workshop. It was a rebirth. I found my purpose on that mountain in Ooty.",
    author: "Women's Empowerment Participant",
    location: "Tamil Nadu",
  },
];

const VALUES = [
  { emoji: "🤝", title: "Compassion", desc: "Every person met with unconditional warmth and zero judgment." },
  { emoji: "🌍", title: "Inclusivity", desc: "All faiths, all communities — healing belongs to everyone." },
  { emoji: "🔬", title: "Integration", desc: "Modern science united with ancient wisdom." },
  { emoji: "🌱", title: "Growth", desc: "Transformation is possible at every stage of life." },
  { emoji: "🔒", title: "Confidentiality", desc: "Your story is sacred. Complete privacy, always." },
  { emoji: "✨", title: "Excellence", desc: "Highest professional care in every single session." },
];

// removed FAITHS listing as requested

const SERVE = [
  { emoji: "👩‍👧", title: "Mothers & Women", desc: "Who carry the world silently and need a space to heal." },
  { emoji: "👦", title: "Children & Teens", desc: "Who need to be heard before they are fixed." },
  { emoji: "👨‍👩‍👧‍👦", title: "Families", desc: "Navigating conflict, grief, or transitions together." },
  { emoji: "💼", title: "Professionals", desc: "Facing burnout, purpose crisis, or leadership challenges." },
  { emoji: "🧓", title: "Elders", desc: "Experiencing loneliness or grief — deserving gentle care." },
  { emoji: "🌱", title: "Soul Seekers", desc: "Searching for meaning, purpose, and deeper connection." },
];

const STATS = [
  { value: 5000, suffix: "+", label: "Lives Transformed" },
  { value: 8, suffix: "+", label: "Healing Sessions" },
  { value: 8, suffix: "", label: "Courses" },
  { value: 10, suffix: "+", label: "Years of Service" },
];

const COURSES = [
  {
    icon: <Brain className="w-7 h-7" />,
    title: "Applied Psychology for Everyday Life Certification",
    duration: "8 Weeks",
    fee: "₹8,999",
    what: [
      "Human behaviour",
      "Personality types",
      "Emotions and motivation",
      "Stress and anxiety management",
      "Relationship psychology",
      "Child psychology",
      "Positive psychology",
    ],
    certification: "Certified Applied Psychology Practitioner",
    desc: "A practical psychology certification focused on everyday mental wellness and applied techniques.",
    color: "#2a7c6f",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "NLP for Personal Transformation Certification",
    duration: "6 Weeks",
    fee: "₹12,999",
    what: [
      "NLP foundations",
      "Belief change techniques",
      "Rapport building",
      "Goal programming",
      "Anchoring",
      "Reframing",
      "Communication excellence",
    ],
    certification: "Certified NLP Transformation Practitioner",
    desc: "A focused NLP certification to reprogram patterns and master communication for transformation.",
    color: "#b8860b",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Emotional Healing & Inner Child Practitioner",
    duration: "8 Weeks",
    fee: "₹9,999",
    what: [
      "Childhood conditioning",
      "Emotional wounds",
      "Forgiveness",
      "Trauma awareness",
      "Healing tools",
      "Self-love practices",
    ],
    certification: "Certified Emotional Healing Practitioner",
    desc: "Deep emotional healing training focused on inner-child work and sustainable self-care.",
    color: "#c0392b",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Sacred Feminine Leadership Certification",
    duration: "10 Weeks",
    fee: "₹14,999",
    what: [
      "Feminine energy",
      "Self-worth",
      "Intuition",
      "Emotional wisdom",
      "Leadership",
      "Purpose",
    ],
    certification: "Certified Sacred Feminine Leadership Coach",
    desc: "Leadership training rooted in feminine wisdom, emotional intelligence and purpose-led service.",
    color: "#8e44ad",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Life Skills & Trainer Development Certification",
    duration: "8 Weeks",
    fee: "₹12,999",
    what: [
      "Public speaking",
      "Facilitation",
      "Group dynamics",
      "Icebreakers",
      "Training design",
      "Presentation skills",
    ],
    certification: "Certified Life Skills Trainer",
    desc: "A practical program to become a confident trainer and facilitator with strong delivery skills.",
    color: "#e67e22",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Conscious Parenting Certification",
    duration: "6 Weeks",
    fee: "₹7,999",
    what: [
      "Child psychology",
      "Emotional intelligence",
      "Positive discipline",
      "Communication with children",
      "Screen-time management",
    ],
    certification: "Certified Conscious Parenting Coach",
    desc: "Tools and frameworks for parenting with presence, emotional attunement and healthy boundaries.",
    color: "#2a7c6f",
  },
  {
    icon: <Mail className="w-7 h-7" />,
    title: "Language & Communication Mastery Program",
    duration: "12 Weeks",
    fee: "₹6,999",
    what: [
      "Spoken English",
      "Stage speaking",
      "Interview skills",
      "Vocabulary",
      "Presentation skills",
      "Confidence building",
    ],
    certification: "Certified Communication Excellence Practitioner",
    desc: "A confidence-first communication program focusing on speaking, presence and practical fluency.",
    color: "#4aab99",
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: "Jeevalaya Holistic Transformation Coach Certification",
    duration: "6 Months",
    fee: "₹35,000 - ₹75,000",
    what: [
      "Psychology",
      "NLP",
      "Emotional healing",
      "Meditation",
      "Coaching skills",
      "Life skills",
      "Spiritual development",
      "Ethics",
    ],
    certification: "Certified Jeevalaya Holistic Transformation Coach",
    desc: "Our premium coach certification combining psychology, healing and coaching into a professional pathway.",
    color: "#b8860b",
  },
];

const CATEGORIES = ["All", "Mind", "Energy", "Empower", "Family", "Spirit", "Corporate"];

/* ─── Hooks ─────────────────────────────────────────────── */
function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, active, duration]);
  return count;
}

/* ─── Sub-components ────────────────────────────────────── */
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(value, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-5xl sm:text-6xl font-semibold text-[#d4a843] mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-white/70 text-sm tracking-widest uppercase font-sans">{label}</div>
    </div>
  );
}

function ProgramCard({ prog, idx }: { prog: Program; idx: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: idx * 0.07, duration: 0.6, ease: "easeOut" }}
      className="relative bg-white rounded-lg overflow-hidden cursor-default group"
      style={{ boxShadow: hovered ? `0 20px 60px ${prog.color}33` : "0 4px 20px rgba(0,0,0,0.06)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${prog.color}, ${prog.color}88)` }}
      />
      <div className="p-6">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${prog.color}18`, color: prog.color }}
        >
          {prog.icon}
        </div>
        <h3 className="font-heading text-lg text-[#1a1a2e] mb-1">{prog.title}</h3>
        <p
          className="font-serif text-xs italic mb-3"
          style={{ color: prog.color }}
        >
          {prog.tamil}
        </p>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{prog.desc}</p>
        <div className="flex flex-wrap gap-2">
          {prog.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-1 rounded-full border font-medium tracking-wide"
              style={{ color: prog.color, borderColor: `${prog.color}44`, backgroundColor: `${prog.color}0d` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{ border: `1.5px solid ${prog.color}55` }}
      />
    </motion.div>
  );
}

// (modal state will be managed inside the Home component)

function RainDrop({ style }: { style: React.CSSProperties }) {
  return <div className="rain-drop" style={style} />;
}

/* ─── Main Component ────────────────────────────────────── */
export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);

  const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  const filtered =
    activeCategory === "All"
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.category === activeCategory);

  const rainDrops = Array.from({ length: 28 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${1.2 + Math.random() * 1.8}s`,
    opacity: 0.12 + Math.random() * 0.18,
    height: `${60 + Math.random() * 80}px`,
  }));

  /* Word-by-word quote reveal */
  const quoteWords =
    "You are not broken. You are not lost. You are not alone. You have simply forgotten who you are.".split(
      " "
    );

  return (
    <div className="bg-[#fdf8f0] text-[#2d2d2d] overflow-x-hidden">

      {/* ════════════════════════════════
          1. HERO
      ════════════════════════════════ */}
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a3d2e]/40 via-[#0d2137]/75 to-[#0a3d2e]/20" />
        </motion.div>

        {/* Floating particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 2 + (i % 4),
              height: 2 + (i % 4),
              left: `${(i * 17 + 8) % 100}%`,
              top: `${(i * 23 + 5) % 100}%`,
              backgroundColor: i % 3 === 0 ? "#d4a843" : "#4aab99",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity }}
        >


          <motion.p
            className="font-serif text-[#d4a843] text-xl sm:text-2xl italic mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            காண்பது எல்லாம் கரையும் உணர்வது மட்டுமே உயிர்ப்பிக்கும்...
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="font-heading text-[clamp(3rem,12vw,9rem)] font-semibold text-white tracking-[0.15em] leading-none"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              JEEVA<span className="text-[#d4a843]">LAYA</span>
            </motion.h1>
          </div>

          <motion.p
            className="font-serif text-[#4aab99] text-2xl sm:text-3xl mt-3 mb-8 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Holistic Healing Centre
          </motion.p>

          <motion.p
            className="text-white/70 tracking-[0.25em] uppercase text-sm sm:text-base mb-12 font-sans font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Nurturing Minds · Awakening Souls · Transforming Lives
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 bg-[#d4a843] text-[#0a3d2e] px-10 py-4 font-heading text-sm tracking-[0.2em] uppercase font-semibold shadow-2xl overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <FaWhatsapp className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Begin Your Healing</span>
            </a>
            <button
              onClick={() =>
                document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-white/70 border border-white/30 px-8 py-4 font-sans text-sm tracking-widest uppercase hover:border-[#d4a843] hover:text-[#d4a843] transition-all duration-300"
            >
              Explore Programs
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
              <div className="w-1 h-2 bg-[#d4a843] rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════
          2. STATS BAR
      ════════════════════════════════ */}
      <section className="bg-[#0a3d2e] py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          3. OPENING QUOTE
      ════════════════════════════════ */}
      <section className="py-28 sm:py-36 px-6 relative overflow-hidden bg-gradient-to-br from-[#0d2137] to-[#0a3d2e]">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #d4a843 1px, transparent 1px), radial-gradient(circle at 80% 20%, #4aab99 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mb-10">
            {quoteWords.map((word, i) => (
              <motion.span
                key={i}
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-white italic leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-[#d4a843] to-transparent mb-8"
          />
          <motion.p
            className="font-serif text-xl sm:text-2xl text-[#4aab99] italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
          >
            "We are here to help you remember."
          </motion.p>
          <motion.p
            className="font-heading text-[#d4a843] text-xs tracking-[0.3em] uppercase mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
          >
            ✦ The Heart of Jeevalaya ✦
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════
          4. MISSION & VISION
      ════════════════════════════════ */}
      <section id="about" className="py-28 px-6 bg-[#fdf8f0] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.95] pointer-events-none">
          <img src={natureLake} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-[#2a7c6f] text-xs tracking-[0.4em] uppercase mb-3">
              Our Foundation
            </p>
            <h2 className="font-heading text-5xl sm:text-6xl text-[#1a1a2e]">
              Mission &amp; <span className="text-[#2a7c6f] italic font-serif">Vision</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#b8860b] to-[#4aab99] mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                bg: "linear-gradient(135deg,#0a3d2e,#0d2137)",
                icon: "🌿",
                label: "Our Mission",
                title: "To Heal. To Empower. To Transform.",
                text: "Jeevalaya exists to provide accessible, holistic healing to every soul — regardless of religion, background, or economic status. We integrate modern psychology with ancient wisdom to heal the whole person: mind, body, and spirit. We walk with people through their darkest moments into their brightest becoming.",
                light: true,
              },
              {
                bg: "linear-gradient(135deg,#f5e6c0,#fdf3e7)",
                icon: "🌅",
                label: "Our Vision",
                title: "A World Where No Soul Suffers Alone",
                text: "We envision a society where mental health is not a stigma but a strength. Where healing is not a luxury but a right. Where every mother, child, woman, and family has access to holistic transformation — building communities that are emotionally intelligent, spiritually grounded, and deeply connected.",
                light: false,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="p-10 rounded-xl"
                style={{ background: card.bg }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <span className="text-4xl block mb-4">{card.icon}</span>
                <p
                  className={`font-heading text-xs tracking-[0.3em] uppercase mb-3 ${
                    card.light ? "text-[#d4a843]" : "text-[#2a7c6f]"
                  }`}
                >
                  {card.label}
                </p>
                <h3
                  className={`font-serif text-2xl font-medium mb-4 ${
                    card.light ? "text-white" : "text-[#1a1a2e]"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    card.light ? "text-white/70" : "text-[#6b6b6b]"
                  }`}
                >
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          5. PROGRAMS
      ════════════════════════════════ */}
      <section id="programs" className="py-28 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-[#2a7c6f] text-xs tracking-[0.4em] uppercase mb-3">
              What We Offer
            </p>
            <h2 className="font-heading text-5xl sm:text-6xl text-[#1a1a2e]">
              Healing <span className="text-[#2a7c6f] italic font-serif">Sessions</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#b8860b] to-[#4aab99] mx-auto mt-6 mb-10 rounded-full" />
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 text-sm font-sans font-medium tracking-wider rounded-full border transition-all duration-300"
                animate={{
                  backgroundColor: activeCategory === cat ? "#2a7c6f" : "transparent",
                  color: activeCategory === cat ? "#fff" : "#2a7c6f",
                  borderColor: activeCategory === cat ? "#2a7c6f" : "#2a7c6f66",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filtered.map((prog, idx) => (
                <ProgramCard key={prog.title} prog={prog} idx={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════
          5b. COURSES
      ════════════════════════════════ */}
      <section id="courses" className="py-28 px-6 bg-gradient-to-br from-[#0d2137] to-[#0a3d2e] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, #d4a843 1px, transparent 1px), radial-gradient(circle at 70% 80%, #4aab99 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-[#d4a843] text-sm tracking-[0.4em] uppercase mb-3">
              Structured Learning
            </p>
            <h2 className="font-heading text-5xl sm:text-6xl text-white">
              Our <span className="text-[#d4a843] italic font-serif">Courses</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#b8860b] to-[#4aab99] mx-auto mt-6 mb-4 rounded-full" />
            <p className="font-serif text-white/60 text-lg italic mt-4 max-w-2xl mx-auto">
              8 transformative courses designed to guide you from healing to wholeness
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map((course, i) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
                className="group relative border border-white/10 rounded-xl p-6 hover:border-[#d4a843]/40 transition-all duration-500 cursor-default overflow-hidden"
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                }}
              >
                
                <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: `linear-gradient(90deg, ${course.color}, ${course.color}88)` }} />
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${course.color}22`, color: course.color, boxShadow: `inset 0 2px 8px ${course.color}33` }}
                >
                  {course.icon}
                </div>
                <h3 className="font-heading text-base text-white mb-1 leading-snug">{course.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-3">{course.desc}</p>

                <p className="text-white/60 text-sm mb-3 leading-snug">
                  {course.what && course.what.slice(0,5).join(" · ")}
                </p>

                <div className="flex gap-2 flex-wrap mt-auto items-center">
                  <span className="text-[11px] px-3 py-1 rounded-full border font-medium" style={{ color: "#d4a843", borderColor: "#d4a84344", backgroundColor: "#d4a84311" }}>
                    {course.duration}
                  </span>
                  {course.fee && (
                    <span className="text-[11px] px-3 py-1 rounded-full border font-medium" style={{ color: "#4aab99", borderColor: "#4aab9944", backgroundColor: "#4aab9911" }}>
                      {course.fee}
                    </span>
                  )}
                  {/* per-card enroll button removed to keep cards clean */}
                </div>

                {course.certification && (
                  <div className="text-xs text-white/50 mt-3 italic">Certification: <span className="text-white">{course.certification}</span></div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="https://wa.me/919566823666?text=Hi%2C%20I%20would%20like%20to%20enroll%20in%20a%20course%20at%20Jeevalaya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#d4a843] text-[#0a3d2e] px-10 py-4 font-heading text-sm tracking-[0.2em] uppercase font-semibold shadow-2xl hover:bg-white transition-colors duration-300"
            >
              <FaWhatsapp className="w-5 h-5" />
              Enroll in a Course
            </a>
          </motion.div>

          {/* Syllabus modal removed per request */}

          {/* Learning Ladder + Uyir Ezhuchi Program */}
          <section className="mt-24 bg-transparent relative overflow-hidden pt-4">
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <h3 className="font-heading text-3xl text-white mb-4">The Jeevalaya Learning Ladder</h3>
              <p className="text-white/60 mb-10">A progressive pathway from healing yourself to transforming others.</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white/[0.06] border border-white/10 rounded-xl p-7 hover:border-[#d4a843]/30 transition-all duration-300">
                  <h4 className="font-serif text-lg text-white mb-3">Level 1 → Heal Yourself</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Uyir Ezhuchi · Emotional Healing</p>
                </div>
                <div className="bg-white/[0.06] border border-white/10 rounded-xl p-7 hover:border-[#d4a843]/30 transition-all duration-300">
                  <h4 className="font-serif text-lg text-white mb-3">Level 2 → Master Yourself</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Psychology · NLP · Communication</p>
                </div>
                <div className="bg-white/[0.06] border border-white/10 rounded-xl p-7 hover:border-[#d4a843]/30 transition-all duration-300">
                  <h4 className="font-serif text-lg text-white mb-3">Level 3 → Lead Others</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Trainer Development · Parenting · Sacred Feminine Leadership</p>
                </div>
                <div className="bg-white/[0.06] border border-white/10 rounded-xl p-7 hover:border-[#d4a843]/30 transition-all duration-300">
                  <h4 className="font-serif text-lg text-white mb-3">Level 4 → Transform Lives</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Jeevalaya Holistic Transformation Coach Certification</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-8 text-left">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 bg-[#2a7c6f] rounded-lg flex items-center justify-center text-white font-bold text-xl">UYIR</div>
                  <div>
                    <h3 className="font-heading text-2xl text-white mb-2">JEEVALAYA UYIR EZHUCHI™</h3>
                    <p className="text-white/60 italic mb-4">The Human Transformation & Self-Mastery Certification — Heal Your Past. Master Your Present. Create Your Future.</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/70"><strong>Duration:</strong> 12 Weeks (One live session per week)</p>
                        <p className="text-white/70"><strong>Format:</strong> Weekly practices, reflection exercises, private community support</p>
                        <p className="text-white/70"><strong>Investment:</strong> Early Bird ₹7,999 · Regular ₹12,999 · Premium Mentorship ₹24,999</p>
                      </div>
                      <div>
                        <p className="text-white/70"><strong>Who Is This For?</strong></p>
                        <ul className="text-white/60 list-disc list-inside mt-2">
                          <li>Individuals seeking clarity and purpose</li>
                          <li>Women who want confidence and self-worth</li>
                          <li>Professionals experiencing stress and burnout</li>
                          <li>Parents who want emotional balance</li>
                          <li>Trainers, Coaches and Healers</li>
                          <li>Anyone who desires personal and spiritual growth</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-white">What You Will Learn (Modules)</h4>
                      <div className="grid sm:grid-cols-2 gap-3 mt-3 text-white/70">
                        <div>
                          <p>Module 1 – Who Am I?</p>
                          <p>Module 2 – Healing the Inner Child</p>
                          <p>Module 3 – Emotional Mastery</p>
                          <p>Module 4 – Rewiring Limiting Beliefs</p>
                        </div>
                        <div>
                          <p>Module 5 – The Power of Breath & Energy</p>
                          <p>Module 6 – Self-Love & Self-Worth</p>
                          <p>Module 7 – Communication & Relationships</p>
                          <p>Module 8 – Stress Management & Resilience</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mt-3 text-white/70">
                        <div>
                          <p>Module 9 – Money Mindset & Abundance</p>
                          <p>Module 10 – Purpose & Vision Creation</p>
                        </div>
                        <div>
                          <p>Module 11 – Leadership & Service</p>
                          <p>Module 12 – The New You Blueprint</p>
                        </div>
                      </div>

                      <p className="mt-4 text-white/60"><strong>Certification:</strong> Certified Jeevalaya Transformation Practitioner</p>
                      <p className="mt-4 text-white/60">Early Bird and regular pricing, lifetime access to core resources, guided meditations, reflection journals and community support are included.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* ════════════════════════════════
          6. CORE VALUES
      ════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#0a3d2e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.80]">
          <img src={meditationWoman} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-[#d4a843] text-xs tracking-[0.4em] uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="font-heading text-5xl text-white">
              Core <span className="text-[#d4a843] italic font-serif">Values</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#b8860b] to-[#4aab99] mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative p-8 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-500 overflow-hidden cursor-default"
                whileHover={{ y: -4 }}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#b8860b] to-[#4aab99] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="text-4xl block mb-4">{val.emoji}</span>
                <h3 className="font-heading text-xl text-[#d4a843] mb-3 tracking-wide">
                  {val.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          7. WHO WE SERVE + FAITHS
      ════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#fdf8f0] relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-[#2a7c6f] text-xs tracking-[0.4em] uppercase mb-3">
              Our Community
            </p>
            <h2 className="font-heading text-5xl text-[#1a1a2e]">
              Who We <span className="text-[#2a7c6f] italic font-serif">Serve</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#b8860b] to-[#4aab99] mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {SERVE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-sm border border-[#2a7c6f]/10 hover:shadow-md hover:border-[#2a7c6f]/30 transition-all duration-300 group"
                whileHover={{ x: 4 }}
              >
                <span className="text-4xl mt-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {item.emoji}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1a1a2e] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Healing Beyond Boundaries ── */}
          <motion.div
            className="max-w-4xl mx-auto bg-[#fdf3e7] rounded-2xl p-10 sm:p-14 text-center shadow-sm"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-heading text-[#2a7c6f] text-xs tracking-[0.4em] uppercase mb-3">
              Our Promise
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl text-[#1a1a2e] mb-8">
              Healing Beyond{" "}
              <span className="text-[#2a7c6f] italic font-serif">Boundaries</span>
            </h2>

            {/* Faith Icons */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
              {[
                { symbol: "☪", label: "Islam" },
                { symbol: "ॐ", label: "Hinduism" },
                { symbol: "✝", label: "Christianity" },
                { symbol: "☸", label: "Buddhism" },
                { symbol: "☯", label: "Universal" },
              ].map((faith, i) => (
                <motion.div
                  key={faith.label}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {faith.symbol}
                  </div>
                  <span className="font-heading text-[10px] tracking-[0.25em] uppercase text-[#2a7c6f] font-medium">
                    {faith.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#d4a843] to-transparent mx-auto mb-8" />
              <blockquote className="font-serif text-lg sm:text-xl md:text-2xl italic text-[#2d2d2d] leading-relaxed max-w-3xl mx-auto">
                "Jeevalaya does not belong to one religion, one community, or one culture.
                <br />
                Like rain — we fall on{" "}
                <span className="text-[#2a7c6f] font-semibold underline decoration-[#2a7c6f]/30 underline-offset-4">
                  every roof, every heart, every soul
                </span>
                .
                <br />
                Your faith is your strength. We only add to it."
              </blockquote>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          8. FOUNDER
      ════════════════════════════════ */}
      <section id="founder" className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-[#2a7c6f] text-xs tracking-[0.4em] uppercase mb-3">
              Meet Your Healer
            </p>
            <h2 className="font-heading text-5xl text-[#1a1a2e]">
              About <span className="text-[#2a7c6f] italic font-serif">Radhisha</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#b8860b] to-[#4aab99] mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-14 items-center">
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-6">
                {/* Clean Portrait - Completely Unobstructed */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#d4a843] to-[#4aab99] rounded-2xl opacity-15 blur-lg" />
                  <img
                    src={founderLetterhead}
                    alt="Radhisha A — Founder, Jeevalaya"
                    className="relative w-full h-[480px] object-cover rounded-2xl"
                  />
                </div>

                {/* Compact Respectful Card - Clear badge, no green background */}
                <motion.div
                  className="relative -mt-6 mx-6 rounded-xl px-4 py-3 shadow-lg overflow-hidden bg-white/95 backdrop-blur-sm border border-[#e6d6a8]/20"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  whileHover={{ y: -4, boxShadow: '0 14px 36px rgba(0,0,0,0.12)' }}
                >
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#d4a843] to-[#e6c76a] text-[#072b24] shadow-sm font-bold">
                        ⭐
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#f3e6c0] text-[#5a3b00] text-xs font-semibold tracking-wider">
                          CEO & FOUNDER
                        </span>
                        <h3 className="text-[#072b24] font-serif text-2xl sm:text-3xl font-extrabold leading-tight truncate">
                          Radhisha A
                        </h3>
                      </div>
                      <p className="text-[#b8860b] text-sm sm:text-base font-medium mt-1 truncate">
                        Holistic Healing Expert & Life Coach
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <h3 className="font-heading text-4xl sm:text-5xl text-[#1a1a2e] mb-2">
                RADHISHA
              </h3>
              <p className="font-serif text-xl text-[#2a7c6f] italic mb-8">
                Counsellor & Life Skill Trainer, Jeevalaya Holistic Healing Centre
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "MSc Psychology","DCP","MDCC Psy","DTD","NLP Grand Master",
                  "Pranic Healer","Arhatic Yogi","Life Coach","JCI India Zone Trainer",
                ].map((cred, i) => (
                  <motion.span
                    key={cred}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="text-xs px-3 py-1.5 bg-[#e0f4f1] text-[#2a7c6f] rounded-full border border-[#2a7c6f]/20 font-medium"
                  >
                    {cred}
                  </motion.span>
                ))}
              </div>

              <blockquote className="font-serif text-lg sm:text-xl leading-relaxed text-[#2d2d2d] border-l-4 border-[#d4a843] pl-6 italic">
                "I have walked through my own darkness. I know what it feels like when pain has no
                name. When healing feels impossible. When the world moves forward and you stand
                still.
                <br />
                <br />
                That is why I built Jeevalaya — not as a business, but as a calling. A sacred space
                where no soul is turned away. Where every wound is met with wisdom.
                <br />
                <br />
                <span className="text-[#2a7c6f] font-semibold not-italic">
                  மழை கேட்காமல் பெய்யும். Rain falls without asking. That is how I serve.
                </span>
                "
              </blockquote>

              <div className="flex flex-col items-start gap-6 mt-12 p-6 bg-gradient-to-r from-[#2a7c6f]/5 to-[#d4a843]/5 rounded-lg border border-[#2a7c6f]/10">
                <p className="font-heading text-2xl font-bold text-[#2a7c6f]">
                  Follow Radhisha:
                  <span className="text-[#d4a843] ml-2">✨</span>
                </p>
                <div className="flex items-center gap-6">
                  <a
                    href="https://instagram.com/radhisha5d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white hover:scale-125 transition-all duration-300 shadow-2xl hover:shadow-[0_0_20px_rgba(240,148,51,0.6)]"
                  >
                    <Instagram className="w-7 h-7" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1ESJfVqv9q/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-125 transition-all duration-300 shadow-2xl hover:shadow-[0_0_20px_rgba(24,119,242,0.6)]"
                  >
                    <Facebook className="w-7 h-7" />
                  </a>
                  <a
                    href="https://www.youtube.com/@radhi2221"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:scale-125 transition-all duration-300 shadow-2xl hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]"
                  >
                    <Youtube className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          9. TESTIMONIALS CAROUSEL
      ════════════════════════════════ */}
      <section id="testimonials" className="py-28 px-6 bg-gradient-to-br from-[#0d2137] to-[#0a3d2e] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.70]"
          style={{
            backgroundImage: `url(${compassionHands})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-[#d4a843] text-xs tracking-[0.4em] uppercase mb-3">
              Voices of Transformation
            </p>
            <h2 className="font-heading text-5xl text-white">
              Lives That <span className="text-[#4aab99] italic font-serif">Changed</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#b8860b] to-[#4aab99] mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_80%] mx-2 sm:mx-8">
                  <div className="bg-white/8 backdrop-blur-sm border border-[#d4a843]/20 rounded-2xl p-10 sm:p-14 text-center relative">
                    <div className="absolute top-6 left-8 font-serif text-[120px] text-[#d4a843]/10 leading-none select-none">
                      "
                    </div>
                    <p className="font-serif text-xl sm:text-2xl md:text-3xl italic text-white leading-relaxed mb-8 relative z-10">
                      "{t.quote}"
                    </p>
                    <div className="flex flex-col items-center gap-1">
                      <p className="font-heading text-[#d4a843] text-sm tracking-widest uppercase">
                        — {t.author}
                      </p>
                      <p className="text-white/40 text-xs font-sans tracking-wider">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#d4a843] hover:text-[#d4a843] transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: selectedIndex === i ? 28 : 8,
                    backgroundColor: selectedIndex === i ? "#d4a843" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#d4a843] hover:text-[#d4a843] transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          10. CTA — RAIN SECTION
      ════════════════════════════════ */}
      <section className="relative py-36 px-6 bg-gradient-to-b from-[#0a3d2e] to-[#0d2137] text-center overflow-hidden">
        {/* Rain animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {rainDrops.map((drop, i) => (
            <RainDrop key={i} style={drop as React.CSSProperties} />
          ))}
        </div>

        {/* Corner decorations */}
        {[
          "top-6 left-6 border-t-2 border-l-2",
          "top-6 right-6 border-t-2 border-r-2",
          "bottom-6 left-6 border-b-2 border-l-2",
          "bottom-6 right-6 border-b-2 border-r-2",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-16 h-16 border-[#d4a843]/30 ${cls}`}
          />
        ))}

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-heading text-[#d4a843] text-xs tracking-[0.4em] uppercase mb-6">
              Begin Your Journey
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white italic leading-snug mb-4">
              Your Healing Begins With
            </h2>
            <h2 className="font-heading text-5xl sm:text-6xl text-[#d4a843] tracking-wider mb-8">
              ONE STEP
            </h2>
            <p className="font-serif text-lg sm:text-xl text-white/60 italic mb-14 leading-relaxed max-w-xl mx-auto">
              You don't have to have it all figured out. You just have to reach out. We will walk
              the rest together.
            </p>

            {/* Contact cards */}
            <div className="grid sm:grid-cols-3 gap-5 mb-14">
              {[
                { icon: <Phone className="w-6 h-6" />, label: "Call / WhatsApp", val: "+91 9566823666" },
                { icon: <Mail className="w-6 h-6" />, label: "Email", val: "jeevalaya28@gmail.com" },
                { icon: <MapPin className="w-6 h-6" />, label: "Location", val: "Tirupur, Tamil Nadu" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="p-6 border border-[#d4a843]/20 rounded-xl bg-white/5 backdrop-blur-sm"
                >
                  <div className="text-[#d4a843] flex justify-center mb-3">{c.icon}</div>
                  <p className="font-heading text-[10px] tracking-[0.25em] text-[#d4a843] uppercase mb-2">
                    {c.label}
                  </p>
                  <p className="font-serif text-white text-sm leading-relaxed">{c.val}</p>
                </div>
              ))}
            </div>

            <motion.a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-whatsapp-cta"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-12 py-5 font-heading text-sm tracking-[0.2em] uppercase shadow-2xl rounded-sm relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 bg-[#128C7E] translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
              <FaWhatsapp className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Reach Out on WhatsApp</span>
            </motion.a>
            <p className="text-white/30 font-serif text-sm italic mt-6">
              First consultation — confidential, compassionate, transformative
            </p>

            <div className="mt-16 pt-12 border-t border-[#d4a843]/15">
              <p className="font-serif text-2xl sm:text-3xl italic text-white/80 mb-3">
                "The door to healing is always open.
                <br />
                All you have to do is walk through." 🪷
              </p>
              <p className="font-serif text-lg text-[#d4a843]/60 italic">
                மழையாய் பெய்வோம் · உயிராய் வாழ்வோம்
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          11. FOOTER
      ════════════════════════════════ */}
      <footer id="contact" className="bg-[#0d1117] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 border-b border-white/10 pb-12 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-heading text-3xl mb-1">
              JEEVA<span className="text-[#d4a843]">LAYA</span>
            </h3>
            <p className="font-serif text-[#4aab99] italic text-sm mb-4">
              Holistic Healing Centre · Tirupur, Tamil Nadu
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              Centre for Healing, Awakening, and Transformation. A sacred space where no soul is
              turned away.
            </p>
            <div className="inline-flex items-center gap-3.5 p-3.5 rounded-xl border border-[#d4a843]/20 bg-[#d4a843]/5 text-left max-w-sm hover:border-[#d4a843]/45 transition-all duration-300 shadow-sm backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-[#d4a843]/10 text-[#d4a843]">
                <Shield className="w-5 h-5 fill-[#d4a843]/15" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#d4a843]">
                  Govt. Approved
                </p>
                <h5 className="font-semibold text-xs text-white/90 mt-0.5">
                  MSME / Udyam Registered
                </h5>
                <p className="text-[11px] font-mono text-white/40 mt-0.5">
                  No: TN-28 0202858
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-[#d4a843] text-xs tracking-[0.3em] uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#d4a843] flex-shrink-0" />
                <a href="tel:+919566823666">+91 9566823666</a>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#d4a843] flex-shrink-0" />
                <a href="mailto:jeevalaya28@gmail.com">jeevalaya28@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#d4a843] flex-shrink-0" />
                Tirupur, Tamil Nadu
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-[#d4a843] text-xs tracking-[0.3em] uppercase mb-5">
              Follow
            </h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://instagram.com/radhisha5d"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-[#d4a843] hover:text-black transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1ESJfVqv9q/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@radhi2221"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
            <p className="text-white/40 text-xs leading-relaxed">
              @radhisha5d
              <br />
              Jeevalaya Healing Centre
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs font-sans">
          <p>&copy; {new Date().getFullYear()} Jeevalaya Holistic Healing Centre. All rights reserved.</p>
          <p className="font-serif italic text-[#d4a843]/40">
            Founded by Radhisha A · Tirupur, Tamil Nadu
          </p>
        </div>
      </footer>
    </div>
  );
}
