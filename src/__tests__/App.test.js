import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import App from "../App";

describe("App Component Tests", () => {
  it("should render app, navbar, and footer", () => {
    render(<App />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("hero-text")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should render Packages component when navigating to /packages", () => {
    const history = createMemoryHistory();
    history.push("/packages");

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText("Packages")).toBeInTheDocument();
  });
});
