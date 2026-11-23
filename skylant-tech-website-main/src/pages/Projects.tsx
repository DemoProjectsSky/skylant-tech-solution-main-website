import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ExternalLink, FolderKanban } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import ProjectsIllustration from '../components/ProjectsIllustration';
import projects from '../data/projects.json';
import { useSEO } from '../hooks/useSEO';

/* All projects live in `src/data/projects.json` — add, edit or remove entries there.
   `image` and `link` are optional. */

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  color: string;
  link: string;
};

const ALL = 'All';

export default function Projects() {
  useSEO({
    title: 'Our Projects | Skylant Tech Solution Pvt. Ltd.',
    description:
      'Explore websites, mobile apps, ERP/CRM software, AI solutions and digital marketing campaigns delivered by Skylant Tech Solution Pvt. Ltd., Nagpur.',
    path: '/projects',
  });

  const [active, setActive] = useState(ALL);
  const items = projects as Project[];

  const categories = useMemo(() => [ALL, ...Array.from(new Set(items.map((p) => p.category)))], [items]);
  const visible = active === ALL ? items : items.filter((p) => p.category === active);

  return (
    <>
      <PageBanner
        title={
          <>
            Our <span style={{ color: '#2F6EFF' }}>Projects</span>
          </>
        }
        description="A look at the NGO websites, business websites and software portals we build for growing organisations."
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Projects' }]}
        illustration={<ProjectsIllustration />}
        primaryCta={{ label: 'Start Your Project', path: '/contact' }}
        secondaryCta={{ label: 'Our Services', path: '/services' }}
      />

      <section className="relative overflow-hidden py-16 sm:py-20" aria-labelledby="projects-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="projects-heading" className="sr-only">
            Project portfolio
          </h2>

          {/* animated count strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10 grid max-w-3xl grid-cols-3 gap-3 rounded-3xl border border-[#E4DBFF] bg-white/70 p-4 text-center backdrop-blur-sm"
          >
            {[
              { v: `${items.length}`, l: 'Live projects' },
              { v: `${categories.length - 1}`, l: 'Categories' },
              { v: '100%', l: 'Responsive' },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-2xl font-bold text-[#2F6EFF] sm:text-3xl">{s.v}</p>
                <p className="text-xs text-[#5B5580] sm:text-sm">{s.l}</p>
              </div>
            ))}
          </motion.div>

          <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={`relative min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors ${
                  active === c
                    ? 'border-transparent text-white'
                    : 'border-[#E4DBFF] bg-white/70 text-[#2C2A4A] hover:bg-white'
                }`}
              >
                {active === c && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-[#2F6EFF]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="py-16 text-center text-[#5B5580]">No projects in this category yet.</p>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                  <motion.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ type: 'spring', stiffness: 160, damping: 20, delay: (i % 3) * 0.08 }}
                    whileHover={{ y: -8 }}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border bg-white/85 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl"
                    style={{ borderColor: `${p.color}40` }}
                  >
                    {/* browser-style preview */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)` }}
                    >
                      <div className="flex items-center gap-1.5 border-b border-black/5 bg-white/90 px-3 py-2">
                        <span className="h-2 w-2 rounded-full bg-[#F87171]" />
                        <span className="h-2 w-2 rounded-full bg-[#FBBF24]" />
                        <span className="h-2 w-2 rounded-full bg-[#34D399]" />
                        <span className="ml-2 truncate rounded-full bg-[#F3F0FF] px-3 py-0.5 text-[10px] text-[#5B5580]">
                          {p.link ? p.link.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'your-project.com'}
                        </span>
                        <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-[#16A34A]">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-70" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
                          </span>
                          Live
                        </span>
                      </div>

                      <div className="relative aspect-[2/1] w-full overflow-hidden">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={`${p.title} preview`}
                            width={960}
                            height={460}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center" style={{ color: p.color }}>
                            <FolderKanban className="h-14 w-14 opacity-70" aria-hidden="true" />
                          </div>
                        )}
                        {/* shine sweep on hover */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
                        />
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${p.title}`}
                            className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/25 group-hover:opacity-100 focus-visible:opacity-100"
                          >
                            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#2C2A4A] shadow-lg">
                              Visit site <ExternalLink className="h-4 w-4" aria-hidden="true" />
                            </span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: p.color }}>
                        {p.category}
                      </p>
                      <h3 className="mb-2 text-lg font-semibold text-[#2C2A4A]">{p.title}</h3>
                      <p className="mb-4 flex-1 text-sm leading-relaxed text-[#5B5580]">{p.description}</p>

                      <ul className="mb-4 flex flex-wrap gap-2" aria-label="Technologies">
                        {p.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-[#E4DBFF] bg-[#F3F0FF] px-2.5 py-1 text-xs text-[#4B3F91] transition-colors group-hover:border-[#C9BAFF]"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>

                      {p.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold"
                          style={{ color: p.color }}
                        >
                          View project{' '}
                          <ExternalLink
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold"
                          style={{ color: p.color }}
                        >
                          Build something similar <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      )}
                    </div>

                    {/* accent bar that grows on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                      style={{ background: p.color }}
                    />
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
