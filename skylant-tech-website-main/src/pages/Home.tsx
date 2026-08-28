import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Sparkles, Code2, Globe, Smartphone, Brain, Cloud, Zap, Palette, TrendingUp,
  Shield, Rocket, Users, Award, Star, Briefcase, CheckCircle2,
  Cpu, Layers, GitBranch, LineChart, Target, Lightbulb, Heart, Clock,
  Search, PenTool, TestTube2, UploadCloud, Building2,
  Megaphone, Instagram, Facebook,
} from 'lucide-react';
import services from '../data/services.json';
import caseStudies from '../data/caseStudies.json';
import faqs from '../data/faqs.json';
import FAQAccordion from '../components/FAQAccordion';
import DigitalMarketingShowcase from '../components/DigitalMarketingShowcase';

/* ---------------------------------------------------------------------
   Token reference (lavender x off-white theme)
   bg-base      #FAF9F7   bg-wash     #F3F0FF   bg-section   #EDE9FE
   violet       #6D5BD0   iris        #9B8AFB   deep-violet  #4B3F91
   text         #2C2A4A   muted       #5B5580   faint        #8783A6
   border       #E4DBFF

   Card accent palette (used to break the "everything is violet" feel
   on the why-us / industries / marketing tiles) — kept inside the
   same lavender-blue family so it stays cohesive with the hero, just
   spread across a wider hue range instead of repeating one accent.
   blue #2563EB   cyan #06B6D4   violet #6D5BD0   iris #9B8AFB
   amber #F59E0B  emerald #10B981   rose #F43F5E   pink #EC4899

   Section backgrounds are translucent + backdrop-blur so the ambient
   AnimatedBackground (mounted once in the root layout) shows through
   the full length of the page, not just the hero.
--------------------------------------------------------------------- */

const iconMap: Record<string, any> = {
  Code2, Globe, Smartphone, Brain, Cloud, Zap, Palette, TrendingUp, Briefcase, Users,
  Award, Star, Shield, Rocket, Cpu, Layers, GitBranch, LineChart,
  Target, Lightbulb, Heart, Clock,
};

/* ---------------------------- Small helpers ---------------------------- */

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const servicesReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: index * 0.08, ease: 'easeOut' as const },
  }),
};

