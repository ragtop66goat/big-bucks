import "./footer.css";
import logo from "../../images/logo.png";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

export function Footer() {
  return (
    <div className="footer-bg">
      <div className="container footer">
        <img src={logo} alt="logo" className="logo" />
        <div>
          <span>Uncle Big Bucks</span>
        </div>
        <div>
          <FaFacebookSquare className="fab" />
          <FaTwitterSquare className="fab" />
          <FaInstagramSquare className="fab" />
        </div>
      </div>
    </div>
  );
}
