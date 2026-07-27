import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, Code2, Globe, Smartphone, Brain, Cloud, Zap, Palette, TrendingUp,
  Shield, Rocket, Users, Award, Star, Briefcase, CheckCircle2, Quote,
  Cpu, Layers, GitBranch, LineChart, Target, Lightbulb, Heart, Clock,
} from 'lucide-react';
import services from '../data/services.json';
import statistics from '../data/statistics.json';
import testimonials from '../data/testimonials.json';
import technologies from '../data/technologies.json';
import caseStudies from '../data/caseStudies.json';
import faqs from '../data/faqs.json';
import partners from '../data/partners.json';
import CTASection, { Counter } from '../components/CTASection';
import FAQAccordion from '../components/FAQAccordion';

const iconMap: Record<string, any> = {
  Code2, Globe, Smartphone, Brain, Cloud, Zap, Palette, TrendingUp,
  Briefcase, Users, Award, Star, Shield, Rocket, Cpu, Layers,
  GitBranch, LineChart, Target, Lightbulb, Heart, Clock,
};

const heroFloatingCards = [
  { icon: <Brain className="w-4 h-4" />, title: 'AI Solutions', subtitle: 'Intelligent Automation' },
  { icon: <Code2 className="w-4 h-4" />, title: 'Software Development', subtitle: 'Custom Built' },
  { icon: <Smartphone className="w-4 h-4" />, title: 'Mobile Apps', subtitle: 'iOS & Android' },
  { icon: <Cloud className="w-4 h-4" />, title: 'Cloud Infrastructure', subtitle: '99.9% Uptime' },
  { icon: <Shield className="w-4 h-4" />, title: 'Enterprise Ready', subtitle: 'ISO Certified' },
  { icon: <LineChart className="w-4 h-4" />, title: 'Analytics Dashboard', subtitle: 'Real-time' },
];

const whySkylant = [
  { icon: Target, title: 'Result-Driven Approach', description: 'Every line of code we write is tied to measurable business outcomes. We focus on ROI, not just deliverables.' },
  { icon: Cpu, title: 'Senior Engineering Team', description: 'Our team consists of senior engineers with 8+ years average experience. No juniors learning on your project.' },
  { icon: Shield, title: 'Enterprise-Grade Security', description: 'We follow OWASP guidelines, conduct security audits, and implement best practices at every layer.' },
  { icon: Rocket, title: 'On-Time Delivery', description: 'Agile methodology with bi-weekly sprints ensures consistent, transparent, and predictable delivery.' },
  { icon: Heart, title: 'Long-Term Partnership', description: 'We are not just a vendor — we become your technology partner invested in your long-term success.' },
  { icon: Lightbulb, title: 'Innovation First', description: 'We stay ahead of the curve with AI, cloud-native, and modern engineering practices built into every project.' },
];

const processSteps = [
  { number: '01', title: 'Discovery & Strategy', description: 'We dive deep into your business, understand your goals, and craft a comprehensive technical strategy.', icon: Target },
  { number: '02', title: 'Design & Architecture', description: 'Our architects design scalable, secure, and future-ready system architecture and user experiences.', icon: Palette },
  { number: '03', title: 'Development & Testing', description: 'Agile sprints with continuous integration, automated testing, and regular client demos.', icon: Code2 },
  { number: '04', title: 'Deployment & Support', description: 'We deploy, monitor, and support your product with 24/7 availability and continuous improvement.', icon: Rocket },
];

