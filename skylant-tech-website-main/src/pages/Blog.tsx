import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import BlogIllustration from '../components/BlogIllustration';
import AnimatedBackground from '../components/AnimatedBackground';
import blogs from '../data/blogs.json';
import externalArticles from '../data/externalArticles.json';

function BlogPostCard({ post }: { post: any }) {
  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center rounded-3xl border border-[#E4DBFF] bg-white/70 backdrop-blur-sm p-6 sm:p-10 shadow-sm transition-shadow duration-300 hover:shadow-lg"
      >
        {/* Text column */}
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-[#F3F0FF] text-[#6D5BD0] text-xs font-semibold tracking-wide uppercase mb-6">
            {post.category} · {post.featured ? 'Featured Story' : 'Article'}
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold text-[#2C2A4A] leading-tight mb-5 group-hover:text-[#1D4ED8] transition-colors">
            {post.title}
          </h2>

          <p className="text-[#5B5580] text-base sm:text-lg mb-8">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-[#8B85A8] mb-6">
            <span className="flex items-center gap-2 text-[#2C2A4A] font-medium">
              <img src="/images/skylant website logo.jpeg" alt={post.author} className="w-7 h-7 rounded-full bg-[#F3F0FF] object-contain p-1" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] group-hover:gap-2.5 transition-all">
            Read full article <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Image column */}
        <div className="rounded-3xl overflow-hidden border border-[#E4DBFF] shadow-sm bg-white">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full max-h-[320px] object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </motion.div>
    </Link>
  );
}

function ExternalArticleCard({ article }: { article: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      className="group relative h-full overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-300 hover:shadow-md"
      style={{
        borderColor: `${article.color}40`,
        background: `linear-gradient(160deg, ${article.color}14 0%, rgba(255,255,255,0.92) 55%)`,
      }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: article.color }}
      />
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 flex h-full flex-col"
      >
        {article.image && (
          <div className="relative h-40 w-full overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(180deg, transparent 45%, ${article.color}26 100%)` }}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: article.color }}>
            {article.tag}
          </div>
          <h3 className="mb-3 text-lg font-bold leading-snug text-[#2C2A4A] line-clamp-2">{article.title}</h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-[#5B5580] line-clamp-4">{article.description}</p>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[#8B85A8]">
            <span className="font-medium text-[#5B5580]">{article.author}</span>
            <span>·</span>
            <span>{article.readTime}</span>
            <span>·</span>
            <span>{article.date}</span>
          </div>
          <span
            className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5"
            style={{ color: article.color }}
          >
            Learn more <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export default function Blog() {
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

      {/* BLOG POSTS — each post is one clickable card -> its detail page */}
      <section className="relative py-16 sm:py-20 bg-[#FAF9F7]/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {blogs.map((post: any) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* MORE ARTICLES — external reads, unique colored cards, opens in new tab */}
      <section className="relative py-20 sm:py-24 bg-[#FAF9F7]/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E4DBFF] bg-[#F3F0FF] px-4 py-1.5 text-sm font-medium text-[#6D5BD0]">
              <BookOpen className="h-4 w-4" />
              More Reads
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-[#0F172A]">Handpicked articles </span>
              <span className="text-[#2563EB]">worth your time</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {externalArticles.map((article: any) => (
              <ExternalArticleCard key={article.id} article={article} />
            ))}
          </div>
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