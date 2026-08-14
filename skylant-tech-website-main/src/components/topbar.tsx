import { Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

// Edit these two numbers and the four social links to your real ones.
const PHONE_NUMBERS = ['+91 12345 67890', '+91 98765 43210'];

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export default function TopBar() {
  return (
    <div className="w-full bg-gradient-to-r from-[#EFF4FF] via-[#F3F0FF] to-[#EDE9FE] text-[#312E81] text-xs sm:text-sm border-b border-[#C7D2FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center gap-4">
        {/* Left: phone numbers */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          {PHONE_NUMBERS.map((num) => (
            <a
              key={num}
              href={`tel:${num.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 font-medium hover:text-[#1E3A8A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {num}
            </a>
          ))}
        </div>

        {/* Middle: scrolling marquee */}
        <div className="flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-10">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-10 shrink-0">
                {PHONE_NUMBERS.map((num) => (
                  <span key={num} className="flex items-center gap-1.5 whitespace-nowrap font-medium">
                    <Phone className="w-3.5 h-3.5" />
                    {num}
                  </span>
                ))}
                <span className="flex items-center gap-1.5 whitespace-nowrap font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  Visit us: Nagpur
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: social icons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-[#1E3A8A] transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}