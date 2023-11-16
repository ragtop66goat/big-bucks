import "./footer.css";
import logo from "../../images/logo.png";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

export function Footer() {
  return (
    <div data-testid="footer" className="footer-bg">
      <div className="container footer">
        <img src={logo} alt="logo" className="logo" />
        <div>
          <span>Uncle Big Bucks</span>
        </div>
        <div>
          <FaFacebookSquare data-testid="social" className="fab" />
          <FaTwitterSquare data-testid="social" className="fab" />
          <FaInstagramSquare data-testid="social" className="fab" />
        </div>
      </div>
    </div>
  );
}
