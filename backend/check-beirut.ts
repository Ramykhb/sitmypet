import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Searching for requests in "Beirut"...');

  const requests = await prisma.request.findMany({
    where: {
      location: {
        contains: 'Beirut',
        mode: 'insensitive',
      },
      status: 'OPEN',
    },
    select: {
      id: true,
      title: true,
      location: true,
      price: true,
      createdAt: true,
    },
  });

  if (requests.length === 0) {
    console.log('❌ No open requests found in Beirut.');
  } else {
    console.log(`✅ Found ${requests.length} requests:\n`);
    requests.forEach((req, index) => {
      console.log(`${index + 1}. ${req.title}`);
      console.log(`   📍 Location: ${req.location}`);
      console.log(`   💰 Price: ${req.price ? `$${req.price}` : 'Not set'}`);
      console.log(`   📅 Created: ${req.createdAt.toLocaleString()}`);
      console.log('-----------------------------------');
    });
  }
}

main()
  .catch((e) => {
    console.error('Error running script:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
