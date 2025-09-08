const { PrismaClient } = require('@prisma/client');
const { calculateTransaction } = require('../services/transaction');
const prisma = new PrismaClient();

//Handle creating a new transaction
exports.create = async (req, res) => {
  try {

    const { amount, recipient, currency } = req.body; //destructure req.body
    if (!amount || !recipient || !currency) { // check if all fie;ds are there
      return res.status(400).json({ error: 'Amount, recipient, and currency required' });
    }

    const { exchangeRate, fee, netAmount } = calculateTransaction(amount, currency);

    //save transaction to db
    const transaction = await prisma.transaction.create({
      data: {
        userId: req.user.userId,
        recipient,
        amount,
        currency,
        exchangeRate,
        fee,
        netAmount,
      },
    });
    res.status(201).json(transaction); // successfully created
  } catch (err) {
    // error saving transaction/bad req
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try { // Handle fetching all transactions
    const { currency, startDate, endDate, minAmount, maxAmount, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * parseInt(limit);
    let where = { userId: req.user.userId };

    if (currency) where.currency = currency;
    if (startDate || endDate) where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate);
    if (endDate) where.createdAt.lte = new Date(endDate);
    if (minAmount || maxAmount) where.amount = {};
    if (minAmount) where.amount.gte = parseFloat(minAmount);
    if (maxAmount) where.amount.lte = parseFloat(maxAmount);

    const transactions = await prisma.transaction.findMany({
      where,
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
    });
    const total = await prisma.transaction.count({ where });
    res.json({ transactions, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};