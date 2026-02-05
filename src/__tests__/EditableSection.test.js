import { render, screen, fireEvent } from "@testing-library/react";
import { EditableSection } from "../components/editableSection/EditableSection";

describe("EditableSection", () => {
  const mockSection = {
    title: "Our Heritage",
    content: "Founded in 1952 by the Wilson family...",
  };

  const mockSectionWithList = {
    title: "Conservation Practices",
    content: "We are committed to conservation.",
    listItems: [
      "Practice 1: Habitat restoration",
      "Practice 2: Sustainable harvest",
      "Practice 3: Donate to conservation",
    ],
  };

  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render section title", () => {
    render(<EditableSection section={mockSection} isAdminMode={false} />);
    expect(screen.getByText("Our Heritage")).toBeInTheDocument();
  });

  it("should render section content", () => {
    render(<EditableSection section={mockSection} isAdminMode={false} />);
    expect(
      screen.getByText(/Founded in 1952 by the Wilson family/)
    ).toBeInTheDocument();
  });

  it("should render list items when provided", () => {
    render(
      <EditableSection section={mockSectionWithList} isAdminMode={false} />
    );
    expect(screen.getByText(/Practice 1: Habitat restoration/)).toBeInTheDocument();
    expect(screen.getByText(/Practice 2: Sustainable harvest/)).toBeInTheDocument();
    expect(screen.getByText(/Practice 3: Donate to conservation/)).toBeInTheDocument();
  });

  it("should not render list when listItems is not provided", () => {
    const { container } = render(
      <EditableSection section={mockSection} isAdminMode={false} />
    );
    expect(container.querySelector("ul")).not.toBeInTheDocument();
  });

  it("should not show edit button when not in admin mode", () => {
    render(<EditableSection section={mockSection} isAdminMode={false} />);
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("should show edit button when in admin mode", () => {
    render(
      <EditableSection
        section={mockSection}
        isAdminMode={true}
        onEdit={mockOnEdit}
      />
    );
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("should call onEdit when edit button is clicked", () => {
    render(
      <EditableSection
        section={mockSection}
        isAdminMode={true}
        onEdit={mockOnEdit}
      />
    );
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalled();
  });

  it("should render with Bootstrap Card structure", () => {
    const { container } = render(
      <EditableSection section={mockSection} isAdminMode={false} />
    );
    expect(container.querySelector(".card")).toBeInTheDocument();
  });

  it("should apply custom className if provided", () => {
    const { container } = render(
      <EditableSection
        section={mockSection}
        isAdminMode={false}
        className="custom-class"
      />
    );
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });
});
