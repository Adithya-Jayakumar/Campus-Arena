'use client';

import { Trophy, Flame, Zap, Medal, TrendingUp, Award, Crown } from 'lucide-react';

const departments = [
  {
    rank: 1,
    name: 'Computer Science & Engineering',
    code: 'CSE',
    points: 420,
    gold: 4,
    silver: 2,
    bronze: 1,
    status: 'Defending Champions 🏆',
    highlight: true,
  },
  {
    rank: 2,
    name: 'Electronics & Communication Engg.',
    code: 'ECE',
    points: 360,
    gold: 2,
    silver: 3,
    bronze: 2,
    status: 'Chasing 1st Place (-60 pts)',
    highlight: false,
  },
  {
    rank: 3,
    name: 'Biomedical Engineering',
    code: 'BME',
    points: 290,
    gold: 2,
    silver: 1,
    bronze: 2,
    status: 'Strong Podium Contender',
    highlight: false,
  },
  {
    rank: 4,
    name: 'Mechanical Engineering',
    code: 'MECH',
    points: 250,
    gold: 1,
    silver: 2,
    bronze: 1,
    status: 'Recent Futsal Runner-Up',
    highlight: false,
  },
  {
    rank: 5,
    name: 'Civil Engineering',
    code: 'CIVIL',
    points: 190,
    gold: 1,
    silver: 0,
    bronze: 3,
    status: 'Basketball Semi-Finalist',
    highlight: false,
  },
  {
    rank: 6,
    name: 'Biotechnology',
    code: 'BT',
    points: 140,
    gold: 0,
    silver: 1,
    bronze: 1,
    status: 'Badminton Doubles Finalist',
    highlight: false,
  },
];

export default function LeaderboardPage() {
  const leader = departments[0];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Sahrdaya Department Leaderboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time points tally and medal standing for the Annual Campus Rolling Trophy 2026.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold self-start sm:self-center">
          <Crown className="w-4 h-4" /> Current Campus Champions: {leader.code}
        </div>
      </div>

      {/* #1 Department Highlight Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border-2 border-emerald-500/40 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-xl shadow-emerald-500/30 shrink-0">
              <Trophy className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                  🥇 1st Place Overall
                </span>
                <span className="text-xs text-emerald-400 font-bold">{leader.status}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{leader.name}</h2>
              <p className="text-xs text-slate-300">
                Department Code: <span className="font-mono text-emerald-400 font-bold">{leader.code}</span>
              </p>
            </div>
          </div>

          <div className="text-center md:text-right shrink-0">
            <p className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              {leader.points}
            </p>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mt-1">Total Points</p>
            <div className="flex items-center justify-center md:justify-end gap-3 mt-3 text-xs font-bold text-slate-300">
              <span className="text-amber-400">🥇 4 Golds</span>
              <span className="text-slate-300">🥈 2 Silvers</span>
              <span className="text-amber-600">🥉 1 Bronze</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 2nd Place */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center text-center relative">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-black text-base mb-2">
            🥈 #2
          </div>
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">{departments[1].code}</span>
          <h3 className="font-bold text-white text-base mt-1">{departments[1].name}</h3>
          <p className="text-3xl font-black text-slate-200 mt-2">{departments[1].points} pts</p>
          <p className="text-xs text-slate-400 mt-1">{departments[1].status}</p>
        </div>

        {/* 1st Place */}
        <div className="rounded-2xl bg-slate-900 border-2 border-emerald-500/50 p-6 flex flex-col items-center text-center relative shadow-xl shadow-emerald-500/10">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xl mb-2 shadow-lg shadow-emerald-500/30">
            🥇 #1
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase">{departments[0].code}</span>
          <h3 className="font-black text-white text-base mt-1">{departments[0].name}</h3>
          <p className="text-3xl font-black text-emerald-400 mt-2">{departments[0].points} pts</p>
          <p className="text-xs text-emerald-300 font-medium mt-1">Leading the Campus</p>
        </div>

        {/* 3rd Place */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center text-center relative">
          <div className="w-12 h-12 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-center text-amber-500 font-black text-base mb-2">
            🥉 #3
          </div>
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">{departments[2].code}</span>
          <h3 className="font-bold text-white text-base mt-1">{departments[2].name}</h3>
          <p className="text-3xl font-black text-amber-400 mt-2">{departments[2].points} pts</p>
          <p className="text-xs text-slate-400 mt-1">{departments[2].status}</p>
        </div>
      </div>

      {/* Complete Department Rankings Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-400" /> Complete Department Standings
          </h3>
          <span className="text-xs text-slate-400">Annual Sports Meet 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/70 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5 font-bold">Rank</th>
                <th className="px-6 py-3.5 font-bold">Department</th>
                <th className="px-6 py-3.5 font-bold text-center">Gold</th>
                <th className="px-6 py-3.5 font-bold text-center">Silver</th>
                <th className="px-6 py-3.5 font-bold text-center">Bronze</th>
                <th className="px-6 py-3.5 font-bold text-right">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {departments.map((dept) => (
                <tr
                  key={dept.code}
                  className={`transition-colors ${
                    dept.rank === 1 ? 'bg-emerald-500/5 hover:bg-emerald-500/10' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="px-6 py-4 font-mono font-bold">
                    {dept.rank === 1 && <span className="text-amber-400">🥇 #1</span>}
                    {dept.rank === 2 && <span className="text-slate-300">🥈 #2</span>}
                    {dept.rank === 3 && <span className="text-amber-600">🥉 #3</span>}
                    {dept.rank > 3 && <span className="text-slate-500">#{dept.rank}</span>}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white flex items-center gap-2">
                    <span>{dept.name}</span>
                    <span className="text-xs font-mono text-emerald-400">({dept.code})</span>
                  </td>
                  <td className="px-6 py-4 text-center text-amber-400 font-bold">{dept.gold}</td>
                  <td className="px-6 py-4 text-center text-slate-300 font-bold">{dept.silver}</td>
                  <td className="px-6 py-4 text-center text-amber-600 font-bold">{dept.bronze}</td>
                  <td className="px-6 py-4 text-right font-black text-emerald-400 text-base">
                    {dept.points} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
