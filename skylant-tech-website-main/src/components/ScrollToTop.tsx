import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
      className="
        flex
        h-[52px]
        w-[52px]
        items-center
        justify-center
        rounded-full
        bg-sky-500
        text-white
        shadow-lg
        shadow-sky-500/30
        transition-all
        duration-200
        hover:scale-110
        hover:bg-sky-600
        active:scale-95
      "
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp
        size={22}
        strokeWidth={2.5}
        className="text-white"
      />
    </motion.button>
  );
}
///