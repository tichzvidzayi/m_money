const { verifyAccessToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
    
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = verifyAccessToken(token);
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};