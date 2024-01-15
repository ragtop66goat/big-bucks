import logo from "../../images/logo.png";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import { Container, Nav } from "react-bootstrap";

export function NavBar() {
  return (
    <div className="nav-position">
      <Navbar expand="lg" className="nav-bg">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" className="logo" />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/" className="navLink">
                Home
              </Nav.Link>
              <Nav.Link href="/seasons" className="navLink">
                Seasons
              </Nav.Link>
              <Nav.Link href="/lodging" className="navLink">
                Lodging
              </Nav.Link>
              <Nav.Link href="/contact" className="navLink">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

// <div data-testid="navbar" className="nav-bg">
//   <div className="container nav-bar">
//     <img src={logo} alt="logo" className="logo" />
//     <div>
//       <ul>
//         <Link to="/">Home</Link>
//         <Link to="/seasons">Seasons</Link>
//         <Link to="/lodging">Lodging</Link>
//         <Link to="/contact">Contact</Link>
//       </ul>
//     </div>
//   </div>
// </div>
