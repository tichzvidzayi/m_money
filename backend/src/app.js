const express = require('express');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transaction');
const swaggerDocument = require('../swagger/swagger.json');

const app = express();

//app_middleware
app.use(express.json());
// limit to 100 rewuests per 15mins
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Apologies something went wrong from our side. Try again later!' });
});

module.exports = app;