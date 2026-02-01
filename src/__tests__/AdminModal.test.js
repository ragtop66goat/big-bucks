import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { AdminModal } from "../components/adminModal/AdminModal";

const mockStore = configureStore([]);

// Mock SeasonForm
jest.mock("../components/seasonForm/SeasonForm", () => ({
  SeasonForm: ({ season, onSave, onCancel }) => (
    <div data-testid="mock-season-form">
      <p>{season.name}</p>
      <button onClick={() => onSave({ ...season, updated: true })}>
        Save
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
}));

describe("AdminModal Component Tests", () => {
  const initialState = {
    seasonsSlice: {
      seasons: [
        {
          id: 1,
          name: "Deer Season",
          species: "Mule Deer & Whitetail",
          dateRange: {
            start: "2026-10-04",
            end: "2026-10-19",
          },
          type: "general",
        },
      ],
    },
  };

  let store;
  const mockOnHide = jest.fn();

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  it("should render modal when show is true", () => {
    render(
      <Provider store={store}>
        <AdminModal show={true} seasonId={1} onHide={mockOnHide} />
      </Provider>,
    );

    expect(screen.getByText("Edit Season")).toBeInTheDocument();
  });

  it("should not render modal when show is false", () => {
    render(
      <Provider store={store}>
        <AdminModal show={false} seasonId={1} onHide={mockOnHide} />
      </Provider>,
    );

    expect(screen.queryByText("Edit Season")).not.toBeInTheDocument();
  });

  it("should display SeasonForm component", () => {
    render(
      <Provider store={store}>
        <AdminModal show={true} seasonId={1} onHide={mockOnHide} />
      </Provider>,
    );

    expect(screen.getByTestId("mock-season-form")).toBeInTheDocument();
  });

  it("should pass correct season to form", () => {
    render(
      <Provider store={store}>
        <AdminModal show={true} seasonId={1} onHide={mockOnHide} />
      </Provider>,
    );

    expect(screen.getByText("Deer Season")).toBeInTheDocument();
  });

  it("should handle form cancel and close modal", () => {
    render(
      <Provider store={store}>
        <AdminModal show={true} seasonId={1} onHide={mockOnHide} />
      </Provider>,
    );

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it("should dispatch setSeason action when form is saved", () => {
    render(
      <Provider store={store}>
        <AdminModal show={true} seasonId={1} onHide={mockOnHide} />
      </Provider>,
    );

    const saveButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveButton);

    const actions = store.getActions();
    expect(actions[0].type).toBe("seasons/setSeason");
  });
});
