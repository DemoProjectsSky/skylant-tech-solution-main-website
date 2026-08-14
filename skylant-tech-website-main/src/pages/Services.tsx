import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Globe,
  Smartphone,
  Brain,
  Cloud,
  Zap,
  Palette,
  TrendingUp,
  Target,
  GitBranch,
  Layers,
  MessageCircle,
  Phone,
  Compass,
  Rocket,
} from 'lucide-react';

import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import ServicesIllustration from '../components/ServicesIllustration';
import services from '../data/services.json';
import caseStudies from '../data/caseStudies.json';
import faqs from '../data/faqs.json';
import FAQAccordion from '../components/FAQAccordion';

const iconMap: Record<string, any> = {
  Code2,
  Globe,
  Smartphone,
  Brain,
  Cloud,
  Zap,
  Palette,
  TrendingUp,
  Layers,
};

/* =========================================================
   6-STAGE "IDEA TO IMPACT" PROCESS
========================================================= */

type ProcessStage = {
  number: string;
  title: string;
  keywords: string[];
  description: string;
  icon: any;
  color: string;
  isFinal?: boolean;
};

const processStages: ProcessStage[] = [
  {
    number: '01',
    title: 'DISCOVER',
    keywords: ['Understand', 'Research', 'Goals'],
    description:
      'We understand your business, users, requirements, and goals before defining the right solution.',
    icon: Target,
    color: '#3B82F6',
  },
  {
    number: '02',
    title: 'STRATEGY',
    keywords: ['Plan', 'Technology', 'Roadmap'],
    description:
      'We create a clear technical and business roadmap with the right technologies, architecture, and execution plan.',
    icon: Compass,
    color: '#6366F1',
  },
  {
    number: '03',
    title: 'DESIGN',
    keywords: ['UX', 'UI', 'Prototype'],
    description:
      'We transform ideas into intuitive user experiences, modern interfaces, and interactive prototypes.',
    icon: Palette,
    color: '#8B5CF6',
  },
  {
    number: '04',
    title: 'BUILD',
    keywords: ['Develop', 'Integrate', 'Test'],
    description:
      'Our development team builds, integrates, tests, and continuously improves your digital solution.',
    icon: Code2,
    color: '#7C3AED',
  },
  {
    number: '05',
    title: 'LAUNCH',
    keywords: ['Deploy', 'Optimize', 'Monitor'],
    description:
      'We deploy your product, optimize performance, and monitor everything to ensure a smooth launch.',
    icon: Rocket,
    color: '#F97316',
  },
  {
    number: '06',
    title: 'GROW',
    keywords: ['Marketing', 'Analytics', 'Support'],
    description:
      'We help you grow through digital marketing, analytics, optimization, and continuous post-launch support.',
    icon: TrendingUp,
    color: '#10B981',
    isFinal: true,
  },
];

/* =========================================================
   STAIRCASE CONFIGURATION
========================================================= */

const STAIR_STEP_PX = 42;

/*
  Card heights:
  01 Discover = normal
  02 Strategy = bigger
  03 Design   = bigger
  04 Build    = normal
  05 Launch   = bigger
  06 Grow     = biggest
*/
const STAIR_CARD_HEIGHTS = [
  224, // 01 Discover
  245, // 02 Strategy
  245, // 03 Design
  224, // 04 Build
  245, // 05 Launch
  255, // 06 Grow
];

const STAIR_TOP_PAD = 64;
const STAIR_BOTTOM_PAD = 24;

const STAIR_HEIGHT =
  Math.max(...STAIR_CARD_HEIGHTS) +
  (processStages.length - 1) * STAIR_STEP_PX +
  STAIR_TOP_PAD +
  STAIR_BOTTOM_PAD;

/* =========================================================
   PROCESS STEP CARD
========================================================= */

