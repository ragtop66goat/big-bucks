import ForecastDisplay from "../components/forecast display/ForecastDisplay";
import { render } from "../utils/testUtils";
import { screen } from "@testing-library/react";

test("should render data.daily when it is present in state", () => {
  const data = {
    daily: [
      {
        time: "2024-01-14",
        icon: 71,
        sunrise: "2024-01-14T00:11",
        sunset: "2024-01-14T08:19",
        high: 37.5,
        low: 32.6,
        precip: 0.114,
      },
    ],
  };

  render(<ForecastDisplay data={data} />);

  expect(
    screen.getByText("Chance of Precipitation: 0.114%")
  ).toBeInTheDocument();
  expect(screen.getByText("Temp: 37.5/32.6")).toBeInTheDocument();
  expect(screen.getByText("Sunrise: 00:11 Sunset: 08:19"));
  expect(screen.getByText("01-14"));
});
