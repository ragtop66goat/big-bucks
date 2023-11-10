import {render, screen} from "@testing-library/react";
import {Seasons} from "../pages/seasonsPage/Seasons";

test("should render 'Seasons', 'Deer Season Dates', 'October', 'Elk Season Dates', 'November', 'Bear Season Dates', and 'December' headers", () => {
  render(<Seasons/>);

  expect(screen.getByText("Seasons")).toBeInTheDocument();
  expect(screen.getByText("Deer Season Dates")).toBeInTheDocument();
  expect(screen.getByText("October")).toBeInTheDocument();
  expect(screen.getByText("November")).toBeInTheDocument();
  expect(screen.getByText("December")).toBeInTheDocument();
  expect(screen.getByText("Elk Season Dates")).toBeInTheDocument();
  expect(screen.getByText("Bear Season Dates")).toBeInTheDocument();
})

test("should render deer, elk, and bear images", () => {
  render(<Seasons/>);

  expect(screen.getByAltText("bear")).toBeInTheDocument();
  expect(screen.getByAltText("deer")).toBeInTheDocument();
  expect(screen.getByAltText("elk")).toBeInTheDocument();
})