import { render, screen, fireEvent } from "@testing-library/react";
import { EthicsForm } from "../components/aboutForms/EthicsForm";

describe("EthicsForm", () => {
  const mockData = {
    id: 1,
    title: "Hunting Ethics & Philosophy",
    content: "We believe in responsible hunting.",
    principles: ["Principle 1", "Principle 2"],
  };

  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render form with initial data", () => {
    render(
      <EthicsForm data={mockData} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    expect(screen.getByLabelText(/title/i)).toHaveValue(
      "Hunting Ethics & Philosophy"
    );
  });

  it("should render existing principles", () => {
    render(
      <EthicsForm data={mockData} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    expect(screen.getByText("Principle 1")).toBeInTheDocument();
    expect(screen.getByText("Principle 2")).toBeInTheDocument();
  });

  it("should add new principle when add button clicked", () => {
    render(
      <EthicsForm data={mockData} onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    const input = screen.getByPlaceholderText(/add a principle/i);
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Principle 3" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Principle 3")).toBeInTheDocument();
  });

  it("should not add empty principle", () => {
    render(
      <EthicsForm data={mockData} onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    const addButton = screen.getByText("Add");
    const principlesBefore = screen.getAllByRole("button", { name: /delete/i })
      .length;

    fireEvent.click(addButton);

    const principlesAfter = screen.getAllByRole("button", { name: /delete/i })
      .length;
    expect(principlesAfter).toBe(principlesBefore);
  });

  it("should delete principle when delete button clicked", () => {
    render(
      <EthicsForm data={mockData} onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText("Principle 1")).not.toBeInTheDocument();
    expect(screen.getByText("Principle 2")).toBeInTheDocument();
  });

  it("should call onSave with updated data including principles", () => {
    render(
      <EthicsForm data={mockData} onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    const input = screen.getByPlaceholderText(/add a principle/i);
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Principle 3" } });
    fireEvent.click(addButton);

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockData,
      principles: ["Principle 1", "Principle 2", "Principle 3"],
    });
  });

  it("should call onCancel when cancel button clicked", () => {
    render(
      <EthicsForm data={mockData} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
