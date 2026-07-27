import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Users, Briefcase, Globe, Rocket } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import team from '../data/team.json';
import faqs from '../data/faqs.json';
import FAQAccordion from '../components/FAQAccordion';

const values = [
  { icon: Target, title: 'Excellence', description: 'We hold ourselves to the highest standards in everything we build, design, and deliver.' },
  { icon: Heart, title: 'Client-Centric', description: 'Our clients success is our success. We are invested in their long-term growth.' },
  { icon: Rocket, title: 'Innovation', description: 'We embrace emerging technologies and modern engineering practices to stay ahead.' },
  { icon: Award, title: 'Integrity', description: 'Honest communication, transparent processes, and ethical business practices always.' },
];

const timeline = [
  { year: '2016', title: 'Skylant is Founded', description: 'Started as a 3-person team with a vision to build world-class software.' },
  { year: '2018', title: 'First Enterprise Client', description: 'Delivered our first large-scale enterprise SaaS platform successfully.' },
  { year: '2020', title: 'AI & Cloud Division', description: 'Expanded into AI solutions and cloud-native development services.' },
  { year: '2022', title: 'Global Expansion', description: 'Opened offices in 3 countries and grew to 50+ engineers.' },
  { year: '2024', title: '250+ Projects Milestone', description: 'Celebrated delivering 250+ projects to 100+ clients across 15 countries.' },
];

const achievements = [
  { value: '250+', label: 'Projects Delivered', icon: Briefcase },
  { value: '100+', label: 'Happy Clients', icon: Users },
  { value: '15+', label: 'Countries Served', icon: Globe },
  { value: '50+', label: 'Expert Engineers', icon: Rocket },
];

export default function About() {
  return (
    <>
      <PageBanner
        title="Engineering the future of business"
        description="Skylant Tech Solutions is a premium software development company building scalable, secure, and innovative digital products for businesses worldwide."
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'About' }]}
        image="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=900&h=1000&dpr=2"
        floatingCards={[
          { icon: <Award className="w-4 h-4" />, title: '8+ Years', subtitle: 'Of Excellence' },
          { icon: <Users className="w-4 h-4" />, title: '50+ Engineers', subtitle: 'Senior Team' },
          { icon: <Globe className="w-4 h-4" />, title: '15+ Countries', subtitle: 'Global Reach' },
          { icon: <Rocket className="w-4 h-4" />, title: '250+ Projects', subtitle: 'Delivered' },
        ]}
        stats={[
          { value: '8+', label: 'Years' },
          { value: '250+', label: 'Projects' },
          { value: '100+', label: 'Clients' },
        ]}
        primaryCta={{ label: 'Work With Us', path: '/contact' }}
        secondaryCta={{ label: 'Our Services', path: '/services' }}
      />

      {/* STORY */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5">
              <Heart className="w-4 h-4" /> Our Story
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 text-balance">
              From a small team to a global technology partner
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Founded in 2016, Skylant Tech Solutions began with a simple mission: to help businesses leverage technology to grow, innovate, and compete on a global scale.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              What started as a three-person team has grown into a 50+ engineer strong organization serving clients across 15+ countries. We have delivered 250+ projects ranging from startup MVPs to enterprise-grade platforms processing millions of transactions.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Today, we are a trusted technology partner for startups, SMEs, and Fortune 500 companies alike, known for our engineering excellence, transparent processes, and unwavering commitment to client success.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card">
              <img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2" alt="Our team" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* VISION MISSION */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon: Eye, title: 'Our Vision', text: 'To be the most trusted technology partner for businesses worldwide, empowering them to achieve their boldest ambitions through innovative software solutions.' },
            { icon: Target, title: 'Our Mission', text: 'To deliver exceptional software that creates measurable business value, while building long-term partnerships based on trust, transparency, and technical excellence.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card rounded-2xl p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-5">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><Heart className="w-4 h-4" /> Our Values</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">The principles that guide us</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -6 }} className="glass-card rounded-2xl p-6 hover:border-sky-400/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-4"><v.icon className="w-6 h-6" /></div>
                <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><Rocket className="w-4 h-4" /> Our Journey</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Milestones that shaped us</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-400/50 via-blue-500/30 to-transparent" />
            {timeline.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`relative flex gap-6 mb-10 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className="lg:w-1/2 lg:px-8">
                  <div className="glass-card rounded-2xl p-5 hover:border-sky-400/30 transition-all">
                    <div className="text-sky-400 font-bold text-sm mb-1">{t.year}</div>
                    <h3 className="text-white font-bold text-lg mb-2">{t.title}</h3>
                    <p className="text-slate-400 text-sm">{t.description}</p>
                  </div>
                </div>
                <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-5 w-3 h-3 rounded-full bg-sky-400 ring-4 ring-sky-400/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><Users className="w-4 h-4" /> Leadership</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">Meet the people behind Skylant</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -6 }} className="glass-card rounded-2xl overflow-hidden hover:border-sky-400/30 transition-all group">
                <div className="relative aspect-square overflow-hidden">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg">{member.name}</h3>
                  <div className="text-sky-400 text-sm font-medium mb-3">{member.role}</div>
                  <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-slate-950" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mx-auto mb-3"><a.icon className="w-6 h-6" /></div>
              <div className="text-3xl lg:text-4xl font-bold gradient-text-light mb-1">{a.value}</div>
              <div className="text-sm text-slate-400">{a.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">Questions about working with us?</h2>
          </motion.div>
          <FAQAccordion items={faqs.slice(0, 5)} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
