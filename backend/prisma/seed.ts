import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Campus Arena database...');

  // Clean old data
  await prisma.booking.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.arena.deleteMany();
  await prisma.user.deleteMany();

  const saltRounds = 10;
  const adminPassword = await bcrypt.hash('admin123', saltRounds);
  const studentPassword = await bcrypt.hash('student123', saltRounds);
  const facultyPassword = await bcrypt.hash('faculty123', saltRounds);

  // Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@campusarena.edu',
      passwordHash: adminPassword,
      name: 'Campus Facility Director',
      role: 'ADMIN',
      department: 'Physical Education & Facilities',
      studentId: 'STAFF-001',
    },
  });

  const faculty = await prisma.user.create({
    data: {
      email: 'coordinator.cse@campusarena.edu',
      passwordHash: facultyPassword,
      name: 'Prof. Ronald C. (CSE Coordinator)',
      role: 'FACULTY',
      department: 'Computer Science & Engineering',
      studentId: 'FAC-102',
    },
  });

  const student = await prisma.user.create({
    data: {
      email: 'student@campusarena.edu',
      passwordHash: studentPassword,
      name: 'Adithya S.',
      role: 'STUDENT',
      department: 'Computer Science & Engineering',
      studentId: 'SHR21CS045',
    },
  });

  // Arenas
  const arena1 = await prisma.arena.create({
    data: {
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
  });

  const arena2 = await prisma.arena.create({
    data: {
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
  });

  const arena3 = await prisma.arena.create({
    data: {
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
  });

  const arena4 = await prisma.arena.create({
    data: {
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
  });

  const arena5 = await prisma.arena.create({
    data: {
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
  });

  // Seed Events
  const event1 = await prisma.event.create({
    data: {
      title: 'Inter-Department Futsal League 2026',
      description: 'Annual campus football championship. 16 department teams battle for the Rolling Trophy.',
      category: 'SPORTS',
      venue: 'Main Football Turf & Track',
      bannerUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
      startDate: new Date(Date.now() + 86400000 * 3), // 3 days later
      endDate: new Date(Date.now() + 86400000 * 5),
      maxTeams: 16,
      rules: '5 players + 3 rolling subs. Standard FIFA futsal rules apply. College ID card mandatory.',
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'HackArena 2026: 24hr Campus Hackathon',
      description: 'Build innovative modern web, AI, and IoT solutions for campus life and sustainability.',
      category: 'TECHNICAL',
      venue: 'Robotics & Advanced Tech Arena',
      bannerUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
      startDate: new Date(Date.now() + 86400000 * 7),
      endDate: new Date(Date.now() + 86400000 * 8),
      maxTeams: 30,
      rules: 'Teams of 2-4 students. Problem statements announced at 9:00 AM. Free food and caffeine provided.',
    },
  });

  // Seed sample booking
  await prisma.booking.create({
    data: {
      userId: student.id,
      arenaId: arena1.id,
      title: 'CSE Batch 2026 Badminton Practice',
      purpose: 'Practice session for upcoming inter-department matches',
      startTime: new Date(Date.now() + 3600000 * 2), // 2 hours from now
      endTime: new Date(Date.now() + 3600000 * 4),
      status: 'CONFIRMED',
    },
  });

  console.log('Campus Arena seeded successfully with default users:');
  console.log(' - Admin: admin@campusarena.edu (password: admin123)');
  console.log(' - Faculty: coordinator.cse@campusarena.edu (password: faculty123)');
  console.log(' - Student: student@campusarena.edu (password: student123)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
