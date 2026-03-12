import { PrismaClient, NotificationType, Role } from '@prisma/client';

const prisma = new PrismaClient();

const RAMY_EMAIL = 'ramykhb18@gmail.com';
const TAREK_EMAIL = 'tarekalkhatibb@gmail.com';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('🚀 Starting Notification & Review Seeding...');

  // 0. Cleanup Previous Data
  console.log('--- Step 0: Cleaning up previous test data ---');
  const ramyUser = await prisma.user.findUnique({ where: { email: RAMY_EMAIL } });
  const tarekUser = await prisma.user.findUnique({ where: { email: TAREK_EMAIL } });

  if (ramyUser && tarekUser) {
    // Delete notifications involving these users
    await prisma.notification.deleteMany({
      where: {
        OR: [
          { userId: ramyUser.id },
          { userId: tarekUser.id },
          { senderId: ramyUser.id },
          { senderId: tarekUser.id },
        ],
      },
    });

    // Delete reviews on bookings between them
    await prisma.review.deleteMany({
      where: {
        booking: {
          OR: [
            { ownerId: ramyUser.id, sitterId: tarekUser.id },
            { ownerId: tarekUser.id, sitterId: ramyUser.id },
          ],
        },
      },
    });

    // Delete bookings between them
    await prisma.booking.deleteMany({
      where: {
        OR: [
          { ownerId: ramyUser.id, sitterId: tarekUser.id },
          { ownerId: tarekUser.id, sitterId: ramyUser.id },
        ],
      },
    });

    // Delete applications
    await prisma.application.deleteMany({
      where: {
        OR: [
          { sitterId: tarekUser.id },
          { post: { ownerId: ramyUser.id } },
        ],
      },
    });

    // Delete posts by Ramy
    await prisma.post.deleteMany({
      where: { ownerId: ramyUser.id },
    });

    // Delete pet Sky
    await prisma.pet.deleteMany({
      where: { name: 'Sky', ownerId: ramyUser.id },
    });

    console.log('   ✓ Cleanup complete');
  }

  // 1. Ensure Users Exist
  console.log('--- Step 1: Ensuring Users exist ---');
  let ramy = await prisma.user.findUnique({ where: { email: RAMY_EMAIL } });
  if (!ramy) {
    ramy = await prisma.user.create({
      data: {
        email: RAMY_EMAIL,
        firstname: 'Ramy',
        lastname: 'Khachab',
        passwordHash: 'hashed_password_placeholder',
        roles: [Role.OWNER],
      },
    });
  }

  let tarek = await prisma.user.findUnique({ where: { email: TAREK_EMAIL } });
  if (!tarek) {
    tarek = await prisma.user.create({
      data: {
        email: TAREK_EMAIL,
        firstname: 'Tarek',
        lastname: 'Al Khatib',
        passwordHash: 'hashed_password_placeholder',
        roles: [Role.SITTER],
      },
    });
  }

  // Ensure Roles
  if (!ramy.roles.includes(Role.OWNER)) {
    await prisma.user.update({
      where: { id: ramy.id },
      data: { roles: { set: [...ramy.roles, Role.OWNER] } },
    });
  }
  if (!tarek.roles.includes(Role.SITTER)) {
    await prisma.user.update({
      where: { id: tarek.id },
      data: { roles: { set: [...tarek.roles, Role.SITTER] } },
    });
  }

  // Ensure Profiles & Location
  let beirut = await prisma.location.findUnique({ where: { name: 'Beirut' } });
  if (!beirut) {
    beirut = await prisma.location.create({ data: { name: 'Beirut' } });
  }

  await prisma.profile.upsert({
    where: { userId: ramy.id },
    create: { userId: ramy.id, locationId: beirut.id },
    update: { locationId: beirut.id },
  });

  await prisma.profile.upsert({
    where: { userId: tarek.id },
    create: { userId: tarek.id, locationId: beirut.id },
    update: { locationId: beirut.id },
  });

  // 2. Add Pet Sky for Ramy
  console.log('--- Step 2: Adding Pet Sky for Ramy ---');
  let sky = await prisma.pet.findFirst({
    where: { name: 'Sky', ownerId: ramy.id },
  });
  if (!sky) {
    sky = await prisma.pet.create({
      data: {
        name: 'Sky',
        breed: 'Husky',
        ownerId: ramy.id,
        imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=400&q=80',
      },
    });
  }

  // 3. Create Job Post
  console.log('--- Step 3: Creating Job Post (+2 weeks) ---');
  const service = await prisma.service.findFirst({ where: { name: 'Dog Walking' } });
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

  const post = await prisma.post.create({
    data: {
      ownerId: ramy.id,
      petId: sky.id,
      serviceId: service!.id,
      title: 'Walking Sky in Beirut',
      description: 'Sky needs a long walk while I am away in 2 weeks.',
      location: 'Beirut Central',
      scheduledTime: twoWeeksLater,
      duration: '1 Hour',
      price: 20,
      status: 'OPEN',
      imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=400&q=80',
    },
  });

  // 4. Tarek applies to the job
  console.log('--- Step 4: Tarek applies to the job ---');
  const application = await prisma.application.create({
    data: {
      postId: post.id,
      sitterId: tarek.id,
      status: 'PENDING',
    },
  });

  // Trigger NEW_APPLICATION notification for Ramy
  await prisma.notification.create({
    data: {
      userId: ramy.id,
      type: 'NEW_APPLICATION',
      title: 'New Application',
      message: `${tarek.firstname} has applied to your post "${post.title}".`,
      postId: post.id,
      applicationId: application.id,
      senderId: tarek.id,
    },
  });

  console.log('   ✓ Triggered NEW_APPLICATION notification');

  console.log('⏳ Sleeping 5 seconds...');
  await sleep(5000);

  // 5. Ramy accepts Tarek's application
  console.log("--- Step 5: Ramy accepts Tarek's application ---");
  await prisma.application.update({
    where: { id: application.id },
    data: { status: 'ACCEPTED' },
  });

  const booking = await prisma.booking.create({
    data: {
      ownerId: ramy.id,
      sitterId: tarek.id,
      petId: sky.id,
      serviceId: service!.id,
      location: post.location,
      scheduledTime: post.scheduledTime,
      status: 'CONFIRMED',
    },
  });

  // Trigger APPLICATION_ACCEPTED notification for Tarek
  await prisma.notification.create({
    data: {
      userId: tarek.id,
      type: 'APPLICATION_ACCEPTED',
      title: 'Application Accepted!',
      message: `Your application for "${post.title}" was accepted.`,
      postId: post.id,
      bookingId: booking.id,
      senderId: ramy.id,
    },
  });

  console.log('   ✓ Triggered APPLICATION_ACCEPTED notification');

  // 6. Create past completed booking (yesterday)
  console.log('--- Step 6: Creating past completed booking for reviews ---');
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const pastBooking = await prisma.booking.create({
    data: {
      ownerId: ramy.id,
      sitterId: tarek.id,
      petId: sky.id,
      serviceId: service!.id,
      location: 'Beirut',
      scheduledTime: yesterday,
      status: 'COMPLETED',
    },
  });

  console.log('⏳ Sleeping 5 seconds...');
  await sleep(5000);

  // 7. Tarek reviews Ramy
  console.log('--- Step 7: Tarek reviews Ramy ---');
  await prisma.review.create({
    data: {
      bookingId: pastBooking.id,
      rating: 4,
      comment: 'Ramy was very helpful and Sky is a great dog!',
    },
  });

  // Trigger NEW_REVIEW notification for Ramy
  await prisma.notification.create({
    data: {
      userId: ramy.id,
      type: 'NEW_REVIEW',
      title: 'New Review Received',
      message: `${tarek.firstname} left you a 4-star review for your recent booking.`,
      bookingId: pastBooking.id,
      senderId: tarek.id,
    },
  });

  console.log('   ✓ Triggered NEW_REVIEW notification');

  console.log('\n✅ Seeding Complete!');
  console.log(`- New notifications for Ramy: Check Inbox`);
  console.log(`- New notifications for Tarek: Check Inbox`);
}

main()
  .catch((e) => {
    console.error('❌ Error in seeding script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
