import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SITTER_EMAIL = 'ramykhb18@gmail.com';

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

// Sample data for nearby posts (from different owners)
const NEARBY_POSTS_DATA = [
  {
    title: 'Energetic Husky needs morning walks',
    location: 'Beirut',
    serviceType: 'Walking',
    duration: '1-2 Hours',
    imageUrl:
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=800&q=80',
    description: LOREM_IPSUM,
    price: 15.0,
    ownerFirstname: 'Sarah',
    ownerLastname: 'Johnson',
    petName: 'Max',
    petBreed: 'Siberian Husky',
  },
  {
    title: 'Persian Cat needs grooming and care',
    location: 'Beirut',
    serviceType: 'Grooming',
    duration: '2-3 Hours',
    imageUrl:
      'https://images.unsplash.com/photo-1583511655826-05700d4f7de5?auto=format&fit=crop&w=800&q=80',
    description: LOREM_IPSUM,
    price: 25.0,
    ownerFirstname: 'Michael',
    ownerLastname: 'Chen',
    petName: 'Luna',
    petBreed: 'Persian',
  },
  {
    title: 'Friendly Labrador needs weekend sitting',
    location: 'Jounieh',
    serviceType: 'Sitting',
    duration: '2-3 Days',
    imageUrl:
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80',
    description: LOREM_IPSUM,
    price: 50.0,
    ownerFirstname: 'Emma',
    ownerLastname: 'Davis',
    petName: 'Charlie',
    petBreed: 'Labrador Retriever',
  },
  {
    title: 'Playful Beagle needs afternoon hiking',
    location: 'Beirut',
    serviceType: 'Hike',
    duration: '3-4 Hours',
    imageUrl:
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80',
    description: LOREM_IPSUM,
    price: 20.0,
    ownerFirstname: 'David',
    ownerLastname: 'Martinez',
    petName: 'Buddy',
    petBreed: 'Beagle',
  },
  {
    title: 'Senior Golden Retriever needs gentle care',
    location: 'Baabda',
    serviceType: 'Sitting',
    duration: '4-5 Hours',
    imageUrl:
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=800&q=80',
    description: LOREM_IPSUM,
    price: 18.0,
    ownerFirstname: 'Lisa',
    ownerLastname: 'Anderson',
    petName: 'Rocky',
    petBreed: 'Golden Retriever',
  },
];

// Sample data for creating client history (owners who had completed bookings with the sitter)
const CLIENT_HISTORY_DATA = [
  {
    firstname: 'James',
    lastname: 'Wilson',
    email: 'james.wilson@example.com',
    petName: 'Bella',
    petBreed: 'French Bulldog',
    serviceType: 'Walking',
    location: 'Beirut',
    rating: 5,
    comment: 'Excellent service! My dog loved the walks.',
  },
  {
    firstname: 'Sophia',
    lastname: 'Brown',
    email: 'sophia.brown@example.com',
    petName: 'Milo',
    petBreed: 'Poodle',
    serviceType: 'Grooming',
    location: 'Beirut',
    rating: 4,
    comment: 'Very professional and caring.',
  },
  {
    firstname: 'Oliver',
    lastname: 'Taylor',
    email: 'oliver.taylor@example.com',
    petName: 'Cooper',
    petBreed: 'Border Collie',
    serviceType: 'Sitting',
    location: 'Jounieh',
    rating: 5,
    comment: 'Great experience! Highly recommend.',
  },
  {
    firstname: 'Isabella',
    lastname: 'Moore',
    email: 'isabella.moore@example.com',
    petName: 'Daisy',
    petBreed: 'Yorkshire Terrier',
    serviceType: 'Walking',
    location: 'Beirut',
    rating: 5,
    comment: 'Wonderful caretaker!',
  },
  {
    firstname: 'Ethan',
    lastname: 'White',
    email: 'ethan.white@example.com',
    petName: 'Zeus',
    petBreed: 'German Shepherd',
    serviceType: 'Hike',
    location: 'Baabda',
    rating: 4,
    comment: 'Good service, very reliable.',
  },
];

