'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Landmark, Search, Filter, Users, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import BookingModal from '../../components/BookingModal';
import { fetchREST } from '../../lib/api';

const defaultArenas = [
  {
    id: 'arena-1',
    name: 'Sahrdaya Indoor Badminton Arena',
    category: 'SPORTS',
    description: 'Synthetic 4-court international standard badminton facility with LED lighting and spectator gallery.',
    location: 'Block C - Sports Complex Level 1',
    capacity: 80,
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
    isIndoor: true,
    openingTime: '06:00',
    closingTime: '21:00',
  },
  {
    id: 'arena-2',
    name: 'Main Football Turf & Track',
    category: 'OPEN_GROUND',
    description: 'FIFA standard 7-a-side artificial turf with 400m athletic track and night floodlights.',
    location: 'East Campus Sports Field',
    capacity: 500,
    imageUrl: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
    isIndoor: false,
    openingTime: '06:00',
    closingTime: '20:00',
  },
  {
    id: 'arena-3',
    name: 'Dr. APJ Abdul Kalam Central Auditorium',
    category: 'AUDITORIUM',
    description: 'Acoustically treated auditorium with 4K laser projection, Bose line array sound, and staging for fests.',
    location: 'Administrative Block - 3rd Floor',
    capacity: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
    isIndoor: true,
    openingTime: '08:00',
    closingTime: '22:00',
  },
  {
    id: 'arena-4',
    name: 'Robotics & Advanced Tech Arena',
    category: 'LAB',
    description: 'Arena equipped with 3D printers, ROS robot testing ground, drone flying cage, and high-speed fiber.',
    location: 'Decennial Block - CSE Labs',
    capacity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    isIndoor: true,
    openingTime: '08:30',
    closingTime: '20:00',
  },
  {
    id: 'arena-5',
    name: 'Campus Basketball Court (Floodlit)',
    category: 'SPORTS',
    description: 'High-grip polyurethane outdoor basketball court with electronic scoreboard and digital timer.',
    location: 'North Quadrant Court 1',
    capacity: 150,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    isIndoor: false,
    openingTime: '06:00',
    closingTime: '21:30',
  },
];

export default function ArenasPage() {
  const [arenas, setArenas] = useState(defaultArenas);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedArenaForBooking, setSelectedArenaForBooking] = useState<any>(null);

  useEffect(() => {
    // Attempt live fetch from NestJS REST API
    fetchREST('/arenas')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setArenas(data);
        }
      })
      .catch(() => {
        // Graceful fallback to default mock dataset
      });
  }, []);

  const filteredArenas = arenas.filter((arena) => {
    const matchesSearch =
      arena.name.toLowerCase().includes(search.toLowerCase()) ||
      arena.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || arena.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { label: 'All Arenas', value: 'ALL' },
    { label: 'Sports & Courts', value: 'SPORTS' },
    { label: 'Grounds & Turf', value: 'OPEN_GROUND' },
    { label: 'Auditoriums', value: 'AUDITORIUM' },
    { label: 'Labs & Tech', value: 'LAB' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Campus Arenas & Facilities</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Reserve sports courts, turf slots, or tech arenas. Real-time conflict detection prevents double reservations.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search courts, turf, auditorium..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.value
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Arenas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArenas.map((arena) => (
          <div
            key={arena.id}
            className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                <Image
                  src={arena.imageUrl}
                  alt={arena.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                  {arena.category}
                </span>
                {arena.isIndoor && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-950/80 text-cyan-400 border border-cyan-500/30">
                    Indoor
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {arena.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{arena.description}</p>

                <div className="pt-2 space-y-1.5 text-xs text-slate-400">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{arena.location}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Open: {arena.openingTime || '06:00'} - {arena.closingTime || '21:00'}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Capacity: {arena.capacity} students</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setSelectedArenaForBooking(arena)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" /> Book Slot
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedArenaForBooking && (
        <BookingModal
          arena={selectedArenaForBooking}
          isOpen={!!selectedArenaForBooking}
          onClose={() => setSelectedArenaForBooking(null)}
          onSuccess={() => {
            // refresh
          }}
        />
      )}
    </div>
  );
}
