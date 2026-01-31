import { render, screen, fireEvent } from "@testing-library/react";
import { SeasonForm } from "../components/seasonForm/SeasonForm";

describe("SeasonForm Component Tests", () => {
  const mockSeason = {
    id: 1,
    name: "Deer Season",
    species: "Mule Deer & Whitetail",
    dateRange: {
      start: "2026-10-04",
      end: "2026-10-19",
    },
    licenseInfo: {
      cost: {
        resident: { license: 19, tag: 17 },
        nonResident: { license: 101, tag: 142 },
      },
    },
  };

  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should pre-populate form with current season data", () => {
    render(
      <SeasonForm
        season={mockSeason}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    const startDateInput = screen.getByLabelText(/Start Date/i);
    const endDateInput = screen.getByLabelText(/End Date/i);

    expect(startDateInput).toHaveValue("2026-10-04");
    expect(endDateInput).toHaveValue("2026-10-19");
  });

  it("should render date inputs for start and end", () => {
    render(
      <SeasonForm
        season={mockSeason}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
  });

  it("should render checkbox for weekends-only", () => {
    const seasonWithWeekends = {
      ...mockSeason,
      dateRange: { ...mockSeason.dateRange, weekendsOnly: true },
    };

    render(
      <SeasonForm
        season={seasonWithWeekends}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    const checkbox = screen.getByLabelText(/Weekends Only/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it("should render Save and Cancel buttons", () => {
    render(
      <SeasonForm
        season={mockSeason}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("should call onCancel when Cancel button clicked", () => {
    render(
      <SeasonForm
        season={mockSeason}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("should call onSave with updated data when Save clicked", () => {
    render(
      <SeasonForm
        season={mockSeason}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    const endDateInput = screen.getByLabelText(/End Date/i);
    fireEvent.change(endDateInput, { target: { value: "2026-10-25" } });

    const saveButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        dateRange: expect.objectContaining({
          start: "2026-10-04",
          end: "2026-10-25",
        }),
      }),
    );
  });

  it("should show validation error when end date is before start date", () => {
    render(
      <SeasonForm
        season={mockSeason}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    const endDateInput = screen.getByLabelText(/End Date/i);
    fireEvent.change(endDateInput, { target: { value: "2026-10-01" } });

    const saveButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveButton);

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(
      screen.getByText(/End date must be after start date/i),
    ).toBeInTheDocument();
  });
});
