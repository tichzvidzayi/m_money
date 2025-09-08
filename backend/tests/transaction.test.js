const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const { generateAccessToken } = require('../src/utils/jwt');
const prisma = new PrismaClient();

describe('Transaction API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await prisma.user.deleteMany();
    const user = await prisma.user.create({
      data: { email: 'test@example.com', password: 'hashed' },
    });
    userId = user.id;
    token = generateAccessToken(userId, 1);
  });

  it('POST /transactions should create transaction', async () => {
    const res = await request(app)
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 100, recipient: 'test@recipient.com', currency: 'USD' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.currency).toBe('USD');
  });

  it('GET /transactions should return transactions', async () => {
    const res = await request(app)
      .get('/transactions?page=1&limit=10')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('transactions');
    expect(res.body).toHaveProperty('total');
  });
});