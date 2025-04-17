import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">🎭 Entertainment Agency</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/entertainers">Entertainers</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
