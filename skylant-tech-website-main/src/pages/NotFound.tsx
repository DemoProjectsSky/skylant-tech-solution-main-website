import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: 'Page Not Found | Skylant Tech Solution Pvt. Ltd.',
    description: 'The page you are looking for does not exist.',
    noindex: true,
  });

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#2F6EFF]">Error 404</p>
      <h1 className="mb-4 text-4xl font-bold text-[#0F172A] sm:text-5xl">Page not found</h1>
      <p className="mb-8 text-lg text-[#5B5580]">
        The page you are looking for may have been moved or no longer exists.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#2F6EFF] px-6 py-3 font-medium text-white shadow-sm"
        >
          Back to Home <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2563EB] bg-white/70 px-6 py-3 font-medium text-[#2C2A4A]"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
