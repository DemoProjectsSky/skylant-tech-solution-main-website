import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Services: [
    { name: 'Software Development', path: '/services/software-development' },
    { name: 'Website Development', path: '/services/website-development' },
    { name: 'ERP & CRM Solutions', path: '/services/erp-crm-solutions' },
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

/* --------------------------- Real brand logo SVGs --------------------------- */
/* Each renders as a single-color mark by default (currentColor) so it matches
   the existing hover treatment, but reveals its authentic brand color on hover. */

function LinkedInLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="#0A66C2" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="#1877F2" {...props}>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  );
}

function InstagramLogo({ id = 'ig-gradient', ...props }: React.SVGProps<SVGSVGElement> & { id?: string }) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <defs>
        <radialGradient id={id} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="10%" stopColor="#FFDD55" />
          <stop offset="50%" stopColor="#FF543E" />
          <stop offset="100%" stopColor="#C837AB" />
        </radialGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      />
    </svg>
  );
}

const socialLinks = [
  { Logo: LinkedInLogo, href: 'https://in.linkedin.com/company/skylant-tech-solutions', label: 'LinkedIn' },
  { Logo: FacebookLogo, href: 'https://www.facebook.com/profile.php?id=61588489421573&rdid=NXcauZFIxd2VJUMD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1LSvDGzdc8%2F#', label: 'Facebook' },
  { Logo: InstagramLogo, href: 'https://www.instagram.com/skylant.tech?igsh=MWE5cjI5eTFhZmlldQ==', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#150F2E] border-t border-[#6D5BD0]/15 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#6D5BD0]/15 rounded-full blur-3xl" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-[#9B8AFB]/15 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-[#6D5BD0]/30">
                <img
                  src="/images/skylant footer logo.jpeg"
                  alt="Skylant Tech Solutions logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white text-xl tracking-tight">Skylant</span>
                <span className="text-[10px] text-[#9B8AFB] font-medium tracking-widest uppercase">Tech Solutions</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              We build scalable software, web applications, mobile apps, AI solutions, cloud infrastructure, and digital marketing that help businesses grow.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Logo, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  aria-label={label}
                >
                  <Logo id={`ig-gradient-${i}`} className="w-[18px] h-[18px]" />
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
                      className="text-slate-400 hover:text-[#9B8AFB] text-sm transition-colors inline-flex items-center gap-1 group"
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
                <Mail className="w-4 h-4 text-[#9B8AFB] mt-0.5 shrink-0" />
                <span>hr.skylant@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-[#9B8AFB] mt-0.5 shrink-0" />
                <span>+91-75585 31369</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-[#9B8AFB] mt-0.5 shrink-0" />
                <span>+91-72497 61369</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-[#9B8AFB] mt-0.5 shrink-0" />
                <span>First Floor, 101, sivalik Apartment, Lumbini Nagar,near Vasudeo Nagar Metro station,Hingna Road, Nagpur-440036 </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#6D5BD0]/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Skylant Tech Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-[#9B8AFB] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#9B8AFB] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#9B8AFB] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}