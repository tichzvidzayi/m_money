const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.status(201).json({ message: 'User registered', userId: user.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const session = await prisma.session.create({ data: { userId: user.id, token: 'temp' } });
    const accessToken = generateAccessToken(user.id, session.id);
    const refreshToken = generateRefreshToken(user.id, session.id);
    await prisma.session.update({ where: { id: session.id }, data: { token: refreshToken } });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });
    const decoded = verifyRefreshToken(refreshToken);
    const session = await prisma.session.findUnique({
      where: { id: decoded.sessionId, token: refreshToken },
    });
    if (!session) return res.status(401).json({ error: 'Invalid session' });
    const newAccessToken = generateAccessToken(decoded.userId, decoded.sessionId);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
};