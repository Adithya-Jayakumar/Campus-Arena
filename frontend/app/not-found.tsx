import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-4">
        <Compass className="w-8 h-8" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">404 - Arena Not Found</h2>
      <p className="text-slate-400 max-w-md text-sm mb-6">
        The campus arena, court, or tournament event you are looking for does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700 transition-all"
      >
        <Home className="w-4 h-4" /> Return to Campus Home
      </Link>
    </div>
  );
}
