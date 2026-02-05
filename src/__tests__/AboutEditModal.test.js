import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { AboutEditModal } from "../components/aboutEditModal/AboutEditModal";

const mockStore = configureStore([]);

describe("AboutEditModal", () => {
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
    },
  };

  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("should not render when show is false", () => {
    render(
      <Provider store={store}>
        <AboutEditModal show={false} section={null} onHide={jest.fn()} />
      </Provider>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render when show is true with familyHistory section", () => {
    render(
      <Provider store={store}>
        <AboutEditModal
          show={true}
          section="familyHistory"
          onHide={jest.fn()}
        />
      </Provider>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/edit family history/i)).toBeInTheDocument();
  });

  it("should render FamilyHistoryForm when section is familyHistory", () => {
    render(
      <Provider store={store}>
        <AboutEditModal
          show={true}
          section="familyHistory"
          onHide={jest.fn()}
        />
      </Provider>
    );
    expect(screen.getByLabelText(/title/i)).toHaveValue("Our Heritage");
  });

  it("should render GuideForm when section is guide with guideId", () => {
    render(
      <Provider store={store}>
        <AboutEditModal
          show={true}
          section="guide"
          guideId={1}
          onHide={jest.fn()}
        />
      </Provider>
    );
    expect(screen.getByText(/edit guide/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^name$/i)).toHaveValue("Jake Wilson");
  });

  it("should render ConservationForm when section is conservation", () => {
    render(
      <Provider store={store}>
        <AboutEditModal
          show={true}
          section="conservation"
          onHide={jest.fn()}
        />
      </Provider>
    );
    expect(screen.getByText(/edit conservation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveValue("Conservation");
  });

  it("should render EthicsForm when section is ethics", () => {
    render(
      <Provider store={store}>
        <AboutEditModal show={true} section="ethics" onHide={jest.fn()} />
      </Provider>
    );
    expect(screen.getByText(/edit ethics/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveValue("Ethics");
  });

  it("should call onHide when cancel is clicked", () => {
    const mockOnHide = jest.fn();
    render(
      <Provider store={store}>
        <AboutEditModal
          show={true}
          section="familyHistory"
          onHide={mockOnHide}
        />
      </Provider>
    );
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnHide).toHaveBeenCalled();
  });

  it("should dispatch action when save is clicked on familyHistory", () => {
    render(
      <Provider store={store}>
        <AboutEditModal
          show={true}
          section="familyHistory"
          onHide={jest.fn()}
        />
      </Provider>
    );

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "New Title" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThan(0);
    expect(actions[0].type).toBe("about/setFamilyHistory");
  });

  it("should dispatch updateGuide action when save is clicked on guide", () => {
    render(
      <Provider store={store}>
        <AboutEditModal
          show={true}
          section="guide"
          guideId={1}
          onHide={jest.fn()}
        />
      </Provider>
    );

    const nameInput = screen.getByLabelText(/^name$/i);
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThan(0);
    expect(actions[0].type).toBe("about/updateGuide");
  });
});
