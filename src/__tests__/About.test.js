import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { About } from "../pages/aboutPage/About";

const mockStore = configureStore([]);

describe("About Page", () => {
  const initialState = {
    aboutSlice: {
      familyHistory: {
        id: 1,
        title: "Our Heritage",
        content: "Founded in 1952...",
        imageUrl: null,
      },
      guides: [
        {
          id: 1,
          name: "Jake Wilson",
          role: "Head Guide",
          bio: "Experienced guide",
          yearsExperience: 25,
          specialties: ["Elk"],
          imageUrl: null,
        },
        {
          id: 2,
          name: "Sarah Martinez",
          role: "Senior Guide",
          bio: "Wildlife biologist",
          yearsExperience: 15,
          specialties: ["Deer"],
          imageUrl: null,
        },
      ],
      conservation: {
        id: 1,
        title: "Conservation",
        content: "We care about conservation",
        practices: ["Practice 1"],
      },
      ethics: {
        id: 1,
        title: "Ethics",
        content: "We have strong ethics",
        principles: ["Principle 1"],
      },
      isAdminMode: false,
      editingSection: null,
    },
  };

  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllTimers();
  });

  it("should render page header with title", () => {
    render(
      <Provider store={store}>
        <About />
      </Provider>
    );
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("should render family history section", () => {
    render(
      <Provider store={store}>
        <About />
      </Provider>
    );
    expect(screen.getByText("Our Heritage")).toBeInTheDocument();
    expect(screen.getByText(/Founded in 1952/)).toBeInTheDocument();
  });

  it("should render all guides", () => {
    render(
      <Provider store={store}>
        <About />
      </Provider>
    );
    expect(screen.getByText("Jake Wilson")).toBeInTheDocument();
    expect(screen.getByText("Sarah Martinez")).toBeInTheDocument();
  });

  it("should render conservation section", () => {
    render(
      <Provider store={store}>
        <About />
      </Provider>
    );
    expect(screen.getByText("Conservation")).toBeInTheDocument();
    expect(screen.getByText(/We care about conservation/)).toBeInTheDocument();
  });

  it("should render ethics section", () => {
    render(
      <Provider store={store}>
        <About />
      </Provider>
    );
    expect(screen.getByText("Ethics")).toBeInTheDocument();
    expect(screen.getByText(/We have strong ethics/)).toBeInTheDocument();
  });

  it("should not show admin badge when not in admin mode", () => {
    render(
      <Provider store={store}>
        <About />
      </Provider>
    );
    expect(screen.queryByText("Admin Mode")).not.toBeInTheDocument();
  });

  it("should show admin badge when in admin mode", () => {
    const adminState = {
      ...initialState,
      aboutSlice: { ...initialState.aboutSlice, isAdminMode: true },
    };
    const adminStore = mockStore(adminState);

    render(
      <Provider store={adminStore}>
        <About />
      </Provider>
    );
    expect(screen.getByText("Admin Mode")).toBeInTheDocument();
  });

  it("should toggle admin mode when heading is triple-clicked", () => {
    jest.useFakeTimers();

    render(
      <Provider store={store}>
        <About />
      </Provider>
    );

    const heading = screen.getByText("About Us");
    fireEvent.click(heading);
    fireEvent.click(heading);
    fireEvent.click(heading);

    jest.advanceTimersByTime(500);

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThan(0);
    expect(actions[0].type).toBe("about/toggleAdminMode");

    jest.useRealTimers();
  });

  it("should not show edit buttons when not in admin mode", () => {
    render(
      <Provider store={store}>
        <About />
      </Provider>
    );
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("should show edit buttons when in admin mode", () => {
    const adminState = {
      ...initialState,
      aboutSlice: { ...initialState.aboutSlice, isAdminMode: true },
    };
    const adminStore = mockStore(adminState);

    render(
      <Provider store={adminStore}>
        <About />
      </Provider>
    );
    const editButtons = screen.getAllByText("Edit");
    expect(editButtons.length).toBeGreaterThan(0);
  });

  it("should render AboutEditModal when editing", () => {
    const editingState = {
      ...initialState,
      aboutSlice: {
        ...initialState.aboutSlice,
        isAdminMode: true,
        editingSection: "familyHistory",
      },
    };
    const editingStore = mockStore(editingState);

    render(
      <Provider store={editingStore}>
        <About />
      </Provider>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
