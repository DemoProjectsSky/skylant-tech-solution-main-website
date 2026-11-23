import { motion } from 'framer-motion';
import { TrendingUp, Search, Calendar, Lightbulb, PenTool } from 'lucide-react';

/* ---------------------------------------------------------------------
   BlogIllustration — v2
   A completely different concept from Hero/Internship/About/Training:
   a tilted stack of blog-post cards with an animated "writing" pen,
   a sparking lightbulb above (ideas), floating topic tags on the
   right (explore topics), and a small trending mini-chart —
   representing how ideas become published insights.
--------------------------------------------------------------------- */

const tags = [
  { label: 'Trends', y: 150 },
  { label: 'Tech', y: 205 },
  { label: 'Design', y: 260 },
];

export default function BlogIllustration() {
  return (
    <svg
      viewBox="0 0 560 460"
      className="h-auto w-full"
      role="img"
      aria-label="Skylant blog insights illustration"
    >
      {/* soft backdrop panel */}
      <rect x="0" y="0" width="560" height="460" rx="24" fill="#FFFFFF" opacity="0.5" />

      {/* ------- lightbulb sparking ideas, top-left ------- */}
      <g transform="translate(120 78)">
        {/* radiating rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 34;
          const y1 = Math.sin(rad) * 34;
          const x2 = Math.cos(rad) * 46;
          const y2 = Math.sin(rad) * 46;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#9B8AFB"
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
            />
          );
        })}
        <motion.circle
          r="30"
          fill="#FFFFFF"
          stroke="#6D5BD0"
          strokeWidth="2.5"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <foreignObject x="-15" y="-15" width="30" height="30">
          <Lightbulb size={30} color="#4b2eee" />
        </foreignObject>
      </g>
      <text x="120" y="150" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
        Fresh ideas
      </text>

      {/* ------- tilted stack of blog-post cards ------- */}
      <g>
        {/* back card */}
        <g transform="rotate(-7 190 260)">
          <rect x="80" y="190" width="220" height="140" rx="14" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="2" />
        </g>
        {/* middle card */}
        <g transform="rotate(-2.5 190 260)">
          <rect x="90" y="180" width="220" height="140" rx="14" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="2" />
        </g>
        {/* front card — the one being written */}
        <g transform="rotate(3 190 260)">
          <rect x="100" y="170" width="220" height="140" rx="14" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2.5" />
          {/* title bar */}
          <rect x="118" y="188" width="120" height="10" rx="5" fill="#6D5BD0" opacity="0.85" />
          {/* body lines */}
          <rect x="118" y="212" width="184" height="6" rx="3" fill="#D8CFFB" />
          <rect x="118" y="228" width="184" height="6" rx="3" fill="#D8CFFB" />
          <rect x="118" y="244" width="140" height="6" rx="3" fill="#D8CFFB" />
          {/* animated "writing" line growing under the pen */}
          <motion.rect
            x="118"
            y="262"
            height="6"
            rx="3"
            fill="#9B8AFB"
            initial={{ width: 0 }}
            animate={{ width: [0, 150, 150, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.8, 1], ease: 'easeInOut' }}
          />
          {/* pen tip moving along the writing line */}
          <motion.g
            initial={{ x: 118, y: 258 }}
            animate={{ x: [118, 268, 268, 118], y: 258 }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.8, 1], ease: 'easeInOut' }}
          >
            <foreignObject x="0" y="-2" width="20" height="20">
              <PenTool size={18} color="#4b2eee" />
            </foreignObject>
          </motion.g>
        </g>
      </g>
      <text x="190" y="335" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4B3F91">
        In-depth writing
      </text>

      {/* ------- floating topic tags, right side ------- */}
      {tags.map((t, i) => (
        <motion.g
          key={t.label}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          <rect x="400" y={t.y} width="112" height="34" rx="17" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
          <foreignObject x="412" y={t.y + 7} width="20" height="20">
            <Search size={18} color="#4b2eee" />
          </foreignObject>
          <text x="466" y={t.y + 22} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#4B3F91">
            {t.label}
          </text>
        </motion.g>
      ))}
      <text x="456" y="130" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
        Explore topics
      </text>

      {/* ------- trending mini-chart card, bottom right ------- */}
      <g>
        <rect x="390" y="330" width="140" height="95" rx="14" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="2" />
        <foreignObject x="404" y="342" width="20" height="20">
          <TrendingUp size={18} color="#4b2eee" />
        </foreignObject>
        <text x="430" y="356" fontSize="11" fontWeight="700" fill="#4B3F91">
          Latest trends
        </text>
        <motion.path
          d="M 404 405 L 428 385 L 450 398 L 476 368 L 500 378"
          fill="none"
          stroke="#6D5BD0"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
        />
        <circle cx="500" cy="378" r="4" fill="#4b2eee" />
      </g>

      {/* ------- small calendar badge, top area, "new every week" ------- */}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="320" cy="70" r="28" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
        <foreignObject x="308" y="58" width="24" height="24">
          <Calendar size={22} color="#4b2eee" />
        </foreignObject>
      </motion.g>
      <text x="320" y="112" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
        New every week
      </text>
    </svg>
  );
}