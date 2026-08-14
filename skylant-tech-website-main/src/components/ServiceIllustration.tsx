import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import TechLogo from './techlogo';

/* ---------------------------------------------------------------------
   ServiceIllustration — v2.1 (fixed)
   Circuit-board tech stack. Center chip connects via right-angled
   traces to technologies in left/right columns, with a pulse dot
   travelling along each trace (data flow feel).
   Fixes vs previous version:
   - pulse dot now animates cx/cy (circles have no x/y attribute —
     it was silently doing nothing before)
   - trace "side" is now actually assigned, so midX correctly differs
     between left (195) and right (365) traces instead of collapsing
     to CENTER_X for both, which made every trace overlap vertically
   - single-technology layout now centers on the middle row instead
     of defaulting to the bottom row
--------------------------------------------------------------------- */

interface ServiceLike {
  icon: string;
  color: string;
  shortTitle: string;
  technologies: string[];
}

const CENTER_X = 280;
const CENTER_Y = 230;
const LEFT_X = 110;
const RIGHT_X = 450;
const LEFT_MID_X = 195;
const RIGHT_MID_X = 365;
const ROW_YS = [110, 230, 350];

interface Pos {
  idx: number;
  x: number;
  y: number;
  side: 'left' | 'right';
}

function rowYFor(slot: number, rows: number) {
  if (rows === 1) return ROW_YS[1];
  if (rows === 2) return slot === 0 ? ROW_YS[0] : ROW_YS[2];
  return ROW_YS[slot] ?? ROW_YS[ROW_YS.length - 1];
}

function getLayout(count: number): Pos[] {
  const leftIdx: number[] = [];
  const rightIdx: number[] = [];
  for (let i = 0; i < count; i++) {
    (i % 2 === 0 ? rightIdx : leftIdx).push(i);
  }

  const positions: Pos[] = [];
  leftIdx.forEach((idx, slot) => {
    positions.push({ idx, x: LEFT_X, y: rowYFor(slot, leftIdx.length), side: 'left' });
  });
  rightIdx.forEach((idx, slot) => {
    positions.push({ idx, x: RIGHT_X, y: rowYFor(slot, rightIdx.length), side: 'right' });
  });

  return positions.sort((a, b) => a.idx - b.idx);
}

export default function ServiceIllustration({ service, Icon }: { service: ServiceLike; Icon: LucideIcon }) {
  const nodes = (service.technologies ?? []).slice(0, 6);
  const color = service.color;
  const layout = getLayout(nodes.length);

  return (
    <svg
      viewBox="0 0 560 460"
      className="h-auto w-full"
      role="img"
      aria-label={`${service.shortTitle} illustration`}
    >
      <rect x="0" y="0" width="560" height="460" rx="24" fill="#FFFFFF" opacity="0.5" />

      {/* circuit traces — L-shaped, one per technology */}
      {layout.map((pos) => {
        const midX = pos.side === 'left' ? LEFT_MID_X : RIGHT_MID_X;
        const d = `M ${CENTER_X} ${CENTER_Y} L ${midX} ${CENTER_Y} L ${midX} ${pos.y} L ${pos.x} ${pos.y}`;
        return (
          <g key={`trace-${pos.idx}`}>
            <path d={d} fill="none" stroke={`${color}30`} strokeWidth="2" />
            {/* pulse dot travelling along the trace — animates cx/cy, not x/y */}
            <motion.circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="4"
              fill={color}
              animate={{
                cx: [CENTER_X, midX, midX, pos.x],
                cy: [CENTER_Y, CENTER_Y, pos.y, pos.y],
              }}
              transition={{
                duration: 1.8,
                delay: pos.idx * 0.3,
                repeat: Infinity,
                repeatDelay: nodes.length * 0.3 + 0.6,
                ease: 'linear',
              }}
            />
          </g>
        );
      })}

      {/* center chip — the service's own icon */}
      <g transform={`translate(${CENTER_X} ${CENTER_Y})`}>
        <motion.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="-42" y="-42" width="84" height="84" rx="16" fill="#FFFFFF" stroke={`${color}80`} strokeWidth="2.5" />
          {/* corner pins for circuit-chip feel */}
          {[
            { x: -50, y: -23 },
            { x: -50, y: 17 },
            { x: 42, y: -23 },
            { x: 42, y: 17 },
          ].map((p, i) => (
            <rect key={i} x={p.x} y={p.y} width="8" height="6" fill={`${color}60`} />
          ))}
          <foreignObject x="-16" y="-16" width="32" height="32">
            <Icon size={32} color={color} />
          </foreignObject>
        </motion.g>
        <text x="0" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4B3F91">
          {service.shortTitle}
        </text>
      </g>

      {/* technology chips at each endpoint */}
      {layout.map((pos) => {
        const tech = nodes[pos.idx];
        return (
          <g key={tech} transform={`translate(${pos.x} ${pos.y})`}>
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + (pos.idx % 3) * 0.3, repeat: Infinity, ease: 'easeInOut', delay: pos.idx * 0.2 }}
            >
              <rect x="-30" y="-30" width="60" height="60" rx="14" fill="#FFFFFF" stroke={`${color}30`} strokeWidth="1.5" />
              <foreignObject x="-11" y="-11" width="22" height="22">
                <TechLogo name={tech} color={color} />
              </foreignObject>
            </motion.g>
            <text x="0" y="48" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#4B3F91">
              {tech}
            </text>
          </g>
        );
      })}
    </svg>
  );
}