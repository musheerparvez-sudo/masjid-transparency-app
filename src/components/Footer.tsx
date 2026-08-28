import React from 'react';
import Link from 'next/link';
import { Heart, Github, Mail } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search Mosques' },
  { href: '/masjid/register', label: 'Register Mosque' },
  { href: '/volunteer/register', label: 'Become a Volunteer' },
  { href: '/about', label: 'About Us' },
];

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🕌</span>
              <span className="text-white text-2xl font-bold">MasjidGuard</span>
            </div>
            <p className="text-emerald-300 text-sm leading-relaxed">
              Masjidon ki hifazat aur shafafiyat ka platform. Har masjid ki
              financial transparency ensure karein aur chanda chori se chhutkara
              paayein.
            </p>
            <div className="mt-4 inline-flex items-center space-x-1 bg-emerald-900 px-3 py-1.5 rounded-full text-xs text-emerald-300 border border-emerald-800">
              <Github size={14} />
              <span>Open Source Project</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-emerald-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-emerald-300">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contact@masjidguard.org</span>
              </div>
              <p className="leading-relaxed">
                Agar aapko koi mushkil ya mashwara ho to hum se zaroor raabta
                karein. Hum masjidon ki khidmat ke liye hamesha tayyar hain.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-emerald-400 text-sm">
            © {new Date().getFullYear()} MasjidGuard. Open source for the Ummah.
          </p>
          <p className="text-emerald-400 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-red-400 fill-red-400" /> for
            Masjidon ki Hifazat
          </p>
        </div>
      </div>
    </footer>
  );
}
