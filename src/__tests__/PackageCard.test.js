import { render, screen, fireEvent } from "@testing-library/react";
import { PackageCard } from "../components/packageCard/PackageCard";

describe("PackageCard Component Tests", () => {
  const mockPackage = {
    id: 1,
    name: "Weekend Warrior",
    tier: "basic",
    price: 1299,
    duration: "2-3 Days",
    groupSize: "2-4 Hunters",
    description: "Perfect for a quick hunting getaway",
    featured: false,
    included: [
      "Professional guide service",
      "All meals (breakfast, lunch, dinner)",
      "Basic lodging accommodation",
    ],
    notIncluded: ["Hunting license", "Tags and permits"],
  };

  const mockFeaturedPackage = {
    ...mockPackage,
    id: 2,
    name: "Week-Long Expedition",
    featured: true,
  };

  const mockOnSelect = jest.fn();

  it("should render package name and price", () => {
    render(<PackageCard packageData={mockPackage} onSelect={mockOnSelect} />);

    expect(screen.getByText("Weekend Warrior")).toBeInTheDocument();
    expect(screen.getByText("$1,299")).toBeInTheDocument();
  });

  it("should render package duration and group size", () => {
    render(<PackageCard packageData={mockPackage} onSelect={mockOnSelect} />);

    expect(screen.getByText(/2-3 Days/)).toBeInTheDocument();
    expect(screen.getByText(/2-4 Hunters/)).toBeInTheDocument();
  });

  it("should render all included items from array", () => {
    render(<PackageCard packageData={mockPackage} onSelect={mockOnSelect} />);

    expect(screen.getByText("Professional guide service")).toBeInTheDocument();
    expect(
      screen.getByText("All meals (breakfast, lunch, dinner)"),
    ).toBeInTheDocument();
    expect(screen.getByText("Basic lodging accommodation")).toBeInTheDocument();
  });

  it("should render featured badge when featured is true", () => {
    render(
      <PackageCard packageData={mockFeaturedPackage} onSelect={mockOnSelect} />,
    );

    expect(screen.getByText(/Most Popular/i)).toBeInTheDocument();
  });

  it("should not render featured badge when featured is false", () => {
    render(<PackageCard packageData={mockPackage} onSelect={mockOnSelect} />);

    expect(screen.queryByText(/Most Popular/i)).not.toBeInTheDocument();
  });

  it("should call onSelect with package id when button clicked", () => {
    render(<PackageCard packageData={mockPackage} onSelect={mockOnSelect} />);

    const selectButton = screen.getByRole("button", {
      name: /Select Package/i,
    });
    fireEvent.click(selectButton);

    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });

  it("should render description text", () => {
    render(<PackageCard packageData={mockPackage} onSelect={mockOnSelect} />);

    expect(
      screen.getByText("Perfect for a quick hunting getaway"),
    ).toBeInTheDocument();
  });
});
