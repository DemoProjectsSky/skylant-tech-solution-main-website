import { Link } from 'react-router-dom';

/** Shown for any address that does not exist (the server still answers with the app, so this is the 404 screen). */
export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-7xl font-bold text-[#2F6EFF]">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">We couldn’t find that page</h1>
      <p className="mt-3 text-slate-600">The link may be old or mistyped. Try one of these instead:</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="rounded-xl bg-[#2F6EFF] px-5 py-3 font-medium text-white hover:bg-[#1f55d6]">Go to home</Link>
        <Link to="/services" className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50">Our services</Link>
        <Link to="/contact" className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50">Contact us</Link>
      </div>
    </section>
  );
}
