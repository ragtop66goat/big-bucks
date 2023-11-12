import {screen} from "@testing-library/react";
import {Contact} from "../pages/contactPage/Contact";
import {customRenderReturnMockStore} from "../utils/testUtils";

describe('ContactPage tests', () => {

  test("should initially render the 'Contact', the dog image, and 'Request your dates today'", () => {

    const initialState = {
      form: {
        name: "",
        email: "",
        startDate: "",
        endDate: ""
      }
    }
    customRenderReturnMockStore(<Contact/>, initialState);

    expect(screen.getByAltText("dog")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Request your dates today")).toBeInTheDocument();
  })

  test("should render a form with 'Name', 'Email', 'Start Date', and 'End Date' labels", () => {

    const initialState = {
      form: {
        name: "",
        email: "",
        startDate: "",
        endDate: ""
      }
    }

    customRenderReturnMockStore(<Contact/>, initialState);

    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("start-date")).toBeInTheDocument();
    expect(screen.getByTestId("end-date")).toBeInTheDocument();
  })

  test("should render email and name input fields", () => {

    const initialState = {
      form: {
        name: "",
        email: "",
        startDate: "",
        endDate: ""
      }
    }

    customRenderReturnMockStore(<Contact/>, initialState);

    expect(screen.getByTestId("name-input").tagName).toBe("INPUT");
    expect(screen.getByTestId("email-input").tagName).toBe("INPUT");
    expect(screen.getByTestId("start-date-input").tagName).toBe("INPUT");
    expect(screen.getByTestId("end-date-input").tagName).toBe("INPUT");
  })
})