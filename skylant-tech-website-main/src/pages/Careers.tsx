import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code2, Brain, Palette, Cloud, Smartphone, TrendingUp, MapPin, Briefcase, Clock, ArrowRight, CheckCircle2, User, Mail, FileText } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import jobs from '../data/jobs.json';

const iconMap: Record<string, any> = { Code2, Brain, Palette, Cloud, Smartphone, TrendingUp };

const benefits = [
  { title: 'Competitive Compensation', description: 'Salary packages that match or exceed industry standards.' },
  { title: 'Remote-First Culture', description: 'Work from anywhere with flexible hours and async collaboration.' },
  { title: 'Learning Budget', description: 'Annual budget for courses, conferences, and certifications.' },
  { title: 'Health & Wellness', description: 'Comprehensive health insurance and wellness programs.' },
  { title: 'Growth Opportunities', description: 'Clear career progression paths and mentorship programs.' },
  { title: 'Modern Tech Stack', description: 'Work with the latest technologies and tools in the industry.' },
];

const hiringProcess = [
  { step: '01', title: 'Application', description: 'Submit your application with resume and portfolio.' },
  { step: '02', title: 'Screening', description: 'Initial call with our HR team to understand your background.' },
  { step: '03', title: 'Technical Interview', description: 'Deep-dive technical discussion with senior engineers.' },
  { step: '04', title: 'Final & Offer', description: 'Meet the team and receive your offer if its a fit.' },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  return (
    <>
      <PageBanner
        title="Build your career at Skylant"
        description="Join a team of passionate engineers, designers, and innovators building world-class software for businesses across the globe."
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Careers' }]}
        image="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=900&h=1000&dpr=2"
        floatingCards={[
          { icon: <Briefcase className="w-4 h-4" />, title: '6 Open Roles' },
          { icon: <CheckCircle2 className="w-4 h-4" />, title: 'Remote First' },
          { icon: <TrendingUp className="w-4 h-4" />, title: 'Growth Path' },
        ]}
        stats={[{ value: '6', label: 'Open Roles' }, { value: '50+', label: 'Team Members' }, { value: '15+', label: 'Countries' }]}
        primaryCta={{ label: 'View Open Positions', path: '/careers' }}
        secondaryCta={{ label: 'Contact Us', path: '/contact' }}
      />

      {/* OPEN POSITIONS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><Briefcase className="w-4 h-4" /> Open Positions</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Find your next role</h2>
          </motion.div>
          <div className="space-y-4">
            {jobs.map((job, i) => {
              const Icon = iconMap[job.icon] || Code2;
              const isOpen = selectedJob === job.id;
              return (
                <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="glass-card rounded-2xl overflow-hidden hover:border-sky-400/30 transition-all">
                  <button onClick={() => setSelectedJob(isOpen ? null : job.id)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 shrink-0"><Icon className="w-6 h-6" /></div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.department}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{job.experience}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-medium">{job.type}</span>
                      <ArrowRight className={`w-5 h-5 text-sky-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </button>
                  <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-5 pb-5 pt-2 border-t border-white/5">
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {job.skills.map((s) => (<span key={s} className="px-2.5 py-1 rounded-full bg-white/5 text-slate-400 text-xs">{s}</span>))}
                      </div>
                      <a href="#apply" className="btn-primary text-sm py-2.5 px-5">Apply for this role <ArrowRight className="w-4 h-4" /></a>
                    </div>
                  </motion.div>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Why join Skylant?</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -6 }} className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-4"><CheckCircle2 className="w-5 h-5" /></div>
                <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Our hiring process</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringProcess.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-4xl font-bold text-white/10">{step.step}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">Apply now</h2>
            <p className="text-slate-400">Fill out the form below and we'll get back to you within 48 hours.</p>
          </motion.div>
          <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} onSubmit={(e) => e.preventDefault()} className="glass-card-strong rounded-3xl p-6 lg:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Full Name</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><input required className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-400/40" placeholder="John Doe" /></div>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">Email</label>
                <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><input required type="email" className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-400/40" placeholder="john@example.com" /></div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Role you're applying for</label>
              <select className="w-full px-4 py-3 rounded-xl glass-card text-white text-sm focus:outline-none focus:border-sky-400/40">
                {jobs.map((j) => (<option key={j.id} className="bg-slate-900">{j.title}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Cover Letter / Message</label>
              <div className="relative"><FileText className="absolute left-3 top-3 w-4 h-4 text-slate-500" /><textarea rows={4} className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-400/40 resize-none" placeholder="Tell us about yourself..." /></div>
            </div>
            <button type="submit" className="btn-primary w-full">Submit Application <ArrowRight className="w-4 h-4" /></button>
          </motion.form>
        </div>
      </section>

      <CTASection />
    </>
  );
}
