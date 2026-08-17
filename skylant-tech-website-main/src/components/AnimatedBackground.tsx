import { motion } from 'framer-motion';

/* ---------------------------------------------------------------------
   AnimatedBackground
   A quiet, ambient "aurora" of soft lavender blobs drifting behind the
   entire site. Mounted once in the root layout (App.tsx) — because it's
   `fixed` and covers the full viewport, it stays visible behind every
   section as the page scrolls, so the animation runs the full length
   of the site rather than just the hero.

   Palette (lavender x off-white):
   base   #FAF9F7   wash   #F3F0FF   lavender  #E4DBFF
   violet #6D5BD0   iris   #9B8AFB   deep      #4B3F91
--------------------------------------------------------------------- */

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#FAF9F7]"
    >
      {/* soft grid so the wash doesn't feel empty */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(#E4DBFF 1px, transparent 1px), linear-gradient(90deg, #E4DBFF 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at 50% 30%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black, transparent 75%)',
        }}
      />

      <motion.div
        className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(circle, #0955f8 0%, transparent 70%)' }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 80, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-160px] top-[18%] h-[480px] w-[480px] rounded-full blur-[100px]"
        
        animate={{ x: [0, -50, 30, 0], y: [0, 60, -30, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[-200px] left-[8%] h-[520px] w-[520px] rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(circle, #aca4c4 0%, transparent 70%)' }}
        animate={{ x: [0, 40, -60, 0], y: [0, -50, 20, 0], scale: [1, 1.1, 1, 1] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[6%] right-[6%] h-[380px] w-[380px] rounded-full blur-[90px]"
        style={{ background: 'radial-gradient(circle, #8b7ed2 0%, transparent 70%)', opacity: 0.5 }}
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* center blob — fills the middle of the page so the wash covers
          full width/length instead of only clustering at the corners */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, #9B8AFB 0%, transparent 72%)', opacity: 0.35 }}
        animate={{ scale: [1, 1.12, 0.96, 1], rotate: [0, 20, -10, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />


      {/* faint top-to-bottom fade so text stays readable over the wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F7]/40 via-transparent to-[#FAF9F7]/60" />
    </div>
    
  );
}