import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Share2,
  Check,
  ArrowUpRight,
  ArrowLeft,
} from 'lucide-react';

import CTASection from '../components/CTASection';
import blogs from '../data/blogs.json';
import { blogContents } from '../data/blogsections';

function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();

  const [copied, setCopied] = useState(false);

  // Find blog post from blogs.json
  const post = blogs.find(
    (p: any) => p.slug === slug
  );

  // Find detailed content from blogsections
  const content = blogContents.find(
    (c: any) => c.slug === slug
  );

  // ==========================================================
  // POST NOT FOUND
  // ==========================================================

  if (!post || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7] px-4">
        <div className="max-w-3xl mx-auto py-24 text-center">

          <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2A4A] mb-4">
            Post not found
          </h2>

          <p className="text-[#5B5580] mb-8">
            The blog post you are looking for does not exist or
            may have been removed.
          </p>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-6 py-3 text-white font-medium hover:bg-[#1E40AF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

        </div>
      </div>
    );
  }

  // ==========================================================
  // SHARE FUNCTION
  // ==========================================================

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    // Mobile / supported browsers
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled share
      }

      return;
    }

    // Desktop fallback
    try {
      await navigator.clipboard.writeText(
        shareData.url
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(
        'Could not copy link:',
        err
      );
    }
  };

  // ==========================================================
  // MAIN PAGE
  // ==========================================================

  return (
    <>
      {/* ======================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#F3F0FF] to-[#FAF9F7]">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back to Blog */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#6D5BD0] font-medium mb-6 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Category */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-[#F3F0FF] text-[#6D5BD0] text-xs font-semibold tracking-wide uppercase">
              {post.category}

              {' · '}

              {post.featured
                ? 'Featured Story'
                : 'Article'}
            </span>
          </div>

          {/* Blog Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#2C2A4A] leading-tight mb-5">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-[#5B5580] text-base sm:text-lg mb-6 max-w-4xl leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-[#8B85A8]">

            {/* Author */}
            <span className="flex items-center gap-2 text-[#2C2A4A] font-medium">

              <img
                src={
                  post.authorAvatar ||
                  '/images/skylant website logo.jpeg'
                }
                alt={post.author}
                className="w-8 h-8 rounded-full bg-[#F3F0FF] object-contain p-1"
              />

              {post.author}

            </span>

            {/* Date */}
            <span className="flex items-center gap-1.5">

              <Calendar className="w-4 h-4" />

              {new Date(
                post.date
              ).toLocaleDateString(
                'en-US',
                {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }
              )}

            </span>

            {/* Read Time */}
            <span className="flex items-center gap-1.5">

              <Clock className="w-4 h-4" />

              {post.readTime}

            </span>

          </div>

        </div>
      </section>

      {/* ======================================================
          ARTICLE BODY
      ====================================================== */}

      <section className="relative bg-[#F3F0FF]/50 backdrop-blur-sm py-16 sm:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_280px] gap-14">

          {/* ==================================================
              MAIN ARTICLE
          ================================================== */}

          <main>

            {/* ==================================================
                INTRO + RECTANGLE IMAGE
            ================================================== */}

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-10 items-center mb-12">

              {/* INTRO - LEFT */}
              <div>

                <p className="text-[#2C2A4A] text-base sm:text-lg leading-relaxed">
                  {content.intro}
                </p>

              </div>

              {/* IMAGE - RIGHT */}
              <div className="w-full h-[220px] sm:h-[280px] lg:h-[300px] rounded-2xl overflow-hidden border border-[#E4DBFF] bg-white shadow-sm">

                <img
                  src={post.image}
                  alt={post.title}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />

              </div>

            </div>

            {/* ==================================================
                ARTICLE SECTION CARDS
            ================================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {content.sections.map(
                (section: any, i: number) => (
                  <div
                    key={section.title}
                    id={`tip-${i + 1}`}
                    className="relative rounded-2xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-6"
                  >

                    {/* Number + Icon */}
                    <div className="flex items-center gap-3 mb-4">

                      {/* Number */}
                      <span
                        className="flex items-center justify-center w-10 h-10 rounded-xl text-white text-sm font-bold rotate-45 shrink-0"
                        style={{
                          backgroundColor:
                            section.color,
                        }}
                      >
                        <span className="-rotate-45">
                          {String(i + 1).padStart(
                            2,
                            '0'
                          )}
                        </span>
                      </span>

                      {/* Icon */}
                      <span
                        className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                        style={{
                          backgroundColor: `${section.color}1A`,
                        }}
                      >

                        {section.icon && (
                          <section.icon
                            className="w-5 h-5"
                            style={{
                              color:
                                section.color,
                            }}
                          />
                        )}

                      </span>

                    </div>

                    {/* Section Title */}
                    <h3 className="text-[#2C2A4A] font-bold text-lg mb-1.5">
                      {section.title}
                    </h3>

                    {/* Section Description */}
                    <p className="text-[#5B5580] text-sm leading-relaxed">
                      {section.desc}
                    </p>

                  </div>
                )
              )}

            </div>

            {/* ==================================================
                FINAL THOUGHTS
            ================================================== */}

            <div className="mt-10 rounded-2xl border border-[#E4DBFF] bg-white/70 backdrop-blur-sm p-8 sm:p-10">

              <h3 className="text-xl sm:text-2xl font-bold text-[#2C2A4A] mb-3">
                {content.finalThoughtsTitle}
              </h3>

              <p className="text-[#5B5580] leading-relaxed">
                {content.finalThoughts}
              </p>

            </div>

          </main>

          {/* ==================================================
              SIDEBAR
          ================================================== */}

          <aside className="hidden lg:block">

            <div className="sticky top-24 space-y-6">

              {/* =================================================
                  IN THIS ARTICLE
              ================================================= */}

              <div className="rounded-2xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm p-5 shadow-sm">

                <p className="text-xs font-semibold tracking-wide uppercase text-[#8B85A8] mb-4">
                  In this article
                </p>

                <ul className="space-y-2.5">

                  {content.sections.map(
                    (section: any, i: number) => (
                      <li key={section.title}>

                        <a
                          href={`#tip-${i + 1}`}
                          className="flex items-center gap-2 text-sm text-[#5B5580] hover:text-[#6D5BD0] transition-colors"
                        >

                          <span
                            className="font-semibold w-5"
                            style={{
                              color:
                                section.color,
                            }}
                          >
                            {i + 1}.
                          </span>

                          <span>
                            {section.title}
                          </span>

                        </a>

                      </li>
                    )
                  )}

                </ul>

              </div>

              {/* =================================================
                  SHARE ARTICLE
              ================================================= */}

              <div className="rounded-2xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm p-5 shadow-sm">

                <p className="text-xs font-semibold tracking-wide uppercase text-[#8B85A8] mb-3">
                  Share this article
                </p>

                <button
                  onClick={handleShare}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] text-white text-sm font-medium py-2.5 hover:bg-[#1E40AF] transition-colors"
                >

                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Link copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      Share
                    </>
                  )}

                </button>

              </div>

              {/* =================================================
                  CONTACT CTA
              ================================================= */}

              <Link
                to="/contact"
                className="flex items-center justify-between rounded-2xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all group"
              >

                <span className="text-sm font-semibold text-[#2C2A4A]">
                  Need this for your business?
                </span>

                <ArrowUpRight className="w-4 h-4 text-[#6D5BD0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />

              </Link>

            </div>

          </aside>

        </div>
      </section>

      {/* ======================================================
          CTA SECTION
      ====================================================== */}

      <CTASection />
    </>
  );
}

/*
  IMPORTANT:
  Default export is used by App.tsx
*/
export default BlogPostDetail;