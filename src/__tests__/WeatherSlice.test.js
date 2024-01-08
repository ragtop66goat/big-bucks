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
});
