import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* College Branding - Blended Seamlessly */}
          <div className="space-y-3">
            <div className="relative h-12 w-52 flex items-center justify-start">
              <Image
                src="/images/sahrdaya-logo-blend.png"
                alt="Sahrdaya Logo"
                fill
                className="object-contain object-left filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Sahrdaya College of Engineering and Technology (Autonomous), Kodakara, Thrissur, Kerala.
              Campus Arena portal for organizing inter-department tournaments, cultural fests, and student sports enrollment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Campus Events</h4>
            <ul className="text-sm space-y-2">
              <li><Link href="/events" className="hover:text-emerald-400 transition-colors">Tournaments & Fests</Link></li>
              <li><Link href="/leaderboard" className="hover:text-emerald-400 transition-colors">Department Standings</Link></li>
              <li><Link href="/bookings" className="hover:text-emerald-400 transition-colors">My Enrollments</Link></li>
              <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Student & Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Campus Sports Desk</h4>
            <div className="text-xs space-y-2.5 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Physical Education & Sports Arena, Sahrdaya Campus, Kodakara, PB NO.17</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 480 2726630 / 2726631</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>sports@sahrdaya.ac.in</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Sahrdaya College of Engineering and Technology. All Rights Reserved.</p>
          <p className="font-semibold text-slate-400">Campus Arena Portal</p>
        </div>
      </div>
    </footer>
  );
}
