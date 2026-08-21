import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-shell">◒</span>
        RuralConnect
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-register">
              Join now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;