const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: {
      email: 'test@mmoney.com',
      password: hashedPassword,
    },
  });
  console.log('Seeded test user');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());