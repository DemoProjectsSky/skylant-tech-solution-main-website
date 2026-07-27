import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryPath?: string;
  secondaryLabel?: string;
  secondaryPath?: string;
}

export default function CTASection({
  title = 'Ready to build something extraordinary?',
  description = "Let's discuss your project and turn your vision into a scalable, high-performance digital product. Book a free consultation with our experts today.",
  primaryLabel = 'Book a Free Consultation',
  primaryPath = '/contact',
  secondaryLabel = 'Explore Services',
  secondaryPath = '/services',
}: CTASectionProps) {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="relative max-w-5xl mx-auto"
      >
        <div className="relative glass-card-strong rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Let's Build Together
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
              {title}
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              {description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to={primaryPath} className="btn-primary">
                {primaryLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to={secondaryPath} className="btn-secondary">
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function Counter({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(value);
          };
          tick();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
