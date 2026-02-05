import { render, screen, fireEvent } from "@testing-library/react";
import { GuideForm } from "../components/aboutForms/GuideForm";

describe("GuideForm", () => {
  const mockGuide = {
    id: 1,
    name: "Jake Wilson",
    role: "Head Guide & Owner",
    bio: "Third-generation outfitter",
    yearsExperience: 25,
    specialties: ["Elk", "Deer"],
    imageUrl: null,
  };

  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render form with initial data", () => {
    render(
      <GuideForm data={mockGuide} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    expect(screen.getByLabelText(/^name$/i)).toHaveValue("Jake Wilson");
    expect(screen.getByLabelText(/role/i)).toHaveValue("Head Guide & Owner");
    expect(screen.getByLabelText(/bio/i)).toHaveValue("Third-generation outfitter");
    expect(screen.getByLabelText(/years of experience/i)).toHaveValue(25);
  });

  it("should render all form fields", () => {
    render(
      <GuideForm data={mockGuide} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/years of experience/i)).toBeInTheDocument();
  });

  it("should render existing specialties", () => {
    render(
      <GuideForm data={mockGuide} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    expect(screen.getByText("Elk")).toBeInTheDocument();
    expect(screen.getByText("Deer")).toBeInTheDocument();
  });

  it("should update name when user types", () => {
    render(
      <GuideForm data={mockGuide} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    const nameInput = screen.getByLabelText(/^name$/i);
    fireEvent.change(nameInput, { target: { value: "New Name" } });
    expect(nameInput).toHaveValue("New Name");
  });

  it("should update years of experience when user types", () => {
    render(
      <GuideForm data={mockGuide} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    const experienceInput = screen.getByLabelText(/years of experience/i);
    fireEvent.change(experienceInput, { target: { value: "30" } });
    expect(experienceInput).toHaveValue(30);
  });

  it("should add new specialty when add button clicked", () => {
    render(
      <GuideForm data={mockGuide} onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    const input = screen.getByPlaceholderText(/add a specialty/i);
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Bear" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Bear")).toBeInTheDocument();
  });

  it("should delete specialty when delete button clicked", () => {
    render(
      <GuideForm data={mockGuide} onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText("Elk")).not.toBeInTheDocument();
    expect(screen.getByText("Deer")).toBeInTheDocument();
  });

  it("should not call onSave if name is empty", () => {
    render(
      <GuideForm data={mockGuide} onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    const nameInput = screen.getByLabelText(/^name$/i);
    fireEvent.change(nameInput, { target: { value: "" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it("should show validation error when name is empty", () => {
    render(
      <GuideForm data={mockGuide} onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    const nameInput = screen.getByLabelText(/^name$/i);
    fireEvent.change(nameInput, { target: { value: "" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });

  it("should call onSave with updated data when save button clicked", () => {
    render(
      <GuideForm data={mockGuide} onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    const nameInput = screen.getByLabelText(/^name$/i);
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockGuide,
      name: "Updated Name",
    });
  });

  it("should call onCancel when cancel button clicked", () => {
    render(
      <GuideForm data={mockGuide} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
