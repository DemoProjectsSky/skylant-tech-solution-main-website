import { motion } from 'framer-motion';
import { Code2, Users, Award, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';

/* ---------------------------------------------------------------------
   InternshipIllustration — v2
   A completely different concept from Hero/About/Careers/Blog/Contact:
   a serpentine journey path with 6 milestone stages (Apply → Learn →
   Build → Grow → Certify → Launch), a graduate marker travelling
   along it, and a rocket launching at the very end.
--------------------------------------------------------------------- */

const stages = [
  { x: 60, y: 340, label: 'Apply' },
  { x: 150, y: 220, label: 'Learn' },
  { x: 250, y: 340, label: 'Build' },
  { x: 350, y: 220, label: 'Grow' },
  { x: 440, y: 340, label: 'Certify' },
  { x: 500, y: 220, label: 'Launch' },
];

const pathD =
  'M 60 340 Q 105 220 150 220 Q 200 220 250 340 Q 300 460 350 220 Q 390 60 440 340 Q 465 460 500 220';

const perks = [
  { icon: Users, label: 'Mentorship', y: 60 },
  { icon: TrendingUp, label: 'Skill growth', y: 120 },
  { icon: CheckCircle2, label: 'Placement', y: 180 },
];

export default function InternshipIllustration() {
  return (
    <svg
      viewBox="0 0 560 460"
      className="h-auto w-full"
      role="img"
      aria-label="Internship program journey illustration"
    >
      <rect x="0" y="0" width="560" height="460" rx="24" fill="#FFFFFF" opacity="0.5" />

      {/* shadow line under the serpentine path */}
      <path d={pathD} fill="none" stroke="#E4DBFF" strokeWidth="10" strokeLinecap="round" />

      {/* the journey path itself, drawing in on load */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#6D5BD0"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, ease: 'easeInOut' }}
      />

      {/* stage nodes */}
      {stages.map((s, i) => (
        <g key={s.label}>
          <motion.circle
            cx={s.x}
            cy={s.y}
            r="12"
            fill="none"
            stroke="#9B8AFB"
            strokeWidth="2"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{
              duration: 1.8,
              delay: i * 0.3 + 0.6,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeOut',
            }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          />
          <motion.circle
            cx={s.x}
            cy={s.y}
            r="10"
            fill="#4b2eee"
            stroke="#FFFFFF"
            strokeWidth="3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, delay: i * 0.3 + 0.3, ease: 'backOut' }}
          />
          <motion.text
            x={s.x}
            y={s.y > 280 ? s.y + 32 : s.y - 26}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#2C2A4A"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            paintOrder="stroke"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.3 + 0.45 }}
          >
            {s.label}
          </motion.text>
        </g>
      ))}

      {/* graduate marker moving along the stages, looping */}
      <motion.g
        animate={{
          x: stages.map((s) => s.x),
          y: stages.map((s) => s.y - 24),
        }}
        transition={{
          duration: 4.2,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1.2,
          ease: 'easeInOut',
        }}
      >
        <circle r="14" fill="#FFFFFF" stroke="#6D5BD0" strokeWidth="2" />
        <foreignObject x="-9" y="-9" width="18" height="18">
          <Code2 size={18} color="#4b2eee" />
        </foreignObject>
      </motion.g>

      {/* rocket launching at the final stage */}
      <motion.g
        animate={{ y: [0, -18, 0], opacity: [1, 1, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <g transform={`translate(${stages[5].x} ${stages[5].y - 60})`}>
          <circle r="30" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2.5" />
          <foreignObject x="-16" y="-16" width="32" height="32">
            <Rocket size={30} color="#4b2eee" />
          </foreignObject>
        </g>
      </motion.g>
      {/* flame flicker under the rocket */}
      <motion.g transform={`translate(${stages[5].x} ${stages[5].y - 32})`}>
        <motion.path
          d="M -5 0 Q 0 14 5 0 Q 0 8 0 0 Z"
          fill="#F2A623"
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>

      
      {/* floating perk badges, top-left column */}
      {perks.map((p, i) => (
        <motion.g
          key={p.label}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          <rect x="20" y={p.y} width="112" height="34" rx="17" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
          <foreignObject x="32" y={p.y + 7} width="20" height="20">
            <p.icon size={18} color="#4b2eee" />
          </foreignObject>
          <text x="86" y={p.y + 22} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
            {p.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}