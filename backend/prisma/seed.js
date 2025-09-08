const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const h_pwd = await bcrypt.hash('@password1', 10);
  await prisma.user.create({
    data: {
      email: 'user1@mmoney.co.za',
      password: h_pwd,
    },
  });
  console.log('Successfully seeded a sample test user,');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());