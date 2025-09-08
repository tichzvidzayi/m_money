const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Auth API', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany(); // Clean DB
  });

  it('POST /auth/register should register a user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('userId');
  });

  it('POST /auth/login should return tokens', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });
});