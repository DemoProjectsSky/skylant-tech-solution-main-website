import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Globe, Smartphone, Brain, Cloud, Zap, Palette, TrendingUp, Target, GitBranch, Layers, Cpu } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import services from '../data/services.json';
import technologies from '../data/technologies.json';
import caseStudies from '../data/caseStudies.json';
import faqs from '../data/faqs.json';
import FAQAccordion from '../components/FAQAccordion';

const iconMap: Record<string, any> = { Code2, Globe, Smartphone, Brain, Cloud, Zap, Palette, TrendingUp };

const processSteps = [
  { number: '01', title: 'Discovery & Strategy', description: 'We dive deep into your business and craft a comprehensive technical strategy.', icon: Target },
  { number: '02', title: 'Design & Architecture', description: 'Our architects design scalable, secure system architecture and user experiences.', icon: Palette },
  { number: '03', title: 'Development & Testing', description: 'Agile sprints with continuous integration, automated testing, and regular demos.', icon: Code2 },
  { number: '04', title: 'Deployment & Support', description: 'We deploy, monitor, and support your product with 24/7 availability.', icon: Cloud },
];

export default function Services() {
  return (
    <>
      <PageBanner
        title="Comprehensive IT solutions for modern businesses"
        description="From custom software to AI solutions, cloud infrastructure, and digital marketing — everything you need to build, scale, and grow your digital presence."
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Services' }]}
        image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900&h=1000&dpr=2"
        floatingCards={[
          { icon: <Code2 className="w-4 h-4" />, title: 'Software Dev' },
          { icon: <Smartphone className="w-4 h-4" />, title: 'Mobile Apps' },
          { icon: <Brain className="w-4 h-4" />, title: 'AI Solutions' },
          { icon: <Cloud className="w-4 h-4" />, title: 'Cloud' },
        ]}
        stats={[{ value: '8+', label: 'Services' }, { value: '250+', label: 'Projects' }, { value: '100+', label: 'Clients' }]}
        primaryCta={{ label: 'Book Consultation', path: '/contact' }}
        secondaryCta={{ label: 'View Case Studies', path: '/services' }}
      />

      {/* SERVICE GRID */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><Layers className="w-4 h-4" /> What We Do</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Explore our full range of services</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || Code2;
              return (
                <motion.div key={s.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} whileHover={{ y: -6 }}>
                  <Link to={`/services/${s.slug}`} className="block glass-card rounded-2xl overflow-hidden h-full hover:border-sky-400/40 transition-all group">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: `${s.color}40`, border: `1px solid ${s.color}60`, backdropFilter: 'blur(8px)' }}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-sky-400 transition-colors">{s.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {s.technologies.slice(0, 4).map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 text-slate-400 text-xs">{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-sky-400 text-sm font-medium group-hover:gap-2.5 transition-all">Learn more <ArrowRight className="w-4 h-4" /></div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><GitBranch className="w-4 h-4" /> Our Process</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">How we deliver excellence</h2>
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

      {/* TECHNOLOGIES */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><Cpu className="w-4 h-4" /> Technologies</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Tools we master</h2>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, i) => (
              <motion.div key={tech.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 6) * 0.05 }} whileHover={{ y: -4, scale: 1.05 }} className="glass-card rounded-2xl p-5 flex flex-col items-center text-center hover:border-sky-400/30 transition-all group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-white font-bold text-lg" style={{ background: `${tech.color}25`, border: `1px solid ${tech.color}50` }}>{tech.name[0]}</div>
                <div className="text-white text-sm font-semibold">{tech.name}</div>
                <div className="text-slate-500 text-xs mt-0.5">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><Target className="w-4 h-4" /> Case Studies</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Proven results across industries</h2>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div key={cs.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -6 }} className="glass-card rounded-2xl overflow-hidden hover:border-sky-400/30 transition-all group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={cs.image} alt={cs.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-4 left-4"><span className="px-3 py-1 rounded-full glass-card-strong text-xs font-medium text-white">{cs.industry}</span></div>
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
        <div className="absolute inset-0 bg-slate-950" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">Service-related questions</h2>
          </motion.div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
