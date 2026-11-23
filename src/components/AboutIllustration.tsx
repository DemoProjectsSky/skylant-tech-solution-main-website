import { motion } from 'framer-motion';

/* ---------------------------------------------------------------------
   AboutIllustration — v8 "Image Hero"

   Replaced the animated SVG orbit illustration with a single static
   image, wrapped in a subtle floating + fade-in animation so the
   section still feels alive without any of the heavy SVG motion.
--------------------------------------------------------------------- */

export default function AboutIllustration() {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.img
        src="https://static.vecteezy.com/system/resources/previews/011/064/686/original/social-media-and-digital-marketing-3d-illustration-free-png.png"
        alt="Social media and digital marketing illustration"
        className="h-auto w-full max-w-md object-contain"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}