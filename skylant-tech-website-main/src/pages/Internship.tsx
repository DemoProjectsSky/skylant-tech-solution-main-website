import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, Smartphone, Brain, Cloud, Palette, TrendingUp, Award, Rocket, Users,
  Search, BarChart3, Briefcase, Settings, LineChart, Wallet, Calculator, Megaphone, Handshake,
  Target, Terminal, GitBranch, Bug, Link2, Gamepad2, Network, Bot, Wifi, Shield, Database,
  X, Clock, Layers, Info,
} from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import InternshipIllustration from '../components/InternshipIllustration';
import internships from '../data/internships.json';
import testimonials from '../data/testimonials.json';

const iconMap: Record<string, any> = {
  Code2, Smartphone, Brain, Cloud, Palette, TrendingUp, Users, BarChart3, Briefcase, Settings,
  LineChart, Wallet, Calculator, Megaphone, Handshake, Target, Terminal, GitBranch, Bug, Link2,
  Gamepad2, Network, Bot, Wifi, Shield, Database,
};

const benefits = [
  { icon: Code2, title: 'Live Project Experience', description: 'Work on real client projects, not toy exercises. Build a portfolio that stands out.' },
  { icon: Users, title: 'Senior Mentorship', description: 'Get 1-on-1 guidance from engineers with 8+ years of industry experience.' },
  { icon: Award, title: 'Industry Certificates', description: 'Receive recognized certificates that validate your skills to employers.' },
  { icon: Rocket, title: 'Placement Support', description: 'Get help with resume building, interview prep, and job placement.' },
];

// Generic eligibility points shown in the Details modal, based on role category
const eligibilityByCategory: Record<string, string[]> = {
  technical: [
    'Currently pursuing or recently completed a degree in a relevant technical field',
    'Comfortable working with the tools and technologies listed under Focus Areas',
    'Strong problem-solving mindset and willingness to debug real issues',
    'Basic understanding of Git and collaborative development workflows',
  ],
  'non-technical': [
    'Currently pursuing or recently completed a degree in a relevant field',
    'Strong communication and organizational skills',
    'Comfortable working with spreadsheets, documentation, and reporting tools',
    'Eagerness to learn in a fast-paced, real-client environment',
  ],
};

type FilterKey = 'all' | 'technical' | 'non-technical';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Roles' },
  { key: 'technical', label: 'Technical' },
  { key: 'non-technical', label: 'Non-Technical' },
];

// Card background/border tinted to the role's accent color
function cardTint(color: string) {
  return {
    background: `linear-gradient(180deg, ${color}14 0%, ${color}08 100%)`,
    borderColor: `${color}40`,
  };
}

