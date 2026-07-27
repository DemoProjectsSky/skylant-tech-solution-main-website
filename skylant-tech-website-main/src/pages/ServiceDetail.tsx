import { motion } from 'framer-motion';
import { useParams, Navigate } from 'react-router-dom';
import { CheckCircle2, Code2, Globe, Smartphone, Brain, Cloud, Zap, Palette, TrendingUp, Target, GitBranch, Cpu, Sparkles } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import services from '../data/services.json';
import caseStudies from '../data/caseStudies.json';
import faqs from '../data/faqs.json';
import FAQAccordion from '../components/FAQAccordion';

const iconMap: Record<string, any> = { Code2, Globe, Smartphone, Brain, Cloud, Zap, Palette, TrendingUp };

const processSteps = [
  { number: '01', title: 'Discovery', description: 'We analyze your requirements and define a clear technical roadmap.', icon: Target },
  { number: '02', title: 'Design', description: 'We design architecture, UX, and system flows tailored to your needs.', icon: Palette },
  { number: '03', title: 'Development', description: 'Agile sprints with continuous integration and regular client demos.', icon: Code2 },
  { number: '04', title: 'Delivery', description: 'We deploy, monitor, and provide ongoing support and optimization.', icon: Cloud },
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = iconMap[service.icon] || Code2;
  const relatedCases = caseStudies.slice(0, 2);

  return (
    <>
      <PageBanner
        title={service.title}
        description={service.longDescription}
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: service.shortTitle }]}
        image={service.image}
        accentColor={service.color}
        floatingCards={[
          { icon: <Icon className="w-4 h-4" />, title: service.shortTitle },
          { icon: <Sparkles className="w-4 h-4" />, title: 'Enterprise Ready' },
          { icon: <CheckCircle2 className="w-4 h-4" />, title: '99.9% Uptime' },
          { icon: <Cpu className="w-4 h-4" />, title: 'Modern Stack' },
        ]}
        stats={[{ value: '250+', label: 'Projects' }, { value: '100+', label: 'Clients' }, { value: '8+', label: 'Years' }]}
        primaryCta={{ label: 'Get Free Quote', path: '/contact' }}
        secondaryCta={{ label: 'Talk to an Expert', path: '/contact' }}
      />

      {/* OVERVIEW + FEATURES */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: service.color }} />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><Target className="w-4 h-4" /> Overview</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 text-balance">{service.title} built for impact</h2>
            <p className="text-slate-400 leading-relaxed mb-6">{service.longDescription}</p>
            <p className="text-slate-400 leading-relaxed">Our team brings deep domain expertise and modern engineering practices to every project, ensuring your solution is not just functional but exceptional — scalable, secure, and built to evolve with your business.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-white font-bold text-xl mb-5">Key Features</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="glass-card rounded-xl p-4 flex items-start gap-3 hover:border-sky-400/30 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Why choose our {service.shortTitle.toLowerCase()} services?</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Scalable Architecture', description: 'Built to handle growth from day one — no rewrites needed as you scale.' },
              { title: 'Security First', description: 'OWASP-compliant, audited, and hardened against modern threats.' },
              { title: 'Performance Optimized', description: 'Fast, efficient, and optimized for the best user experience.' },
              { title: 'Future-Ready', description: 'Modern tech stack designed to evolve with industry standards.' },
              { title: 'Transparent Process', description: 'Regular demos, clear communication, and full visibility into progress.' },
              { title: 'Long-Term Support', description: 'Ongoing maintenance, updates, and improvements post-launch.' },
            ].map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -6 }} className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-4"><CheckCircle2 className="w-5 h-5" /></div>
                <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{b.description}</p>
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
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><Cpu className="w-4 h-4" /> Technologies</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">Tools we use</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {service.technologies.map((t, i) => (
              <motion.div key={t} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="glass-card rounded-xl px-5 py-3 text-white font-semibold hover:border-sky-400/40 transition-all">{t}</motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><GitBranch className="w-4 h-4" /> Our Process</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">From idea to launch</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-400/30 flex items-center justify-center text-sky-400"><step.icon className="w-6 h-6" /></div>
                  <span className="text-4xl font-bold text-white/10">{step.number}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><Target className="w-4 h-4" /> Case Studies</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">Related success stories</h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-6">
            {relatedCases.map((cs, i) => (
              <motion.div key={cs.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -6 }} className="glass-card rounded-2xl overflow-hidden hover:border-sky-400/30 transition-all group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={cs.image} alt={cs.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">{cs.service}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{cs.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{cs.description}</p>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                    {cs.metrics.slice(0, 2).map((m, j) => (<div key={j}><div className="text-xl font-bold gradient-text-light">{m.value}</div><div className="text-xs text-slate-500">{m.label}</div></div>))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">Frequently asked questions</h2>
          </motion.div>
          <FAQAccordion items={faqs.slice(0, 5)} />
        </div>
      </section>

      <CTASection title={`Ready to start your ${service.shortTitle.toLowerCase()} project?`} description="Let's discuss your requirements and build a solution that drives real business results. Book a free consultation today." primaryLabel="Get Free Quote" secondaryLabel="View All Services" secondaryPath="/services" />
    </>
  );
}
