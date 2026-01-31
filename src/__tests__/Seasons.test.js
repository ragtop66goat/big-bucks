import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Seasons } from "../pages/seasonsPage/Seasons";

const mockStore = configureStore([]);

// Mock child components
jest.mock("../components/seasonCard/SeasonCard", () => ({
  SeasonCard: ({ season, isAdminMode, onEdit }) => (
    <div data-testid={`season-card-${season.id}`}>
      <h3>{season.name}</h3>
      {isAdminMode && (
        <button onClick={() => onEdit(season.id)}>Edit {season.name}</button>
      )}
    </div>
  ),
}));

jest.mock("../components/adminModal/AdminModal", () => ({
  AdminModal: ({ show, seasonId, onHide }) =>
    show ? (
      <div data-testid="admin-modal">
        <p>Editing Season {seasonId}</p>
        <button onClick={onHide}>Close Modal</button>
      </div>
    ) : null,
}));

describe("Seasons Page Tests", () => {
  const initialState = {
    seasonsSlice: {
      seasons: [
        {
          id: 1,
          name: "Deer Season",
          species: "Mule Deer & Whitetail",
          dateRange: { start: "2026-10-04", end: "2026-10-19" },
          type: "general",
          licenseInfo: { required: [], cost: { resident: {}, nonResident: {} }, links: {} },
          bagLimits: { general: "", notes: [] },
          regulations: [],
        },
        {
          id: 2,
          name: "Elk Season",
          species: "Rocky Mountain Elk",
          dateRange: { start: "2026-11-07", end: "2026-11-29", weekendsOnly: true },
          type: "permit-only",
          licenseInfo: { required: [], cost: { resident: {}, nonResident: {} }, links: {} },
          bagLimits: { general: "", notes: [] },
          regulations: [],
        },
        {
          id: 3,
          name: "Black Bear Season",
          species: "Black Bear",
          dateRange: { start: "2026-12-14", end: "2026-12-28" },
          type: "general",
          licenseInfo: { required: [], cost: { resident: {}, nonResident: {} }, links: {} },
          bagLimits: { general: "", notes: [] },
          regulations: [],
        },
      ],
      isAdminMode: false,
      editingSeasonId: null,
    },
  };

  it("should render secondary hero with 'Hunting Seasons' heading", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Seasons />
      </Provider>,
    );

    expect(screen.getByText("Hunting Seasons")).toBeInTheDocument();
  });

  it("should render 3 SeasonCard components", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Seasons />
      </Provider>,
    );

    expect(screen.getByTestId("season-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("season-card-2")).toBeInTheDocument();
    expect(screen.getByTestId("season-card-3")).toBeInTheDocument();
    expect(screen.getByText("Deer Season")).toBeInTheDocument();
    expect(screen.getByText("Elk Season")).toBeInTheDocument();
    expect(screen.getByText("Black Bear Season")).toBeInTheDocument();
  });

  it("should not show edit buttons when admin mode is off", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Seasons />
      </Provider>,
    );

    expect(screen.queryByText(/Edit Deer Season/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Edit Elk Season/i)).not.toBeInTheDocument();
  });

  it("should show edit buttons when admin mode is on", () => {
    const adminState = {
      ...initialState,
      seasonsSlice: {
        ...initialState.seasonsSlice,
        isAdminMode: true,
      },
    };
    const store = mockStore(adminState);

    render(
      <Provider store={store}>
        <Seasons />
      </Provider>,
    );

    expect(screen.getByText(/Edit Deer Season/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit Elk Season/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit Black Bear Season/i)).toBeInTheDocument();
  });

  it("should open AdminModal when edit button clicked", () => {
    const adminState = {
      ...initialState,
      seasonsSlice: {
        ...initialState.seasonsSlice,
        isAdminMode: true,
      },
    };
    const store = mockStore(adminState);

    render(
      <Provider store={store}>
        <Seasons />
      </Provider>,
    );

    const editButton = screen.getByText(/Edit Deer Season/i);
    fireEvent.click(editButton);

    expect(screen.getByTestId("admin-modal")).toBeInTheDocument();
    expect(screen.getByText("Editing Season 1")).toBeInTheDocument();
  });

  it("should close AdminModal when close button clicked", () => {
    const adminState = {
      ...initialState,
      seasonsSlice: {
        ...initialState.seasonsSlice,
        isAdminMode: true,
      },
    };
    const store = mockStore(adminState);

    render(
      <Provider store={store}>
        <Seasons />
      </Provider>,
    );

    const editButton = screen.getByText(/Edit Deer Season/i);
    fireEvent.click(editButton);

    const closeButton = screen.getByText("Close Modal");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("admin-modal")).not.toBeInTheDocument();
  });

  it("should toggle admin mode when hero heading is triple-clicked", () => {
    jest.useFakeTimers();
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Seasons />
      </Provider>,
    );

    const heading = screen.getByText("Hunting Seasons");

    // Triple click
    fireEvent.click(heading);
    fireEvent.click(heading);
    fireEvent.click(heading);

    // Advance timers to trigger the setTimeout callback
    jest.advanceTimersByTime(500);

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThan(0);
    expect(actions[0].type).toBe("seasons/toggleAdminMode");

    jest.useRealTimers();
  });

  it("should render introduction text", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Seasons />
      </Provider>,
    );

    expect(
      screen.getByText(/Plan your hunting adventure/i),
    ).toBeInTheDocument();
  });
});
