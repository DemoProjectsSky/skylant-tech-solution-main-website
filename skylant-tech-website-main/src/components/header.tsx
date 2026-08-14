import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, X, Menu } from 'lucide-react';
import services from '../data/services.json';
import TopBar from './topbar';

// NOTE: I don't have your original navLinks array — adjust names/paths if these don't match.
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services', hasDropdown: true },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <TopBar />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#E4DBFF]"
        onMouseLeave={() => setServicesDropdown(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}  
            <Link to="/" className="flex items-center gap-3">  
              <img  
                src="/images/skylant website logo.jpeg"  
                alt="Skylant Tech Solution"  
                className="w-14 h-14 object-contain"  
              />  

              <div className="flex flex-col leading-none">  
                <span className="text-3xl font-extrabold bg-gradient-to-r from-[#0F1E3C] via-[#1E3A8A] to-[#0EA5E9] bg-clip-text text-transparent">  
                  Skylant  
                </span>  

                <span className="mt-1 text-m font-semibold tracking-widest uppercase text-[#0F172A]">  
                  TECH SOLUTION  
                </span>  
              </div>  
            </Link>  

            {/* Desktop Nav */}  
            <div className="hidden lg:flex items-center gap-1">  
              {navLinks.map((link) =>  
                link.hasDropdown ? (  
                  <div  
                    key={link.name}  
                    onMouseEnter={() => setServicesDropdown(true)}  
                  >  
                    <Link  
                      to={link.path}  
                      className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${  
                        location.pathname.startsWith('/services')  
                          ? 'text-black'  
                          : 'text-black hover:text-black'  
                      }`}  
                    >  
                      {link.name}  
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdown ? 'rotate-180' : ''}`} />  
                    </Link>  
                  </div>  
                ) : (  
                  <Link  
                    key={link.name}  
                    to={link.path}  
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${  
                      location.pathname === link.path  
                        ? 'text-black'  
                        : 'text-black hover:text-black'  
                    }`}  
                  >  
                    {link.name}  
                  </Link>  
                )  
              )}  
            </div>  

            {/* CTA + Mobile toggle */}  
            <div className="flex items-center gap-3">  
              <Link to="/contact" className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#7C3AED] hover:shadow-lg">  
                Get started  
                <ArrowRight className="w-4 h-4" />  
              </Link>  
              <button  
                onClick={() => setMobileOpen(!mobileOpen)}  
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-[#DDD0FF] bg-gradient-to-br from-white via-[#F8F5FF] to-[#EEE6FF] text-[#2C2A4A] shadow-[0_8px_25px_rgba(109,91,208,0.18)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_35px_rgba(196,181,253,0.55)]"  
                aria-label="Toggle menu"  
              >  
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}  
              </button>  
            </div>  
          </div>  
        </div>  

        {/* Horizontal Services Mega Bar */}  
        <AnimatePresence>  
          {servicesDropdown && (  
            <motion.div  
              initial={{ opacity: 0, y: -10 }}  
              animate={{ opacity: 1, y: 0 }}  
              exit={{ opacity: 0, y: -10 }}  
              transition={{ duration: 0.2 }}  
              className="hidden lg:block w-full border-t border-[#C7D2FE] bg-gradient-to-r from-[#EFF4FF] via-[#F3F0FF] to-[#EDE9FE] backdrop-blur-xl shadow-[0_16px_40px_rgba(99,102,241,0.18)]"  
            >  
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">  
                <div className="flex flex-wrap items-center gap-2">  
                  {services.map((s) => (  
                    <Link  
                      key={s.id}  
                      to={`/services/${s.slug}`}  
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-transparent hover:border-[#C7D2FE] hover:bg-white/70 transition-colors whitespace-nowrap"  
                    >  
                      <div  
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"  
                        style={{ background: `${s.color}30`, border: `1px solid ${s.color}50` }}  
                      >  
                        {s.shortTitle.slice(0, 2)}  
                      </div>  
                      <div className="text-[#312E81] text-sm font-medium">{s.title}</div>  
                    </Link>  
                  ))}  
                </div>  
              </div>  
            </motion.div>  
          )}  
        </AnimatePresence>  
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