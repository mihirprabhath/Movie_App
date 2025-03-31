import { FaHeart, FaGithub, FaLinkedin, FaFilm, FaTwitter, FaTwitterSquare } from 'react-icons/fa';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <FaFilm className="logo-icon" />
          <span className="site-name">CineMate</span>
          <span className="owner-badge">Owner: MihirPrabhath</span>
        </div>
        
        <div className="footer-links">
          <a href="/about" className="footer-link">About</a>
          <a href="/privacy" className="footer-link">Privacy</a>
          <a href="/terms" className="footer-link">Terms</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>
        
        <div className="footer-social">
          <a href="https://github.com/yourprofile" className="social-icon">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/yourprofile" className="social-icon">
            <FaLinkedin />
          </a>
          <a href="https://linkedin.com/in/yourprofile" className="social-icon">
          <FaTwitterSquare/>

          </a>
        </div>
        
        <div className="footer-copyright">
          <p>Made with <FaHeart className="heart-icon" /> by MihirPrabhath © {new Date().getFullYear()}</p>
          <p>All movie data provided by TMDb API</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;