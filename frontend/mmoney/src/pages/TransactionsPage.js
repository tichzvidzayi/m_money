import Transactions from '../components/Transactions';
import ProtectedRoute from '../components/ProtectedRoute';

const TransactionsPage = () => (
<ProtectedRoute>
    <Transactions />
</ProtectedRoute>
);
export default TransactionsPage;