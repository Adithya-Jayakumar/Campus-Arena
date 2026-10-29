'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Trophy, Flame, User, LogOut, Menu, X, Settings, CalendarCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('arena_user');
    if (raw) {
      try {
        setCurrentUser(JSON.parse(raw));
      } catch {}
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('arena_token');
    localStorage.removeItem('arena_user');
    setCurrentUser(null);
    window.location.href = '/login';
  };

  const navLinks = [
    { name: 'Tournaments & Events', href: '/events', icon: Flame },
    { name: 'Department Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'My Enrollments', href: '/bookings', icon: CalendarCheck },
  ];

  if (currentUser?.role === 'ADMIN') {
    navLinks.push({ name: 'Admin Controls', href: '/admin', icon: Settings });
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & College Branding - Blended Seamlessly without White Box */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-44 sm:w-56 flex items-center justify-center">
              <Image
                src="/images/sahrdaya-logo-blend.png"
                alt="Sahrdaya College Logo"
                fill
                className="object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>
            <div className="hidden sm:block border-l border-slate-700 pl-3">
              <span className="text-lg font-black tracking-tight text-white block leading-tight">
                CAMPUS ARENA
              </span>
              <span className="text-[11px] font-semibold text-emerald-400">
                Sports & Events Portal
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Auth State */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                <div className="text-right">
                  <p className="text-xs font-bold text-white">{currentUser.name}</p>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                      currentUser.role === 'ADMIN'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {currentUser.role === 'ADMIN' ? '🛡️ Administrator' : '🎓 Student'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-md shadow-emerald-500/20 transition-all"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900/95 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <link.icon className="w-5 h-5 text-emerald-400" />
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold"
              >
                <LogOut className="w-4 h-4" /> Sign Out ({currentUser.name})
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
