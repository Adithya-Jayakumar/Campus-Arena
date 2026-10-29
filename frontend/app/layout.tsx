import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Module I.3: Font Optimization via next/font/google
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Module I.4: Metadata Management using Next.js
export const metadata: Metadata = {
  title: 'Campus Arena | Sahrdaya Sports & Facility Portal',
  description:
    'Centralized platform for booking sports facilities, badminton courts, football turf, auditoriums, and registering for campus tournaments and hackathons.',
  keywords: ['Campus Arena', 'Sports Booking', 'College Facilities', 'Next.js', 'NestJS', 'GraphQL'],
  authors: [{ name: 'Department of Computer Science & Engineering' }],
  openGraph: {
    title: 'Campus Arena - College Facility & Event Management',
    description: 'Instant slot reservations and campus tournament management.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-slate-950 text-slate-100 flex flex-col min-h-screen antialiased selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