// Sample data for bookings (today, tomorrow, and future)
const BOOKINGS_DATA = [
  // TODAY (31 Jan 2026)
  {
    ownerFirstname: 'Ava',
    ownerLastname: 'Harris',
    email: 'ava.harris@example.com',
    petName: 'Oscar',
    petBreed: 'Cocker Spaniel',
    serviceType: 'Walking',
    location: 'Beirut',
    daysFromToday: 0,
    time: '09:00',
  },
  {
    ownerFirstname: 'Noah',
    ownerLastname: 'Clark',
    email: 'noah.clark@example.com',
    petName: 'Coco',
    petBreed: 'Chihuahua',
    serviceType: 'Sitting',
    location: 'Jounieh',
    daysFromToday: 0,
    time: '14:30',
  },
  // TOMORROW (1 Feb 2026)
  {
    ownerFirstname: 'Mia',
    ownerLastname: 'Lewis',
    email: 'mia.lewis@example.com',
    petName: 'Simba',
    petBreed: 'Maine Coon',
    serviceType: 'Grooming',
    location: 'Beirut',
    daysFromToday: 1,
    time: '10:00',
  },
  {
    ownerFirstname: 'Liam',
    ownerLastname: 'Johnson',
    email: 'liam.johnson@example.com',
    petName: 'Luna',
    petBreed: 'Pomeranian',
    serviceType: 'Walking',
    location: 'Beirut',
    daysFromToday: 1,
    time: '15:00',
  },
  // FUTURE (3 Feb 2026)
  {
    ownerFirstname: 'Emma',
    ownerLastname: 'Williams',
    email: 'emma.williams@example.com',
    petName: 'Rex',
    petBreed: 'Rottweiler',
    serviceType: 'Hike',
    location: 'Baabda',
    daysFromToday: 3,
    time: '08:00',
  },
  // FUTURE (5 Feb 2026)
  {
    ownerFirstname: 'Lucas',
    ownerLastname: 'Brown',
    email: 'lucas.brown@example.com',
    petName: 'Mittens',
    petBreed: 'British Shorthair',
    serviceType: 'Sitting',
    location: 'Jounieh',
    daysFromToday: 5,
    time: '12:00',
  },
  // FUTURE (7 Feb 2026)
  {
    ownerFirstname: 'Olivia',
    ownerLastname: 'Garcia',
    email: 'olivia.garcia@example.com',
    petName: 'Duke',
    petBreed: 'Boxer',
    serviceType: 'Walking',
    location: 'Beirut',
    daysFromToday: 7,
    time: '17:00',
  },
];

