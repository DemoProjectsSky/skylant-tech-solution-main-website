import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface PageBannerProps {
  title: string;
  description: string;
  breadcrumb: { name: string; path?: string }[];
  image: string;
  floatingCards?: { icon: ReactNode; title: string; subtitle?: string }[];
  stats?: { value: string; label: string }[];
  primaryCta?: { label: string; path: string };
  secondaryCta?: { label: string; path: string };
  accentColor?: string;
}

export default function PageBanner({
  title,
  description,
  breadcrumb,
  image,
  floatingCards = [],
  stats = [],
  primaryCta,
  secondaryCta,
  accentColor = '#2563EB',
}: PageBannerProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div
        className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 animate-pulse-glow"
        style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
      />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-2">
                  {b.path ? (
                    <Link to={b.path} className="hover:text-sky-400 transition-colors">{b.name}</Link>
                  ) : (
                    <span className="text-slate-300">{b.name}</span>
                  )}
                  {i < breadcrumb.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
                </span>
              ))}
            </nav>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6 text-balance"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl"
            >
              {description}
            </motion.p>

            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                {primaryCta && (
                  <Link to={primaryCta.path} className="btn-primary">
                    {primaryCta.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link to={secondaryCta.path} className="btn-secondary">
                    {secondaryCta.label}
                  </Link>
                )}
              </motion.div>
            )}

            {stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-8"
              >
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl lg:text-3xl font-bold gradient-text-light">{s.value}</div>
                    <div className="text-sm text-slate-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right - Image with floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/4.2] rounded-3xl overflow-hidden">
              <div
                className="absolute inset-0 rounded-3xl opacity-40 blur-2xl"
                style={{ background: `radial-gradient(circle at center, ${accentColor}, transparent 70%)` }}
              />
              <div className="relative h-full rounded-3xl overflow-hidden glass-card">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating cards */}
            {floatingCards.slice(0, 4).map((card, i) => {
              const positions = [
                'top-4 -left-8',
                'top-1/3 -right-10',
                'bottom-1/3 -left-10',
                'bottom-8 -right-6',
              ];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  className={`absolute ${positions[i]} glass-card-strong rounded-2xl p-3.5 shadow-xl shadow-black/30 ${i % 2 === 0 ? 'animate-float' : 'animate-float-delay'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                      style={{ background: `${accentColor}40`, border: `1px solid ${accentColor}60` }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <div className="text-white text-xs font-semibold whitespace-nowrap">{card.title}</div>
                      {card.subtitle && <div className="text-slate-400 text-[10px]">{card.subtitle}</div>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
