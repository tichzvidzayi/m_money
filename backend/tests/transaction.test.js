const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const { generateAccessToken } = require('../src/utils/jwt');
const prisma = new PrismaClient();

// tests for transactions endpoints
describe('Transaction API', () => {
  let token;
  let user_id;

  beforeAll(async () => {
    await prisma.user.deleteMany();
    const user = await prisma.user.create({
      data: { email: 'test@example.com', password: 'hashed' },
    });
    user_id = user.id;
    token = generateAccessToken(user_id, 1);
  });

 // test create transactions
  it('POST /transactions should create transaction', async () => {
    const res = await request(app)
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 100, recipient: 'test@recipient.com', currency: 'USD' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.currency).toBe('USD');
  });

  // test retrieve of transactions
  it('GET /transactions should return transactions', async () => {
    const res = await request(app)
      .get('/transactions?page=1&limit=10')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('transactions');
    expect(res.body).toHaveProperty('total');
  });
});