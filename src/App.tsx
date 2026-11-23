import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';

import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const SkylantAIChat = lazy(() => import('./components/SkylantAIChat')); // loaded after the page, not before

import Home from './pages/Home';
import LeadForm from './pages/LeadForm';
import { applySeo } from './lib/seo';

// Every page except the home page is downloaded only when it is opened (smaller first load).
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

/** Updates the browser title, description and social tags whenever the page changes. */
function RouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => { applySeo(pathname); }, [pathname]);
  return null;
}

function PageLoading() {
  return <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page"><div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#2F6EFF]" /></div>;
}

const DISMISS_KEY = 'skylantLeadFormDismissed';

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

function InternshipWithLeadPopup() {
  const [showLeadForm, setShowLeadForm] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem(DISMISS_KEY);

    const timer = window.setTimeout(() => {
      if (sessionStorage.getItem(DISMISS_KEY) !== 'true') {
        setShowLeadForm(true);
      }
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  const closeLeadForm = () => {
    sessionStorage.setItem(DISMISS_KEY, 'true');
    setShowLeadForm(false);
  };

  return (
    <>
      <Internship />

      {showLeadForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label="Begin Your Career Journey with Skylant"
        >
          <div className="relative my-auto w-full max-w-xl">
            <LeadForm onClose={closeLeadForm} />
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
      <RouteSeo />

      <Navbar />

      <main className="relative min-h-screen pt-9">
        <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/training" element={<Training />} />
          <Route path="/internship" element={<InternshipWithLeadPopup />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>

      <Footer />
      <Suspense fallback={null}><SkylantAIChat /></Suspense>
    </BrowserRouter>
  );
}