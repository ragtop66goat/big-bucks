import {screen} from "@testing-library/react";
import {Navbar} from "../components/navBar/Navbar"
import renderWithRouter from "../utils/testUtils";

test("should render the logo and links labeled Home, Seasons, Lodging, and Contact", () => {

  renderWithRouter(<Navbar/>);

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Seasons")).toBeInTheDocument();
  expect(screen.getByText("Lodging")).toBeInTheDocument();
  expect(screen.getByText("Contact")).toBeInTheDocument();
  expect(screen.getByAltText("logo")).toBeInTheDocument();
})