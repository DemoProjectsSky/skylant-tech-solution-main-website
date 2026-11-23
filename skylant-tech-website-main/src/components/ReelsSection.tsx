import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Megaphone, Play } from 'lucide-react';
import reels from '../data/reels.json';

/* ---------------------------------------------------------------------
   Digital Marketing Reels — 4 vertical (9:16) reel cards.

   Performance / lazy loading:
   - Posters are lazy-loaded WebP images with explicit width/height.
   - A <video> element is NOT rendered until the visitor taps a card, so no
     video bytes are downloaded on page load (and nothing autoplays on mobile).

   TO USE REAL REELS: put the .mp4 files in `public/reels/` and set the
   `video` field in `src/data/reels.json`, e.g. "video": "/reels/reel-1.mp4".
   Cards without a `video` open the Instagram link instead.
--------------------------------------------------------------------- */

type Reel = {
  id: string;
  title: string;
  caption: string;
  poster: string;
  video: string;
  url: string;
};

function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(reel.video);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group"
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl border border-[#E4DBFF] bg-[#EDE9FE] shadow-lg shadow-[#9B8AFB]/15">
        {playing && hasVideo ? (
          <video
            className="h-full w-full object-cover"
            src={reel.video}
            poster={reel.poster}
            controls
            autoPlay
            muted
            playsInline
            preload="none"
            aria-label={reel.title}
          />
        ) : (
          <>
            <img
              src={reel.poster}
              alt={`Reel preview: ${reel.title}`}
              width={360}
              height={640}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#2C2A4A]">
              <Instagram className="h-3.5 w-3.5 text-[#EC4899]" aria-hidden="true" />
              Reel
            </span>

            {hasVideo ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play reel: ${reel.title}`}
                className="absolute inset-0 flex items-center justify-center focus-visible:outline-offset-[-4px]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                  <Play className="ml-0.5 h-6 w-6 fill-[#2F6EFF] text-[#2F6EFF]" aria-hidden="true" />
                </span>
              </button>
            ) : (
              <a
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch on Instagram: ${reel.title}`}
                className="absolute inset-0 flex items-center justify-center focus-visible:outline-offset-[-4px]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                  <Play className="ml-0.5 h-6 w-6 fill-[#2F6EFF] text-[#2F6EFF]" aria-hidden="true" />
                </span>
              </a>
            )}

          </>
        )}
      </div>
      <h3 className="mt-3 px-1 text-sm font-semibold text-[#2C2A4A]">{reel.title}</h3>
      <p className="px-1 text-sm leading-relaxed text-[#5B5580]">{reel.caption}</p>
    </motion.article>
  );
}

export default function ReelsSection() {
  return (
    <section id="digital-marketing-reels" className="py-20 sm:py-24" aria-labelledby="reels-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E4DBFF] bg-white/70 px-4 py-1.5 text-sm font-medium text-[#EC4899] backdrop-blur-sm">
            <Megaphone className="h-4 w-4" aria-hidden="true" />
            Digital Marketing
          </div>
          <h2 id="reels-heading" className="mb-4 text-3xl font-bold sm:text-4xl">
            <span className="text-[#0F172A]">Digital Marketing in </span>
            <span className="text-[#EC4899]">action</span>
          </h2>
          <p className="text-lg text-[#5B5580]">
            Scroll-stopping reels and social content we create to grow brand reach and generate leads.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {(reels as Reel[]).map((reel, i) => (
            <ReelCard key={reel.id} reel={reel} index={i} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/services/digital-marketing"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2F6EFF] px-6 py-3 font-medium text-white shadow-sm"
          >
            Explore Digital Marketing <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
