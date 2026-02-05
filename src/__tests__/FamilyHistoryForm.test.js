import { render, screen, fireEvent } from "@testing-library/react";
import { FamilyHistoryForm } from "../components/aboutForms/FamilyHistoryForm";

describe("FamilyHistoryForm", () => {
  const mockData = {
    id: 1,
    title: "Our Heritage",
    content: "Founded in 1952...",
    imageUrl: null,
  };

  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render form with initial data", () => {
    render(
      <FamilyHistoryForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByLabelText(/title/i)).toHaveValue("Our Heritage");
    expect(screen.getByLabelText(/content/i)).toHaveValue("Founded in 1952...");
  });

  it("should render title input field", () => {
    render(
      <FamilyHistoryForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  });

  it("should render content textarea", () => {
    render(
      <FamilyHistoryForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
  });

  it("should update title when user types", () => {
    render(
      <FamilyHistoryForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    expect(titleInput).toHaveValue("New Title");
  });

  it("should update content when user types", () => {
    render(
      <FamilyHistoryForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    const contentTextarea = screen.getByLabelText(/content/i);
    fireEvent.change(contentTextarea, { target: { value: "New content" } });
    expect(contentTextarea).toHaveValue("New content");
  });

  it("should call onSave with updated data when save button clicked", () => {
    render(
      <FamilyHistoryForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const titleInput = screen.getByLabelText(/title/i);
    const contentTextarea = screen.getByLabelText(/content/i);

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.change(contentTextarea, { target: { value: "Updated content" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockData,
      title: "Updated Title",
      content: "Updated content",
    });
  });

  it("should call onCancel when cancel button clicked", () => {
    render(
      <FamilyHistoryForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should not call onSave if title is empty", () => {
    render(
      <FamilyHistoryForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it("should show validation error when title is empty", () => {
    render(
      <FamilyHistoryForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
  });
});
