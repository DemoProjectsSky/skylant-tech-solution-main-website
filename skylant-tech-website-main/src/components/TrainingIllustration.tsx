import { motion } from 'framer-motion';
import { GraduationCap, Award, Star, Users, Code2, TrendingUp } from 'lucide-react';

/* ---------------------------------------------------------------------
   TrainingIllustration — v2.2
   Same laptop / skill-bars / rating / certificate concept as before.
   The laptop screen shows a real <image>. Play-button overlay removed.
   Swap SCREEN_IMAGE_URL below with your actual image link.
--------------------------------------------------------------------- */

const skills = [
  { x: 400, h: 40 },
  { x: 424, h: 70 },
  { x: 448, h: 55 },
  { x: 472, h: 90 },
];

// 👉 Replace this with your image URL
const SCREEN_IMAGE_URL = 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png';

export default function TrainingIllustration() {
  return (
    <svg
      viewBox="0 0 560 460"
      className="h-auto w-full"
      role="img"
      aria-label="Skylant training programs illustration"
    >
      <defs>
        <clipPath id="screenClip">
          <rect x="12" y="12" width="196" height="126" rx="6" />
        </clipPath>
      </defs>

      <rect x="0" y="0" width="560" height="460" rx="24" fill="#FFFFFF" opacity="0.5" />

      {/* ------- laptop / course screen, left ------- */}
      <g transform="translate(80 130)">
        <rect x="0" y="0" width="220" height="150" rx="12" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2.5" />

        {/* screen image (clipped to the rounded screen area) */}
        <image
          href={SCREEN_IMAGE_URL}
          x="12"
          y="12"
          width="196"
          height="126"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#screenClip)"
        />

        {/* laptop base */}
        <path d="M -14 150 L 234 150 L 220 164 L 0 164 Z" fill="#EDE8FF" stroke="#C4B5FD" strokeWidth="2" />
      </g>
      <text x="190" y="316" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4B3F91">
        Hands-on courses
      </text>

      {/* progress bar under the screen */}
      <rect x="92" y="290" width="196" height="10" rx="5" fill="#E4DBFF" />
      <motion.rect
        x="92"
        y="290"
        height="10"
        rx="5"
        fill="#6D5BD0"
        initial={{ width: 0 }}
        animate={{ width: [0, 196, 196, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.6, 0.85, 1], ease: 'easeInOut' }}
      />

      {/* ------- rising skill-level bars, right of the laptop ------- */}
      <g>
        {skills.map((s, i) => (
          <motion.rect
            key={i}
            x={s.x}
            width="16"
            y="150"
            height="0"
            rx="4"
            fill="#9B8AFB"
            animate={{ y: 150 - s.h, height: s.h }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
          />
        ))}
        <line x1="392" y1="150" x2="500" y2="150" stroke="#E4DBFF" strokeWidth="2" />
      </g>
      <text x="446" y="172" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
        Skill growth
      </text>
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <foreignObject x="436" y="50" width="20" height="20">
          <TrendingUp size={20} color="#9B8AFB" />
        </foreignObject>
      </motion.g>

      {/* ------- star rating card ------- */}
      <g>
        <rect x="390" y="200" width="150" height="66" rx="14" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="2" />
        <text x="404" y="222" fontSize="11" fontWeight="700" fill="#4B3F91">
          4.8 / 5 rating
        </text>
        <g transform="translate(404 236)">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.15 }}
            >
              <foreignObject x={i * 20} y="0" width="16" height="16">
                <Star size={16} color="#F2A623" fill="#F2A623" />
              </foreignObject>
            </motion.g>
          ))}
        </g>
      </g>

      {/* ------- students badge ------- */}
      <motion.g
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="390" y="290" width="150" height="34" rx="17" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
        <foreignObject x="402" y="297" width="20" height="20">
          <Users size={18} color="#4b2eee" />
        </foreignObject>
        <text x="470" y="312" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
          5,000+ students
        </text>
      </motion.g>

      {/* ------- certificate, flipping in at "completion", bottom ------- */}
      <motion.g
        style={{ transformOrigin: '190px 400px' }}
        animate={{ rotateY: [0, 0, 180, 180, 0], opacity: [1, 1, 0.3, 1, 1] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.6, 0.75, 0.85, 1], ease: 'easeInOut' }}
      >
        <rect x="115" y="360" width="150" height="70" rx="10" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2.5" />
        <foreignObject x="127" y="374" width="24" height="24">
          <Award size={24} color="#4b2eee" />
        </foreignObject>
        <text x="160" y="382" fontSize="11.5" fontWeight="700" fill="#4B3F91">
          Certificate
        </text>
        <text x="160" y="398" fontSize="10" fontWeight="500" fill="#6D5BD0">
          of completion
        </text>
      </motion.g>

      {/* graduation cap badge, top */}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="470" cy="380" r="24" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
        <foreignObject x="459" y="369" width="22" height="22">
          <GraduationCap size={20} color="#4b2eee" />
        </foreignObject>
      </motion.g>
      <text x="470" y="420" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
        Placement support
      </text>

      {/* small floating code icon near the screen */}
      <motion.g
        animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <foreignObject x="60" y="90" width="22" height="22">
          <Code2 size={20} color="#9B8AFB" />
        </foreignObject>
      </motion.g>
    </svg>
  );
}