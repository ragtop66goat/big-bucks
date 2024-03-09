import logo from "../../images/logo.png";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import { Container, Nav } from "react-bootstrap";

export function NavBar() {
  return (
    <div className="nav-position" data-testid="navbar">
      <Navbar expand="lg" className="nav-bg">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand to="/">
            <img src={logo} alt="logo" className="logo" />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link to="/" className="navLink">
                Home
              </Nav.Link>
              <Nav.Link to="/seasons" className="navLink">
                Seasons
              </Nav.Link>
              <Nav.Link to="/lodging" className="navLink">
                Lodging
              </Nav.Link>
              <Nav.Link to="/contact" className="navLink">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
