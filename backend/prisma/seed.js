const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const h_pwd = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: {
      email: 'test@mmoney.co.za',
      password: h_pwd,
    },
  });
  console.log('Successfully eeded a sample test user');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());