function Eyebrow({ icon: Icon, label, color = '#6D5BD0' }: { icon: any; label: string; color?: string }) {
  return (
    <div
      className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E4DBFF] bg-gradient-to-r from-white/80 via-[#F3F0FF]/80 to-white/80 px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm"
      style={{ color }}
    >
      <motion.span
        animate={{ rotate: [0, 14, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-flex"
      >
        <Icon className="h-4 w-4" />
      </motion.span>
      {label}
    </div>
  );
}

/* ------------------------------ Page data ------------------------------ */

const featureChips = ['AI Solutions', 'ERP Development', 'Web Applications', 'Mobile Apps', 'Digital Marketing'];

const statistics = [
  { id: 1, value: 20, suffix: '+', label: 'Websites Delivered' },
  { id: 2, value: 10, suffix: '+', label: 'Business Clients' },
  { id: 3, value: 100, suffix: '%', label: 'Client-Focused Approach' },
  { id: 4, value: 100, suffix: '%', label: 'Fast Delivery Commitment' },
];

const whySkylant = [
  {
    icon: Users,
    title: 'Dedicated Development Team',
    description: 'A passionate team of developers, designers, and digital experts dedicated to delivering high-quality solutions for your business.',
    color: '#2563EB',
  },
  {
    icon: Layers,
    title: 'Transparent Communication',
    description: 'Stay informed throughout the project with regular updates, clear timelines, and open collaboration.',
    color: '#06B6D4',
  },
  {
    icon: GitBranch,
    title: 'Agile Process',
    description: 'We follow an agile development approach to ensure flexibility, faster delivery, and continuous improvements.',
    color: '#9B8AFB',
  },
  {
    icon: TrendingUp,
    title: 'Business-Oriented Solutions',
    description: 'We build websites, software, and digital strategies focused on increasing efficiency, generating leads, and growing your business.',
    color: '#F59E0B',
  },
  {
    icon: Award,
    title: 'Affordable Pricing',
    description: 'Get premium-quality digital solutions at competitive prices with complete pricing transparency.',
    color: '#10B981',
  },
  {
    icon: Shield,
    title: 'Post Launch Support',
    description: 'Our support continues after deployment with maintenance, updates, bug fixes, and technical assistance whenever you need it.',
    color: '#F43F5E',
  },
];

const processSteps = [
  { title: 'Discovery', description: 'Understanding your goals, users, and constraints.', icon: Search },
  { title: 'Planning', description: 'Scoping the roadmap, architecture, and milestones.', icon: Target },
  { title: 'Design', description: 'Crafting interfaces that are clear and on-brand.', icon: PenTool },
  { title: 'Development', description: 'Building in agile sprints with continuous review.', icon: Code2 },
  { title: 'Testing', description: 'Automated and manual QA across every release.', icon: TestTube2 },
  { title: 'Deployment', description: 'Shipping, monitoring, and supporting in production.', icon: UploadCloud },
];

// Per-circle floating config — distinct amplitude, duration, and delay
// so the six process icons never move in sync with one another.
const floatConfig = [
  { y: 14, duration: 1.4, delay: 0.0 }, // Discovery
  { y: 10, duration: 1.6, delay: 0.2 }, // Planning
  { y: 16, duration: 1.3, delay: 0.4 }, // Design
  { y: 12, duration: 1.8, delay: 0.6 }, // Development
  { y: 15, duration: 1.5, delay: 0.8 }, // Testing
  { y: 11, duration: 1.7, delay: 1.0 }, // Deployment
];

const industries = [
  { name: 'Healthcare', icon: Heart, color: '#F43F5E' },
  { name: 'Education', icon: Award, color: '#F59E0B' },
  { name: 'Manufacturing', icon: Cpu, color: '#0EA5E9' },
  { name: 'Retail', icon: Briefcase, color: '#EC4899' },
  { name: 'Finance', icon: LineChart, color: '#10B981' },
  { name: 'Real Estate', icon: Building2, color: '#8B5CF6' },
  { name: 'Logistics', icon: Layers, color: '#06B6D4' },
  { name: 'Startups', icon: Rocket, color: '#2563EB' },
];

// Digital marketing — shown as an asymmetric "bento" grid instead of a
// plain repeated card row, so it reads as its own distinct offering
// rather than a seventh identical service tile.
const digitalMarketing = [
  {
    title: 'SEO Optimization',
    tag: 'On-Page • Technical • Local SEO',
    description: 'Rank higher on Google with technical fixes, on-page optimization, and content strategies built for compounding organic growth.',
    icon: Search,
    color: '#2563EB',
    span: 'lg:row-span-2', // tall left tile
  },
  {
    title: 'Google Ads (PPC)',
    tag: 'Search • Display • Shopping',
    description: 'High-intent campaigns engineered to lower your cost-per-lead and maximize return on ad spend.',
    icon: Target,
    color: '#F59E0B',
    span: '',
  },
  {
    title: 'Branding & Identity',
    tag: 'Logo • Guidelines • Collateral',
    description: 'Logo, voice, and visual identity systems that make your business instantly recognizable.',
    icon: Palette,
    color: '#9B8AFB',
    span: '',
  },
  {
    title: 'Facebook Ads',
    tag: 'Awareness • Retargeting',
    description: 'Precision-targeted campaigns that turn cold audiences into qualified leads.',
    icon: Facebook,
    color: '#0EA5E9',
    span: '',
  },
  {
    title: 'Instagram Marketing',
    tag: 'Reels • Stories • Influencers',
    description: 'Content that turns followers into a loyal, buying customer base.',
    icon: Instagram,
    color: '#EC4899',
    span: '',
  },
];

/* --------------------------------- Page --------------------------------- */

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-0 pb-16 sm:pt-0 sm:pb-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Eyebrow icon={Sparkles} label="Enterprise Software Development" />

              <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-[#0F172A]">
                  Build Future-Ready <br />
                  Software for{" "}
                </span>

                <span className="text-[#2F6EFF]">
                  Modern <br />
                  Businesses
                </span>
              </h1>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-[#5B5580]">
                Skylant Technologies designs and builds web platforms, mobile apps, AI systems, ERP software,
                cloud infrastructure, and digital marketing that help ambitious businesses move faster.
              </p>

              <div className="mb-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2F6EFF] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#2F6EFF]"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2563EB] bg-white/70 px-6 py-3 font-medium text-[#2C2A4A] backdrop-blur-sm transition-all duration-300 hover:border-[#1D4ED8] hover:bg-white"
                >
                  Explore Services
                </Link>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {featureChips.map((chip, i) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E4DBFF] bg-white/60 px-3.5 py-1.5 text-sm text-[#2C2A4A] backdrop-blur-sm"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#6D5BD0]" />
                    {chip}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Right — signature illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative mx-auto w-full max-w-2xl"
            >
              <HeroIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#EDE9FE]/40 py-20 backdrop-blur-sm sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto mb-14 max-w-2xl text-center">
            <Eyebrow icon={Briefcase} label="Our Services" />
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              <span className="text-[#0F172A]">Comprehensive IT solutions </span>
              <span className="text-[#2F6EFF]">under one roof</span>
            </h2>
            <p className="text-lg text-[#5B5580]">
              From strategy to deployment, we cover every layer your product needs.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s: any, i: number) => {
              const Icon = iconMap[s.icon] || Code2;
              return (
                <motion.div
                  key={s.id}
                  variants={servicesReveal}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  custom={i}
                  viewport={{ once: true, amount: 0.25 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Link
                    to={`/services/${s.slug}`}
                    className="group relative block h-full overflow-hidden rounded-[2.5rem] border p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                    style={{
                      borderColor: `${s.color}40`,
                      background: `linear-gradient(160deg, ${s.color}12 0%, rgba(255,255,255,0.55) 55%)`,
                      boxShadow: `0 10px 30px ${s.color}14`,
                    }}
                  >
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                      style={{ background: s.color }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F3F0FF]/70 via-[#FAF9F7]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div
                      className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-[1.5rem] shadow-sm transition-all duration-300 group-hover:scale-105"
                      style={{ background: `${s.color}18`, color: s.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="relative z-10 mb-2 text-lg font-semibold text-[#2C2A4A] transition-colors duration-300 group-hover:text-[#6D5BD0]">
                      {s.shortTitle || s.title}
                    </h3>
                    <p className="relative z-10 mb-4 text-sm leading-relaxed text-[#5B5580]">{s.description}</p>
                    <span className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300" style={{ color: s.color }}>
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIGITAL MARKETING — asymmetric bento layout, deliberately not a
          repeat of the plain 4-up card grid used for Services, so the
          new offering reads as its own distinct moment on the page. */}
      <section className="bg-[#EDE9FE]/40 py-20 backdrop-blur-sm sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto mb-14 max-w-2xl text-center">
            <Eyebrow icon={Megaphone} label="Digital Marketing" color="#EC4899" />
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              <span className="text-[#0F172A]">Marketing that gets you found, followed, </span>
              <span className="text-[#EC4899]">and chosen</span>
            </h2>
            <p className="text-lg text-[#5B5580]">
              SEO, paid ads, social media, and branding — run as one connected growth engine, not separate services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[190px] lg:grid-flow-dense">
            {digitalMarketing.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${item.span}`}
                style={{
                  borderColor: `${item.color}40`,
                  background: `linear-gradient(150deg, ${item.color}16 0%, rgba(255,255,255,0.7) 65%)`,
                  boxShadow: `0 10px 30px ${item.color}14`,
                }}
              >
                <div
                  className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-35"
                  style={{ background: item.color }}
                />
                <div className="relative z-10">
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl shadow-sm"
                    style={{ background: `${item.color}1f`, color: item.color }}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-semibold text-[#2C2A4A]">{item.title}</h3>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: item.color }}>
                    {item.tag}
                  </p>
                  <p className="text-sm leading-relaxed text-[#5B5580]">{item.description}</p>
                </div>
                <Link
                  to="/contact"
                  className="relative z-10 mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5"
                  style={{ color: item.color }}
                >
                  Get Started <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIGITAL MARKETING SHOWCASE — premium hanging-cards content preview */}
      <DigitalMarketingShowcase />

      {/* WHY SKYLANT — each card now carries its own accent color instead
          of repeating the same violet, tied to a soft tinted wash so the
          card itself (not just the icon) feels colorful against the
          lavender section background. */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto mb-14 max-w-2xl text-center">
            <Eyebrow icon={Award} label="Why Choose Skylant" color="#9B8AFB" />
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-[#0F172A]">Engineering that earns </span>
              <span className="text-[#9B8AFB]">your trust</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whySkylant.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all hover:-translate-y-1"
                style={{
                  borderColor: `${item.color}40`,
                  background: `linear-gradient(160deg, ${item.color}12 0%, rgba(255,255,255,0.55) 55%)`,
                }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                  style={{ background: item.color }}
                />
                <div
                  className="relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-xl shadow-sm"
                  style={{ background: `${item.color}18`, color: item.color }}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="relative z-10 mb-2 text-lg font-semibold text-[#2C2A4A]">{item.title}</h3>
                <p className="relative z-10 text-base leading-relaxed text-[#5B5580]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPMENT PROCESS */}
      <section className="bg-[#EDE9FE]/40 py-20 backdrop-blur-sm sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto mb-16 max-w-2xl text-center">
            <Eyebrow icon={GitBranch} label="Our Process" />
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-[#0F172A]">A proven path from idea </span>
              <span className="text-[#6D5BD0]">to impact</span>
            </h2>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute left-0 right-0 top-[38px] hidden h-px origin-left bg-[#E4DBFF] lg:block"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Floating wrapper — handles the continuous idle motion */}
                  <motion.div
                    className="relative z-10 mb-4"
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { y: [0, -floatConfig[i].y, 0] }
                    }
                    transition={{
                      duration: floatConfig[i].duration,
                      delay: floatConfig[i].delay,
                      repeat: prefersReducedMotion ? 0 : Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{ willChange: 'transform' }}
                  >
                    {/* Circle — handles hover lift/scale/glow independently */}
                    <motion.div
                      className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-[#E4DBFF] bg-white text-[#6D5BD0] shadow-sm"
                      whileHover={{
                        y: -8,
                        scale: 1.08,
                        borderColor: '#93C5FD',
                        boxShadow:
                          '0 0 0 6px rgba(59,130,246,0.14), 0 16px 32px rgba(59,130,246,0.28)',
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ willChange: 'transform, box-shadow, border-color' }}
                    >
                      <step.icon className="h-7 w-7" />
                    </motion.div>
                  </motion.div>

                  <h3 className="mb-1 text-base font-semibold text-[#2C2A4A]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[#8783A6]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES — colorized per industry instead of one repeated violet icon */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow icon={Layers} label="Industries We Serve" color="#9B8AFB" />
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-[#0F172A]">Deep expertise, </span>
              <span className="text-[#9B8AFB]">wherever you build</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                {...fadeUp}
                transition={{ duration: 0.35, delay: (i % 8) * 0.05 }}
                className="flex items-center gap-3 rounded-2xl border bg-white/60 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                style={{ borderColor: `${ind.color}35` }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${ind.color}18`, color: ind.color }}
                >
                  <ind.icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-[#2C2A4A]">{ind.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES — click-to-open folder reveal */}
      <section className="bg-[#EDE9FE]/40 py-20 backdrop-blur-sm sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto mb-14 max-w-2xl text-center">
            <Eyebrow icon={Target} label="Case Studies" />
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-[#0F172A]">Real results for </span>
              <span className="text-[#6D5BD0]">real businesses</span>
            </h2>
          </motion.div>

          <CaseStudiesFolderReveal items={caseStudies as any[]} />
        </div>
      </section>

      

      {/* FAQ */}
      <section className="bg-[#EDE9FE]/40 py-20 backdrop-blur-sm sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-10 text-center">
            <Eyebrow icon={Lightbulb} label="FAQ" />
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-[#0F172A]">Frequently asked </span>
              <span className="text-[#6D5BD0]">questions</span>
            </h2>
          </motion.div>

          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <h2 className="mb-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
              <span className="text-[#0F172A]">Ready to build your next </span>
              <span className="text-[#2F6EFF]">digital product?</span>
            </h2>
            <p className="mb-9 text-lg text-[#5B5580]">
              Tell us about your goals — we'll help you scope, plan, and ship it.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2F6EFF] px-7 py-3.5 font-medium text-white shadow-sm transition-colors hover:bg-[#2F6EFF]"
              >
                Start Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-[#2563EB] bg-white/70 px-7 py-3.5 font-medium text-[#2C2A4A] backdrop-blur-sm transition-colors hover:bg-white"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMPANY STATISTICS — moved to just before the footer */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {statistics.map((stat, i) => (
              <motion.div
                key={stat.id}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-[2rem] border border-[#D8C8FE] bg-gradient-to-br from-[#FFFFFF] via-[#F8F7FF] to-[#F3F0FF] p-6 text-center shadow-lg shadow-[#9B8AFB]/10 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(109,91,208,0.12)]"
              >
                <div className="mb-1 text-3xl font-bold text-[#6D5BD0] lg:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-[#5B5580]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* --------------------------- Hero illustration --------------------------- */

function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 520" className="h-auto w-full" role="img" aria-label="Skylant product ecosystem illustration">
      <circle cx="240" cy="240" r="230" fill="#F3F0FF" />

      <motion.circle
        cx="240"
        cy="240"
        r="150"
        fill="none"
        stroke="#D8B4FE"
        strokeWidth="3.0"
        strokeDasharray="4 9"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '240px 240px' }}
      />

      <g stroke="#caa0f6" strokeWidth="2.5" strokeDasharray="3 5">
        <line x1="240" y1="240" x2="240" y2="90" />
        <line x1="240" y1="240" x2="390" y2="165" />
        <line x1="240" y1="240" x2="390" y2="350" />
        <line x1="240" y1="240" x2="240" y2="425" />
        <line x1="240" y1="240" x2="90" y2="350" />
        <line x1="240" y1="240" x2="90" y2="165" />
      </g>

      <g transform="translate(240 90)">
        <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
          <circle r="38" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
          <path d="M-10 6 a10 10 0 1 1 8 -16 a8 8 0 1 1 10 12" fill="none" stroke="#2e2ec2" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="-6" cy="-8" r="2" fill="#6D5BD0" />
          <circle cx="6" cy="4" r="2" fill="#9B8AFB" />
        </motion.g>
        <text x="0" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4B3F91">
          AI Solutions
        </text>
      </g>

                    <g transform="translate(390 165)">
        <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
          <circle r="38" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
          {/* megaphone body: narrow mouthpiece (left) flaring into wide bell (right) */}
          <path d="M-15 -4 L7 -12 L7 12 L-15 4 Z" fill="#4b2eee" />
          {/* pistol grip handle, hanging below the mouthpiece */}
          <path d="M-13 3 L-9 3 L-8 12 L-14 12 Z" fill="#4b2eee" />
          {/* trigger button accent */}
          <circle cx="-11" cy="-1" r="1.6" fill="#FFFFFF" opacity="0.85" />
          {/* sound waves emanating from the bell */}
          <path d="M11 -6 q7 6 0 12" fill="none" stroke="#4b2eee" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M16 -11 q11 11 0 22" fill="none" stroke="#9B8AFB" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
        <text x="0" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4B3F91">
          Digital Marketing
        </text>
      </g>

      <g transform="translate(390 350)">
        <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}>
          <circle r="38" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
          <rect x="-14" y="-12" width="28" height="6" rx="2" fill="#4b2eee" />
          <rect x="-14" y="-2" width="28" height="6" rx="2" fill="#4b2eee"  />
          <rect x="-14" y="8" width="28" height="6" rx="2" fill="#4b2eee"  />
        </motion.g>
        <text x="0" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4B3F91">
          ERP Development
        </text>
      </g>

      <g transform="translate(240 425)">
        <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}>
          <circle r="38" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
          <polyline points="-14,10 -4,-2 6,4 16,-14" fill="none" stroke="#4b2eee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 -14 h8 v8" fill="none" stroke="#4b2eee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <text x="0" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4B3F91">
          Business Growth
        </text>
      </g>

      <g transform="translate(90 350)">
        <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}>
          <circle r="38" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
          <rect x="-11" y="-16" width="22" height="32" rx="4" fill="none" stroke="#4b2eee" strokeWidth="2.5" />
          <line x1="-4" y1="10" x2="4" y2="10" stroke="#4b2eee" strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>
        <text x="0" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4B3F91">
          Mobile Development
        </text>
      </g>

      <g transform="translate(90 165)">
        <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}>
          <circle r="38" fill="#FFFFFF" stroke="#E4DBFF" strokeWidth="1.5" />
          <circle r="14" fill="none" stroke="#4b2eee" strokeWidth="2.5" />
          <line x1="-14" y1="0" x2="14" y2="0" stroke="#6D5BD0" strokeWidth="2" />
          <path d="M-7 -12 a20 24 0 0 0 0 24" fill="none" stroke="#6D5BD0" strokeWidth="2" />
          <path d="M7 -12 a20 24 0 0 1 0 24" fill="none" stroke="#6D5BD0" strokeWidth="2" />
        </motion.g>
        <text x="0" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4B3F91">
          Web Development
        </text>
      </g>
    </svg>
  );
}

/* --------------------------- Case Studies: Folder Reveal --------------------------- */
/*
 * Sequence:
 *   1. Folder is closed — click ANYWHERE on it (only once).
 *   2. Flap hinges open (rotateX), folder lifts + a soft blue-purple
 *      glow fades in behind it.
 *   3. Card 1 shoots out of the folder and settles into grid slot 1.
 *   4. After a 0.5–0.8s random gap, Card 2 comes out → settles in slot 2.
 *   5. After another 0.5–0.8s gap, Card 3 comes out → settles in slot 3.
 *   6. Folder stays open behind the grid; all cards stay fully visible
 *      and hover effects keep working.
 */

const FOLDER_OPEN_DURATION = 0.6;
const FOLDER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CARD_GAP_MIN = 500; // ms
const CARD_GAP_MAX = 800; // ms
const FIRST_CARD_EXTRA_WAIT = 250; // ms, after the flap finishes opening

function FolderGraphic({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <div
      onClick={!isOpen ? onClick : undefined}
      role="button"
      aria-label="Open case studies folder"
      className={`relative mx-auto mb-[-38px] flex justify-center sm:mb-[-46px] ${
        !isOpen ? 'cursor-pointer' : ''
      }`}
      style={{ perspective: '1400px' }}
    >
      {/* soft blue-purple glow, fades in once opened */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(109,91,208,0.45), rgba(59,130,246,0.25) 55%, transparent 75%)',
          filter: 'blur(24px)',
        }}
      />

      {/* "Tap here" hint, sits above the folder and disappears once opened */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              opacity: { duration: 0.3 },
              y: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="pointer-events-none absolute -top-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#C4B5FD] bg-white px-5 py-2.5 text-sm sm:text-base font-bold text-[#6D5BD0] shadow-lg"
          >
            Tap here
            <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-[#C4B5FD] bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-[130px] w-[210px] sm:h-[150px] sm:w-[250px]"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ y: isOpen ? -14 : 0, scale: isOpen ? 1.04 : 1 }}
        transition={{ duration: FOLDER_OPEN_DURATION, ease: FOLDER_EASE }}
      >
        <div
          className="absolute inset-x-0 bottom-0 top-[14px] rounded-2xl border border-[#D8CBFF]"
          style={{ background: 'linear-gradient(155deg, #EDE7FF 0%, #D8CBFF 100%)' }}
        >
          <div
            className="absolute -top-[13px] left-6 h-[20px] w-[84px] rounded-t-lg border border-b-0 border-[#D8CBFF]"
            style={{ background: 'linear-gradient(155deg, #EDE7FF 0%, #D8CBFF 100%)' }}
          />
        </div>

        <div className="absolute inset-x-3 bottom-2 top-[24px] rounded-xl bg-white/85" />
        <div className="absolute inset-x-5 bottom-3 top-[32px] rounded-xl bg-white/65" />
        <div className="absolute inset-x-7 bottom-4 top-[40px] rounded-xl bg-white/45" />

        <motion.div
          className="absolute inset-x-0 bottom-0 top-[14px] rounded-2xl border border-[#C4B5FD]"
          style={{
            background: 'linear-gradient(160deg, #B9A6FF 0%, #7C63E8 100%)',
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            boxShadow: isOpen
              ? '0 24px 55px rgba(59,130,246,0.35)'
              : '0 14px 34px rgba(109,91,208,0.28)',
          }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? -50 : 0 }}
          transition={{ duration: FOLDER_OPEN_DURATION, ease: FOLDER_EASE }}
        >
          <div
            className="absolute -top-[13px] left-6 h-[20px] w-[84px] rounded-t-lg"
            style={{ background: 'linear-gradient(160deg, #B9A6FF 0%, #7C63E8 100%)' }}
          />
          <Briefcase className="absolute bottom-4 right-5 h-5 w-5 text-white/70 sm:h-6 sm:w-6" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function CaseStudyCard({ cs, variant }: { cs: any; variant: 'staged' | 'settled' }) {
  return (
    <motion.div
      className={
        variant === 'staged'
          ? 'group relative w-[220px] overflow-hidden rounded-[24px] border shadow-[0_20px_45px_rgba(79,70,229,0.28)] sm:w-[260px]'
          : 'group relative h-full overflow-hidden rounded-[24px] border shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(79,70,229,0.18)]'
      }
      style={{
        willChange: 'transform, opacity',
        borderColor: `${cs.color}40`,
        background: `linear-gradient(160deg, ${cs.color}14 0%, rgba(255,255,255,0.9) 55%)`,
      }}
      whileHover={
        variant === 'settled'
          ? { y: -10, scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }
          : undefined
      }
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: cs.color }}
      />
      <a
        href={cs.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 flex h-full flex-col"
      >
        {cs.image && (
          <div className="relative h-44 w-full overflow-hidden">
            <img
              src={cs.image}
              alt={cs.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(180deg, transparent 45%, ${cs.color}26 100%)` }}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: cs.color }}>
          {cs.tag}
        </div>
        <h3 className="mb-3 text-lg font-semibold leading-snug text-[#2C2A4A] line-clamp-2">{cs.title}</h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-[#5B5580] line-clamp-5">{cs.description}</p>
        <div className="mb-4 flex items-center gap-2 text-xs text-[#8783A6]">
          <span className="font-medium text-[#5B5580]">{cs.author}</span>
          <span>·</span>
          <span>{cs.readTime}</span>
          <span>·</span>
          <span>{cs.date}</span>
        </div>
        <span
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5"
          style={{ color: cs.color }}
        >
          Learn more <ArrowRight className="h-3.5 w-3.5" />
        </span>
        </div>
      </a>
    </motion.div>
  );
}

function CaseStudiesFolderReveal({ items }: { items: any[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  const handleOpen = () => {
    if (opened) return; // guarantees the folder can only ever be "clicked" once
    setOpened(true);
  };

  useEffect(() => {
    if (!opened || revealedCount >= items.length) return;

    if (prefersReducedMotion) {
      setRevealedCount(items.length);
      return;
    }

    const delay =
      revealedCount === 0
        ? FOLDER_OPEN_DURATION * 1000 + FIRST_CARD_EXTRA_WAIT
        : CARD_GAP_MIN + Math.random() * (CARD_GAP_MAX - CARD_GAP_MIN);

    const timer = setTimeout(() => setRevealedCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [opened, revealedCount, items.length, prefersReducedMotion]);

  // x-offset so each card visually "flies" from the folder toward its own column
  const colOffsetX = [-230, 0, 230];

  // Reduced-motion / no-JS-friendly fallback — click still opens the folder,
  // but cards appear immediately with no stagger.
  return (
    <div className="relative">
      <FolderGraphic isOpen={opened} onClick={handleOpen} />

      <div className="relative mt-16 grid gap-6 lg:grid-cols-3 sm:mt-10">
        <AnimatePresence>
          {items.map((cs, i) => {
            if (i >= revealedCount) return null;
            return (
              <motion.div
                key={cs.id}
                layout
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.6,
                        y: -170,
                        x: colOffsetX[i % 3],
                        rotateX: -85,
                        filter: 'blur(10px)',
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: 0,
                  rotateX: 0,
                  filter: 'blur(0px)',
                }}
                exit={{ opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 22,
                  mass: 0.9,
                }}
                style={{ transformPerspective: 1000, willChange: 'transform, opacity, filter' }}
              >
                <CaseStudyCard cs={cs} variant="settled" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}