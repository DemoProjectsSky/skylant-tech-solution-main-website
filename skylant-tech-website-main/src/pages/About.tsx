import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Award, Users, Briefcase, Rocket, Sparkles, MapPin, ArrowRight, Quote } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import AboutIllustration from '../components/AboutIllustration';
import faqs from '../data/faqs.json';
import FAQAccordion from '../components/FAQAccordion';



/* ---------------------------------------------------------------------
   Colorful, non-uniform card structures for Vision/Mission, Values,
   and Achievements — each item now carries its own accent color
   instead of the flat single-violet look, and the layouts break out
   of the plain equal-height grid (offset duo panels, a staggered
   bento row, a highlight-tile stat grid).
--------------------------------------------------------------------- */

const values = [
  { icon: Target, title: 'Excellence', description: 'We hold ourselves to the highest standards in everything we build, design, and deliver.', color: '#2563EB' },
  { icon: Heart, title: 'Client-Centric', description: 'Our clients success is our success. We are invested in their long-term growth.', color: '#F43F5E' },
  { icon: Rocket, title: 'Innovation', description: 'We embrace emerging technologies and modern engineering practices to stay ahead.', color: '#F59E0B' },
  { icon: Award, title: 'Integrity', description: 'Honest communication, transparent processes, and ethical business practices always.', color: '#10B981' },
];

const achievements = [
  { value: '10+', label: 'Projects Delivered', icon: Briefcase, color: '#6D5BD0', span: 'lg:row-span-2' },
  { value: '10+', label: 'Happy Clients', icon: Users, color: '#EC4899', span: '' },
  { value: '20+', label: 'Expert Engineers', icon: Rocket, color: '#F59E0B', span: '' },
];

