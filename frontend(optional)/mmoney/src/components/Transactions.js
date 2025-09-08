import { useState, useEffect, useContext } from 'react';
import api from '../axios';
import { AuthContext } from './AuthProvider';
import { toast } from 'react-toastify';

const Transactions = () => {
  const { accessToken } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [filterCurrency, setFilterCurrency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchTransactions = async () => {
    try {
      const params = { page, limit };
      if (filterCurrency) params.currency = filterCurrency;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (minAmount) params.minAmount = minAmount;
      if (maxAmount) params.maxAmount = maxAmount;

      const res = await api.get('/transactions', { params });
      setTransactions(res.data.transactions);
      setTotal(res.data.total);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to fetch transactions');
    }
  };

  useEffect(() => {
    if (accessToken) fetchTransactions();
  }, [accessToken, page, filterCurrency, startDate, endDate, minAmount, maxAmount]);

  const handleSendMoney = async (e) => {
    e.preventDefault();
    if (!amount || !recipient || !currency) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await api.post('/transactions', { amount: parseFloat(amount), recipient, currency });
      toast.success('Transaction created!');
      setAmount('');
      setRecipient('');
      fetchTransactions();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create transaction');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">Send Money</h2>
        <form onSubmit={handleSendMoney} className="grid gap-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (ZAR)"
            className="input"
          />
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient Email"
            className="input"
          />
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="input">
            <option value="USD">USD</option>
            <option value="KES">KES</option>
          </select>
          <button type="submit" className="btn btn-primary">Send Money</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Transactions</h2>
        <div className="grid gap-4 mb-4 md:grid-cols-3">
          <input
            type="text"
            value={filterCurrency}
            onChange={(e) => setFilterCurrency(e.target.value)}
            placeholder="Filter by Currency (USD/KES)"
            className="input"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
            className="input"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
            className="input"
          />
          <input
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            placeholder="Min Amount"
            className="input"
          />
          <input
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            placeholder="Max Amount"
            className="input"
          />
          <button onClick={() => setPage(1)} className="btn btn-primary">Apply Filters</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Recipient</th>
                <th className="p-2 text-left">Amount (ZAR)</th>
                <th className="p-2 text-left">Currency</th>
                <th className="p-2 text-left">Net Amount</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b">
                  <td className="p-2">{tx.id}</td>
                  <td className="p-2">{tx.recipient}</td>
                  <td className="p-2">{tx.amount}</td>
                  <td className="p-2">{tx.currency}</td>
                  <td className="p-2">{tx.netAmount}</td>
                  <td className="p-2">{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="btn btn-primary disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {page} of {Math.ceil(total / limit)}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * limit >= total}
            className="btn btn-primary disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;