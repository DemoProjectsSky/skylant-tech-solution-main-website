import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Code2, Smartphone, Brain, Cloud, Palette, TrendingUp, Users, Star, GraduationCap } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import courses from '../data/courses.json';
import testimonials from '../data/testimonials.json';

const iconMap: Record<string, any> = { Code2, Smartphone, Brain, Cloud, Palette, TrendingUp };

const learningPaths = [
  { title: 'Beginner', description: 'Start from scratch with foundational concepts and hands-on basics.', duration: '0-3 Months', level: 'Foundation' },
  { title: 'Intermediate', description: 'Build real projects and master industry-standard tools and practices.', duration: '3-6 Months', level: 'Practitioner' },
  { title: 'Advanced', description: 'Specialize in advanced topics and build a portfolio-ready skill set.', duration: '6+ Months', level: 'Expert' },
];

export default function Training() {
  return (
    <>
      <PageBanner
        title="Corporate Training & Professional Courses"
        description="Upskill your team or accelerate your career with industry-leading training programs taught by senior engineers and domain experts."
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Training' }]}
        image="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=900&h=1000&dpr=2"
        floatingCards={[
          { icon: <Award className="w-4 h-4" />, title: 'Certified', subtitle: 'Industry Recognized' },
          { icon: <Users className="w-4 h-4" />, title: '5,000+', subtitle: 'Students Trained' },
          { icon: <Star className="w-4 h-4" />, title: '4.8/5', subtitle: 'Average Rating' },
          { icon: <GraduationCap className="w-4 h-4" />, title: 'Placement', subtitle: 'Support Included' },
        ]}
        stats={[{ value: '6', label: 'Courses' }, { value: '5K+', label: 'Students' }, { value: '4.8', label: 'Rating' }]}
        primaryCta={{ label: 'Enroll Now', path: '/contact' }}
        secondaryCta={{ label: 'View Internships', path: '/internship' }}
      />

      {/* COURSES */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><GraduationCap className="w-4 h-4" /> Our Courses</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Professional courses designed for real careers</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, i) => {
              const Icon = iconMap[c.icon] || Code2;
              return (
                <motion.div key={c.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} whileHover={{ y: -6 }} className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all group">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: `${c.color}25`, border: `1px solid ${c.color}50` }}><Icon className="w-6 h-6" /></div>
                    <div className="flex items-center gap-1 text-amber-400"><Star className="w-4 h-4 fill-current" /><span className="text-sm font-semibold text-white">{c.rating}</span></div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{c.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{c.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.topics.slice(0, 4).map((t) => (<span key={t} className="px-2.5 py-1 rounded-full bg-white/5 text-slate-400 text-xs">{t}</span>))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-4 border-t border-white/5">
                    <span>{c.duration}</span>
                    <span>{c.level}</span>
                    <span>{c.students.toLocaleString()} students</span>
                  </div>
                  <Link to="/contact" className="inline-flex items-center gap-1.5 text-sky-400 font-medium text-sm group-hover:gap-2.5 transition-all">Enroll Now <ArrowRight className="w-4 h-4" /></Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARNING PATHS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Structured learning paths</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {learningPaths.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all">
                <div className="text-sky-400 font-bold text-sm mb-2">{p.level}</div>
                <h3 className="text-white font-bold text-xl mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.description}</p>
                <div className="text-xs text-slate-500 pt-4 border-t border-white/5">{p.duration}</div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">What our students say</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all">
                <p className="text-slate-300 leading-relaxed mb-5 text-sm">{t.text}</p>
                <div className="flex items-center gap-1 mb-4">{Array.from({ length: t.rating }).map((_, j) => (<Star key={j} className="w-4 h-4 text-amber-400 fill-current" />))}</div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div><div className="text-white font-semibold text-sm">{t.name}</div><div className="text-slate-400 text-xs">{t.role}, {t.company}</div></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Ready to advance your career?" description="Join 5,000+ professionals who have transformed their careers with our training programs. Get in touch to find the right course for you." primaryLabel="Enroll Now" secondaryLabel="View Internships" secondaryPath="/internship" />
    </>
  );
}
