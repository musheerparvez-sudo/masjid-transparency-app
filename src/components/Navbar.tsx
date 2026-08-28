'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, UserPlus, LogIn } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search Mosques' },
  { href: '/masjid/register', label: 'Register Mosque' },
  { href: '/volunteer/register', label: 'Volunteer' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-emerald-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🕌</span>
            <span className="text-white text-xl font-bold tracking-tight">
              MasjidGuard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-emerald-100 hover:text-white hover:bg-emerald-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/auth/login"
              className="flex items-center space-x-1 text-emerald-100 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
            <Link
              href="/volunteer/register"
              className="flex items-center space-x-1 bg-white text-emerald-800 hover:bg-emerald-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
            >
              <UserPlus size={16} />
              <span>Register</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-900 border-t border-emerald-700">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-emerald-100 hover:text-white hover:bg-emerald-700 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-emerald-700 my-2" />
            <Link
              href="/auth/login"
              className="block text-emerald-100 hover:text-white px-3 py-2 rounded-lg text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              🔑 Login
            </Link>
            <Link
              href="/volunteer/register"
              className="block bg-white text-emerald-800 px-3 py-2 rounded-lg text-base font-bold text-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Register as Volunteer
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
