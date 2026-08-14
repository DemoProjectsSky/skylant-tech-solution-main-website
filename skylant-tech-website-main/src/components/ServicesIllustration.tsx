import { motion } from 'framer-motion';
import { Code2, Smartphone, Brain, Cloud, Palette, TrendingUp } from 'lucide-react';

/* ---------------------------------------------------------------------
   ServicesIllustration
   Same visual language as HeroIllustration / InternshipIllustration /
   AboutIllustration / TrainingIllustration / BlogIllustration /
   CareersIllustration / ContactIllustration — center node + rotating
   dashed orbit + spokes to floating icon-nodes — themed around the
   range of services offered.
--------------------------------------------------------------------- */

const nodes = [
  { icon: Code2, label: 'Custom Software', angle: -90 },
  { icon: Smartphone, label: 'Mobile Apps', angle: -30 },
  { icon: Brain, label: 'AI Solutions', angle: 30 },
  { icon: Cloud, label: 'Cloud Solutions', angle: 90 },
  { icon: Palette, label: 'UI/UX Design', angle: 150 },
  { icon: TrendingUp, label: 'Digital Marketing', angle: -150 },
];

const RADIUS = 150;
const CENTER = 240;

function pointOnCircle(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export default function ServicesIllustration() {
  return (
    <svg
      viewBox="0 0 480 480"
      className="h-auto w-full"
      role="img"
      aria-label="Skylant services illustration"
    >
      <circle cx={CENTER} cy={CENTER} r="230" fill="transparent" />

      {/* Rotating dashed orbit ring */}
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke="#D8B4FE"
        strokeWidth="3"
        strokeDasharray="4 9"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      />

      {/* Spokes from center to each node */}
      <g stroke="#caa0f6" strokeWidth="2.5" strokeDasharray="3 5">
        {nodes.map((n, i) => {
          const p = pointOnCircle(n.angle, RADIUS);
          return <line key={i} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y} />;
        })}
      </g>

      {/* Center node — a layered-stack glyph */}
      <g transform={`translate(${CENTER} ${CENTER})`}>
        <motion.g
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle r="46" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2" />
          <motion.circle
            r="46"
            fill="none"
            stroke="#6D5BD0"
            strokeWidth="2"
            strokeDasharray="6 6"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '0px 0px' }}
          />
          {/* simple stacked-layers glyph */}
          <path d="M 0 -16 L 16 -8 L 0 0 L -16 -8 Z" fill="none" stroke="#4b2eee" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M -16 0 L 0 8 L 16 0" fill="none" stroke="#4b2eee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M -16 8 L 0 16 L 16 8" fill="none" stroke="#4b2eee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <text x="0" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4B3F91">
          Services
        </text>
      </g>

      {/* Orbiting service nodes */}
      {nodes.map((n, i) => {
        const p = pointOnCircle(n.angle, RADIUS);
        const Icon = n.icon;
        const floatY = 8 + (i % 3) * 2;
        const duration = 3 + (i % 4) * 0.4;
        const delay = i * 0.25;
        return (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <motion.g
              animate={{ y: [0, -floatY, 0] }}
              transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
            >
              <circle r="34" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
              <foreignObject x="-11" y="-11" width="22" height="22">
                <Icon size={22} color="#4b2eee" />
              </foreignObject>
            </motion.g>
            <text x="0" y="54" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}