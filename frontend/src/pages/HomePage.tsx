import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100 bg-white text-center">
      <div className="px-3">
        <h1 className="display-4 mb-3">Welcome to the Entertainment Agency 🎤</h1>
        <p className="lead mb-4">
          Find and manage talent for your next event — quickly and professionally.
        </p>
        <Link to="/entertainers" className="btn btn-primary btn-lg">
          View Entertainers
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
