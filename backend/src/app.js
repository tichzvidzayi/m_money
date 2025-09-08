const express = require('express');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transaction');
const swaggerDocument = require('../swagger/swagger.json');

const app = express();

// Middleware
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100 requests per 15 min
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;