'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Flame,
  Trophy,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Loader2,
  Shield,
  Settings,
} from 'lucide-react';
import { fetchREST } from '../../lib/api';

const defaultEvents = [
  {
    id: 'event-1',
    title: 'Inter-Department Futsal League 2026',
    description: 'Annual campus football championship. 16 department teams battle for the Rolling Trophy.',
    category: 'SPORTS',
    venue: 'Main Football Turf & Track',
    bannerUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    startDate: '2026-11-15T09:00:00.000Z',
    endDate: '2026-11-17T18:00:00.000Z',
    maxTeams: 16,
    rules: '5 players + 3 rolling subs. Standard FIFA futsal rules apply.',
    registrations: [{ id: '1', teamName: 'CSE Cyber Strikers' }],
  },
  {
    id: 'event-2',
    title: 'HackArena 2026: 24hr Campus Hackathon',
    description: 'Build innovative modern web, AI, and IoT solutions for campus life and sustainability.',
    category: 'TECHNICAL',
    venue: 'Decennial Block - CSE Labs',
    bannerUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    startDate: '2026-11-22T10:00:00.000Z',
    endDate: '2026-11-23T10:00:00.000Z',
    maxTeams: 30,
    rules: 'Teams of 2-4 students. Problem statements announced at 9:00 AM.',
    registrations: [{ id: '2', teamName: 'Neural Ninjas' }],
  },
  {
    id: 'event-3',
    title: 'Sargam 2026: Cultural Fest',
    description: '3 days of dance, music, battle of bands, drama, and fine arts competitions.',
    category: 'CULTURAL',
    venue: 'Dr. APJ Abdul Kalam Central Auditorium',
    bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    startDate: '2026-12-05T09:30:00.000Z',
    endDate: '2026-12-07T21:00:00.000Z',
    maxTeams: 40,
    rules: 'Inter-department entries open. College ID card mandatory.',
    registrations: [],
  },
  {
    id: 'event-4',
    title: 'Inter-Department Badminton Championship',
    description: 'Men and Women singles & doubles championship held at the synthetic indoor arena.',
    category: 'SPORTS',
    venue: 'Sahrdaya Indoor Badminton Arena',
    bannerUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
    startDate: '2026-11-28T08:30:00.000Z',
    endDate: '2026-11-29T17:00:00.000Z',
    maxTeams: 24,
    rules: 'Yonex Mavis 350 shuttles provided. Non-marking shoes required.',
    registrations: [],
  },
];

const campusDepartments = [
  { code: 'CSE', name: 'Computer Science & Engineering (CSE)' },
  { code: 'ECE', name: 'Electronics & Communication Engg. (ECE)' },
  { code: 'BME', name: 'Biomedical Engineering (BME)' },
  { code: 'MECH', name: 'Mechanical Engineering (MECH)' },
  { code: 'CIVIL', name: 'Civil Engineering (CIVIL)' },
  { code: 'BT', name: 'Biotechnology (BT)' },
  { code: 'AI&DS', name: 'Artificial Intelligence & Data Science (AI & DS)' },
  { code: 'EEE', name: 'Electrical & Electronics Engg. (EEE)' },
];

