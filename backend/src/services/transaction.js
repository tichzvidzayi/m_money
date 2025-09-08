const exchangeRates = {
  USD: 0.055, // ZAR -> USD
  KES: 7.1,   // ZAR -> KES
};
const flatFee = 5; // ZAR
const percentFee = 0.02; // 2%

exports.calculateTransaction = (amount, currency) => {
  if (!exchangeRates[currency]) throw new Error('Invalid currency');
  const rate = exchangeRates[currency];
  const gross = amount;
  const fee = flatFee + gross * percentFee;
  const net = (gross - fee) * rate;
  return { exchangeRate: rate, fee, netAmount: net };
};