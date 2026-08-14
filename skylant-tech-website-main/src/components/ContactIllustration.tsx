import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';

/* ---------------------------------------------------------------------
   ContactIllustration — v4 (spacing fix: Fast response badge vs logo)
   Logo node shifted down slightly, badge column shifted up + right,
   giving clear breathing room between "Fast response" and the
   Skylant support circle.
--------------------------------------------------------------------- */

const badges = [
  { icon: Phone, label: 'Talk to us', y: 76 },
  { icon: Clock, label: 'Fast response', y: 132 },
  { icon: MapPin, label: 'Visit us', y: 188 },
];

export default function ContactIllustration() {
  return (
    <svg
      viewBox="0 0 560 480"
      className="h-auto w-full"
      role="img"
      aria-label="Skylant contact illustration"
    >
      <rect x="0" y="0" width="560" height="480" rx="24" fill="#FFFFFF" opacity="0.5" />

      {/* ------- device on the left, sending a message ------- */}
      <g transform="translate(90 270)">
        <rect x="-38" y="-70" width="76" height="140" rx="16" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2.5" />
        <rect x="-28" y="-56" width="56" height="96" rx="4" fill="#F3EEFF" />
        <circle cx="0" cy="52" r="5" fill="#C4B5FD" />
        <foreignObject x="-11" y="-30" width="22" height="22">
          <MessageSquare size={22} color="#6D5BD0" />
        </foreignObject>
        <motion.circle
          cx="18"
          cy="-40"
          r="5"
          fill="#9B8AFB"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>
      <text x="90" y="360" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
        You
      </text>

      {/* ------- Skylant support node — shifted down for clearance from badges above ------- */}
      <g transform="translate(430 280)">
        <motion.circle
          r="46"
          fill="#FFFFFF"
          stroke="#C4B5FD"
          strokeWidth="2.5"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <foreignObject x="-16" y="-16" width="32" height="32">
          <Mail size={32} color="#4b2eee" />
        </foreignObject>
      </g>
      <text x="430" y="352" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
        Skylant team
      </text>

      {/* ------- soft dashed arc between the two ------- */}
      <path
        d="M 136 260 Q 260 195 384 260"
        fill="none"
        stroke="#D8CFFB"
        strokeWidth="2"
        strokeDasharray="4 7"
      />

      {/* ------- paper-plane message — reliable x/y/rotate keyframes ------- */}
      <motion.g
        animate={{
          x: [136, 190, 260, 330, 384, 384],
          y: [260, 225, 195, 225, 260, 260],
          rotate: [20, 8, 0, -8, -20, -20],
          opacity: [0, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 2.6,
          times: [0, 0.22, 0.5, 0.78, 0.96, 1],
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: 'easeInOut',
        }}
      >
        <path d="M -9 4 L 10 0 L -9 -4 L -5 0 Z" fill="#6D5BD0" />
      </motion.g>

      {/* ------- chat bubbles, timed with the plane ------- */}
      <motion.g
        animate={{
          opacity: [0, 1, 1, 0, 0],
          y: [8, 0, 0, 0, 8],
        }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          times: [0, 0.12, 0.42, 0.5, 0.55],
        }}
      >
        <path d="M 170 210 L 178 220 L 186 210 Z" fill="#EDE8FF" />
        <rect x="150" y="170" width="90" height="40" rx="12" fill="#EDE8FF" />
        <text x="195" y="194" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
          Hi there!
        </text>
      </motion.g>

      <motion.g
        animate={{
          opacity: [0, 0, 0, 1, 1, 0],
          y: [8, 8, 8, 0, 0, 8],
        }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          times: [0, 0.42, 0.5, 0.6, 0.9, 1],
        }}
      >
        <path d="M 340 180 L 348 190 L 356 180 Z" fill="#4b2eee" />
        <rect x="300" y="140" width="110" height="40" rx="12" fill="#4b2eee" />
        <text x="355" y="164" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#FFFFFF">
          We're on it!
        </text>
      </motion.g>

      {/* ------- floating contact-method badges — shifted right + up, clear of the logo ------- */}
      {badges.map((b, i) => (
        <motion.g
          key={b.label}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          <rect x="452" y={b.y} width="104" height="34" rx="17" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
          <foreignObject x="464" y={b.y + 7} width="20" height="20">
            <b.icon size={18} color="#4b2eee" />
          </foreignObject>
          <text x="514" y={b.y + 22} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
            {b.label}
          </text>
        </motion.g>
      ))}

      {/* ------- free consultation card, bottom ------- */}
      <g>
        <rect x="150" y="390" width="260" height="70" rx="14" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="2" />
        <foreignObject x="166" y="408" width="22" height="22">
          <CheckCircle2 size={22} color="#4b2eee" />
        </foreignObject>
        <text x="198" y="414" fontSize="12" fontWeight="700" fill="#4B3F91">
          Free consultation
        </text>
        <text x="198" y="432" fontSize="10.5" fontWeight="500" fill="#6D5BD0">
          No obligation, just a chat
        </text>
      </g>
    </svg>
  );
}