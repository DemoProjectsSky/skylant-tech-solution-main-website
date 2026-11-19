import { lazy, Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Home is the landing page (LCP), so it stays in the main bundle.
import Home from './pages/Home';

// Every other route is split into its own chunk and loaded on demand.
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Projects = lazy(() => import('./pages/Projects'));
const Training = lazy(() => import('./pages/Training'));
const Internship = lazy(() => import('./pages/Internship'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const LeadForm = lazy(() => import('./pages/LeadForm'));

// The chat widget is not needed for first paint — load it separately.
const SkylantAIChat = lazy(() => import('./components/SkylantAIChat'));

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [pathname]);

  return null;
}

function PageFallback() {
  return (
    <div
      className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E4DBFF] border-t-[#2F6EFF]" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

/**
 * The lead popup must appear again after every page refresh.
 * We therefore keep the "dismissed" flag in module memory (NOT in
 * sessionStorage/localStorage): a refresh reloads the JS bundle and resets
 * it, while navigating between routes inside the SPA does not re-open the
 * popup after the visitor has already closed it.
 */
let leadFormDismissedThisLoad = false;

function HomeWithLeadPopup() {
  const [showLeadForm, setShowLeadForm] = useState(false);

  useEffect(() => {
    if (leadFormDismissedThisLoad) return;

    const timer = window.setTimeout(() => {
      if (!leadFormDismissedThisLoad) setShowLeadForm(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  const closeLeadForm = () => {
    leadFormDismissedThisLoad = true;
    setShowLeadForm(false);
  };

  return (
    <>
      <Home />

      {showLeadForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label="Skylant lead information form"
        >
          <div className="relative my-auto w-full max-w-xl">
            <Suspense fallback={null}>
              <LeadForm onClose={closeLeadForm} />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedBackground />
      <ScrollToTopOnRoute />

      <Navbar />

      <main className="relative min-h-screen overflow-x-clip pt-9">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomeWithLeadPopup />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/training" element={<Training />} />
            <Route path="/internship" element={<Internship />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      <Suspense fallback={null}>
        <SkylantAIChat />
      </Suspense>
    </BrowserRouter>
  );
}