async function main() {
  console.log('🔍 Looking for sitter user: ' + SITTER_EMAIL);

  // Find or create the sitter user
  let sitter = await prisma.user.findUnique({
    where: { email: SITTER_EMAIL },
    include: { profile: true },
  });

  if (!sitter) {
    console.log('❌ Sitter not found. Please create the user first.');
    process.exit(1);
  }

  console.log(`✅ Found sitter: ${sitter.firstname} ${sitter.lastname}`);

  // Ensure sitter has the SITTER role
  if (!sitter.roles.includes('SITTER')) {
    console.log('Adding SITTER role...');
    const updatedRoles = [...new Set([...sitter.roles, 'SITTER'])] as Array<
      'OWNER' | 'SITTER'
    >;
    sitter = await prisma.user.update({
      where: { id: sitter.id },
      data: {
        roles: updatedRoles,
      },
      include: { profile: true },
    });
  }

  // Ensure sitter has a profile with location
  if (!sitter.profile) {
    console.log('Creating profile for sitter...');
    let beirutLocation = await prisma.location.findUnique({
      where: { name: 'Beirut' },
    });

    if (!beirutLocation) {
      console.log('Creating Beirut location...');
      beirutLocation = await prisma.location.create({
        data: { name: 'Beirut' },
      });
    }

    await prisma.profile.create({
      data: {
        userId: sitter.id,
        locationId: beirutLocation.id,
      },
    });
  }

  console.log('\n📝 Creating sample data...\n');

  // 1. Create nearby posts (from different owners)
  console.log('Creating nearby posts...');
  for (const postData of NEARBY_POSTS_DATA) {
    // Create or find owner
    let owner = await prisma.user.findUnique({
      where: { email: `${postData.ownerFirstname.toLowerCase()}.${postData.ownerLastname.toLowerCase()}@example.com` },
    });

    if (!owner) {
      owner = await prisma.user.create({
        data: {
          email: `${postData.ownerFirstname.toLowerCase()}.${postData.ownerLastname.toLowerCase()}@example.com`,
          firstname: postData.ownerFirstname,
          lastname: postData.ownerLastname,
          passwordHash: 'hashed_password_placeholder',
          roles: ['OWNER'],
        },
      });
    }

    // Ensure owner has OWNER role
    if (!owner.roles.includes('OWNER')) {
      const updatedRoles = [...new Set([...owner.roles, 'OWNER'])] as Array<
        'OWNER' | 'SITTER'
      >;
      owner = await prisma.user.update({
        where: { id: owner.id },
        data: {
          roles: updatedRoles,
        },
      });
    }

    // Create pet for owner
    let pet = await prisma.pet.findFirst({
      where: {
        name: postData.petName,
        ownerId: owner.id,
      },
    });

    if (!pet) {
      pet = await prisma.pet.create({
        data: {
          name: postData.petName,
          breed: postData.petBreed,
          ownerId: owner.id,
        },
      });
    }

    // Create post
    await prisma.post.create({
      data: {
        title: postData.title,
        location: postData.location,
        serviceType: postData.serviceType,
        duration: postData.duration,
        imageUrl: postData.imageUrl,
        description: postData.description,
        price: postData.price,
        status: 'OPEN',
        ownerId: owner.id,
        petId: pet.id,
      },
    });

    console.log(`  ✓ Created post: ${postData.title}`);
  }

  // 2. Create client history (past completed bookings with reviews)
  console.log('\nCreating client history...');
  for (const clientData of CLIENT_HISTORY_DATA) {
    // Create or find owner
    let owner = await prisma.user.findUnique({
      where: { email: clientData.email },
    });

    if (!owner) {
      owner = await prisma.user.create({
        data: {
          email: clientData.email,
          firstname: clientData.firstname,
          lastname: clientData.lastname,
          passwordHash: 'hashed_password_placeholder',
          roles: ['OWNER'],
        },
      });
    }

    // Create pet for owner
    let pet = await prisma.pet.findFirst({
      where: {
        name: clientData.petName,
        ownerId: owner.id,
      },
    });

    if (!pet) {
      pet = await prisma.pet.create({
        data: {
          name: clientData.petName,
          breed: clientData.petBreed,
          ownerId: owner.id,
        },
      });
    }

    // Create completed booking in the past
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 30) - 1); // Random date in the past month

    const booking = await prisma.booking.create({
      data: {
        sitterId: sitter.id,
        ownerId: owner.id,
        petId: pet.id,
        serviceType: clientData.serviceType,
        location: clientData.location,
        scheduledTime: pastDate,
        status: 'COMPLETED',
      },
    });

    // Create review
    await prisma.review.create({
      data: {
        bookingId: booking.id,
        rating: clientData.rating,
        comment: clientData.comment,
      },
    });

    console.log(
      `  ✓ Created client: ${clientData.firstname} ${clientData.lastname}`,
    );
  }

  // 3. Create bookings (today, tomorrow, and future)
  console.log('\nCreating bookings (today, tomorrow, and future)...');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const bookingData of BOOKINGS_DATA) {
    // Create or find owner
    let owner = await prisma.user.findUnique({
      where: { email: bookingData.email },
    });

    if (!owner) {
      owner = await prisma.user.create({
        data: {
          email: bookingData.email,
          firstname: bookingData.ownerFirstname,
          lastname: bookingData.ownerLastname,
          passwordHash: 'hashed_password_placeholder',
          roles: ['OWNER'],
        },
      });
    }

    // Create pet for owner
    let pet = await prisma.pet.findFirst({
      where: {
        name: bookingData.petName,
        ownerId: owner.id,
      },
    });

    if (!pet) {
      pet = await prisma.pet.create({
        data: {
          name: bookingData.petName,
          breed: bookingData.petBreed,
          ownerId: owner.id,
        },
      });
    }

    // Calculate booking date
    const bookingDate = new Date(today);
    bookingDate.setDate(bookingDate.getDate() + bookingData.daysFromToday);
    
    // Parse time and set it
    const [hours, minutes] = bookingData.time.split(':');
    bookingDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // Create booking
    await prisma.booking.create({
      data: {
        sitterId: sitter.id,
        ownerId: owner.id,
        petId: pet.id,
        serviceType: bookingData.serviceType,
        location: bookingData.location,
        scheduledTime: bookingDate,
        status: 'CONFIRMED',
      },
    });

    const dateLabel =
      bookingData.daysFromToday === 0
        ? 'Today'
        : bookingData.daysFromToday === 1
          ? 'Tomorrow'
          : `${bookingDate.toLocaleDateString()}`;
    console.log(
      `  ✓ Created booking: ${bookingData.ownerFirstname} ${bookingData.ownerLastname} - ${dateLabel} at ${bookingData.time}`,
    );
  }

  console.log('\n✅ Successfully seeded all data for ' + SITTER_EMAIL);
  console.log('\nSummary:');
  console.log(`  - ${NEARBY_POSTS_DATA.length} nearby posts created`);
  console.log(
    `  - ${CLIENT_HISTORY_DATA.length} recent clients with reviews created`,
  );
  console.log(`  - ${BOOKINGS_DATA.length} bookings created (today, tomorrow, and future)`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding sitter data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