const industries = [
  { name: 'Healthcare', icon: Heart, color: '#EF4444' },
  { name: 'FinTech', icon: LineChart, color: '#10B981' },
  { name: 'E-Commerce', icon: Briefcase, color: '#F59E0B' },
  { name: 'Logistics', icon: Layers, color: '#8B5CF6' },
  { name: 'Education', icon: Award, color: '#2563EB' },
  { name: 'Real Estate', icon: Globe, color: '#06B6D4' },
  { name: 'Manufacturing', icon: Cpu, color: '#EC4899' },
  { name: 'SaaS & Startups', icon: Rocket, color: '#0EA5E9' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Enterprise Software Development Company
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 text-balance"
              >
                Smart Software for{' '}
                <span className="gradient-text-light">Modern Businesses</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl"
              >
                We build scalable Software, Web Applications, Mobile Apps, AI Solutions, Cloud Infrastructure, and Digital Marketing that help businesses grow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <Link to="/contact" className="btn-primary">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Book Consultation
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-8"
              >
                {[
                  { value: 250, suffix: '+', label: 'Projects' },
                  { value: 100, suffix: '+', label: 'Clients' },
                  { value: 8, suffix: '+', label: 'Years Experience' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl lg:text-3xl font-bold gradient-text-light">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-700 border-2 border-slate-950" />
                  ))}
                </div>
                <div className="text-sm text-slate-400">
                  <div className="flex items-center gap-1 text-sky-400">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  Trusted by 100+ businesses worldwide
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Image with floating cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/4.4] rounded-3xl">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/30 to-sky-500/10 blur-2xl" />
                <div className="relative h-full rounded-3xl overflow-hidden glass-card">
                  <img
                    src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=900&h=1000&dpr=2"
                    alt="Professional software development team"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>

                {/* Floating cards */}
                {heroFloatingCards.map((card, i) => {
                  const positions = [
                    'top-6 -left-10',
                    'top-1/4 -right-12',
                    'top-1/2 -left-12',
                    'bottom-1/3 -right-10',
                    'bottom-20 -left-8',
                    'bottom-4 -right-6',
                  ];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                      className={`absolute ${positions[i]} glass-card-strong rounded-2xl p-3.5 shadow-xl shadow-black/30 ${i % 2 === 0 ? 'animate-float' : 'animate-float-delay'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
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
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-sky-400"
            />
          </div>
        </motion.div>
      </section>

      {/* TRUSTED CLIENTS / PARTNERS */}
      <section className="relative py-12 border-y border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-widest font-medium">
            Trusted by leading companies & technology partners
          </p>
          <div className="relative overflow-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {[...partners, ...partners].map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold text-sm">
                    {p.name[0]}
                  </div>
                  <span className="text-xl font-bold tracking-tight">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY STATISTICS */}
      <section className="relative section-padding">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {statistics.map((stat, i) => {
              const Icon = iconMap[stat.icon] || Award;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-5 text-center hover:border-sky-400/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold gradient-text-light mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs lg:text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY SKYLANT */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5">
              <Award className="w-4 h-4" />
              Why Choose Skylant
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
              Engineering excellence that drives <span className="gradient-text-light">business results</span>
            </h2>
            <p className="text-lg text-slate-400">
              We combine deep technical expertise with business understanding to deliver software that creates real competitive advantage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whySkylant.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2.5">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5">
                <Briefcase className="w-4 h-4" />
                Our Core Services
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
                Comprehensive IT solutions under one roof
              </h2>
            </div>
            <Link to="/services" className="btn-secondary shrink-0">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || Code2;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    to={`/services/${s.slug}`}
                    className="block glass-card rounded-2xl p-6 h-full hover:border-sky-400/40 transition-all group relative overflow-hidden"
                  >
                    <div
                      className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"
                      style={{ background: s.color }}
                    />
                    <div
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5"
                      style={{ background: `${s.color}25`, border: `1px solid ${s.color}50` }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="relative text-white font-bold text-lg mb-2 group-hover:text-sky-400 transition-colors">
                      {s.title}
                    </h3>
                    <p className="relative text-slate-400 text-sm leading-relaxed mb-4">{s.description}</p>
                    <div className="relative flex items-center gap-1.5 text-sky-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEVELOPMENT PROCESS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/40" />
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5">
              <GitBranch className="w-4 h-4" />
              Our Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
              A proven path from idea to impact
            </h2>
            <p className="text-lg text-slate-400">
              Our four-phase development methodology ensures transparency, quality, and predictable delivery.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-6 h-full hover:border-sky-400/30 transition-all">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span className="text-4xl font-bold text-white/10">{step.number}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-sky-400/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5">
              <Cpu className="w-4 h-4" />
              Technology Stack
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Modern tools for modern solutions
            </h2>
            <p className="text-lg text-slate-400">
              We work with the industry's best technologies to build robust, scalable, and future-ready products.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="glass-card rounded-2xl p-5 flex flex-col items-center text-center hover:border-sky-400/30 transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-white font-bold text-lg transition-transform group-hover:scale-110"
                  style={{ background: `${tech.color}25`, border: `1px solid ${tech.color}50` }}
                >
                  {tech.name[0]}
                </div>
                <div className="text-white text-sm font-semibold">{tech.name}</div>
                <div className="text-slate-500 text-xs mt-0.5">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5">
              <Layers className="w-4 h-4" />
              Industries We Serve
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Deep expertise across diverse industries
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-sky-400/30 transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: `${ind.color}25`, border: `1px solid ${ind.color}50` }}
                >
                  <ind.icon className="w-6 h-6" />
                </div>
                <span className="text-white font-semibold">{ind.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI SOLUTIONS FEATURE */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-glow" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-cyan-400 text-sm font-medium mb-5">
                <Brain className="w-4 h-4" />
                AI Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
                Transform your business with <span className="gradient-text-light">artificial intelligence</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                From machine learning models to generative AI integration, we help you leverage AI to automate processes, extract insights, and create competitive advantages.
              </p>
              <ul className="space-y-3 mb-8">
                {['Custom ML models & NLP pipelines', 'AI chatbots & virtual assistants', 'Predictive analytics & forecasting', 'Generative AI & LLM integration'].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <Link to="/services/ai-solutions" className="btn-primary">
                Explore AI Solutions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden glass-card">
                <img
                  src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2"
                  alt="AI Solutions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass-card-strong rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">AI Automation</div>
                    <div className="text-slate-400 text-xs">80% faster processing</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-slate-950" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5">
              <Target className="w-4 h-4" />
              Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Real results for real businesses
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl overflow-hidden hover:border-sky-400/30 transition-all group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={cs.image} alt={cs.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full glass-card-strong text-xs font-medium text-white">{cs.industry}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">{cs.service}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{cs.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{cs.description}</p>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                    {cs.metrics.slice(0, 2).map((m, j) => (
                      <div key={j}>
                        <div className="text-xl font-bold gradient-text-light">{m.value}</div>
                        <div className="text-xs text-slate-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE TRAINING + INTERNSHIP */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5">
              <Award className="w-4 h-4" />
              Additional Services
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Training & Internship Programs
            </h2>
            <p className="text-lg text-slate-400">
              Beyond our core services, we nurture the next generation of tech talent through professional training and hands-on internships.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Corporate Training',
                description: 'Professional courses in full-stack development, AI/ML, cloud, and design. Up-skill your team with industry-leading curriculum.',
                icon: Award,
                path: '/training',
                color: '#2563EB',
                points: ['Industry-expert instructors', 'Hands-on real projects', 'Certification programs', 'Custom corporate batches'],
              },
              {
                title: 'Internship Programs',
                description: 'Gain real-world experience working on live client projects. Learn from senior engineers and build a portfolio that stands out.',
                icon: Rocket,
                path: '/internship',
                color: '#06B6D4',
                points: ['Live project experience', 'Mentorship from seniors', 'Industry-recognized certificates', 'Placement support'],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-8 hover:border-sky-400/30 transition-all group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-5"
                  style={{ background: `${item.color}25`, border: `1px solid ${item.color}50` }}
                >
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-slate-400 mb-5">{item.description}</p>
                <ul className="space-y-2 mb-6">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link to={item.path} className="inline-flex items-center gap-1.5 text-sky-400 font-medium text-sm group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5">
              <Quote className="w-4 h-4" />
              Client Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Loved by businesses worldwide
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all"
              >
                <Quote className="w-8 h-8 text-sky-400/40 mb-4" />
                <p className="text-slate-300 leading-relaxed mb-5 text-sm">{t.text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-slate-400 text-xs">{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5">
              <Lightbulb className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Frequently asked questions
            </h2>
          </motion.div>

          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
