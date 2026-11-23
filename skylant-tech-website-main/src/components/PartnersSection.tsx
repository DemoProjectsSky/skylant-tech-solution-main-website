import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Handshake } from 'lucide-react';
import partners from '../data/collaborationPartners.json';

/* Collaboration partners.
   Add or edit partners in `src/data/collaborationPartners.json`.
   Set `logo` (e.g. "/images/partners/cat-india.webp") to show a real logo;
   without a logo an initials badge is rendered. */

type Partner = {
  id: number;
  name: string;
  fullName: string;
  description: string;
  category: string;
  logo: string;
  website: string;
  color: string;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

export default function PartnersSection() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="partners-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E4DBFF] bg-white/70 px-4 py-1.5 text-sm font-medium text-[#6D5BD0] backdrop-blur-sm">
            <Handshake className="h-4 w-4" aria-hidden="true" />
            Collaboration Partners
          </div>
          <h2 id="partners-heading" className="mb-4 text-3xl font-bold sm:text-4xl">
            <span className="text-[#0F172A]">Growing together with </span>
            <span className="text-[#2F6EFF]">trusted partners</span>
          </h2>
          <p className="text-lg text-[#5B5580]">
            We collaborate with organisations that share our focus on skills, technology and business growth.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {(partners as Partner[]).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex items-start gap-5 rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur-sm"
              style={{ borderColor: `${p.color}40` }}
            >
              {p.logo ? (
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 shrink-0 rounded-2xl bg-white object-contain p-1"
                />
              ) : (
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold"
                  style={{ background: `${p.color}18`, color: p.color }}
                  aria-hidden="true"
                >
                  {initials(p.name)}
                </div>
              )}
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: p.color }}>
                  {p.category}
                </p>
                <h3 className="mb-1 text-lg font-semibold text-[#2C2A4A]">{p.fullName || p.name}</h3>
                <p className="text-sm leading-relaxed text-[#5B5580]">{p.description}</p>
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#2F6EFF]"
                  >
                    Visit website <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col items-start justify-center rounded-3xl border border-dashed border-[#C4B5FD] bg-white/50 p-6"
          >
            <h3 className="mb-1 text-lg font-semibold text-[#2C2A4A]">Want to collaborate with us?</h3>
            <p className="mb-4 text-sm leading-relaxed text-[#5B5580]">
              Colleges, training institutes and businesses — let's build something together.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F6EFF]">
              Become a partner <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
