'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarCheck, Clock, MapPin, QrCode, Ban, Flame, Trophy } from 'lucide-react';
import { fetchREST } from '../../lib/api';

export default function BookingsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([
    {
      id: 'reg-101',
      eventTitle: 'Inter-Department Futsal League 2026',
      teamName: 'CSE Cyber Strikers',
      venue: 'Main Football Turf & Track',
      date: 'November 15, 2026',
      status: 'CONFIRMED',
      category: 'SPORTS',
    },
    {
      id: 'reg-102',
      eventTitle: 'HackArena 2026: 24hr Campus Hackathon',
      teamName: 'Neural Ninjas',
      venue: 'Decennial Block - CSE Labs',
      date: 'November 22, 2026',
      status: 'CONFIRMED',
      category: 'TECHNICAL',
    },
  ]);

  useEffect(() => {
    const raw = localStorage.getItem('arena_user');
    if (raw) {
      try {
        setCurrentUser(JSON.parse(raw));
      } catch {}
    }

    const saved = localStorage.getItem('arena_user_enrollments');
    if (saved) {
      try {
        setEnrollments(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleCancel = (id: string) => {
    if (!confirm('Are you sure you want to cancel this event enrollment?')) return;
    const filtered = enrollments.filter((e) => e.id !== id);
    setEnrollments(filtered);
    localStorage.setItem('arena_user_enrollments', JSON.stringify(filtered));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">My Tournament Enrollments</h1>
          <p className="text-slate-400 text-sm mt-1">
            Confirmed sports leagues, hackathons, and tournament team entries.
          </p>
        </div>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-center"
        >
          <Flame className="w-4 h-4" /> Enroll in More Events
        </Link>
      </div>

      {enrollments.length === 0 ? (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <CalendarCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No Active Enrollments</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            You have not registered for any campus tournaments yet. Check out the open competitions.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            Browse Tournaments
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrollments.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-900 border border-emerald-500/30 p-6 flex flex-col justify-between space-y-4 shadow-xl shadow-emerald-500/5"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {item.status} PASS
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{item.eventTitle}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <QrCode className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                  <p className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-semibold text-white">Team: {item.teamName}</span>
                    <span className="ml-auto text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Dept: {item.department || 'CSE'}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Venue: {item.venue}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Event Date: {item.date}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500">Badge ID: {item.id}</span>
                <button
                  onClick={() => handleCancel(item.id)}
                  className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-semibold transition-colors"
                >
                  <Ban className="w-3.5 h-3.5" /> Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
