import { motion } from 'framer-motion';
import { Globe, Heart, Camera, LayoutDashboard, Rocket } from 'lucide-react';

/* ---------------------------------------------------------------------
   ProjectsIllustration
   Three overlapping browser windows that float gently, with a "Live"
   pulse and small floating badges — same visual language as the other
   page-banner illustrations (soft lavender, floating cards).
--------------------------------------------------------------------- */

const windows = [
  { x: 40, y: 70, w: 300, h: 190, accent: '#B45309', icon: Heart, delay: 0 },
  { x: 150, y: 175, w: 300, h: 190, accent: '#EC4899', icon: Camera, delay: 0.6 },
  { x: 215, y: 35, w: 290, h: 180, accent: '#2F6EFF', icon: LayoutDashboard, delay: 1.2 },
];

const badges = [
  { icon: Globe, label: 'Live websites', x: 8, y: 330 },
  { icon: Rocket, label: 'Fast & responsive', x: 330, y: 380 },
];

export default function ProjectsIllustration() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 560 460" className="h-auto w-full" role="img" aria-label="Projects illustration">
        <defs>
          <linearGradient id="pj-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F3F0FF" />
            <stop offset="100%" stopColor="#E4DBFF" />
          </linearGradient>
        </defs>

        <motion.circle
          cx="280" cy="230" r="190" fill="url(#pj-bg)" opacity="0.7"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '280px 230px' }}
        />

        {windows.map((w, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.2 + i * 0.2 },
              y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: w.delay },
            }}
          >
            <rect x={w.x} y={w.y} width={w.w} height={w.h} rx="14" fill="#fff" stroke="#E4DBFF" strokeWidth="1.5" />
            <path d={`M${w.x} ${w.y + 26} V${w.y + 14} a14 14 0 0 1 14 -14 H${w.x + w.w - 14} a14 14 0 0 1 14 14 V${w.y + 26} Z`} fill="#F3F0FF" />
            <circle cx={w.x + 16} cy={w.y + 13} r="3.5" fill="#F87171" />
            <circle cx={w.x + 29} cy={w.y + 13} r="3.5" fill="#FBBF24" />
            <circle cx={w.x + 42} cy={w.y + 13} r="3.5" fill="#34D399" />
            <rect x={w.x + 18} y={w.y + 42} width={w.w * 0.5} height="12" rx="6" fill={w.accent} opacity="0.9" />
            <rect x={w.x + 18} y={w.y + 64} width={w.w * 0.7} height="8" rx="4" fill="#E4DBFF" />
            <rect x={w.x + 18} y={w.y + 80} width={w.w * 0.55} height="8" rx="4" fill="#E4DBFF" />
            <rect x={w.x + 18} y={w.y + 104} width="78" height="22" rx="11" fill={w.accent} />
            <rect x={w.x + w.w - 96} y={w.y + 104} width="78" height="52" rx="10" fill={w.accent} opacity="0.15" />
            <motion.circle
              cx={w.x + w.w - 20} cy={w.y + 13} r="4" fill="#22C55E"
              animate={{ opacity: [1, 0.25, 1], scale: [1, 1.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
              style={{ transformOrigin: `${w.x + w.w - 20}px ${w.y + 13}px` }}
            />
          </motion.g>
        ))}
      </svg>

      {badges.map((b, i) => (
        <motion.div
          key={b.label}
          className="absolute flex items-center gap-2 rounded-2xl border border-[#E4DBFF] bg-white/90 px-3 py-2 text-xs font-semibold text-[#2C2A4A] shadow-lg backdrop-blur-sm"
          style={{ left: `${(b.x / 560) * 100}%`, top: `${(b.y / 460) * 100}%` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: 0.9 + i * 0.2 },
            scale: { delay: 0.9 + i * 0.2 },
            y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <b.icon className="h-4 w-4 text-[#2F6EFF]" aria-hidden="true" />
          {b.label}
        </motion.div>
      ))}
    </div>
  );
}