function ProcessStep({
  stage,
  index,
  isMobile = false,
  reduceMotion = false,
}: {
  stage: ProcessStage;
  index: number;
  isMobile?: boolean;
  reduceMotion?: boolean;
}) {
  const Icon = stage.icon;
  const isFinal = !!stage.isFinal;

  const delay = reduceMotion ? 0 : index * 0.35;

  /*
    Width hierarchy:
    01 Discover = normal
    02 Strategy = bigger
    03 Design   = bigger
    04 Build    = normal
    05 Launch   = bigger
    06 Grow     = biggest
  */
  const cardWidth =
    index === 5
      ? 'w-[300px] xl:w-[310px]'
      : [1, 2, 4].includes(index)
        ? 'w-[280px] xl:w-[290px]'
        : 'w-[250px] xl:w-[260px]';

  const cardHeight = STAIR_CARD_HEIGHTS[index];

  return (
    <motion.div
      initial={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 60,
              scale: 0.94,
              filter: 'blur(6px)',
            }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              scale: isFinal ? 1.04 : 1,
              filter: 'blur(0px)',
            }
      }
      viewport={{
        once: true,
        margin: '-80px',
      }}
      transition={
        reduceMotion
          ? {
              duration: 0.3,
            }
          : {
              duration: 0.6,
              delay,
              type: 'spring',
              stiffness: 90,
              damping: 16,
            }
      }
      className={`relative overflow-hidden rounded-2xl border bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-sm hover:shadow-md transition-all ${
        isMobile
          ? 'w-full'
          : `${cardWidth} flex-shrink-0 flex flex-col justify-between`
      } ${
        isFinal
          ? 'ring-1 ring-[#10B981]/30 shadow-lg'
          : ''
      }`}
      style={{
        borderColor: `${stage.color}30`,
        height: isMobile ? 'auto' : cardHeight,
      }}
      role="group"
      aria-label={`Step ${stage.number}: ${stage.title}`}
    >
      {/* =====================================================
          TOP COLOR BAR
      ====================================================== */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: stage.color,
        }}
        aria-hidden="true"
      />

      {/* =====================================================
          ICON + NUMBER
      ====================================================== */}
      <div className="flex items-start justify-between mb-4">
        <motion.div
          initial={
            reduceMotion
              ? {
                  scale: 1,
                  rotate: 0,
                }
              : {
                  scale: 0.8,
                  rotate: -8,
                }
          }
          whileInView={{
            scale: 1,
            rotate: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: delay + 0.15,
          }}
          className={`${
            isFinal ? 'w-12 h-12' : 'w-11 h-11'
          } rounded-xl flex items-center justify-center`}
          style={{
            background: `${stage.color}14`,
            border: `1px solid ${stage.color}40`,
            color: stage.color,
          }}
          aria-hidden="true"
        >
          <Icon
            className={
              isFinal
                ? 'w-6 h-6'
                : 'w-5 h-5'
            }
          />
        </motion.div>

        <motion.span
          initial={
            reduceMotion
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {
                  opacity: 0,
                  x: 6,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.4,
            delay: delay + 0.2,
          }}
          className="text-3xl font-bold leading-none"
          style={{
            color: `${stage.color}35`,
          }}
          aria-hidden="true"
        >
          {stage.number}
        </motion.span>
      </div>

      {/* =====================================================
          TITLE
      ====================================================== */}
      <h3 className="text-[#2C2A4A] font-bold text-base mb-1.5">
        {stage.title}
      </h3>

      {/* =====================================================
          DESCRIPTION
      ====================================================== */}
      <p className="text-[#5B5580] text-xs leading-relaxed mb-4">
        {stage.description}
      </p>

      {/* =====================================================
          KEYWORDS
      ====================================================== */}
      <div className="flex flex-wrap gap-1.5">
        {stage.keywords.map((keyword) => (
          <span
            key={keyword}
            className="px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{
              background: `${stage.color}12`,
              color: stage.color,
            }}
          >
            {keyword}
          </span>
        ))}
      </div>

      {/* =====================================================
          FINAL GROW PULSE
      ====================================================== */}
      {isFinal && !reduceMotion && (
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full pointer-events-none"
          style={{
            background: `${stage.color}25`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.15, 0.5],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}

/* =========================================================
   STAIRCASE Y POSITION
========================================================= */

function yPercentFor(index: number) {
  const cardHeight = STAIR_CARD_HEIGHTS[index];

  const bottomPx =
    STAIR_BOTTOM_PAD +
    cardHeight / 2 +
    index * STAIR_STEP_PX;

  return (
    100 -
    (bottomPx / STAIR_HEIGHT) * 100
  );
}

/* =========================================================
   STAIRCASE CONNECTORS
========================================================= */

function StaircaseConnectors({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  if (reduceMotion) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {processStages
          .slice(0, -1)
          .map((stage, index) => (
            <linearGradient
              key={stage.number}
              id={`stair-grad-${index}`}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop
                offset="0%"
                stopColor={stage.color}
                stopOpacity="0.55"
              />

              <stop
                offset="100%"
                stopColor={processStages[index + 1].color}
                stopOpacity="0.55"
              />
            </linearGradient>
          ))}
      </defs>

      {processStages
        .slice(0, -1)
        .map((stage, index) => {
          const x1 =
            ((index + 0.5) /
              processStages.length) *
            100;

          const x2 =
            ((index + 1.5) /
              processStages.length) *
            100;

          const y1 = yPercentFor(index);
          const y2 = yPercentFor(index + 1);

          const delay =
            index * 0.35 + 0.35;

          return (
            <g key={stage.number}>
              {/* Connection line */}
              <motion.line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={`url(#stair-grad-${index})`}
                strokeWidth="0.6"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay,
                }}
              />

              {/* Moving glowing particle */}
              <motion.circle
                r="1"
                fill={
                  processStages[index + 1]
                    .color
                }
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: [0, 1, 1, 0],
                  cx: [x1, x2],
                  cy: [y1, y2],
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: delay + 0.1,
                  times: [
                    0,
                    0.15,
                    0.85,
                    1,
                  ],
                }}
              />
            </g>
          );
        })}
    </svg>
  );
}

