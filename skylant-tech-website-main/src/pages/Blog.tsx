import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import BlogIllustration from '../components/BlogIllustration';
import blogs from '../data/blogs.json';

const categories = ['All', 'AI & Technology', 'Cloud', 'Mobile Development', 'Digital Marketing', 'Software Architecture', 'Design'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = blogs.filter((b) => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogs.find((b) => b.featured) || blogs[0];
  const rest = filtered.filter((b) => b.id !== featured.id || activeCategory !== 'All' || search);

  return (
    <>
      <PageBanner
  title={
    <>
      Insights, ideas, <span style={{ color: '#2F6EFF' }}>and innovation</span>
    </>
  }
  description="Explore our latest articles on software development, AI, cloud, design, and the technologies shaping the future of business."
  breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Blog' }]}
  illustration={<BlogIllustration />}
  primaryCta={{ label: 'Subscribe', path: '/contact' }}
  secondaryCta={{ label: 'Contact Us', path: '/contact' }}
/>

      {/* FEATURED */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-white/80 backdrop-blur-sm text-[#6D5BD0] text-sm font-medium mb-5">
              <TrendingUp className="w-4 h-4" /> Featured Article
            </div>
          </motion.div>
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-[#E4DBFF] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md overflow-hidden transition-all group grid lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-[#8783A6] mb-4">
                <span className="px-3 py-1 rounded-full bg-[#F3F0FF] border border-[#E4DBFF] text-[#6D5BD0] font-medium">{featured.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(featured.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#2C2A4A] mb-4 group-hover:text-[#6D5BD0] transition-colors">{featured.title}</h2>
              <p className="text-[#5B5580] leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-3 mb-6">
                <img src={featured.authorAvatar} alt={featured.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-[#2C2A4A] font-semibold text-sm">{featured.author}</div>
                  <div className="text-[#8783A6] text-xs">Author</div>
                </div>
              </div>
              <button className="inline-flex items-center gap-1.5 text-[#6D5BD0] font-medium text-sm group-hover:gap-2.5 transition-all self-start">
                Read Article <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.article>
        </div>
      </section>

      {/* LATEST + FILTER */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10"
          >
            <h2 className="text-3xl font-bold text-[#2C2A4A]">Latest Articles</h2>
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8783A6]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E4DBFF] bg-white/80 backdrop-blur-sm text-[#2C2A4A] text-sm placeholder:text-[#8783A6] focus:outline-none focus:border-[#6D5BD0]/50"
              />
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? 'bg-[#6D5BD0] border-[#6D5BD0] text-white'
                    : 'border-[#E4DBFF] bg-white/60 backdrop-blur-sm text-[#5B5580] hover:text-[#2C2A4A] hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((b, i) => (
              <motion.article
                key={b.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-[#E4DBFF] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md overflow-hidden transition-all group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-xs font-medium text-[#2C2A4A] shadow-sm">{b.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-[#8783A6] mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{b.readTime}</span>
                  </div>
                  <h3 className="text-[#2C2A4A] font-bold text-base mb-2 group-hover:text-[#6D5BD0] transition-colors line-clamp-2">{b.title}</h3>
                  <p className="text-[#5B5580] text-sm leading-relaxed line-clamp-2 mb-4">{b.excerpt}</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-[#E4DBFF]">
                    <img src={b.authorAvatar} alt={b.author} className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-[#5B5580] text-xs">{b.author}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-[#8783A6]">No articles found. Try a different search or category.</div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
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
                className="flex-1 px-4 py-3 rounded-xl border border-[#E4DBFF] bg-white text-[#2C2A4A] text-sm placeholder:text-[#8783A6] focus:outline-none focus:border-[#6D5BD0]/50"
              />
              <button type="submit" className="rounded-xl bg-[#6D5BD0] px-6 py-3 font-medium text-white transition-colors hover:bg-[#5b4bb8]">
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