export default function EventsPage() {
  const [events, setEvents] = useState(defaultEvents);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [registeringEvent, setRegisteringEvent] = useState<any>(null);
  const [teamName, setTeamName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('CSE');
  const [loading, setLoading] = useState(false);
  const [enrolledEventIds, setEnrolledEventIds] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('arena_user');
    if (raw) {
      try {
        const u = JSON.parse(raw);
        setCurrentUser(u);
        const dept = u.department || 'CSE';
        setSelectedDepartment(dept);
        setTeamName(`${dept} Strikers`);
      } catch {}
    }

    const savedEnrolls = localStorage.getItem('arena_enrolled_events');
    if (savedEnrolls) {
      try {
        setEnrolledEventIds(JSON.parse(savedEnrolls));
      } catch {}
    }

    fetchREST('/events')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!currentUser) {
      setMessage({ type: 'error', text: 'Please login as Student to enroll in tournaments.' });
      setLoading(false);
      return;
    }

    try {
      try {
        await fetchREST('/events/register', {
          method: 'POST',
          body: JSON.stringify({
            eventId: registeringEvent.id,
            teamName: teamName || `${selectedDepartment} Team`,
            membersCount: 4,
          }),
        });
      } catch {
        // Local fallback
      }

      const updated = [...enrolledEventIds, registeringEvent.id];
      setEnrolledEventIds(updated);
      localStorage.setItem('arena_enrolled_events', JSON.stringify(updated));

      // Save full enrollment details for 'My Enrollments' page
      const currentListRaw = localStorage.getItem('arena_user_enrollments');
      const currentList = currentListRaw ? JSON.parse(currentListRaw) : [];
      const newEntry = {
        id: `reg-${Date.now()}`,
        eventId: registeringEvent.id,
        eventTitle: registeringEvent.title,
        teamName: teamName || `${selectedDepartment} Squad`,
        department: selectedDepartment,
        venue: registeringEvent.venue,
        date: new Date(registeringEvent.startDate).toLocaleDateString(),
        status: 'CONFIRMED',
        category: registeringEvent.category,
      };
      localStorage.setItem('arena_user_enrollments', JSON.stringify([newEntry, ...currentList]));

      setMessage({
        type: 'success',
        text: `Successfully enrolled under Department of ${selectedDepartment}!`,
      });
      setTimeout(() => {
        setRegisteringEvent(null);
        setMessage(null);
      }, 1500);
    } catch {
      setMessage({ type: 'error', text: 'Enrollment could not be completed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Admin Shortcuts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Campus Tournaments & Events</h1>
          <p className="text-slate-400 text-sm mt-1">
            Browse upcoming sports meets, cultural fests, and hackathons. Enroll in 1-click.
          </p>
        </div>

        {currentUser?.role === 'ADMIN' && (
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-center"
          >
            <Settings className="w-4 h-4" /> Admin Controls (Add/Edit Tournaments)
          </Link>
        )}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => {
          const isEnrolled = enrolledEventIds.includes(ev.id);
          const registeredCount = (ev.registrations?.length || 0) + (isEnrolled ? 1 : 0);
          const isFull = registeredCount >= ev.maxTeams;

          return (
            <div
              key={ev.id}
              className={`rounded-2xl bg-slate-900 border p-6 flex flex-col justify-between space-y-5 transition-all ${
                isEnrolled
                  ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {ev.category}
                  </span>
                  {isEnrolled && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white">{ev.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{ev.description}</p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-400">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{ev.venue}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{new Date(ev.startDate).toLocaleDateString()}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {registeredCount} / {ev.maxTeams} Teams
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Rolling Points</span>
                  </p>
                </div>

                {ev.rules && (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400">
                    <span className="font-bold text-slate-300">Eligibility / Rules: </span>
                    {ev.rules}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800">
                {isEnrolled ? (
                  <div className="w-full py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> You are enrolled in this tournament
                  </div>
                ) : (
                  <button
                    disabled={isFull}
                    onClick={() => setRegisteringEvent(ev)}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    {isFull ? 'Tournament Full' : '1-Click Enroll Team / Solo'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Easy Enrollment Modal */}
      {registeringEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-400">Quick Enrollment</span>
              <h3 className="text-lg font-bold text-white mt-1">{registeringEvent.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{registeringEvent.venue}</p>
            </div>

            {message && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  message.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleEnroll} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Select Your Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    if (!teamName || teamName.endsWith('Strikers') || teamName.endsWith('Squad')) {
                      setTeamName(`${e.target.value} Squad`);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {campusDepartments.map((dept) => (
                    <option key={dept.code} value={dept.code}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Points won in this tournament will be credited to this department on the Leaderboard.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Team / Participant Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSE Warriors or Solo Entry"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {currentUser && (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <p>
                    <span className="text-slate-300 font-semibold">Enrolling Student: </span>
                    {currentUser.name} ({currentUser.studentId || 'Student'})
                  </p>
                  <p>
                    <span className="text-slate-300 font-semibold">Selected Department: </span>
                    <span className="text-emerald-400 font-bold">{selectedDepartment}</span>
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRegisteringEvent(null)}
                  className="px-4 py-2 text-slate-400 text-xs hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow-md"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
