import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Calendar, Clock, Share2, Check, Search, FileText, Share as ShareIcon,
  Mail, Megaphone, MapPin, Smartphone, BarChart3, ShieldCheck,
  Settings, ArrowUpRight,
} from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import BlogIllustration from '../components/BlogIllustration';
import AnimatedBackground from '../components/AnimatedBackground';
import blogs from '../data/blogs.json';

const post = blogs[0];

const tips = [
  { icon: Search, title: 'SEO Optimization', desc: 'Target the right keywords, optimize content, and improve site performance to rank higher on Google and grow organic traffic.', color: '#2563EB' },
  { icon: FileText, title: 'Content Marketing', desc: 'Publish blogs, guides, and case studies that solve real customer problems and position your brand as an industry expert.', color: '#EC4899' },
  { icon: ShareIcon, title: 'Social Media Marketing', desc: 'Use LinkedIn, Facebook, Instagram, and X to engage customers directly, build awareness, and generate quality leads.', color: '#8B5CF6' },
  { icon: Mail, title: 'Email Marketing Campaigns', desc: 'Personalized email flows nurture leads, improve retention, and turn one-time buyers into repeat customers.', color: '#F97316' },
  { icon: Megaphone, title: 'Paid Advertising', desc: 'Google Ads and social campaigns put your business in front of highly targeted audiences for faster results.', color: '#22C55E' },
  { icon: MapPin, title: 'Local SEO', desc: 'An optimized Google Business Profile and local listings help nearby customers find you when it matters most.', color: '#14B8A6' },
  { icon: Smartphone, title: 'Mobile Optimization', desc: 'A fast, mobile-friendly site keeps the majority of your visitors engaged and improves search rankings.', color: '#2563EB' },
  { icon: BarChart3, title: 'Analytics & Performance Tracking', desc: 'Google Analytics and similar tools turn campaign data into clear, data-driven decisions.', color: '#7C3AED' },
  { icon: ShieldCheck, title: 'Brand Consistency', desc: 'The same voice, colors, and message across every channel builds trust and recognition over time.', color: '#1E3A8A' },
  { icon: Settings, title: 'Marketing Automation', desc: 'Automate follow-ups, lead nurturing, and social scheduling to save time and scale effort-free.', color: '#16A34A' },
];

export default function Blog() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled the share sheet — do nothing
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Could not copy link:', err);
    }
  };

  return (
    <>
      <AnimatedBackground />

      <PageBanner
        title={
          <>
            Insights, ideas, <span style={{ color: '#2563EB' }}>and innovation</span>
          </>
        }
        description="A closer look at the strategies Skylant uses to help businesses build a strong online presence."
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Blog' }]}
        illustration={<BlogIllustration />}
        primaryCta={{ label: 'Subscribe', path: '/contact' }}
        secondaryCta={{ label: 'Contact Us', path: '/contact' }}
      />

      {/* FEATURED ARTICLE — text + image side by side */}
      <section className="relative py-16 sm:py-20 bg-[#FAF9F7]/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Text column */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-[#F3F0FF] text-[#6D5BD0] text-xs font-semibold tracking-wide uppercase mb-6"
            >
              {post.category} · Featured Story
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#2C2A4A] leading-tight mb-5"
            >
              {post.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#5B5580] text-base sm:text-lg mb-8"
            >
              {post.excerpt}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-5 text-sm text-[#8B85A8]"
            >
              <span className="flex items-center gap-2 text-[#2C2A4A] font-medium">
                <img src="/images/skylant website logo.jpeg" alt={post.author} className="w-7 h-7 rounded-full bg-[#F3F0FF] object-contain p-1" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
            </motion.div>
          </div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl overflow-hidden border border-[#E4DBFF] shadow-sm"
          >
            <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="relative bg-[#F3F0FF]/50 backdrop-blur-sm py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_280px] gap-14">
          <div>
            <p className="text-[#2C2A4A] text-base leading-relaxed mb-12 max-w-2xl">
              In today&rsquo;s digital world, having a website is not enough. Businesses need a smart digital marketing strategy to attract customers, generate leads, and build long-term brand value &mdash; here are 10 proven ways to stay ahead of the competition.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {tips.map((tip, i) => (
                <motion.div
                  key={tip.title}
                  id={`tip-${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                  className="relative rounded-2xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="flex items-center justify-center w-10 h-10 rounded-xl text-white text-sm font-bold rotate-45 shrink-0"
                      style={{ backgroundColor: tip.color }}
                    >
                      <span className="-rotate-45">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: `${tip.color}1A` }}>
                      <tip.icon className="w-5 h-5" style={{ color: tip.color }} />
                    </span>
                  </div>
                  <h3 className="text-[#2C2A4A] font-bold text-lg mb-1.5">{tip.title}</h3>
                  <p className="text-[#5B5580] text-sm leading-relaxed">{tip.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-10 rounded-2xl border border-[#E4DBFF] bg-white/70 backdrop-blur-sm p-8 sm:p-10"
            >
              <h3 className="text-xl font-bold text-[#2C2A4A] mb-3">Final Thoughts</h3>
              <p className="text-[#5B5580] leading-relaxed">
                Successful digital marketing requires the right strategy, tools, and execution. At Skylant Tech Solutions, we help businesses improve online visibility, generate quality leads, and accelerate growth through SEO, social media marketing, paid advertising, website development, and business automation solutions.
              </p>
            </motion.div>
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm p-5 shadow-sm">
                <p className="text-xs font-semibold tracking-wide uppercase text-[#8B85A8] mb-4">In this article</p>
                <ul className="space-y-2.5">
                  {tips.map((tip, i) => (
                    <li key={tip.title}>
                      <a
                        href={`#tip-${i + 1}`}
                        className="flex items-center gap-2 text-sm text-[#5B5580] hover:text-[#6D5BD0] transition-colors"
                      >
                        <span className="font-semibold w-5" style={{ color: tip.color }}>{i + 1}.</span>
                        {tip.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm p-5 shadow-sm">
                <p className="text-xs font-semibold tracking-wide uppercase text-[#8B85A8] mb-3">Share this article</p>
                <button
                  onClick={handleShare}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] text-white text-sm font-medium py-2.5 hover:bg-[#1E40AF] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" /> Link copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" /> Share
                    </>
                  )}
                </button>
              </div>

              <a
                href="/contact"
                className="flex items-center justify-between rounded-2xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all group"
              >
                <span className="text-sm font-semibold text-[#2C2A4A]">Need this for your business?</span>
                <ArrowUpRight className="w-4 h-4 text-[#6D5BD0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative py-20 sm:py-24 bg-[#FAF9F7]/70 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm shadow-sm p-8 lg:p-12 text-center"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-[#2C2A4A] mb-3">Subscribe to our newsletter</h2>
            <p className="text-[#5B5580] mb-6">Get the latest insights on software, AI, and technology delivered to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-[#E4DBFF] bg-white text-[#2C2A4A] text-sm placeholder:text-[#8B85A8] focus:outline-none focus:border-[#6D5BD0]/60"
              />
              <button type="submit" className="rounded-xl bg-[#1D4ED8] px-6 py-3 font-medium text-white transition-colors hover:bg-[#1E40AF]">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}