function InternshipCard({ job, onDetails }: { job: any; onDetails: (job: any) => void }) {
  const Icon = iconMap[job.icon] || Code2;
  return (
    <div
      style={cardTint(job.color)}
      className="rounded-2xl border backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${job.color}25`, color: job.color }}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-white/70 border border-[#E4DBFF] text-[#6D5BD0] text-xs font-medium">{job.spots} spots</span>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              job.category === 'technical'
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-amber-50 border-amber-200 text-amber-600'
            }`}
          >
            {job.category === 'technical' ? 'Technical' : 'Non-Technical'}
          </span>
        </div>
      </div>
      <h3 className="text-[#2C2A4A] font-bold text-lg mb-1">{job.title}</h3>
      <div className="text-sm mb-3 font-medium" style={{ color: job.color }}>{job.domain}</div>
      <p className="text-[#5B5580] text-sm leading-relaxed mb-4">{job.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.skills.map((s: string) => (
          <span key={s} className="px-2.5 py-1 rounded-full bg-white/70 text-[#5B5580] text-xs">{s}</span>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-[#5B5580] mb-4 pt-4 border-t" style={{ borderColor: `${job.color}30` }}>
        <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.duration}</span>
        <span className="font-medium">{job.type}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onDetails(job)}
          style={{ background: job.color }}
          className="inline-flex items-center justify-center gap-1.5 flex-1 px-4 py-2.5 rounded-full text-white font-semibold text-sm shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all"
        >
          <Info className="w-4 h-4" /> Details
        </button>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 font-medium text-sm px-2 py-2.5 hover:gap-2.5 transition-all whitespace-nowrap"
          style={{ color: job.color }}
        >
          Apply <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function Internship() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const filteredInternships = useMemo(() => {
    const q = query.trim().toLowerCase();
    return internships.filter((job: any) => {
      const matchesFilter = activeFilter === 'all' || job.category === activeFilter;
      if (!matchesFilter) return false;
      if (!q) return true;
      const haystack = [job.title, job.domain, ...(job.skills || [])].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeFilter]);

  return (
    <>
      <PageBanner
  title={
    <>
      Internship Programs with <span style={{ color: '#2F6EFF' }}>Real-World Impact</span>
    </>
  }
  description="Gain hands-on experience working on live client projects. Learn from senior engineers, build your portfolio, and launch your tech career with confidence."
  breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Internship' }]}
  illustration={<InternshipIllustration />}
  primaryCta={{ label: 'Apply Now', path: '/contact' }}
  secondaryCta={{ label: 'View Training', path: '/internship' }}
/>

      {/* DOMAINS */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-white/80 backdrop-blur-sm text-[#6D5BD0] text-sm font-medium mb-5">
              <Rocket className="w-4 h-4" /> Open Positions
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2A4A] mb-4 text-balance">Choose your domain</h2>
            <p className="text-[#5B5580] text-base">Technical or non-technical, search or filter to find the role that fits you.</p>
          </motion.div>

          {/* SEARCH + FILTER BAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-3xl mx-auto mb-12"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8783A6]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roles..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-[#E4DBFF] bg-white/90 backdrop-blur-sm text-sm text-[#2C2A4A] placeholder:text-[#8783A6] focus:outline-none focus:ring-2 focus:ring-[#6D5BD0]/40 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                    activeFilter === f.key
                      ? 'bg-[#6D5BD0] border-[#6D5BD0] text-white shadow-sm'
                      : 'bg-white/80 border-[#E4DBFF] text-[#5B5580] hover:border-[#6D5BD0]/50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </motion.div>

          {filteredInternships.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#5B5580] text-base">No roles matched your search. Try a different keyword or filter.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredInternships.map((job: any, i: number) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                    whileHover={{ y: -6 }}
                  >
                    <InternshipCard job={job} onDetails={setSelectedJob} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* DETAILS MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2A4A]/50 backdrop-blur-sm"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-xl border border-[#E4DBFF]"
            >
              <div className="p-6 sm:p-8" style={{ background: `linear-gradient(180deg, ${selectedJob.color}18 0%, transparent 100%)` }}>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/80 border border-[#E4DBFF] flex items-center justify-center text-[#5B5580] hover:text-[#2C2A4A] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${selectedJob.color}25`, color: selectedJob.color }}
                  >
                    {(() => {
                      const Icon = iconMap[selectedJob.icon] || Code2;
                      return <Icon className="w-7 h-7" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2C2A4A]">{selectedJob.title}</h3>
                    <div className="text-sm font-medium" style={{ color: selectedJob.color }}>{selectedJob.domain}</div>
                  </div>
                </div>

                <span
                  className={`inline-block mb-5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    selectedJob.category === 'technical'
                      ? 'bg-blue-50 border-blue-200 text-blue-600'
                      : 'bg-amber-50 border-amber-200 text-amber-600'
                  }`}
                >
                  {selectedJob.category === 'technical' ? 'Technical' : 'Non-Technical'}
                </span>

                <p className="text-[#5B5580] text-sm leading-relaxed mb-6">{selectedJob.description}</p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-xl bg-white/70 border border-[#E4DBFF] p-3 text-center">
                    <Clock className="w-4 h-4 mx-auto mb-1 text-[#6D5BD0]" />
                    <div className="text-xs text-[#8783A6] mb-0.5">Duration</div>
                    <div className="text-xs font-semibold text-[#2C2A4A]">{selectedJob.duration}</div>
                  </div>
                  <div className="rounded-xl bg-white/70 border border-[#E4DBFF] p-3 text-center">
                    <Award className="w-4 h-4 mx-auto mb-1 text-[#6D5BD0]" />
                    <div className="text-xs text-[#8783A6] mb-0.5">Type</div>
                    <div className="text-xs font-semibold text-[#2C2A4A]">{selectedJob.type}</div>
                  </div>
                  <div className="rounded-xl bg-white/70 border border-[#E4DBFF] p-3 text-center">
                    <Users className="w-4 h-4 mx-auto mb-1 text-[#6D5BD0]" />
                    <div className="text-xs text-[#8783A6] mb-0.5">Spots</div>
                    <div className="text-xs font-semibold text-[#2C2A4A]">{selectedJob.spots} open</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="flex items-center gap-1.5 text-sm font-semibold text-[#2C2A4A] mb-3">
                    <Layers className="w-4 h-4" style={{ color: selectedJob.color }} /> Focus Areas
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.skills.map((s: string) => (
                      <span key={s} className="px-2.5 py-1 rounded-full bg-white/80 border border-[#E4DBFF] text-[#5B5580] text-xs">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#2C2A4A] mb-3">Who can apply</h4>
                  <ul className="space-y-2">
                    {eligibilityByCategory[selectedJob.category].map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-[#5B5580]">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: selectedJob.color }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-white font-medium text-sm transition-transform hover:scale-[1.02]"
                  style={{ background: selectedJob.color }}
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BENEFITS */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2A4A] mb-4 text-balance">Why intern with Skylant?</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-[#E4DBFF] bg-white/60 backdrop-blur-sm p-6 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F3F0FF] border border-[#E4DBFF] flex items-center justify-center text-[#6D5BD0] mb-4">
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[#2C2A4A] font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-[#5B5580] text-sm leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-4 text-balance">Intern success stories</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(3, 6).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-[#E4DBFF] bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all"
              >
                <p className="text-[#5B5580] leading-relaxed mb-5 text-sm">{t.text}</p>
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

      <CTASection title="Launch your tech career with us" description="Apply for an internship today and start working on real projects with real impact. Limited spots available." primaryLabel="Apply Now" secondaryLabel="View Training" secondaryPath="/training" />
    </>
  );
}