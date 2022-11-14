import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import "./navbar.css";

export function Navbar() {
  return (
    <div className="nav-bg">
      <div className="container nav-bar">
        <img src={logo} className="logo" />
        <div>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/seasons">Seasons</Link>
            <Link to="/lodging">Lodging</Link>
            <Link to="/contact">Contact</Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
