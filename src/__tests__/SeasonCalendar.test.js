import { render, screen } from "@testing-library/react";
import { SeasonCalendar } from "../components/seasonCalendar/SeasonCalendar";

describe("SeasonCalendar Component Tests", () => {
  const mockDateRange = {
    start: "2026-10-04",
    end: "2026-10-19",
  };

  const mockWeekendOnlyDateRange = {
    start: "2026-11-07",
    end: "2026-11-29",
    weekendsOnly: true,
  };

  it("should render Calendar component", () => {
    const { container } = render(
      <SeasonCalendar
        dateRange={mockDateRange}
        seasonName="Deer Season"
      />,
    );

    const calendar = container.querySelector(".react-calendar");
    expect(calendar).toBeInTheDocument();
  });

  it("should display October 2026 for Deer Season date range", () => {
    render(
      <SeasonCalendar
        dateRange={mockDateRange}
        seasonName="Deer Season"
      />,
    );

    expect(screen.getByText("October 2026")).toBeInTheDocument();
  });

  it("should have aria-label with season name", () => {
    const { container } = render(
      <SeasonCalendar
        dateRange={mockDateRange}
        seasonName="Deer Season"
      />,
    );

    const wrapper = container.querySelector('[aria-label="Deer Season calendar"]');
    expect(wrapper).toBeInTheDocument();
  });

  it("should apply custom className to season dates", () => {
    const { container } = render(
      <SeasonCalendar
        dateRange={mockDateRange}
        seasonName="Deer Season"
      />,
    );

    const seasonTiles = container.querySelectorAll(".react-calendar__tile--season");
    expect(seasonTiles.length).toBeGreaterThan(0);
  });

  it("should highlight only weekends when weekendsOnly is true", () => {
    const { container } = render(
      <SeasonCalendar
        dateRange={mockWeekendOnlyDateRange}
        seasonName="Elk Season"
      />,
    );

    const seasonTiles = container.querySelectorAll(".react-calendar__tile--season");
    expect(seasonTiles.length).toBeGreaterThan(0);
  });

  it("should display month view only", () => {
    const { container } = render(
      <SeasonCalendar
        dateRange={mockDateRange}
        seasonName="Deer Season"
      />,
    );

    const yearView = container.querySelector(".react-calendar__year-view");
    expect(yearView).not.toBeInTheDocument();
  });

  it("should not show neighboring month dates", () => {
    const { container } = render(
      <SeasonCalendar
        dateRange={mockDateRange}
        seasonName="Deer Season"
      />,
    );

    const neighboringMonth = container.querySelector(
      ".react-calendar__month-view__days__day--neighboringMonth",
    );
    expect(neighboringMonth).toBeNull();
  });
});
