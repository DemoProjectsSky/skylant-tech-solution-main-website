import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Smartphone, Brain, Cloud, Palette, TrendingUp, CheckCircle2, Award, Rocket, Users } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import internships from '../data/internships.json';
import testimonials from '../data/testimonials.json';

const iconMap: Record<string, any> = { Code2, Smartphone, Brain, Cloud, Palette, TrendingUp };

const benefits = [
  { icon: Code2, title: 'Live Project Experience', description: 'Work on real client projects, not toy exercises. Build a portfolio that stands out.' },
  { icon: Users, title: 'Senior Mentorship', description: 'Get 1-on-1 guidance from engineers with 8+ years of industry experience.' },
  { icon: Award, title: 'Industry Certificates', description: 'Receive recognized certificates that validate your skills to employers.' },
  { icon: Rocket, title: 'Placement Support', description: 'Get help with resume building, interview prep, and job placement.' },
];

export default function Internship() {
  return (
    <>
      <PageBanner
        title="Internship Programs with Real-World Impact"
        description="Gain hands-on experience working on live client projects. Learn from senior engineers, build your portfolio, and launch your tech career with confidence."
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Internship' }]}
        image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900&h=1000&dpr=2"
        floatingCards={[
          { icon: <Rocket className="w-4 h-4" />, title: 'Live Projects', subtitle: 'Real Client Work' },
          { icon: <Award className="w-4 h-4" />, title: 'Certificate', subtitle: 'Industry Recognized' },
          { icon: <Users className="w-4 h-4" />, title: 'Mentorship', subtitle: '1-on-1 Guidance' },
          { icon: <CheckCircle2 className="w-4 h-4" />, title: 'Placement', subtitle: 'Job Support' },
        ]}
        stats={[{ value: '6', label: 'Domains' }, { value: '38', label: 'Openings' }, { value: '90%', label: 'Placement' }]}
        primaryCta={{ label: 'Apply Now', path: '/contact' }}
        secondaryCta={{ label: 'View Training', path: '/training' }}
      />

      {/* DOMAINS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><Rocket className="w-4 h-4" /> Open Positions</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Choose your domain</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((job, i) => {
              const Icon = iconMap[job.icon] || Code2;
              return (
                <motion.div key={job.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} whileHover={{ y: -6 }} className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all group">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: `${job.color}25`, border: `1px solid ${job.color}50` }}><Icon className="w-6 h-6" /></div>
                    <span className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-medium">{job.spots} spots</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{job.title}</h3>
                  <div className="text-sky-400 text-sm mb-3">{job.domain}</div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills.map((s) => (<span key={s} className="px-2.5 py-1 rounded-full bg-white/5 text-slate-400 text-xs">{s}</span>))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-4 border-t border-white/5">
                    <span>{job.duration}</span>
                    <span>{job.type}</span>
                  </div>
                  <Link to="/contact" className="inline-flex items-center gap-1.5 text-sky-400 font-medium text-sm group-hover:gap-2.5 transition-all">Apply Now <ArrowRight className="w-4 h-4" /></Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Why intern with Skylant?</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -6 }} className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-4"><b.icon className="w-6 h-6" /></div>
                <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">Intern success stories</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(3, 6).map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all">
                <p className="text-slate-300 leading-relaxed mb-5 text-sm">{t.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div><div className="text-white font-semibold text-sm">{t.name}</div><div className="text-slate-400 text-xs">{t.role}, {t.company}</div></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Launch your tech career with us" description="Apply for an internship today and start working on real projects with real impact. Limited spots available." primaryLabel="Apply Now" secondaryLabel="View Training" secondaryPath="/training" />
    </>
  );
}
