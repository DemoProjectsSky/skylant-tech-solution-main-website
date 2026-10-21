import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SkylantAIChat from './components/SkylantAIChat';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Training from './pages/Training';
import Internship from './pages/Internship';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import LeadForm from './pages/LeadForm';

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

function HomeWithLeadPopup() {
  const [showLeadForm, setShowLeadForm] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) === 'true') {
      return;
    }

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
      <Home />

      {showLeadForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label="Skylant lead information form"
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

      <Navbar />

      <main className="relative min-h-screen pt-9">
        <Routes>
          <Route path="/" element={<HomeWithLeadPopup />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/training" element={<Training />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <SkylantAIChat />
    </BrowserRouter>
  );
}