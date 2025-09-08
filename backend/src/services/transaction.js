const exchangeRates = {
  USD: 0.05685, // ZAR -> USD
  BWP: 0.7614,   // ZAR -> BWP (botswana Pula)
};
const flatFee = 13; // ZAR
const percentFee = 0.08; //8%

exports.calculateTransaction = (amount, currency) => {
  if (!exchangeRates[currency]) 
    {
        throw new Error('Invalid currency');
    }

  const rate = exchangeRates[currency];
  const gross = amount;
  const fee = flatFee + gross * percentFee;
  const net = (gross - fee) * rate;
  
  return { exchangeRate: rate, fee, netAmount: net };
};