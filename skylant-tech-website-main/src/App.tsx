import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SkylantAIChat from './components/SkylantAIChat';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Training from './pages/Training';
import Internship from './pages/Internship';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Mounted once here — fixed + full-viewport, so the lavender
          ambient animation stays behind every route as you navigate
          and scroll, not just the Home page. */}
      <AnimatedBackground />
      <ScrollToTopOnRoute />
      <Navbar />
      {/* pt-9 pushes content below the new opaque top bar (h-9) so it
          isn't hidden underneath it; the transparent nav still overlaps
          the hero below that, same as before. */}
      <main className="relative min-h-screen pt-9">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/training" element={<Training />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <SkylantAIChat />
      <ScrollToTop />
    </BrowserRouter>
  );
}