import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import App from "../App";
import { Packages } from "../pages/packagesPage/Packages";

describe("App Component Tests", () => {
  it("should render app, navbar, and footer", () => {
    render(<App />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("hero-text")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should render Packages component when navigating to /packages", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/packages"]}>
          <Routes>
            <Route path="/packages" element={<Packages />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Packages")).toBeInTheDocument();
  });
});
