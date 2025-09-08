import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Add Link import
import { AuthContext } from './AuthProvider';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    const success = await register(email, password);
    if (success) navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input mb-4 w-full"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input mb-4 w-full"
          />
          <button type="submit" className="btn btn-primary w-full">Register</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;