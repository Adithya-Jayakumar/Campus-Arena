import Link from 'next/link';
import Image from 'next/image';
import {
  Trophy,
  Flame,
  ArrowRight,
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Medal,
  CheckCircle,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section with Beautiful Aerial Campus Photo */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
        {/* Background Aerial Campus Image with elegant gradient overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sahrdaya-campus.jpg"
            alt="Sahrdaya Campus Aerial View"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl p-8 sm:p-12 lg:p-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Sahrdaya Autonomous Campus
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Sahrdaya{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Campus Arena
            </span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-medium drop-shadow-sm">
            The official portal for all campus sports tournaments, inter-department championships, tech hackathons, and cultural fests. Enroll your squad or check the live leaderboard.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/events"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all"
            >
              <Flame className="w-5 h-5" /> Enroll in Tournaments
            </Link>

            <Link
              href="/leaderboard"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white font-bold border border-slate-700 hover:border-slate-600 transition-all"
            >
              <Trophy className="w-5 h-5 text-amber-400" /> View Leaderboard
            </Link>
          </div>

          {/* Quick Stats Banner */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-black text-white">#1 CSE</p>
              <p className="text-xs text-slate-300 font-medium">Current 1st Place</p>
            </div>
            <div>
              <p className="text-3xl font-black text-emerald-400">1-Click</p>
              <p className="text-xs text-slate-300 font-medium">Easy Student Enrollment</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">25 Yrs</p>
              <p className="text-xs text-slate-300 font-medium">Legacy of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Aerial Showcase Card */}
      <section className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="relative w-full lg:w-1/2 h-72 rounded-2xl overflow-hidden border border-slate-700 shadow-xl group">
            <Image
              src="/images/sahrdaya-campus.jpg"
              alt="Sahrdaya Campus Aerial Panorama"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950 uppercase">
                Scenic Kodakara Campus
              </span>
              <p className="text-sm font-bold mt-1">International Standard Sports & Arena Infrastructure</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Medal className="w-4 h-4" /> Campus Life & Sports
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              World-Class Arena Grounds & Event Facilities
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              From our FIFA-standard football turf and synthetic indoor badminton courts to the Dr. APJ Abdul Kalam Central Auditorium, Sahrdaya provides state-of-the-art facilities for athletic and cultural growth.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Synthetic Badminton Arena</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>FIFA Standard Football Turf</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Floodlit Basketball Court</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>1200-Seat 4K Auditorium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tournaments Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Active Tournaments & Events</h2>
            <p className="text-sm text-slate-400 mt-1">
              Select an event and enroll your department squad directly.
            </p>
          </div>
          <Link
            href="/events"
            className="flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            All Events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                Sports Championship
              </span>
              <h3 className="text-lg font-bold text-white">Inter-Department Futsal League 2026</h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                16 department teams battle on the Main Football Turf for the championship trophy.
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> Football Turf & Athletic Track
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" /> November 15, 2026
                </p>
              </div>
            </div>
            <Link
              href="/events"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs text-center transition-all"
            >
              Enroll Squad Now
            </Link>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
                Technical Hackathon
              </span>
              <h3 className="text-lg font-bold text-white">HackArena 2026: 24hr Campus Hack</h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                Build high-impact web and AI solutions for campus sustainability and smart campus tech.
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> Decennial Block - CSE Labs
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" /> November 22, 2026
                </p>
              </div>
            </div>
            <Link
              href="/events"
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs text-center transition-all"
            >
              Enroll Squad Now
            </Link>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                Cultural Fest
              </span>
              <h3 className="text-lg font-bold text-white">Sargam 2026: Cultural Fest</h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                3 days of dance, drama, battle of bands, and music competitions at Central Auditorium.
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> Dr. APJ Abdul Kalam Auditorium
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" /> December 05, 2026
                </p>
              </div>
            </div>
            <Link
              href="/events"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs text-center transition-all"
            >
              Enroll Squad Now
            </Link>
          </div>
        </div>
      </section>

      {/* Leaderboard Callout */}
      <section className="rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-4 h-4" /> Sahrdaya Rolling Trophy Standings
          </span>
          <h3 className="text-2xl font-black text-white">Who is Leading the Campus Points Tally?</h3>
          <p className="text-xs text-slate-300 max-w-lg">
            CSE currently holds 1st Place with 420 points, closely followed by ECE (360 pts) and BME (290 pts). Check every department rank and medal count.
          </p>
        </div>
        <Link
          href="/leaderboard"
          className="shrink-0 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all"
        >
          Check Full Standings
        </Link>
      </section>
    </div>
  );
}
