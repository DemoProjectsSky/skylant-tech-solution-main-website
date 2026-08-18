import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Image as ImageIcon, Film, Play, ArrowRight } from 'lucide-react';

/* ---------------------------------------------------------------------
   Digital Marketing Showcase — "Hanging Cards"

   A light, glass, studio-proof-sheet take on a content preview: cards
   clipped to taut wires like proofs pinned up to dry, swaying gently.
   This is a *teaser* only — no metrics, no case-study copy. The full
   portfolio lives on the dedicated Digital Marketing page (CTA below).

   Colors match the rest of the home page (lavender x off-white
   theme) so it reads as part of the same site.
   bg-wash   #F3F0FF   bg-section  #EDE9FE
   violet    #6D5BD0   iris        #9B8AFB
   text      #2C2A4A   muted       #5B5580   border  #E4DBFF

   Image/video wiring:
   - `image` -> shown as the card thumbnail (use this for posts/ad creatives).
   - `video` -> if present, an actual <video> plays (muted, looped,
     autoplaying) using `image` as its poster. Point this at your real
     reel file (e.g. "/reels/my-reel-1.mp4") once you have it uploaded —
     until then it just shows the image thumbnail.

   REAL CONTENT WIRED IN:
   - ig-reel   -> /images/skylant_insta_reels.jpeg  ("Corporate employee on Sunday" reel)
   - story     -> /images/skylant_insta_short.jpeg  ("Team meeting ke time HR ka call aa gaya" short)
   - fb-post   -> /images/skylant_facebook_post.jpeg ("What is ChatGPT?" carousel post)

   TO USE THESE: place the 3 files in your project's `public/images/`
   folder with these exact names:
     public/images/skylant_insta_reels.jpeg
     public/images/skylant_insta_short.jpeg
     public/images/skylant_facebook_post.jpeg

   TO ADD YOUR OWN REELS LATER (actual playable video):
   1. Drop your .mp4 file(s) into `public/reels/` (create if needed),
      e.g. public/reels/reel-1.mp4
   2. Set the `video` field on the card to that path, e.g.
      video: '/reels/reel-1.mp4'
   3. Keep `image` pointing at the matching screenshot as the poster.
--------------------------------------------------------------------- */

// Demo placeholder — used only for cards without real content yet.
const DEMO_IMAGE =
  'https://img.freepik.com/premium-vector/digital-marketing-social-media-post-design-template-free-vector_440247-132.jpg?w=2000';

type CardData = {
  id: string;
  platform: string;
  label: string;
  icon: any;
  accent: string;
  drop: number; // string length in px
  tilt: number; // resting rotation in degrees
  image?: string; // real thumbnail / reel poster
  video?: string; // real reel/video file — set this to show your actual reel
  url?: string; // link to the real post/reel on the platform — card becomes clickable
};

// Real links — pulled straight from the footer's social icons.
const IG_URL = 'https://www.instagram.com/skylant.tech?igsh=MWE5cjI5eTFhZmlldQ==';
const FB_URL = 'https://www.facebook.com/profile.php?id=61588489421573&rdid=NXcauZFIxd2VJUMD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1LSvDGzdc8%2F#';
const LI_URL = 'https://in.linkedin.com/company/skylant-tech-solutions';

const ropeOne: CardData[] = [
  { id: 'ig-post', platform: 'Instagram', label: 'Instagram Post', icon: Instagram, accent: '#EC4899', drop: 44, tilt: -4, image: DEMO_IMAGE, url: IG_URL },
  // Real Facebook post — "What is ChatGPT?" carousel
  { id: 'fb-post', platform: 'Facebook', label: 'Facebook Post', icon: Facebook, accent: '#2563EB', drop: 72, tilt: 3, image: '/images/skylant facebook post.jpeg', url: FB_URL },
  { id: 'g-ads', platform: 'Google Ads', label: 'Ad Creative', icon: ImageIcon, accent: '#10B981', drop: 52, tilt: -3, image: 'https://cdn.takeflyte.com/uploads/2020/10/29165128/Google-Ads-flyte-new-media.jpeg', url: 'https://ads.google.com/' },
];

