import { screen } from "@testing-library/react";
import { Contact } from "../pages/contactPage/Contact";
import { customRenderReturnMockStore } from "../utils/testUtils";
import userEvent from "@testing-library/user-event";
import { render } from "../utils/testUtils";

jest.mock("../components/forecast display/ForecastDisplay", () => {
  return () => <h1>ForecastDisplay</h1>;
});

describe("ContactPage tests", () => {
  test("should initially render 'Contact', the dog image, and 'Request your dates today'", () => {
    const initialState = {
      formSlice: {
        name: "",
        email: "",
        startDate: "",
        endDate: "",
      },
      weatherSlice: {
        longitude: "",
        latitude: "",
        forecastData: [],
        message: "",
      },
    };
    render(<Contact />, { initialState });

    expect(screen.getByAltText("dog")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Request your dates today")).toBeInTheDocument();
  });

  test("should render a form with 'Name', 'Email', 'Start Date', and 'End Date' labels", () => {
    const initialState = {
      formSlice: {
        name: "",
        email: "",
        startDate: "",
        endDate: "",
      },
      weatherSlice: {
        longitude: "",
        latitude: "",
        forecastData: [],
        message: "",
      },
    };

    render(<Contact />, { initialState });

    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("start-date")).toBeInTheDocument();
    expect(screen.getByTestId("end-date")).toBeInTheDocument();
  });

  test("should render email, name, start date, and end date input fields", () => {
    const initialState = {
      formSlice: {
        name: "",
        email: "",
        startDate: "",
        endDate: "",
      },
      weatherSlice: {
        longitude: "",
        latitude: "",
        forecastData: [],
        message: "",
      },
    };

    render(<Contact />, { initialState });

    expect(screen.getByTestId("name-input").tagName).toBe("INPUT");
    expect(screen.getByTestId("email-input").tagName).toBe("INPUT");
    expect(screen.getByTestId("start-date-input").tagName).toBe("INPUT");
    expect(screen.getByTestId("end-date-input").tagName).toBe("INPUT");
  });

  test("should render a submit and get forecast button", () => {
    const initialState = {
      formSlice: {
        name: "",
        email: "",
        startDate: "",
        endDate: "",
      },
      weatherSlice: {
        longitude: "",
        latitude: "",
        forecastData: [],
        message: "",
      },
    };

    render(<Contact />, { initialState });

    expect(screen.getByText("Submit").tagName).toBe("BUTTON");
    expect(screen.getByText("Get Forecast").tagName).toBe("BUTTON");
  });

  test("should dispatch setName with 'T' when 'T' is typed in name input", () => {
    const initialState = {
      formSlice: {
        name: "",
        email: "",
        startDate: "",
        endDate: "",
      },
      weatherSlice: {
        longitude: "",
        latitude: "",
        forecastData: [],
        message: "",
      },
    };

    const { store } = customRenderReturnMockStore(<Contact />, {
      initialState,
    });

    const input = screen.getByTestId("name-input");

    userEvent.type(input, "T");

    expect(store.getActions()[0]).toEqual({
      type: "form/setName",
      payload: "T",
    });
  });

  test("should dispatch setEmail with 'T' when 'T' is typed in email input", () => {
    const initialState = {
      formSlice: {
        name: "",
        email: "",
        startDate: "",
        endDate: "",
      },
      weatherSlice: {
        longitude: "",
        latitude: "",
        forecastData: [],
        message: "",
      },
    };

    const { store } = customRenderReturnMockStore(<Contact />, {
      initialState,
    });

    const input = screen.getByTestId("email-input");

    userEvent.type(input, "T");

    expect(store.getActions()[0]).toEqual({
      type: "form/setEmail",
      payload: "T",
    });
  });

  test("should dispatch setStartDate with '2023-10-10' when entered in the Start Date input", () => {
    const initialState = {
      formSlice: {
        name: "",
        email: "",
        startDate: "",
        endDate: "",
      },
      weatherSlice: {
        longitude: "",
        latitude: "",
        forecastData: [],
        message: "",
      },
    };

    const { store } = customRenderReturnMockStore(<Contact />, {
      initialState,
    });

    const input = screen.getByTestId("start-date-input");

    userEvent.type(input, "2023-10-10");

    expect(store.getActions()[0]).toEqual({
      type: "form/setStartDate",
      payload: "2023-10-10",
    });
  });

  test("should dispatch setEndDate with '2023-10-10' when entered in the End Date input", () => {
    const initialState = {
      formSlice: {
        name: "",
        email: "",
        startDate: "",
        endDate: "",
      },
      weatherSlice: {
        longitude: "",
        latitude: "",
        forecastData: [],
        message: "",
      },
    };

    const { store } = customRenderReturnMockStore(<Contact />, {
      initialState,
    });

    const input = screen.getByTestId("end-date-input");

    userEvent.type(input, "2023-10-10");

    expect(store.getActions()[0]).toEqual({
      type: "form/setEndDate",
      payload: "2023-10-10",
    });
  });
});

test("should dispatch getForecast when Get Forecast button is pressed", () => {
  const initialState = {
    formSlice: {
      name: "",
      email: "",
      startDate: "",
      endDate: "",
    },
    weatherSlice: {
      latitude: "",
      longitude: "",
      forecastData: [],
      message: "",
    },
  };

  const { store } = customRenderReturnMockStore(<Contact />, { initialState });

  const btn = screen.getByTestId("forecast-button");

  userEvent.click(btn);

  expect(store.getActions()[0].type).toEqual("weather/get/pending");
});

test("should render ForecastDisplay when forecastData is present", () => {
  const initialState = {
    formSlice: {
      name: "",
      email: "",
      startDate: "",
      endDate: "",
    },
    weatherSlice: {
      longitude: "",
      latitude: "",
      forecastData: ["test"],
      message: "",
    },
  };

  render(<Contact />, { initialState });

  expect(screen.getByText("ForecastDisplay")).toBeInTheDocument();
});

test("should display a message when one is present and not ForecastData when no data is present", () => {
  const initialState = {
    formSlice: {
      name: "",
      email: "",
      startDate: "",
      endDate: "",
    },
    weatherSlice: {
      longitude: "",
      latitude: "",
      forecastData: [],
      message: "test",
    },
  };

  render(<Contact />, { initialState });

  expect(screen.getByText("test")).toBeInTheDocument();
});
