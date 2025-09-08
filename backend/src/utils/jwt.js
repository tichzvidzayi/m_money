const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (userId, sessionId) => {
  return jwt.sign({ userId, sessionId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (userId, sessionId) => {
  return jwt.sign({ userId, sessionId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_SECRET);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };