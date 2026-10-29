'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Plus,
  Trash2,
  Edit,
  Trophy,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Award,
  Flame,
} from 'lucide-react';
import { fetchREST } from '../../lib/api';

export default function AdminControlPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Event Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('SPORTS');
  const [venue, setVenue] = useState('Main Football Turf & Track');
  const [startDate, setStartDate] = useState('2026-11-20');
  const [endDate, setEndDate] = useState('2026-11-22');
  const [maxTeams, setMaxTeams] = useState(16);
  const [rules, setRules] = useState('');
  const [description, setDescription] = useState('');

  // Department Points State
  const [departments, setDepartments] = useState([
    { code: 'CSE', name: 'Computer Science & Engineering', points: 420 },
    { code: 'ECE', name: 'Electronics & Communication Engg.', points: 360 },
    { code: 'BME', name: 'Biomedical Engineering', points: 290 },
    { code: 'MECH', name: 'Mechanical Engineering', points: 250 },
    { code: 'CIVIL', name: 'Civil Engineering', points: 190 },
    { code: 'BT', name: 'Biotechnology', points: 140 },
  ]);

  useEffect(() => {
    const raw = localStorage.getItem('arena_user');
    if (raw) {
      const user = JSON.parse(raw);
      setCurrentUser(user);
      if (user.role !== 'ADMIN') {
        router.push('/events');
      }
    } else {
      router.push('/login');
    }

    // Load initial events
    fetchREST('/events')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {
        setEvents([
          {
            id: 'ev-1',
            title: 'Inter-Department Futsal League 2026',
            category: 'SPORTS',
            venue: 'Main Football Turf & Track',
            startDate: '2026-11-15',
            maxTeams: 16,
            status: 'OPEN',
          },
          {
            id: 'ev-2',
            title: 'HackArena 2026: 24hr Campus Hackathon',
            category: 'TECHNICAL',
            venue: 'Robotics & Advanced Tech Arena',
            startDate: '2026-11-22',
            maxTeams: 30,
            status: 'OPEN',
          },
          {
            id: 'ev-3',
            title: 'Sargam 2026: Inter-Collegiate Cultural Fest',
            category: 'CULTURAL',
            venue: 'Dr. APJ Abdul Kalam Central Auditorium',
            startDate: '2026-12-05',
            maxTeams: 40,
            status: 'OPEN',
          },
        ]);
      });
  }, [router]);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEvent = {
        id: `ev-${Date.now()}`,
        title,
        description: description || `${title} organized by Physical Education & Sports Desk`,
        category,
        venue,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        maxTeams: Number(maxTeams),
        rules: rules || 'College ID card mandatory.',
        bannerUrl: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
        registrations: [],
      };

      try {
        await fetchREST('/events', {
          method: 'POST',
          body: JSON.stringify(newEvent),
        });
      } catch {
        // Fallback local update
      }

      setEvents([newEvent, ...events]);
      setMessage({ type: 'success', text: `Tournament "${title}" successfully published!` });
      setShowAddModal(false);
      setTitle('');
      setDescription('');
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ type: 'error', text: 'Failed to create tournament' });
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (!confirm('Are you sure you want to delete this tournament?')) return;
    setEvents(events.filter((e) => e.id !== id));
    setMessage({ type: 'success', text: 'Tournament deleted successfully.' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAwardPoints = (deptCode: string, delta: number) => {
    setDepartments((prev) =>
      prev
        .map((d) => (d.code === deptCode ? { ...d, points: d.points + delta } : d))
        .sort((a, b) => b.points - a.points)
    );
    setMessage({
      type: 'success',
      text: `Awarded ${delta > 0 ? '+' : ''}${delta} points to ${deptCode}!`,
    });
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase mb-2">
            <Shield className="w-3.5 h-3.5" /> Admin Control Center
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Tournament & Standings Management</h1>
          <p className="text-slate-400 text-sm mt-1">
            Create new campus events, adjust tournament settings, and award leaderboard points to departments.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" /> Add New Tournament
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Tournaments Management Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-emerald-400" /> Active Tournaments ({events.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/20 uppercase">
                    {ev.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    Active
                  </span>
                </div>
                <h3 className="font-bold text-white text-base">{ev.title}</h3>
                <div className="text-xs text-slate-400 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {ev.venue}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />{' '}
                    {new Date(ev.startDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500" /> Max: {ev.maxTeams} Teams
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">ID: {ev.id}</span>
                <button
                  onClick={() => handleDeleteEvent(ev.id)}
                  className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Department Point Awarding Section */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" /> Manage Department Leaderboard Points
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Add points earned by departments in tournaments or match victories. Standings re-order automatically.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-400 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
            🥇 1st Place: {departments[0].code} ({departments[0].points} pts)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {departments.map((dept, index) => (
            <div
              key={dept.code}
              className={`p-4 rounded-xl border flex items-center justify-between ${
                index === 0
                  ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900 border-emerald-500/40'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-400">#{index + 1}</span>
                  <span className="font-bold text-white text-sm">{dept.name}</span>
                </div>
                <p className="text-lg font-black text-emerald-400 mt-1">{dept.points} pts</p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleAwardPoints(dept.code, 15)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
                  title="Award 15 points (Win / 1st place)"
                >
                  +15
                </button>
                <button
                  onClick={() => handleAwardPoints(dept.code, 30)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all"
                  title="Award 30 points (Trophy / Finalist)"
                >
                  +30
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Tournament Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white">Add New Campus Tournament</h3>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Tournament / Event Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sahrdaya Inter-Collegiate Cricket Cup"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="SPORTS">Sports Championship</option>
                    <option value="TECHNICAL">Technical Hackathon</option>
                    <option value="CULTURAL">Cultural Fest</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Max Teams
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={64}
                    value={maxTeams}
                    onChange={(e) => setMaxTeams(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Campus Venue
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Main Football Turf, Indoor Stadium, Auditorium"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Rules / Eligibility
                </label>
                <input
                  type="text"
                  placeholder="e.g. Open to all semester students. ID card mandatory."
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-md"
                >
                  Publish Tournament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
