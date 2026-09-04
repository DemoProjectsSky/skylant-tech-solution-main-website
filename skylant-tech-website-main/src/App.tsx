import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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

export default function App() {
  return (
    <BrowserRouter>
      {/* Background animation */}
      <AnimatedBackground />

      {/* Scroll to top on route change */}
      <ScrollToTopOnRoute />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative min-h-screen pt-9">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* About */}
          <Route path="/about" element={<About />} />

          {/* Services */}
          <Route path="/services" element={<Services />} />

          {/* Service Detail */}
          <Route
            path="/services/:slug"
            element={<ServiceDetail />}
          />

          {/* Training */}
          <Route path="/training" element={<Training />} />

          {/* Internship */}
          <Route path="/internship" element={<Internship />} />

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />

          {/* Blog Detail */}
          <Route
            path="/blog/:slug"
            element={<BlogPostDetail />}
          />

          {/* Careers */}
          <Route path="/careers" element={<Careers />} />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />

          {/* 404 */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Chat */}
      <SkylantAIChat />

    </BrowserRouter>
  );
}