/* =========================================================
   CONTACT NUMBERS
========================================================= */

const WHATSAPP_NUMBER =
  '+917249761369';

const CALL_NUMBERS = [
  '+917249761369',
  '+917558531369',
];

/* =========================================================
   SERVICES PAGE
========================================================= */

export default function Services() {
  const [
    openCallCardId,
    setOpenCallCardId,
  ] = useState<string | null>(null);

  const reduceMotion =
    !!useReducedMotion();

  return (
    <>
      {/* =====================================================
          PAGE BANNER
      ====================================================== */}

      <PageBanner
        title={
          <>
            Comprehensive IT solutions for{' '}
            <span
              style={{
                color: '#2F6EFF',
              }}
            >
              modern businesses
            </span>
          </>
        }
        description="From custom software to AI solutions, cloud infrastructure, and digital marketing — everything you need to build, scale, and grow your digital presence."
        breadcrumb={[
          {
            name: 'Home',
            path: '/',
          },
          {
            name: 'Services',
          },
        ]}
        illustration={
          <ServicesIllustration />
        }
        stats={[
          {
            value: '8+',
            label: 'Services',
          },
          {
            value: '250+',
            label: 'Projects',
          },
          {
            value: '100+',
            label: 'Clients',
          },
        ]}
        primaryCta={{
          label: 'Book Consultation',
          path: '/contact',
        }}
        secondaryCta={{
          label: 'View Case Studies',
          path: '/services',
        }}
      />

      {/* =====================================================
          SERVICE GRID
      ====================================================== */}

      <section className="relative py-20 sm:py-24 bg-[#FFF4E9]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F5D9B8] bg-white/80 backdrop-blur-sm text-[#C2622B] text-sm font-medium mb-5">
              <Layers className="w-4 h-4" />
              What We Do
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2A4A] mb-4 text-balance">
              Explore our full range of services
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon =
                iconMap[service.icon] ||
                Code2;

              const isCallOpen =
                openCallCardId ===
                service.id;

              return (
                <motion.div
                  key={service.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay:
                      (index % 3) *
                      0.08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="block rounded-2xl border border-[#F5D9B8] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md overflow-hidden h-full transition-all group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                      <div
                        className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-white"
                        style={{
                          background: `${service.color}90`,
                          border: `1px solid ${service.color}`,
                          backdropFilter:
                            'blur(8px)',
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-[#2C2A4A] font-bold text-lg mb-2 group-hover:text-[#E8622C] transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-[#5B5580] text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {Array.isArray(service.technologies) &&
                          service.technologies
                            .slice(0, 4)
                            .map((technology) => (
                              <span
                                key={technology}
                                className="px-2.5 py-1 rounded-full bg-[#FFF1E0] text-[#8A5A2B] text-xs"
                              >
                                {technology}
                              </span>
                            ))}
                      </div>

                      {/* WhatsApp + Call */}
                      <div className="relative flex items-center gap-2 mb-4">
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            `Hi, I'm interested in ${service.title}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-medium hover:bg-[#25D366]/20 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                          WhatsApp
                        </a>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();

                            setOpenCallCardId(
                              isCallOpen
                                ? null
                                : service.id
                            );
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-medium hover:bg-red-500/20 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-red-500" />
                          Call
                        </button>

                        {isCallOpen && (
                          <div
                            className="absolute bottom-full left-0 mb-2 w-48 rounded-xl border border-[#F5D9B8] bg-white shadow-lg p-2 z-20"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                            }}
                          >
                            {CALL_NUMBERS.map(
                              (number) => (
                                <a
                                  key={number}
                                  href={`tel:${number}`}
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#FFF1E0] text-[#2C2A4A] text-sm"
                                >
                                  <Phone className="w-4 h-4 text-red-500" />
                                  {number}
                                </a>
                              )
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[#E8622C] text-sm font-medium group-hover:gap-2.5 transition-all">
                        Learn more
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS — FROM IDEA TO IMPACT
      ====================================================== */}

      <section className="relative py-20 sm:py-24 overflow-hidden">
        {/* Decorative background */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#8B5CF6]/10 blur-3xl" />

          <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-[#3B82F6]/10 blur-3xl" />

          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-[#10B981]/8 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'radial-gradient(circle, #6D5BD0 1px, transparent 1px)',
              backgroundSize:
                '28px 28px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Process Heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-white/80 backdrop-blur-sm text-[#6D5BD0] text-sm font-medium mb-5">
              <GitBranch className="w-4 h-4" />
              OUR PROCESS
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2A4A] mb-4 text-balance">
              From Idea to Impact
            </h2>

            <p className="text-[#5B5580] text-base sm:text-lg leading-relaxed">
              From understanding your idea to launching and growing your digital product, our process is designed to turn business goals into measurable results.
            </p>
          </motion.div>

          {/* =================================================
              DESKTOP / TABLET STAIRCASE
          ================================================== */}

          <div className="hidden md:block overflow-x-auto overflow-y-hidden pb-2">
            <div
              className="relative mx-auto"
              style={{
                height: STAIR_HEIGHT,
                minWidth:
                  'fit-content',
              }}
            >
              <StaircaseConnectors
                reduceMotion={
                  reduceMotion
                }
              />

              <div className="relative flex items-end gap-3 lg:gap-5 h-full px-1">
                {processStages.map(
                  (stage, index) => (
                    <div
                      key={
                        stage.number
                      }
                      style={{
                        transform: `translateY(-${
                          index *
                          STAIR_STEP_PX
                        }px)`,
                        marginBottom:
                          STAIR_BOTTOM_PAD,
                      }}
                    >
                      <ProcessStep
                        stage={stage}
                        index={index}
                        reduceMotion={
                          reduceMotion
                        }
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              MOBILE VERTICAL TIMELINE
          ================================================== */}

          <div className="flex md:hidden flex-col gap-1">
            {processStages.map(
              (stage, index) => (
                <div
                  key={stage.number}
                >
                  <ProcessStep
                    stage={stage}
                    index={index}
                    isMobile
                    reduceMotion={
                      reduceMotion
                    }
                  />

                  {index <
                    processStages.length -
                      1 && (
                    <div
                      className="flex justify-center py-2"
                      aria-hidden="true"
                    >
                      <motion.div
                        initial={
                          reduceMotion
                            ? {
                                scaleY: 1,
                                opacity: 1,
                              }
                            : {
                                scaleY: 0,
                                opacity: 0,
                              }
                        }
                        whileInView={{
                          scaleY: 1,
                          opacity: 1,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.4,
                          delay:
                            reduceMotion
                              ? 0
                              : index *
                                  0.35 +
                                0.3,
                        }}
                        className="w-[2px] h-6 origin-top"
                        style={{
                          background: `linear-gradient(to bottom, ${stage.color}, ${processStages[index + 1].color})`,
                        }}
                      />
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CASE STUDIES
      ====================================================== */}

      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-white/80 backdrop-blur-sm text-[#6D5BD0] text-sm font-medium mb-5">
              <Target className="w-4 h-4" />
              Case Studies
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2A4A] mb-4 text-balance">
              Proven results across industries
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {caseStudies.map(
              (caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay:
                      index * 0.1,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-2xl border border-[#E4DBFF] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md overflow-hidden transition-all group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={
                        caseStudy.image
                      }
                      alt={
                        caseStudy.title
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/95 text-xs font-medium text-[#2C2A4A] shadow-sm">
                        {
                          caseStudy.industry
                        }
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-[#6D5BD0] text-xs font-semibold uppercase tracking-wider mb-2">
                      {
                        caseStudy.service
                      }
                    </div>

                    <h3 className="text-[#2C2A4A] font-bold text-lg mb-2">
                      {
                        caseStudy.title
                      }
                    </h3>

                    <p className="text-[#5B5580] text-sm leading-relaxed mb-4">
                      {
                        caseStudy.description
                      }
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E4DBFF]">
                      {caseStudy.metrics
                        .slice(0, 2)
                        .map(
                          (
                            metric,
                            metricIndex
                          ) => (
                            <div
                              key={
                                metricIndex
                              }
                            >
                              <div className="text-xl font-bold text-[#6D5BD0]">
                                {
                                  metric.value
                                }
                              </div>

                              <div className="text-xs text-[#8783A6]">
                                {
                                  metric.label
                                }
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-4 text-balance">
              Service-related questions
            </h2>
          </motion.div>

          <FAQAccordion
            items={faqs}
          />
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <CTASection />
    </>
  );
}