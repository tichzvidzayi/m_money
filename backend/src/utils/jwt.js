const jwt = require('jsonwebtoken');

// Load env vars for secure access 
require('dotenv').config();

const generateAccessToken = (user_id, session_id) => 
{  // a short-lived access token (15 minutes) 
      return jwt.sign({ user_id, session_id }, process.env.JWT_SECRET, { expiresIn: '10m' });
};

const generateRefreshToken = (user_id, session_id) => 
{
      return jwt.sign({ user_id, session_id }, process.env.REFRESH_SECRET, { expiresIn: '45m' });
};

const verifyAccessToken = (token) => 
{
      return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) =>
{
      return jwt.verify(token, process.env.REFRESH_SECRET);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };