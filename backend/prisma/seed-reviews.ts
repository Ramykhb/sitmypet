import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const ownerEmail = process.argv[2];

  if (!ownerEmail) {
    console.error('Please provide an owner email');
    process.exit(1);
  }

  const owner = await prisma.user.findUnique({
    where: { email: ownerEmail },
  });

  if (!owner) {
    console.error(`Owner with email ${ownerEmail} not found`);
    process.exit(1);
  }

  console.log(`Found owner: ${owner.firstname} ${owner.lastname}`);

  // Find existing completed bookings for this owner that don't have reviews yet
  const bookingsWithoutReviews = await prisma.booking.findMany({
    where: {
      ownerId: owner.id,
      status: 'COMPLETED',
      review: null,
    },
    include: {
      sitter: true,
      pet: true,
    },
  });

  if (bookingsWithoutReviews.length === 0) {
    console.log('No completed bookings without reviews found for this owner.');
    console.log('Run seed-sitter.sh first to create bookings.');
    process.exit(0);
  }

  console.log(`Found ${bookingsWithoutReviews.length} completed booking(s) without reviews`);

  // Add reviews to existing bookings
  const reviewRatings = [5, 4, 3]; // Can add more if needed
  const reviewComments = [
    'Amazing experience! Very responsible.',
    'Great service, will book again.',
    'Good overall.',
  ];

  let reviewsAdded = 0;
  for (let i = 0; i < bookingsWithoutReviews.length && i < reviewRatings.length; i++) {
    const booking = bookingsWithoutReviews[i];

    await prisma.review.create({
      data: {
        bookingId: booking.id,
        rating: reviewRatings[i],
        comment: reviewComments[i],
      },
    });

    console.log(`Added review ${i + 1}: ${reviewRatings[i]} stars for booking with ${booking.sitter.firstname}`);
    reviewsAdded++;
  }

  // Calculate and display the average rating
  const allReviews = await prisma.review.findMany({
    where: {
      booking: {
        ownerId: owner.id,
        status: 'COMPLETED',
      },
    },
  });

  const avgRating =
    allReviews.reduce((sum, review) => sum + review.rating, 0) /
    allReviews.length;

  console.log('\n✅ Seeding completed successfully!');
  console.log(`Reviews added: ${reviewsAdded}`);
  console.log(`Total reviews for ${owner.firstname}: ${allReviews.length}`);
  console.log(`Average rating: ${avgRating.toFixed(1)} stars`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
