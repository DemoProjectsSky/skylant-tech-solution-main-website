import { motion } from 'framer-motion';

/* ---------------------------------------------------------------------
   BottomWave
   Premium, minimal flowing wave background for the bottom of the hero
   section. Three soft layered waves (light -> dark for depth) in a
   Royal Blue -> Indigo -> Soft Purple gradient, with a subtle glow
   where the layers overlap. Sits on a pure white backdrop and occupies
   roughly the bottom 12-15% of the hero.

   Palette:
   royal blue   #2563EB
   indigo       #6366F1
   soft purple  #8B5CF6
--------------------------------------------------------------------- */

export default function BottomWave() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 z-0 w-full overflow-hidden leading-[0]"
    >
      <svg
        viewBox="0 0 1920 260"
        className="h-[110px] w-full sm:h-[150px] lg:h-[190px]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="55%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>

          <linearGradient id="waveMid" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          <linearGradient id="waveBottom" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          {/* soft glow where layers overlap */}
          <filter id="waveGlow" x="-20%" y="-50%" width="140%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          fill="url(#waveTop)"
          opacity="0.45"
          filter="url(#waveGlow)"
          animate={{
            d: [
              'M0,120 C320,60 640,150 960,110 C1280,70 1600,140 1920,100 L1920,260 L0,260 Z',
              'M0,110 C320,150 640,70 960,120 C1280,160 1600,90 1920,120 L1920,260 L0,260 Z',
              'M0,120 C320,60 640,150 960,110 C1280,70 1600,140 1920,100 L1920,260 L0,260 Z',
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.path
          fill="url(#waveMid)"
          opacity="0.7"
          animate={{
            d: [
              'M0,160 C300,110 620,190 960,150 C1300,110 1620,180 1920,150 L1920,260 L0,260 Z',
              'M0,150 C300,190 620,110 960,160 C1300,190 1620,120 1920,170 L1920,260 L0,260 Z',
              'M0,160 C300,110 620,190 960,150 C1300,110 1620,180 1920,150 L1920,260 L0,260 Z',
            ],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />

        <motion.path
          fill="url(#waveBottom)"
          animate={{
            d: [
              'M0,200 C280,170 620,220 960,195 C1300,170 1640,215 1920,190 L1920,260 L0,260 Z',
              'M0,195 C280,220 620,170 960,200 C1300,225 1640,180 1920,205 L1920,260 L0,260 Z',
              'M0,200 C280,170 620,220 960,195 C1300,170 1640,215 1920,190 L1920,260 L0,260 Z',
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
      </svg>
    </div>
  );
}