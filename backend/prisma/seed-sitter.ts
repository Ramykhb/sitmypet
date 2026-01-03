import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sitterEmail = process.argv[2];

  if (!sitterEmail) {
    console.error('Usage: npm run seed:sitter <sitter-email>');
    process.exit(1);
  }

  console.log(`Seeding data for sitter: ${sitterEmail}`);

  // Find the sitter
  const sitter = await prisma.user.findUnique({
    where: { email: sitterEmail.toLowerCase() },
  });

  if (!sitter) {
    console.error(`User with email ${sitterEmail} not found`);
    process.exit(1);
  }

  // Add SITTER role if not present
  if (!sitter.roles.includes(Role.SITTER)) {
    console.log(`Adding SITTER role to ${sitterEmail}...`);
    await prisma.user.update({
      where: { id: sitter.id },
      data: {
        roles: [...sitter.roles, Role.SITTER],
      },
    });
    console.log(`✓ SITTER role added`);
  }

  console.log(`Found sitter: ${sitter.firstname} ${sitter.lastname}`);

  // Create dummy owners with pets
  const owners = await Promise.all([
    prisma.user.upsert({
      where: { email: 'owner1@example.com' },
      update: {},
      create: {
        email: 'owner1@example.com',
        firstname: 'Sarah',
        lastname: 'Johnson',
        passwordHash: 'dummy-hash',
        emailVerified: true,
        roles: [Role.OWNER],
        profileImageUrl: 'https://i.pravatar.cc/150?img=1',
      },
    }),
    prisma.user.upsert({
      where: { email: 'owner2@example.com' },
      update: {},
      create: {
        email: 'owner2@example.com',
        firstname: 'Michael',
        lastname: 'Chen',
        passwordHash: 'dummy-hash',
        emailVerified: true,
        roles: [Role.OWNER],
        profileImageUrl: 'https://i.pravatar.cc/150?img=2',
      },
    }),
    prisma.user.upsert({
      where: { email: 'owner3@example.com' },
      update: {},
      create: {
        email: 'owner3@example.com',
        firstname: 'Emma',
        lastname: 'Williams',
        passwordHash: 'dummy-hash',
        emailVerified: true,
        roles: [Role.OWNER],
        profileImageUrl: 'https://i.pravatar.cc/150?img=3',
      },
    }),
  ]);

  console.log(`Created ${owners.length} dummy owners`);

  // Create pets for each owner
  const pets = await Promise.all([
    prisma.pet.create({
      data: {
        name: 'Max',
        breed: 'Golden Retriever',
        imageUrl: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_1003.jpg',
        ownerId: owners[0].id,
      },
    }),
    prisma.pet.create({
      data: {
        name: 'Luna',
        breed: 'Husky',
        imageUrl: 'https://images.dog.ceo/breeds/husky/n02110185_1469.jpg',
        ownerId: owners[1].id,
      },
    }),
    prisma.pet.create({
      data: {
        name: 'Charlie',
        breed: 'Beagle',
        imageUrl: 'https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg',
        ownerId: owners[2].id,
      },
    }),
  ]);

  console.log(`Created ${pets.length} pets`);

  // Create today's bookings
  const today = new Date();
  const todayBookings = await Promise.all([
    prisma.booking.create({
      data: {
        sitterId: sitter.id,
        ownerId: owners[0].id,
        petId: pets[0].id,
        serviceType: 'Dog Walking',
        location: 'Hamra, Beirut',
        scheduledTime: new Date(today.setHours(10, 0, 0, 0)),
        status: 'CONFIRMED',
      },
    }),
    prisma.booking.create({
      data: {
        sitterId: sitter.id,
        ownerId: owners[1].id,
        petId: pets[1].id,
        serviceType: 'Pet Sitting',
        location: 'Achrafieh, Beirut',
        scheduledTime: new Date(today.setHours(14, 30, 0, 0)),
        status: 'CONFIRMED',
      },
    }),
  ]);

  console.log(`Created ${todayBookings.length} today's bookings`);

  // Create completed bookings (for recent clients)
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 7);

  const completedBookings = await Promise.all([
    prisma.booking.create({
      data: {
        sitterId: sitter.id,
        ownerId: owners[0].id,
        petId: pets[0].id,
        serviceType: 'Dog Walking',
        location: 'Hamra, Beirut',
        scheduledTime: pastDate,
        status: 'COMPLETED',
      },
    }),
    prisma.booking.create({
      data: {
        sitterId: sitter.id,
        ownerId: owners[1].id,
        petId: pets[1].id,
        serviceType: 'Pet Sitting',
        location: 'Verdun, Beirut',
        scheduledTime: new Date(pastDate.getTime() - 2 * 24 * 60 * 60 * 1000),
        status: 'COMPLETED',
      },
    }),
    prisma.booking.create({
      data: {
        sitterId: sitter.id,
        ownerId: owners[2].id,
        petId: pets[2].id,
        serviceType: 'Dog Walking',
        location: 'Mar Mikhael, Beirut',
        scheduledTime: new Date(pastDate.getTime() - 5 * 24 * 60 * 60 * 1000),
        status: 'COMPLETED',
      },
    }),
  ]);

  console.log(`Created ${completedBookings.length} completed bookings`);

  // Create nearby requests (Beirut locations)
  const requests = await Promise.all([
    prisma.request.create({
      data: {
        ownerId: owners[0].id,
        title: 'Golden Retriever needs a walk to the park',
        location: 'Hamra, Beirut',
        serviceType: 'Dog Walking',
        duration: '1-2 Hours',
        imageUrl: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_176.jpg',
        status: 'OPEN',
      },
    }),
    prisma.request.create({
      data: {
        ownerId: owners[1].id,
        title: 'Need pet sitter for weekend trip',
        location: 'Achrafieh, Beirut',
        serviceType: 'Pet Sitting',
        duration: '2-3 Days',
        imageUrl: 'https://images.dog.ceo/breeds/husky/n02110185_10047.jpg',
        status: 'OPEN',
      },
    }),
    prisma.request.create({
      data: {
        ownerId: owners[2].id,
        title: 'Looking for someone to walk my beagle',
        location: 'Verdun, Beirut',
        serviceType: 'Dog Walking',
        duration: '1 Hour',
        imageUrl: 'https://images.dog.ceo/breeds/beagle/n02088364_10108.jpg',
        status: 'OPEN',
      },
    }),
  ]);

  console.log(`Created ${requests.length} nearby requests in Beirut`);

  console.log('\n✅ Seeding completed successfully!');
  console.log(`\nSummary:`);
  console.log(`- ${todayBookings.length} bookings for today`);
  console.log(`- ${completedBookings.length} completed bookings (recent clients)`);
  console.log(`- ${requests.length} open requests in Beirut`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
