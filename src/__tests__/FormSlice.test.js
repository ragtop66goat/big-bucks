import reducer, {
  setEmail,
  setEndDate,
  setName,
  setStartDate,
} from "../slice/FormSlice";

describe("Form Slice Reducer Tests", () => {
  const initFormState = {
    name: "",
    email: "",
    startDate: "",
    endDate: "",
  };

  it("should render correct initial state", () => {
    const result = {
      name: "",
      email: "",
      startDate: "",
      endDate: "",
    };

    expect(reducer(undefined, { type: undefined })).toStrictEqual(result);
  });

  it("should set name to 'T' when setName is dispatched with 'T'", () => {
    const result = {
      name: "T",
      email: "",
      startDate: "",
      endDate: "",
    };

    expect(
      reducer(initFormState, { type: setName, payload: "T" }),
    ).toStrictEqual(result);
  });

  it("should set email to 'T' when setEmail is dispatched with 'T'", () => {
    const result = {
      name: "",
      email: "T",
      startDate: "",
      endDate: "",
    };

    expect(
      reducer(initFormState, { type: setEmail, payload: "T" }),
    ).toStrictEqual(result);
  });

  it("should set startDate to '2023-10-10' when setStartDate is dispatched with '2023-10-10'", () => {
    const result = {
      name: "",
      email: "",
      startDate: "2023-10-10",
      endDate: "",
    };

    expect(
      reducer(initFormState, { type: setStartDate, payload: "2023-10-10" }),
    ).toStrictEqual(result);
  });

  it("should set endDate to '2023-10-10' when setEndDate is dispatched with '2023-10-10'", () => {
    const result = {
      name: "",
      email: "",
      startDate: "",
      endDate: "2023-10-10",
    };

    expect(
      reducer(initFormState, { type: setEndDate, payload: "2023-10-10" }),
    ).toStrictEqual(result);
  });
});
