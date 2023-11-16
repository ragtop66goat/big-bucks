import { screen, render } from "@testing-library/react";
import { Lodging } from "../pages/lodgingPage/Lodging";

describe("Lodging Component Tests", () => {
  test("should render 'Lodging', description-1 and description-2", () => {
    render(<Lodging />);

    expect(screen.getByTestId("description-1")).toBeInTheDocument();
    expect(screen.getByTestId("description-2")).toBeInTheDocument();
    expect(screen.getByText("Lodging")).toBeInTheDocument();
  });

  test("should render lodge and cabin images", () => {
    render(<Lodging />);

    expect(screen.getByAltText("lodge")).toBeInTheDocument();
    expect(screen.getByAltText("cabin")).toBeInTheDocument();
  });
});