import logo from "../../images/logo.png";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <div className="nav-position" data-testid="navbar">
      <Navbar expand="lg" className="nav-bg">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" className="logo" />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Link to="/" className="navLink">
                Home
              </Link>
              <Link to="/seasons" className="navLink">
                Seasons
              </Link>
              <Link to="/lodging" className="navLink">
                Lodging
              </Link>
              <Link to="/contact" className="navLink">
                Contact
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
