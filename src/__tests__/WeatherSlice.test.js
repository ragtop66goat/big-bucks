import reducer, { setLongitude, setLatitude } from "../slice/WeatherSlice";

describe("Weather Slice Tests", () => {
  const initState = {
    longitude: "",
    latitude: "",
    forecastData: [],
    message: "",
  };

  test("should render correct initial state", () => {
    expect(reducer(undefined, { type: undefined })).toStrictEqual(initState);
  });

  test("should set longitude to 1", () => {
    const result = {
      longitude: "1",
      latitude: "",
      forecastData: [],
      message: "",
    };

    expect(
      reducer(initState, { type: setLongitude, payload: "1" })
    ).toStrictEqual(result);
  });

  test("should set latitude to 1", () => {
    const result = {
      longitude: "",
      latitude: "1",
      forecastData: [],
      message: "",
    };

    expect(
      reducer(initState, { type: setLatitude, payload: "1" })
    ).toStrictEqual(result);
  });

  test("should set message to 'Loading'", () => {
    const result = {
      longitude: "",
      latitude: "",
      forecastData: [],
      message: "Loading...",
    };

    expect(reducer(initState, { type: "weather/get/pending" })).toStrictEqual(
      result
    );
  });

  test("should set message to '' and forecastData to ['test']", () => {
    const pendingState = {
      longitude: "",
      latitude: "",
      forecastData: [],
      message: "Loading...",
    };
    const result = {
      longitude: "",
      latitude: "",
      forecastData: ["test"],
      message: "",
    };

    expect(
      reducer(pendingState, { type: "weather/get/fulfilled", payload: "test" })
    ).toStrictEqual(result);
  });

  test("should set message to 'There was an error retrieving the forecast data", () => {
    const result = {
      longitude: "",
      latitude: "",
      forecastData: [],
      message: "There was an error retrieving the forecast data",
    };

    expect(reducer(initState, { type: "weather/get/rejected" })).toStrictEqual(
      result
    );
  });
});
