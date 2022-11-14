import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navBar/Navbar";
import { Home } from "./pages/homePage/Home";
import { Seasons } from "./pages/seasonsPage/Seasons";
import { Contact } from "./pages/contactPage/Contact";
import { Lodging } from "./pages/lodgingPage/Lodging";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seasons" element={<Seasons />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/lodging" element={<Lodging />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
