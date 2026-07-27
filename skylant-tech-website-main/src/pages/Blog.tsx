import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
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
        title="Insights, ideas, and innovation"
        description="Explore our latest articles on software development, AI, cloud, design, and the technologies shaping the future of business."
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Blog' }]}
        image="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=900&h=1000&dpr=2"
        floatingCards={[
          { icon: <TrendingUp className="w-4 h-4" />, title: 'Latest Trends' },
          { icon: <Clock className="w-4 h-4" />, title: 'Expert Insights' },
        ]}
        stats={[{ value: '50+', label: 'Articles' }, { value: '6', label: 'Categories' }, { value: '10K+', label: 'Readers' }]}
        primaryCta={{ label: 'Subscribe', path: '/contact' }}
        secondaryCta={{ label: 'Contact Us', path: '/contact' }}
      />

      {/* FEATURED */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><TrendingUp className="w-4 h-4" /> Featured Article</div>
          </motion.div>
          <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card rounded-3xl overflow-hidden hover:border-sky-400/30 transition-all group grid lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-medium">{featured.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(featured.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-sky-400 transition-colors">{featured.title}</h2>
              <p className="text-slate-400 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-3 mb-6">
                <img src={featured.authorAvatar} alt={featured.author} className="w-10 h-10 rounded-full object-cover" />
                <div><div className="text-white font-semibold text-sm">{featured.author}</div><div className="text-slate-500 text-xs">Author</div></div>
              </div>
              <button className="inline-flex items-center gap-1.5 text-sky-400 font-medium text-sm group-hover:gap-2.5 transition-all self-start">Read Article <ArrowRight className="w-4 h-4" /></button>
            </div>
          </motion.article>
        </div>
      </section>

      {/* LATEST + FILTER */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <h2 className="text-3xl font-bold text-white">Latest Articles</h2>
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-card text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-400/40" />
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-sky-500/20 border border-sky-400/40 text-sky-400' : 'glass-card text-slate-400 hover:text-white'}`}>{cat}</button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((b, i) => (
              <motion.article key={b.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} whileHover={{ y: -6 }} className="glass-card rounded-2xl overflow-hidden hover:border-sky-400/30 transition-all group cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3"><span className="px-2.5 py-1 rounded-full glass-card-strong text-xs font-medium text-white">{b.category}</span></div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{b.readTime}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-sky-400 transition-colors line-clamp-2">{b.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">{b.excerpt}</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                    <img src={b.authorAvatar} alt={b.author} className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-slate-400 text-xs">{b.author}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">No articles found. Try a different search or category.</div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card-strong rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Subscribe to our newsletter</h2>
            <p className="text-slate-400 mb-6">Get the latest insights on software, AI, and technology delivered to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" required placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-xl glass-card text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-400/40" />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
