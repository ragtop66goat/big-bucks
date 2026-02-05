import { render, screen, fireEvent } from "@testing-library/react";
import { GuideCard } from "../components/guideCard/GuideCard";

describe("GuideCard", () => {
  const mockGuide = {
    id: 1,
    name: "Jake Wilson",
    role: "Head Guide & Owner",
    bio: "Third-generation outfitter with 25 years of experience in Montana backcountry.",
    yearsExperience: 25,
    specialties: ["Elk", "Mule Deer", "Backcountry Navigation"],
    imageUrl: null,
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render guide name", () => {
    render(<GuideCard guide={mockGuide} isAdminMode={false} />);
    expect(screen.getByText("Jake Wilson")).toBeInTheDocument();
  });

  it("should render guide role", () => {
    render(<GuideCard guide={mockGuide} isAdminMode={false} />);
    expect(screen.getByText("Head Guide & Owner")).toBeInTheDocument();
  });

  it("should render guide bio", () => {
    render(<GuideCard guide={mockGuide} isAdminMode={false} />);
    expect(
      screen.getByText(/Third-generation outfitter with 25 years/)
    ).toBeInTheDocument();
  });

  it("should render years of experience", () => {
    render(<GuideCard guide={mockGuide} isAdminMode={false} />);
    expect(screen.getByText(/25 years experience/i)).toBeInTheDocument();
  });

  it("should render all specialties", () => {
    render(<GuideCard guide={mockGuide} isAdminMode={false} />);
    expect(screen.getByText("Elk")).toBeInTheDocument();
    expect(screen.getByText("Mule Deer")).toBeInTheDocument();
    expect(screen.getByText("Backcountry Navigation")).toBeInTheDocument();
  });

  it("should render placeholder image when imageUrl is null", () => {
    const { container } = render(
      <GuideCard guide={mockGuide} isAdminMode={false} />
    );
    const placeholder = container.querySelector(".guide-placeholder");
    expect(placeholder).toBeInTheDocument();
  });

  it("should display guide initials in placeholder", () => {
    const { container } = render(
      <GuideCard guide={mockGuide} isAdminMode={false} />
    );
    const placeholder = container.querySelector(".guide-placeholder");
    expect(placeholder).toHaveTextContent("JW");
  });

  it("should render actual image when imageUrl is provided", () => {
    const guideWithImage = { ...mockGuide, imageUrl: "/images/jake.jpg" };
    render(<GuideCard guide={guideWithImage} isAdminMode={false} />);
    const img = screen.getByAltText("Jake Wilson");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/jake.jpg");
  });

  it("should not show edit and delete buttons when not in admin mode", () => {
    render(<GuideCard guide={mockGuide} isAdminMode={false} />);
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("should show edit button when in admin mode", () => {
    render(
      <GuideCard
        guide={mockGuide}
        isAdminMode={true}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("should show delete button when in admin mode", () => {
    render(
      <GuideCard
        guide={mockGuide}
        isAdminMode={true}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should call onEdit with guide id when edit button is clicked", () => {
    render(
      <GuideCard
        guide={mockGuide}
        isAdminMode={true}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalledWith(1);
  });

  it("should call onDelete with guide id when delete button is clicked", () => {
    render(
      <GuideCard
        guide={mockGuide}
        isAdminMode={true}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("should render with Bootstrap Card structure", () => {
    const { container } = render(
      <GuideCard guide={mockGuide} isAdminMode={false} />
    );
    expect(container.querySelector(".card")).toBeInTheDocument();
  });
});
