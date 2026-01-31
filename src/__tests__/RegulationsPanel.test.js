import { render, screen } from "@testing-library/react";
import { RegulationsPanel } from "../components/regulationsPanel/RegulationsPanel";

describe("RegulationsPanel Component Tests", () => {
  const mockBagLimits = {
    general: "1 deer per license year",
    antlerRestrictions: "Must have 4+ points on one side for buck harvest",
    notes: ["Either sex in some districts", "Check district regulations"],
  };

  const mockRegulations = [
    "Blaze orange required (400 sq inches)",
    "Shooting hours: 30 min before sunrise to 30 min after sunset",
    "Mandatory harvest reporting within 24 hours",
    "Field dressing required before transport",
  ];

  it("should render bag limit summary", () => {
    render(
      <RegulationsPanel
        bagLimits={mockBagLimits}
        regulations={mockRegulations}
      />,
    );

    expect(screen.getByText("1 deer per license year")).toBeInTheDocument();
  });

  it("should display antler restrictions", () => {
    render(
      <RegulationsPanel
        bagLimits={mockBagLimits}
        regulations={mockRegulations}
      />,
    );

    expect(
      screen.getByText("Must have 4+ points on one side for buck harvest"),
    ).toBeInTheDocument();
  });

  it("should show bag limit notes", () => {
    render(
      <RegulationsPanel
        bagLimits={mockBagLimits}
        regulations={mockRegulations}
      />,
    );

    expect(screen.getByText("Either sex in some districts")).toBeInTheDocument();
    expect(screen.getByText("Check district regulations")).toBeInTheDocument();
  });

  it("should list all regulations", () => {
    render(
      <RegulationsPanel
        bagLimits={mockBagLimits}
        regulations={mockRegulations}
      />,
    );

    expect(
      screen.getByText("Blaze orange required (400 sq inches)"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Shooting hours: 30 min before sunrise to 30 min after sunset",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Mandatory harvest reporting within 24 hours"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Field dressing required before transport"),
    ).toBeInTheDocument();
  });

  it("should render section headings", () => {
    render(
      <RegulationsPanel
        bagLimits={mockBagLimits}
        regulations={mockRegulations}
      />,
    );

    expect(screen.getByText("Bag Limits")).toBeInTheDocument();
    expect(screen.getByText("Hunting Regulations")).toBeInTheDocument();
  });

  it("should render when notes array is empty", () => {
    const bagLimitsWithoutNotes = {
      general: "1 deer per license year",
      antlerRestrictions: "Must have 4+ points on one side for buck harvest",
      notes: [],
    };

    render(
      <RegulationsPanel
        bagLimits={bagLimitsWithoutNotes}
        regulations={mockRegulations}
      />,
    );

    expect(screen.getByText("Bag Limits")).toBeInTheDocument();
  });
});
