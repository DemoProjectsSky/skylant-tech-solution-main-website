import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import services from '../data/services.json';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services', hasDropdown: true },
  { name: 'Training', path: '/training' },
  { name: 'Internship', path: '/internship' },
  { name: 'Blog', path: '/blog' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-blue-900 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-400 to-blue-900 animate-pulse-glow opacity-50" />
                <span className="relative text-white font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white text-lg tracking-tight">Skylant</span>
                <span className="text-[10px] text-sky-400/80 font-medium tracking-widest uppercase">Tech Solutions</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <Link
                      to={link.path}
                      className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        location.pathname.startsWith('/services')
                          ? 'text-sky-400'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdown ? 'rotate-180' : ''}`} />
                    </Link>
                    <AnimatePresence>
                      {servicesDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-2 w-72"
                        >
                          <div className="glass-card-strong rounded-2xl p-2 shadow-2xl shadow-black/40">
                            <Link
                              to="/services"
                              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                            >
                              <div>
                                <div className="text-white font-medium text-sm">All Services</div>
                                <div className="text-slate-400 text-xs">View everything we offer</div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <div className="h-px bg-white/10 my-1" />
                            {services.map((s) => (
                              <Link
                                key={s.id}
                                to={`/services/${s.slug}`}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                              >
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                                  style={{ background: `${s.color}30`, border: `1px solid ${s.color}50` }}
                                >
                                  {s.shortTitle.slice(0, 2)}
                                </div>
                                <div>
                                  <div className="text-white text-sm font-medium">{s.title}</div>
                                  <div className="text-slate-400 text-xs">{s.shortTitle}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      location.pathname === link.path
                        ? 'text-sky-400'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link to="/contact" className="hidden lg:inline-flex btn-primary text-sm py-2.5 px-5">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] glass-card-strong p-6 pt-24 overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      location.pathname === link.path
                        ? 'bg-sky-500/20 text-sky-400'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {services.map((s) => (
                  <Link
                    key={s.id}
                    to={`/services/${s.slug}`}
                    className="px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all pl-8"
                  >
                    {s.title}
                  </Link>
                ))}
                <Link to="/contact" className="btn-primary mt-4 w-full">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