function Eyebrow({ icon: Icon, label, color = '#6D5BD0' }: { icon: any; label: string; color?: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#E4DBFF] shadow-sm text-sm font-medium mb-5"
      style={{ color }}
    >
      <motion.span
        animate={{ rotate: [0, 14, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-flex"
      >
        <Icon className="w-4 h-4" />
      </motion.span>
      {label}
    </div>
  );
}

export default function About() {
  return (
    <>
      <PageBanner
        title={
          <>
            Engineering the <span style={{ color: '#2F6EFF' }}>future of business</span>
          </>
        }
        description="Skylant Tech Solutions is a premium software development company building scalable, secure, and innovative digital products for businesses worldwide."
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'About' }]}
        illustration={<AboutIllustration />}
        stats={[
          { value: '8+', label: 'Years' },
          { value: '10+', label: 'Projects' },
          { value: '10+', label: 'Clients' },
        ]}
        primaryCta={{ label: 'Work With Us', path: '/contact' }}
        secondaryCta={{ label: 'Our Services', path: '/services' }}
      />

      {/* STORY */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-[#FAF9F7]/55 backdrop-blur-[2px]" />
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-[#9B8AFB]/20 rounded-full blur-3xl"
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#E4DBFF] shadow-sm text-[#6D5BD0] text-sm font-medium mb-5">
              <Heart className="w-4 h-4" /> Our Story
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-5 text-balance">
              From a small team to a global technology partner
            </h2>
            <p className="text-[#5B5580] leading-relaxed mb-4">
              Skylant Tech Solutions is a software development and digital marketing company focused on helping startups, small businesses, and growing brands build their digital presence. We create websites, business software, mobile applications, ERP systems, AI solutions, and digital marketing strategies tailored to business goals.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative aspect-square rounded-full overflow-hidden bg-white/70 backdrop-blur-sm border-4 border-white shadow-2xl shadow-[#6D5BD0]/30"
            >
              <img src="https://cdn.pixabay.com/photo/2024/01/11/17/59/ai-generated-8502289_1280.jpg" alt="Our team" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* VISION MISSION — offset duo panels, each with its own color + a
          glowing connector between them instead of a flat matched-height grid */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F7]/45 to-[#E4DBFF]/45 backdrop-blur-[2px]" />
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-6">
          {[
            { icon: Eye, title: 'Our Vision', text: 'To be the most trusted technology partner for businesses worldwide, empowering them to achieve their boldest ambitions through innovative software solutions.', color: '#2563EB', offset: 'md:mt-0' },
            { icon: Target, title: 'Our Mission', text: 'To deliver exceptional software that creates measurable business value, while building long-term partnerships based on trust, transparency, and technical excellence.', color: '#9B8AFB', offset: 'md:mt-10' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className={`relative overflow-hidden rounded-[2rem] border p-8 backdrop-blur-sm ${item.offset}`}
              style={{
                borderColor: `${item.color}40`,
                background: `linear-gradient(160deg, ${item.color}14 0%, rgba(255,255,255,0.65) 60%)`,
                boxShadow: `0 14px 34px ${item.color}1a`,
              }}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-3xl"
                style={{ background: item.color }}
              />
              <div
                className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}
              >
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-[#2C2A4A] mb-3">{item.title}</h3>
              <p className="relative z-10 text-[#5B5580] leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES — staggered colorful row instead of a flat equal grid */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-[#FAF9F7]/55 backdrop-blur-[2px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <Eyebrow icon={Sparkles} label="Our Values" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2A4A] mb-4 text-balance">The principles that guide us</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -8 }}
                className={`relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-sm transition-shadow ${i % 2 === 1 ? 'lg:mt-6' : ''}`}
                style={{
                  borderColor: `${v.color}40`,
                  background: `linear-gradient(160deg, ${v.color}14 0%, rgba(255,255,255,0.6) 60%)`,
                  boxShadow: `0 10px 28px ${v.color}18`,
                }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-25 blur-2xl"
                  style={{ background: v.color }}
                />
                <div className="pointer-events-none absolute top-0 left-0 h-1.5 w-full" style={{ background: v.color }} />
                <div
                  className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${v.color}20`, color: v.color, border: `1px solid ${v.color}40` }}
                >
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="relative z-10 text-[#2C2A4A] font-bold text-lg mb-2">{v.title}</h3>
                <p className="relative z-10 text-[#5B5580] text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS — bento grid with one tall highlight tile instead of
          four identical boxes */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E4DBFF]/45 to-[#FAF9F7]/55 backdrop-blur-[2px]" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-2 gap-5 lg:grid-cols-4 lg:auto-rows-[160px] lg:grid-flow-dense">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative overflow-hidden rounded-[2rem] border p-6 flex flex-col justify-center text-center backdrop-blur-sm ${a.span}`}
              style={{
                borderColor: `${a.color}40`,
                background: `linear-gradient(160deg, ${a.color}18 0%, rgba(255,255,255,0.65) 65%)`,
                boxShadow: `0 10px 28px ${a.color}18`,
              }}
            >
              <div
                className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full opacity-25 blur-3xl"
                style={{ background: a.color }}
              />
              <div
                className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${a.color}22`, color: a.color, border: `1px solid ${a.color}40` }}
              >
                <a.icon className="w-6 h-6" />
              </div>
              <div className={`relative z-10 font-bold mb-1 ${a.span ? 'text-4xl lg:text-5xl' : 'text-3xl lg:text-4xl'}`} style={{ color: a.color }}>
                {a.value}
              </div>
              <div className="relative z-10 text-sm text-[#5B5580]">{a.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* CAT INDIA — New Initiatives */}
<section className="py-20 relative">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto mb-14"
    >
      <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 border border-red-300 text-base font-semibold tracking-widest uppercase text-red-600 mb-4">
        CAT India · Annual Meet 2026
      </span>
      <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
        New Initiatives — <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">More Courses. More Growth.</span>
      </h2>
      <p className="text-[#5B5580] text-lg">
        In partnership with Center For Advanced Technologies (CAT India), Pune — a fresh wave of
        industry-aligned courses, workshops, and internship-driven programs for 2026.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { icon: Rocket, title: "Online Courses", body: "2–3 month focused tracks across in-demand skills, fees ₹5,000–30,000.", tag: "New Course" },
        { icon: Award, title: "Certified Expert in Accounting & Taxation", body: "12-month program: Tally, GST, Payroll, Advance Excel, OJT and live internship (₹5–7K/pm stipend).", tag: "Flagship" },
        { icon: Sparkles, title: "Diploma in Smart Office Executive", body: "6-month combo: MS-Office, Excel, Tally, social media & internet for office use. Eligibility: 10th pass.", tag: "Combo" },
        { icon: Target, title: "Tally Professional (New Version)", body: "6-month deep-dive: Accounting & Taxation, Payroll and Inventory with certification.", tag: "Updated" },
        { icon: Users, title: "College & School Tie-Ups", body: "NEP 2020 + NAAC aligned skill workshops and structured internships, on-campus delivery.", tag: "Workshops" },
        { icon: Target, title: "AI for All — Social Initiative", body: "Workshop on practical AI literacy & cyber-safety in Marathi, Hindi, English. Just ₹750 with certificate.", tag: "Initiative" },
      ].map((p, i) => {
        const fromLeft = i % 2 === 0;
        return (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, x: fromLeft ? -60 : 60, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.07, duration: 0.6, type: "spring", damping: 18 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative p-7 rounded-2xl bg-white border border-red-200 shadow-md hover:shadow-xl hover:border-red-400 transition-all duration-300 overflow-hidden"
          >
            <span className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg_at_50%_50%,oklch(0.65_0.22_25/0.12),oklch(0.85_0.15_40/0.10),oklch(0.55_0.24_20/0.12),oklch(0.65_0.22_25/0.12))] animate-spin-slow" />
            <span className="pointer-events-none absolute top-0 left-6 right-6 h-0.5 rounded-b-full bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-red-700 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
            <div className="relative flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-100 to-red-50 border border-red-200 flex items-center justify-center text-red-600 group-hover:scale-110 group-hover:rotate-[-6deg] group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-700 group-hover:text-white group-hover:border-transparent transition-all duration-500">
                <p.icon className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">{p.tag}</span>
            </div>
            <h3 className="relative font-bold text-lg mb-2 group-hover:text-red-600 transition-colors">{p.title}</h3>
            <p className="relative text-base text-[#5B5580] leading-relaxed">{p.body}</p>
          </motion.div>
        );
      })}
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-10 text-center text-sm text-[#5B5580] italic"
    >
      "Think Positive · Act Smart · Achieve Big" — CAT India Vision 2026
    </motion.p>
  </div>
</section>

{/* CAT INDIA — About */}
<section className="py-20">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="rounded-3xl overflow-hidden border border-red-200 shadow-xl">
       <img
  src="/images/CAT12.png"
  alt="CAT India students — 25 years of IT education experience"
  className="w-full h-auto object-cover"
  loading="lazy"
/>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-semibold tracking-widest uppercase text-red-600 mb-5">
        <MapPin className="w-3.5 h-3.5" /> Pune · Maharashtra · India
      </span>
      <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-3">About <span className="text-red-600">CAT India</span></h2>
      <p className="text-lg text-[#5B5580] mb-5">A trusted name in IT & computer education</p>
      <p className="text-[#2C2A4A]/85 leading-relaxed mb-4">
        CAT India is committed to making quality IT education accessible and practical. Our curriculum blends
        strong fundamentals with hands-on training so that learners gain real confidence to work in offices,
        labs, design studios and classrooms.
      </p>
      <p className="text-[#2C2A4A]/85 leading-relaxed mb-4">
        <span className="font-semibold">Inclusive learning:</span> Whether you are from arts,
        commerce, science or non-IT background — our programs are designed to start from your level and grow with you.
      </p>
      <p className="text-[#2C2A4A]/85 leading-relaxed mb-6">
        <span className="font-semibold">Industry connection:</span> We focus on skills that employers
        value — from MS-Office, Tally and programming to graphics, animation and hardware.
      </p>
      <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-500/30 transition-smooth hover:scale-105">
        Learn More About Us <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  </div>
</section>

{/* CAT INDIA — Leadership */}
<section className="py-20 bg-gradient-to-b from-white via-red-50 to-white">
  <div className="max-w-6xl mx-auto px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-red-600">Leadership</h2>
      <p className="text-[#5B5580] max-w-2xl mx-auto">
        <span className="text-red-600 font-semibold">CAT India</span> is led by passionate educationists who believe in
        technology as a tool for transformation.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-center md:items-start gap-14 bg-gradient-to-r from-white via-red-50 to-red-100 border border-red-200 rounded-3xl p-8 md:p-12 shadow-xl"
    >
      <div className="flex-1">
        <Quote className="w-8 h-8 text-red-600 mb-4" />
        <p className="text-gray-700 leading-relaxed mb-5 text-lg">
          With over two decades of experience in IT education and skill
          development, Mr. Avinash Wadkar has been instrumental in
          building CAT India's strong network of centers and
          industry-linked programs. His focus has always been on keeping
          courses practical, affordable and aligned with the latest
          trends in technology.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg">
          Under his leadership, CAT India has enabled thousands of
          learners to build careers in programming, accounts, design,
          hardware, teaching and more — while also supporting training
          centers with curriculum, exams and guidance.
        </p>
      </div>

      <div className="flex flex-col items-center text-center min-w-[240px]">
        <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-red-500/20 shadow-lg">
      <img
  src="/images/leader.png"
  alt="Mr. Avinash Wadkar"
  className="w-full h-full object-cover"
/>
        </div>
        <h3 className="mt-5 text-2xl font-bold text-gray-900">Mr. Avinash Wadkar</h3>
        <p className="text-red-600 font-medium text-lg mt-1">Founder & Director, CAT India</p>
      </div>
    </motion.div>
  </div>
</section>

      {/* FAQ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-[#FAF9F7]/55 backdrop-blur-[2px]" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-4 text-balance">Questions about working with us?</h2>
          </motion.div>
          <FAQAccordion items={faqs.slice(0, 5)} />
        </div>
      </section>

      <CTASection />
    </>
  );
}