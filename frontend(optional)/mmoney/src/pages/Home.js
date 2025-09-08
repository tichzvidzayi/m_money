import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to MMoney</h1>
      <p className="text-lg mb-6">Send money globally with ease!</p>
      <Link to="/register" className="btn btn-primary">Get Started</Link>
    </div>
  );
};

export default Home;