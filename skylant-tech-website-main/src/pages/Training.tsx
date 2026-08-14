import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Code2, Smartphone, Brain, Cloud, Palette, TrendingUp, Users, Star, GraduationCap, Database, LineChart, Cpu } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import TrainingIllustration from '../components/TrainingIllustration';
import courses from '../data/courses.json';
import testimonials from '../data/testimonials.json';

const iconMap: Record<string, any> = {
  Code2, Smartphone, Brain, Cloud, Palette, TrendingUp, Database, LineChart, Cpu,
};

const learningPaths = [
  { title: 'Beginner', description: 'Start from scratch with foundational concepts and hands-on basics.', duration: '0-3 Months', level: 'Foundation', color: '#10B981' },
  { title: 'Intermediate', description: 'Build real projects and master industry-standard tools and practices.', duration: '3-6 Months', level: 'Practitioner', color: '#2563EB' },
  { title: 'Advanced', description: 'Specialize in advanced topics and build a portfolio-ready skill set.', duration: '6+ Months', level: 'Expert', color: '#7C3AED' },
];

export default function Training() {
  return (
    <>
     <PageBanner
  title={
    <>
      Corporate Training & <span style={{ color: '#2F6EFF' }}>Professional Courses</span>
    </>
  }
  description="Upskill your team or accelerate your career with industry-leading training programs taught by senior engineers and domain experts."
  breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Training' }]}
  illustration={<TrainingIllustration />}
  primaryCta={{ label: 'Enroll Now', path: '/contact' }}
  secondaryCta={{ label: 'View Internships', path: '/internship' }}
/>

      {/* COURSES */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-white/80 backdrop-blur-sm text-[#6D5BD0] text-sm font-medium mb-5"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GraduationCap className="w-4 h-4" /> Our Courses
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2A4A] mb-4 text-balance">Professional courses designed for real careers</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, i) => {
              const Icon = iconMap[c.icon] || Code2;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: 'easeOut' }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  className="relative rounded-2xl border p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 group overflow-hidden"
                  style={{
                    borderColor: `${c.color}30`,
                    background: `linear-gradient(155deg, ${c.color}14 0%, #FFFFFF 55%, ${c.color}0A 100%)`,
                  }}
                >
                  {/* animated glow blob that grows on hover */}
                  <motion.div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                    style={{ background: c.color, opacity: 0.12 }}
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                  />

                  <div className="relative flex items-center justify-between mb-5">
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${c.color}20`, color: c.color }}
                      whileHover={{ rotate: 12, scale: 1.12 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-1 text-amber-400"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold text-[#2C2A4A]">{c.rating}</span>
                    </motion.div>
                  </div>
                  <h3 className="relative text-[#2C2A4A] font-bold text-lg mb-2">{c.title}</h3>
                  <p className="relative text-[#5B5580] text-sm leading-relaxed mb-4">{c.description}</p>
                  <div className="relative flex flex-wrap gap-1.5 mb-4">
                    {c.topics.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: `${c.color}15`, color: c.color }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="relative flex items-center justify-between text-xs text-[#8783A6] mb-4 pt-4 border-t" style={{ borderColor: `${c.color}25` }}>
                    <span>{c.duration}</span>
                    <span>{c.level}</span>
                    <span>{c.students.toLocaleString()} students</span>
                  </div>
                  <Link
                    to="/contact"
                    className="relative inline-flex items-center gap-1.5 font-medium text-sm group-hover:gap-2.5 transition-all"
                    style={{ color: c.color }}
                  >
                    Enroll Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARNING PATHS */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2A4A] mb-4 text-balance">Structured learning paths</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {learningPaths.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative rounded-2xl border p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                style={{
                  borderColor: `${p.color}30`,
                  background: `linear-gradient(155deg, ${p.color}14 0%, #FFFFFF 55%, ${p.color}0A 100%)`,
                }}
              >
                {/* animated glow blob, matching the course cards above */}
                <motion.div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: p.color, opacity: 0.12 }}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                />

                <motion.div
                  className="relative inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ background: `${p.color}18`, color: p.color }}
                  whileHover={{ scale: 1.06 }}
                >
                  {p.level}
                </motion.div>
                <h3 className="relative text-[#2C2A4A] font-bold text-xl mb-2">{p.title}</h3>
                <p className="relative text-[#5B5580] text-sm leading-relaxed mb-4">{p.description}</p>
                <div className="relative text-xs font-medium pt-4 border-t" style={{ borderColor: `${p.color}25`, color: p.color }}>
                  {p.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-4 text-balance">What our students say</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-[#E4DBFF] bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all"
              >
                <p className="text-[#5B5580] leading-relaxed mb-5 text-sm">{t.text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E4DBFF]">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-[#2C2A4A] font-semibold text-sm">{t.name}</div>
                    <div className="text-[#8783A6] text-xs">{t.role}, {t.company}</div>
                  </div>
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