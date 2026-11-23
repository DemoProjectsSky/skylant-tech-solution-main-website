import { motion } from 'framer-motion';

/**
 * Lightweight "3D-look" device mockup — pure CSS 3D transforms + Framer Motion.
 * No Three.js, no WebGL — keeps Lighthouse performance scores high.
 *
 * Usage inside ServiceIllustration.tsx, e.g. for mobile-app-development:
 *   <Device3DMockup accentColor={service.color} screenImage="/mockups/app-screen.png" />
 *
 * For other domains, swap the shape:
 *   - website-development -> a laptop/browser frame instead of a phone
 *   - cloud-solutions      -> a floating server/cloud icon stack
 *   - ai-solutions         -> a floating orb/network graphic
 * Same rotateY/rotateX technique works for all of them.
 */
export default function Device3DMockup({
  accentColor = '#8B5CF6',
  screenImage,
}: {
  accentColor?: string;
  screenImage?: string;
}) {
  return (
    <div style={{ perspective: '1200px' }} className="flex items-center justify-center py-10">
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ rotateY: -15, rotateX: 8 }}
        animate={{ rotateY: [-15, 15, -15], rotateX: [8, 4, 8] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.04 }}
        className="relative w-[220px] h-[440px] rounded-[2.2rem] border-[6px] border-[#1E293B] bg-[#0B0F19] shadow-2xl"
      >
        {/* notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1E293B] rounded-b-xl z-10" />

        {/* screen */}
        <div
          className="absolute inset-[6px] rounded-[1.8rem] overflow-hidden bg-gradient-to-br"
          style={{ backgroundImage: `linear-gradient(160deg, ${accentColor}22, ${accentColor}55)` }}
        >
          {screenImage ? (
            <img src={screenImage} alt="App preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/70 text-sm">
              Screen preview
            </div>
          )}
        </div>

        {/* subtle glossy highlight for depth */}
        <div className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}