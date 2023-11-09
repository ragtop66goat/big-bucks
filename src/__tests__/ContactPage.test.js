import {screen} from "@testing-library/react";
import renderWithRouter from "../utils/testUtils";
import {Contact} from "../pages/contactPage/Contact";

test("should initially render the 'Contact', the dog image, and 'Request your dates today'", () => {
  renderWithRouter(<Contact/>);

  expect(screen.getByAltText("dog")).toBeInTheDocument();
  expect(screen.getByText("Contact")).toBeInTheDocument();
  expect(screen.getByText("Request your dates today")).toBeInTheDocument();
} )

test("should render a form with 'Name', 'Email', 'Start Date', and 'End Date' labels", () => {
  renderWithRouter(<Contact/>);

  expect(screen.getByTestId("name")).toBeInTheDocument();
  expect(screen.getByTestId("email")).toBeInTheDocument();
  expect(screen.getByTestId("start-date")).toBeInTheDocument();
  expect(screen.getByTestId("end-date")).toBeInTheDocument();
})

test("should render email and name input fields", () => {
  renderWithRouter(<Contact/>);

  expect(screen.getByTestId("name-input").tagName).toBe("INPUT");
  expect(screen.getByTestId("email-input").tagName).toBe("INPUT");
  expect(screen.getByTestId("start-date-input").tagName).toBe("INPUT");
  expect(screen.getByTestId("end-date-input").tagName).toBe("INPUT");
})