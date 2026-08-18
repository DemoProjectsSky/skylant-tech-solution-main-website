import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface PageBannerProps {
  title: string | React.ReactNode;
  description: string;
  breadcrumb: { name: string; path?: string }[];
  image?: string;
  illustration?: ReactNode;
  floatingCards?: {
    icon: ReactNode;
    title: string;
    subtitle?: string;
  }[];
  stats?: { value: string; label: string }[];
  primaryCta?: { label: string; path: string };
  secondaryCta?: { label: string; path: string };
  accentColor?: string;
}

/* Stats animation */
const statsContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.12,
    },
  },
};

const statItem = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function PageBanner({
  title,
  description,
  breadcrumb,
  image,
  illustration,
  floatingCards = [],
  stats = [],
  primaryCta,
  secondaryCta,
  accentColor = '#2563EB',
}: PageBannerProps) {
  return (
    <section className="relative pt-4 pb-16 lg:pt-6 lg:pb-20 overflow-hidden">
      
      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F7] via-[#F3F0FF] to-[#FAF9F7]" />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(#E4DBFF 1px, transparent 1px), linear-gradient(90deg, #E4DBFF 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(circle at 50% 30%, black, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 30%, black, transparent 75%)',
        }}
      />

      {/* ================= ANIMATED BACKGROUND BLOBS ================= */}

      {/* Left blob */}
      <motion.div
        className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, #2563EB 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 60, -20, 0],
          y: [0, 40, 80, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Right blob */}
      <motion.div
        className="absolute right-[-160px] top-[18%] h-[480px] w-[480px] rounded-full blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, #9B8AFB 0%, transparent 70%)',
          opacity: 0.45,
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Bottom left */}
      <motion.div
        className="absolute bottom-[-200px] left-[8%] h-[520px] w-[520px] rounded-full blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, #E4DBFF 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.1, 1, 1],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Bottom right */}
      <motion.div
        className="absolute bottom-[6%] right-[6%] h-[380px] w-[380px] rounded-full blur-[90px]"
        style={{
          background:
            'radial-gradient(circle, #6D5BD0 0%, transparent 70%)',
          opacity: 0.5,
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Center glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, #9B8AFB 0%, transparent 72%)',
          opacity: 0.35,
        }}
        animate={{
          scale: [1, 1.12, 0.96, 1],
          rotate: [0, 20, -10, 0],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F7]/30 via-transparent to-[#FAF9F7]/50" />

      {/* ================= MAIN CONTENT ================= */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ================= LEFT CONTENT ================= */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          >

            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-sm text-[#8B85A8] mb-6 flex-wrap"
            >
              {breadcrumb.map((b, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2"
                >
                  {b.path ? (
                    <Link
                      to={b.path}
                      className="hover:text-[#6D5BD0] transition-colors"
                    >
                      {b.name}
                    </Link>
                  ) : (
                    <span className="text-[#4B3F91]">
                      {b.name}
                    </span>
                  )}

                  {i < breadcrumb.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#C9BAFF]" />
                  )}
                </span>
              ))}
            </motion.nav>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C2A4A] leading-[1.05] tracking-tight mb-6 text-balance"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="text-lg text-[#5B5580] leading-relaxed mb-8 max-w-xl"
            >
              {description}
            </motion.p>

            {/* ================= BUTTONS ================= */}

            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >

                {/* Primary Button */}
                {primaryCta && (
                  <motion.div
                    whileHover={{
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <Link
                      to={primaryCta.path}
                      className="group inline-flex items-center bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      {primaryCta.label}

                      <motion.span
                        className="inline-flex"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                        }}
                      >
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </motion.span>
                    </Link>
                  </motion.div>
                )}

                {/* Secondary Button */}
                {secondaryCta && (
                  <motion.div
                    whileHover={{
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <Link
                      to={secondaryCta.path}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-transparent border-2 border-[#1D4ED8] text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(29,78,216,0.45)]"
                    >
                      {secondaryCta.label}
                    </Link>
                  </motion.div>
                )}

              </motion.div>
            )}

            {/* ================= STATS ================= */}

            {stats.length > 0 && (
              <motion.div
                variants={statsContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-8"
              >
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    variants={statItem}
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-[#4B3F91]">
                      {s.value}
                    </div>

                    <div className="text-sm text-[#8B85A8] mt-1">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

          </motion.div>

          {/* ================================================= */}
          {/* RIGHT - ANIMATED IMAGE / ILLUSTRATION             */}
          {/* IMPORTANT: MOBILE IS NO LONGER HIDDEN            */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: 'easeOut',
            }}
            className="relative block w-full mt-6 lg:mt-0"
          >

            {/* ================= ILLUSTRATION ================= */}

            {illustration ? (

              <motion.div
                className="relative flex aspect-[4/4.2] w-full items-center justify-center"
                initial={{
                  opacity: 0,
                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
              >
                {illustration}
              </motion.div>

            ) : (

              /* ================= IMAGE ================= */

              <div className="relative aspect-[4/4.2] rounded-3xl overflow-hidden">

                {/* Pulsing glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-40 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${accentColor}, transparent 70%)`,
                  }}
                  animate={{
                    opacity: [0.3, 0.55, 0.3],
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Rotating glow ring */}
                <motion.div
                  className="absolute -inset-[2px] rounded-3xl"
                  style={{
                    background: `conic-gradient(
                      from 0deg,
                      ${accentColor}00,
                      ${accentColor}CC,
                      ${accentColor}00 30%
                    )`,
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Main image */}
                <motion.div
                  className="relative h-full rounded-3xl overflow-hidden glass-card m-[2px]"
                  whileHover={{
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                >

                  <motion.img
                    src={image}
                    alt={
                      typeof title === 'string'
                        ? title
                        : undefined
                    }
                    className="w-full h-full object-cover"
                    loading="eager"

                    initial={{
                      scale: 1.15,
                      opacity: 0,
                      clipPath: 'inset(0 0 100% 0)',
                    }}

                    animate={{
                      opacity: 1,
                      clipPath: 'inset(0 0 0% 0)',
                      scale: [1.1, 1.18, 1.1],
                      x: [0, 10, -6, 0],
                      y: [0, -8, 6, 0],
                    }}

                    transition={{
                      opacity: {
                        duration: 0.9,
                        ease: 'easeOut',
                      },

                      clipPath: {
                        duration: 1.1,
                        ease: [0.65, 0, 0.35, 1],
                      },

                      scale: {
                        duration: 14,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1.1,
                      },

                      x: {
                        duration: 14,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1.1,
                      },

                      y: {
                        duration: 14,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1.1,
                      },
                    }}
                  />

                  {/* Shine sweep */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)',
                      mixBlendMode: 'overlay',
                    }}
                    initial={{
                      x: '-130%',
                    }}
                    animate={{
                      x: '130%',
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 3.5,
                      ease: 'easeInOut',
                      delay: 1.5,
                    }}
                  />

                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A4A]/40 via-transparent to-transparent pointer-events-none" />

                </motion.div>

              </div>
            )}

            {/* ================================================= */}
            {/* FLOATING CARDS                                    */}
            {/* ================================================= */}

            {floatingCards.slice(0, 4).map((card, i) => {

              /*
               * Mobile-safe positions.
               * Desktop positions are restored from lg breakpoint.
               */
              const positions = [
                'top-2 left-2 lg:top-4 lg:-left-8',
                'top-1/3 right-2 lg:top-1/3 lg:-right-10',
                'bottom-1/3 left-2 lg:bottom-1/3 lg:-left-10',
                'bottom-2 right-2 lg:bottom-8 lg:-right-6',
              ];

              return (
                <motion.div
                  key={i}

                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}

                  whileHover={{
                    scale: 1.06,
                    y: -6,
                    rotate: i % 2 === 0 ? -2 : 2,
                  }}

                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.15,
                  }}

                  className={`
                    absolute
                    ${positions[i]}
                    glass-card-strong
                    rounded-2xl
                    p-3
                    sm:p-3.5
                    shadow-xl
                    shadow-black/30
                    cursor-default
                    z-20
                    max-w-[calc(100%-1rem)]
                    ${i % 2 === 0
                      ? 'animate-float'
                      : 'animate-float-delay'
                    }
                  `}
                >

                  <div className="flex items-center gap-2 sm:gap-2.5">

                    {/* Icon */}
                    <motion.div
                      className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{
                        background: `${accentColor}40`,
                        border: `1px solid ${accentColor}60`,
                      }}

                      animate={{
                        rotate: [0, -6, 6, 0],
                      }}

                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatDelay: 2,
                        delay: i * 0.3,
                      }}
                    >

                      {/* Halo */}
                      <motion.span
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: accentColor,
                          opacity: 0.35,
                        }}

                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.35, 0, 0.35],
                        }}

                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: 'easeOut',
                          delay: i * 0.4,
                        }}
                      />

                      <span className="relative">
                        {card.icon}
                      </span>

                    </motion.div>

                    {/* Text */}
                    <div className="min-w-0">
                      <div className="text-[#2C2A4A] text-[11px] sm:text-xs font-semibold whitespace-nowrap">
                        {card.title}
                      </div>

                      {card.subtitle && (
                        <div className="text-[#8B85A8] text-[9px] sm:text-[10px] truncate">
                          {card.subtitle}
                        </div>
                      )}
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