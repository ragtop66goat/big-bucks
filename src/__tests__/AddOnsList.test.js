import { render, screen } from "@testing-library/react";
import { AddOnsList } from "../components/addOnsList/AddOnsList";

describe("AddOnsList Component Tests", () => {
  const mockAddOns = [
    {
      id: 1,
      name: "Additional Guide",
      price: 350,
      unit: "per day",
      description: "Extra professional guide for larger groups",
    },
    {
      id: 2,
      name: "Trophy Processing",
      price: 500,
      unit: "flat rate",
      description: "Complete field processing and meat preparation",
    },
    {
      id: 3,
      name: "Equipment Rental",
      price: 75,
      unit: "per day",
      description: "Rifle, scope, and accessories rental",
    },
  ];

  it("should render section heading 'Add-On Services'", () => {
    render(<AddOnsList addOns={mockAddOns} />);

    expect(screen.getByText("Add-On Services")).toBeInTheDocument();
  });

  it("should render all add-on items from props", () => {
    render(<AddOnsList addOns={mockAddOns} />);

    expect(screen.getByText("Additional Guide")).toBeInTheDocument();
    expect(screen.getByText("Trophy Processing")).toBeInTheDocument();
    expect(screen.getByText("Equipment Rental")).toBeInTheDocument();
  });

  it("should display add-on name, price, and description", () => {
    render(<AddOnsList addOns={mockAddOns} />);

    expect(screen.getByText("Additional Guide")).toBeInTheDocument();
    expect(screen.getByText("$350 per day")).toBeInTheDocument();
    expect(
      screen.getByText("Extra professional guide for larger groups"),
    ).toBeInTheDocument();
  });

  it("should format price with unit correctly", () => {
    render(<AddOnsList addOns={mockAddOns} />);

    expect(screen.getByText("$350 per day")).toBeInTheDocument();
    expect(screen.getByText("$500 flat rate")).toBeInTheDocument();
    expect(screen.getByText("$75 per day")).toBeInTheDocument();
  });

  it("should render empty state when no add-ons provided", () => {
    render(<AddOnsList addOns={[]} />);

    expect(
      screen.getByText("No add-on services available at this time."),
    ).toBeInTheDocument();
  });
});
