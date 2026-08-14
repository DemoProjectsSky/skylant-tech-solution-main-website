import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, MapPin, Users, CheckCircle2, Clock, Flag } from 'lucide-react';

/* ---------------------------------------------------------------------
   CareersIllustration — v3 (refined)
   Ascending career steps with a candidate figure climbing them,
   a 3-stage hiring pipeline with pulsing progress dots, and floating
   perk badges — all carefully spaced to avoid overlap.
--------------------------------------------------------------------- */

const steps = [
  { x: 70, w: 68, h: 40, shade: '#EDE8FF' },
  { x: 146, w: 68, h: 78, shade: '#E1D8FE' },
  { x: 222, w: 68, h: 116, shade: '#D3C4FC' },
  { x: 298, w: 68, h: 154, shade: '#C4B0FA' },
];

const perks = [
  { icon: Users, label: 'Great culture', y: 108 },
  { icon: MapPin, label: 'Remote first', y: 168 },
  { icon: CheckCircle2, label: 'Great benefits', y: 228 },
];

export default function CareersIllustration() {
  return (
    <svg
      viewBox="0 0 560 460"
      className="h-auto w-full"
      role="img"
      aria-label="Skylant careers illustration"
    >
      <rect x="0" y="0" width="560" height="460" rx="24" fill="#FFFFFF" opacity="0.5" />

      {/* ground line */}
      <line x1="30" y1="400" x2="380" y2="400" stroke="#E4DBFF" strokeWidth="2" />

      {/* ------- ascending career steps, deeper shade as they rise ------- */}
      {steps.map((s, i) => (
        <motion.rect
          key={i}
          x={s.x}
          width={s.w}
          y={400}
          height={0}
          rx="8"
          fill={s.shade}
          stroke="#9B8AFB"
          strokeWidth="1.5"
          animate={{ y: 400 - s.h, height: s.h }}
          transition={{ duration: 0.65, delay: i * 0.18, ease: 'easeOut' }}
        />
      ))}

      {/* small flag on the final, tallest step */}
      <motion.g
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.4 }}
      >
        <foreignObject x="316" y="226" width="20" height="20">
          <Flag size={18} color="#4b2eee" />
        </foreignObject>
      </motion.g>

      {/* labels under first & last step */}
      <text x="104" y="420" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
        Junior
      </text>
      <text x="332" y="420" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
        Senior
      </text>

      {/* ------- climbing candidate figure with swinging limbs + shadow ------- */}
      <motion.g
        animate={{
          x: [104, 180, 256, 332, 332],
          y: [400 - 40 - 32, 400 - 78 - 32, 400 - 116 - 32, 400 - 154 - 32, 400 - 154 - 32],
        }}
        transition={{
          duration: 3.6,
          times: [0, 0.28, 0.56, 0.84, 1],
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: 'easeInOut',
        }}
      >
        {/* soft shadow that follows the figure */}
        <ellipse cx="0" cy="42" rx="12" ry="3" fill="#4b2eee" opacity="0.12" />

        <motion.g
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '0px 20px' }}
        >
          <circle r="9" cy="0" fill="#4b2eee" />
          <line x1="0" y1="9" x2="0" y2="26" stroke="#4b2eee" strokeWidth="4" strokeLinecap="round" />
          <motion.line
            x1="0" y1="14" x2="-9" y2="22"
            stroke="#4b2eee" strokeWidth="3.5" strokeLinecap="round"
            animate={{ x2: [-9, -5, -9] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line
            x1="0" y1="14" x2="9" y2="22"
            stroke="#4b2eee" strokeWidth="3.5" strokeLinecap="round"
            animate={{ x2: [9, 5, 9] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line
            x1="0" y1="26" x2="-7" y2="38"
            stroke="#4b2eee" strokeWidth="3.5" strokeLinecap="round"
            animate={{ x2: [-7, -3, -7] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line
            x1="0" y1="26" x2="7" y2="38"
            stroke="#4b2eee" strokeWidth="3.5" strokeLinecap="round"
            animate={{ x2: [7, 3, 7] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>
      </motion.g>

      {/* growth arrow above the steps */}
      <motion.g
        animate={{ opacity: [0.35, 1, 0.35], y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <foreignObject x="356" y="150" width="24" height="24">
          <TrendingUp size={22} color="#9B8AFB" />
        </foreignObject>
      </motion.g>

      {/* ------- floating perk badges, right column (clear of the clock badge above) ------- */}
      {perks.map((p, i) => (
        <motion.g
          key={p.label}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          <rect x="440" y={p.y} width="108" height="34" rx="17" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
          <foreignObject x="452" y={p.y + 7} width="20" height="20">
            <p.icon size={18} color="#4b2eee" />
          </foreignObject>
          <text x="500" y={p.y + 22} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
            {p.label}
          </text>
        </motion.g>
      ))}

      {/* ------- hiring pipeline card, bottom right ------- */}
      <g>
        <rect x="415" y="300" width="132" height="120" rx="14" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="2" />
        <foreignObject x="429" y="312" width="20" height="20">
          <Briefcase size={18} color="#4b2eee" />
        </foreignObject>
        <text x="455" y="326" fontSize="11" fontWeight="700" fill="#4B3F91">
          Hiring pipeline
        </text>

        <line x1="440" y1="352" x2="440" y2="398" stroke="#E4DBFF" strokeWidth="2" />

        {['Apply', 'Interview', 'Offer'].map((label, i) => (
          <g key={label} transform={`translate(0 ${i * 24})`}>
            {/* pulse ring when this stage lights up */}
            <motion.circle
              cx="440"
              cy="352"
              r="6"
              fill="none"
              stroke="#9B8AFB"
              strokeWidth="2"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
              transition={{
                duration: 1.4,
                delay: i * 0.5 + 0.3,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: 'easeOut',
              }}
              style={{ transformOrigin: '440px 352px' }}
            />
            <motion.circle
              cx="440"
              cy="352"
              r="6"
              fill="#4b2eee"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.5 + 0.3 }}
            />
            <text x="456" y="356" fontSize="10.5" fontWeight="600" fill="#4B3F91">
              {label}
            </text>
          </g>
        ))}
      </g>

      {/* clock badge — fast hiring, clearly above the perk column with a gap */}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="494" cy="52" r="26" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
        <foreignObject x="483" y="41" width="22" height="22">
          <Clock size={20} color="#4b2eee" />
        </foreignObject>
      </motion.g>
      <text x="494" y="94" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
        Fast hiring
      </text>
    </svg>
  );
}