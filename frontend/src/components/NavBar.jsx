import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">CineMate</span>
          </Link>
        </div>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <span className="link-text">Home</span>
            <span className="link-underline"></span>
          </Link>
          <Link to="/favorites" className="nav-link">
            <span className="link-text">Favorites</span>
            <span className="link-underline"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;