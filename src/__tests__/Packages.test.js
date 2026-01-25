import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Packages } from "../pages/packagesPage/Packages";
import { render } from "../utils/testUtils";

// Mock child components to simplify testing
jest.mock("../components/packageCard/PackageCard", () => {
  return {
    PackageCard: ({ packageData, onSelect }) => (
      <div data-testid={`mock-package-card-${packageData.id}`}>
        <h3>{packageData.name}</h3>
        <button onClick={() => onSelect(packageData.id)}>Select</button>
      </div>
    ),
  };
});

jest.mock("../components/addOnsList/AddOnsList", () => {
  return {
    AddOnsList: () => <div data-testid="mock-addons-list">Add-Ons List</div>,
  };
});

jest.mock("../components/discountInfo/DiscountInfo", () => {
  return {
    DiscountInfo: () => (
      <div data-testid="mock-discount-info">Discount Info</div>
    ),
  };
});

describe("Packages Page Tests", () => {
  const initialState = {
    packageSlice: {
      packages: [
        {
          id: 1,
          name: "Weekend Warrior",
          tier: "basic",
          price: 1299,
          duration: "2-3 Days",
          groupSize: "2-4 Hunters",
          description: "Perfect for a quick hunting getaway",
          featured: false,
          included: ["Professional guide service"],
          notIncluded: ["Hunting license"],
        },
        {
          id: 2,
          name: "Week-Long Expedition",
          tier: "standard",
          price: 3499,
          duration: "7 Days",
          groupSize: "2-6 Hunters",
          description: "The ultimate hunting experience",
          featured: true,
          included: ["Professional guide service"],
          notIncluded: ["Hunting license"],
        },
      ],
      addOns: [
        {
          id: 1,
          name: "Additional Guide",
          price: 350,
          unit: "per day",
          description: "Extra professional guide",
        },
      ],
      groupDiscounts: [
        {
          groupSize: "5-7 hunters",
          discount: 10,
          description: "Save 10%",
        },
      ],
      seasonalPromotions: [],
      selectedPackageId: null,
    },
  };

  it("should render 'Packages' heading in hero section", () => {
    render(<Packages />, { initialState });

    expect(screen.getByText("Packages")).toBeInTheDocument();
  });

  it("should render page introduction text", () => {
    render(<Packages />, { initialState });

    expect(
      screen.getByText(/Choose the perfect hunting package/i),
    ).toBeInTheDocument();
  });

  it("should render PackageCard for each package from Redux store", () => {
    render(<Packages />, { initialState });

    expect(screen.getByTestId("mock-package-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("mock-package-card-2")).toBeInTheDocument();
    expect(screen.getByText("Weekend Warrior")).toBeInTheDocument();
    expect(screen.getByText("Week-Long Expedition")).toBeInTheDocument();
  });

  it("should render AddOnsList component", () => {
    render(<Packages />, { initialState });

    expect(screen.getByTestId("mock-addons-list")).toBeInTheDocument();
  });

  it("should render DiscountInfo component", () => {
    render(<Packages />, { initialState });

    expect(screen.getByTestId("mock-discount-info")).toBeInTheDocument();
  });

  it("should dispatch setSelectedPackage when package card is selected", async () => {
    const user = userEvent.setup();
    const { store } = render(<Packages />, { initialState });

    const selectButton = screen.getAllByText("Select")[0];
    await user.click(selectButton);

    const state = store.getState();
    expect(state.packageSlice.selectedPackageId).toBe(1);
  });
});
