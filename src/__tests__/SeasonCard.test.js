import { render, screen, fireEvent } from "@testing-library/react";
import { SeasonCard } from "../components/seasonCard/SeasonCard";

// Mock child components
jest.mock("../components/seasonCalendar/SeasonCalendar", () => ({
  SeasonCalendar: ({ seasonName }) => (
    <div data-testid="mock-season-calendar">{seasonName} Calendar</div>
  ),
}));

jest.mock("../components/licenseInfo/LicenseInfo", () => ({
  LicenseInfo: () => <div data-testid="mock-license-info">License Info</div>,
}));

jest.mock("../components/regulationsPanel/RegulationsPanel", () => ({
  RegulationsPanel: () => (
    <div data-testid="mock-regulations-panel">Regulations Panel</div>
  ),
}));

describe("SeasonCard Component Tests", () => {
  const mockSeason = {
    id: 1,
    name: "Deer Season",
    species: "Mule Deer & Whitetail",
    dateRange: {
      start: "2026-10-04",
      end: "2026-10-19",
    },
    type: "general",
    licenseInfo: {
      required: ["Montana Hunting License", "Deer Tag"],
      cost: {
        resident: { license: 19, tag: 17 },
        nonResident: { license: 101, tag: 142 },
      },
      links: {
        purchase: "https://fwp.mt.gov/buyandapply",
        regulations: "https://fwp.mt.gov/hunt/regulations",
      },
    },
    bagLimits: {
      general: "1 deer per license year",
      antlerRestrictions: "Must have 4+ points on one side for buck harvest",
      notes: ["Either sex in some districts"],
    },
    regulations: [
      "Blaze orange required (400 sq inches)",
      "Mandatory harvest reporting within 24 hours",
    ],
    image: "deer-season.jpg",
  };

  const mockOnEdit = jest.fn();

  it("should render season name and species", () => {
    render(
      <SeasonCard season={mockSeason} isAdminMode={false} onEdit={mockOnEdit} />,
    );

    expect(screen.getByText("Deer Season")).toBeInTheDocument();
    expect(screen.getByText("Mule Deer & Whitetail")).toBeInTheDocument();
  });

  it("should display SeasonCalendar component", () => {
    render(
      <SeasonCard season={mockSeason} isAdminMode={false} onEdit={mockOnEdit} />,
    );

    expect(screen.getByTestId("mock-season-calendar")).toBeInTheDocument();
  });

  it("should display LicenseInfo component", () => {
    render(
      <SeasonCard season={mockSeason} isAdminMode={false} onEdit={mockOnEdit} />,
    );

    expect(screen.getByTestId("mock-license-info")).toBeInTheDocument();
  });

  it("should display RegulationsPanel component", () => {
    render(
      <SeasonCard season={mockSeason} isAdminMode={false} onEdit={mockOnEdit} />,
    );

    expect(screen.getByTestId("mock-regulations-panel")).toBeInTheDocument();
  });

  it("should show general season type badge", () => {
    render(
      <SeasonCard season={mockSeason} isAdminMode={false} onEdit={mockOnEdit} />,
    );

    expect(screen.getByText("General Season")).toBeInTheDocument();
  });

  it("should show permit-only badge for permit-only seasons", () => {
    const permitSeason = { ...mockSeason, type: "permit-only" };

    render(
      <SeasonCard season={permitSeason} isAdminMode={false} onEdit={mockOnEdit} />,
    );

    expect(screen.getByText("Permit Required")).toBeInTheDocument();
  });

  it("should not show Edit Season button when admin mode is off", () => {
    render(
      <SeasonCard season={mockSeason} isAdminMode={false} onEdit={mockOnEdit} />,
    );

    expect(
      screen.queryByRole("button", { name: /Edit Season/i }),
    ).not.toBeInTheDocument();
  });

  it("should show Edit Season button when admin mode is on", () => {
    render(
      <SeasonCard season={mockSeason} isAdminMode={true} onEdit={mockOnEdit} />,
    );

    expect(
      screen.getByRole("button", { name: /Edit Season/i }),
    ).toBeInTheDocument();
  });

  it("should call onEdit with season id when Edit button clicked", () => {
    render(
      <SeasonCard season={mockSeason} isAdminMode={true} onEdit={mockOnEdit} />,
    );

    const editButton = screen.getByRole("button", { name: /Edit Season/i });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(1);
  });
});
