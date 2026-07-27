import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Facebook, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Services: [
    { name: 'Software Development', path: '/services/software-development' },
    { name: 'Website Development', path: '/services/website-development' },
    { name: 'Mobile App Development', path: '/services/mobile-app-development' },
    { name: 'AI Solutions', path: '/services/ai-solutions' },
    { name: 'Cloud Solutions', path: '/services/cloud-solutions' },
    { name: 'Digital Marketing', path: '/services/digital-marketing' },
  ],
  Company: [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ],
  Programs: [
    { name: 'Corporate Training', path: '/training' },
    { name: 'Internship Program', path: '/internship' },
    { name: 'Book Consultation', path: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-blue-900 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white text-xl tracking-tight">Skylant</span>
                <span className="text-[10px] text-sky-400/80 font-medium tracking-widest uppercase">Tech Solutions</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              We build scalable software, web applications, mobile apps, AI solutions, cloud infrastructure, and digital marketing that help businesses grow.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Github, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-sky-400 text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <span>hello@skylanttech.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <span>123 Innovation Drive, Tech Park, Suite 400</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Skylant Tech Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