const ropeTwo: CardData[] = [
  // Real Instagram Reel — "Corporate employee on Sunday"
  { id: 'ig-reel', platform: 'Instagram', label: 'Instagram Reel', icon: Film, accent: '#F59E0B', drop: 60, tilt: 4, image: '/images/skylant insta reels.jpeg', url: IG_URL },
  { id: 'li-post', platform: 'LinkedIn', label: 'LinkedIn Post', icon: Linkedin, accent: '#0EA5E9', drop: 40, tilt: -4, image: '/images/skylant linkdin post.jpg', url: LI_URL },
  // Real short video — "Team meeting ke time HR ka call aa gaya"
  { id: 'story', platform: 'YOUTUBE', label: 'Short Video', icon: Play, accent: '#9B8AFB', drop: 68, tilt: 3, image: '/images/skylant insta short.jpeg', url: IG_URL },
];

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E4DBFF] bg-gradient-to-r from-white/80 via-[#F3F0FF]/80 to-white/80 px-4 py-1.5 text-sm font-medium text-[#6D5BD0] backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-[#9B8AFB]" />
      {label}
    </div>
  );
}

function Rope({ cards, prefersReducedMotion }: { cards: CardData[]; prefersReducedMotion: boolean | null }) {
  return (
    <div className="relative mb-24 last:mb-0 sm:mb-28">
      {/* the wire itself */}
      <div className="relative h-px w-full" aria-hidden="true">
        <motion.div
          className="absolute inset-y-0 left-0 h-px w-full origin-left"
          style={{ background: 'linear-gradient(90deg, transparent, #C4B5FD 6%, #C4B5FD 94%, transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <span className="absolute -top-[3px] left-[6%] h-[7px] w-[7px] rounded-full bg-[#9B8AFB]/80 shadow-[0_0_10px_2px_rgba(155,138,251,0.45)]" />
        <span className="absolute -top-[3px] right-[6%] h-[7px] w-[7px] rounded-full bg-[#9B8AFB]/80 shadow-[0_0_10px_2px_rgba(155,138,251,0.45)]" />
      </div>

      {/* hangers */}
      <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-14 px-2 pt-0 sm:justify-around sm:gap-x-8">
        {cards.map((card, i) => (
          <HangingCard key={card.id} data={card} index={i} prefersReducedMotion={prefersReducedMotion} />
        ))}
      </div>
    </div>
  );
}

function CardMedia({ data }: { data: CardData }) {
  const Icon = data.icon;
  const [videoFailed, setVideoFailed] = useState(false);

  // Real reel/video, once you've set `video` on the card data above.
  if (data.video && !videoFailed) {
    return (
      <div className="relative h-48 w-full overflow-hidden bg-[#EDE9FE]">
        <video
          className="h-full w-full object-cover"
          src={data.video}
          poster={data.image}
          muted
          loop
          autoPlay
          playsInline
          onError={() => setVideoFailed(true)}
        />
        <span className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/45">
          <Play className="h-3.5 w-3.5 fill-white text-white" />
        </span>
      </div>
    );
  }

  // Real image thumbnail (or poster fallback if a video failed to load).
  if (data.image) {
    return (
      <div className="relative h-48 w-full overflow-hidden bg-[#EDE9FE]">
        <img src={data.image} alt={`${data.label} placeholder`} loading="lazy" className="h-full w-full object-cover" />
        {data.video !== undefined && (
          <span className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/45">
            <Play className="h-3.5 w-3.5 fill-white text-white" />
          </span>
        )}
      </div>
    );
  }

  // Icon-only placeholder for cards without media yet.
  return (
    <div
      className="relative flex h-48 items-center justify-center"
      style={{ background: `linear-gradient(160deg, ${data.accent}16 0%, rgba(255,255,255,0.4) 100%)` }}
    >
      <Icon className="h-11 w-11" style={{ color: data.accent, opacity: 0.85 }} />
    </div>
  );
}

function HangingCard({
  data,
  index,
  prefersReducedMotion,
}: {
  data: CardData;
  index: number;
  prefersReducedMotion: boolean | null;
}) {
  const Icon = data.icon;
  const stringDelay = 0.25 + index * 0.12;
  const cardDelay = stringDelay + 0.22;

  return (
    <div className="flex flex-col items-center" style={{ width: 220 }}>
      {/* string — grows down from the rope */}
      <motion.div
        className="w-px origin-top bg-gradient-to-b from-[#C4B5FD] to-[#C4B5FD]/25"
        style={{ height: data.drop }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, delay: stringDelay, ease: 'easeOut' }}
        aria-hidden="true"
      />

      {/* pin / clip where the card grips the string */}
      <motion.span
        className="relative z-10 -mt-px h-2.5 w-2.5 rounded-full border border-white bg-[#9B8AFB]"
        style={{ boxShadow: '0 0 8px rgba(155,138,251,0.5)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.3, delay: stringDelay + 0.15 }}
        aria-hidden="true"
      />

      {/* card entrance — fade + rise + spring settle into resting tilt */}
      <motion.div
        className="-mt-1"
        style={{ transformOrigin: 'top center' }}
        initial={{ opacity: 0, y: -18, rotate: data.tilt * 1.8 }}
        whileInView={{ opacity: 1, y: 0, rotate: data.tilt }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: 'spring', stiffness: 190, damping: 13, mass: 0.7, delay: cardDelay }}
      >
        {/* continuous idle swing, layered on top of the settled tilt above */}
        <motion.a
          href={data.url || undefined}
          target={data.url ? '_blank' : undefined}
          rel={data.url ? 'noopener noreferrer' : undefined}
          aria-label={data.url ? `Open ${data.label} on ${data.platform}` : undefined}
          style={{ transformOrigin: 'top center' }}
          animate={prefersReducedMotion ? undefined : { rotate: [-1.6, 1.6, -1.6] }}
          transition={{ duration: 4.5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={
            prefersReducedMotion
              ? undefined
              : { rotate: data.tilt >= 0 ? 8 : -8, transition: { duration: 0.4, ease: 'easeOut' } }
          }
          className={`block w-[220px] overflow-hidden rounded-2xl border border-[#E4DBFF] bg-white/75 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(109,91,208,0.2)] ${data.url ? 'cursor-pointer' : 'cursor-default'}`}
        >
          {/* platform badge */}
          <div className="flex items-center gap-2 border-b border-[#E4DBFF] px-4 py-2.5">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full"
              style={{ background: `${data.accent}18`, color: data.accent }}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="text-[13px] font-medium text-[#8783A6]">{data.platform}</span>
          </div>

          {/* thumbnail / reel media */}
          <CardMedia data={data} />

          {/* content type label */}
          <div className="px-4 py-3.5 text-center text-sm font-semibold text-[#2C2A4A]">
            {data.label}
          </div>
        </motion.a>
      </motion.div>
    </div>
  );
}

export default function DigitalMarketingShowcase() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center sm:mb-20"
        >
          <SectionEyebrow label="Content We Create" />
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            <span className="text-[#2C2A4A]">Digital Marketing </span>
            <span className="text-[#9B8AFB]">Showcase</span>
          </h2>
          <p className="text-lg leading-relaxed text-[#5B5580]">
            From engaging social media posts to high-impact reels and ad creatives, here&rsquo;s a quick
            glimpse of the digital experiences we create.
          </p>
        </motion.div>

        <Rope cards={ropeOne} prefersReducedMotion={prefersReducedMotion} />
        <Rope cards={ropeTwo} prefersReducedMotion={prefersReducedMotion} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 flex justify-center sm:mt-8"
        >
          <Link
            to="/services/digital-marketing"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2F6EFF] px-7 py-3.5 font-medium text-white shadow-sm transition-colors hover:bg-[#2F6EFF]"
          >
            Explore Digital Marketing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}