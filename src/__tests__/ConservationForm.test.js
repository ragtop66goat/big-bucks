import { render, screen, fireEvent } from "@testing-library/react";
import { ConservationForm } from "../components/aboutForms/ConservationForm";

describe("ConservationForm", () => {
  const mockData = {
    id: 1,
    title: "Conservation & Sustainability",
    content: "We are committed to conservation.",
    practices: ["Practice 1", "Practice 2"],
  };

  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render form with initial data", () => {
    render(
      <ConservationForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByLabelText(/title/i)).toHaveValue(
      "Conservation & Sustainability"
    );
  });

  it("should render existing practices", () => {
    render(
      <ConservationForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByText("Practice 1")).toBeInTheDocument();
    expect(screen.getByText("Practice 2")).toBeInTheDocument();
  });

  it("should add new practice when add button clicked", () => {
    render(
      <ConservationForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const input = screen.getByPlaceholderText(/add a practice/i);
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Practice 3" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Practice 3")).toBeInTheDocument();
  });

  it("should not add empty practice", () => {
    render(
      <ConservationForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const addButton = screen.getByText("Add");
    const practicesBefore = screen.getAllByRole("button", { name: /delete/i })
      .length;

    fireEvent.click(addButton);

    const practicesAfter = screen.getAllByRole("button", { name: /delete/i })
      .length;
    expect(practicesAfter).toBe(practicesBefore);
  });

  it("should delete practice when delete button clicked", () => {
    render(
      <ConservationForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText("Practice 1")).not.toBeInTheDocument();
    expect(screen.getByText("Practice 2")).toBeInTheDocument();
  });

  it("should call onSave with updated data including practices", () => {
    render(
      <ConservationForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const input = screen.getByPlaceholderText(/add a practice/i);
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Practice 3" } });
    fireEvent.click(addButton);

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockData,
      practices: ["Practice 1", "Practice 2", "Practice 3"],
    });
  });

  it("should call onCancel when cancel button clicked", () => {
    render(
      <ConservationForm
        data={mockData}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
