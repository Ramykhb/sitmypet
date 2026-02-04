import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
  'Dog Walking',
  'Pet Sitting',
  'Grooming',
  'Health Care',
];

async function main() {
  console.log('Seeding services...');

  const unique = [...new Set(services)].sort();

  // Delete dependent records first
  await prisma.booking.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.service.deleteMany({});

  await prisma.service.createMany({
    data: unique.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log(`✅ Seeded ${unique.length} services`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
