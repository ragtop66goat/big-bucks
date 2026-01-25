import reducer, {
  setSelectedPackage,
  clearSelectedPackage,
} from "../slice/PackageSlice";

describe("Package Slice Reducer Tests", () => {
  const initPackageState = {
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
        included: [
          "Professional guide service",
          "All meals (breakfast, lunch, dinner)",
          "Basic lodging accommodation",
          "Field dressing assistance",
          "Transportation to hunting grounds",
        ],
        notIncluded: [
          "Hunting license",
          "Tags and permits",
          "Personal equipment",
          "Ammunition",
        ],
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
        included: [
          "Professional guide service",
          "All meals (breakfast, lunch, dinner)",
          "Deluxe lodge accommodation",
          "Field dressing & quartering",
          "Transportation to hunting grounds",
          "Trophy photos",
          "Meat processing coordination",
        ],
        notIncluded: [
          "Hunting license",
          "Tags and permits",
          "Personal equipment",
          "Ammunition",
        ],
      },
      {
        id: 3,
        name: "Premium Trophy Hunt",
        tier: "premium",
        price: 5999,
        duration: "10 Days",
        groupSize: "1-4 Hunters",
        description: "Exclusive trophy hunting with VIP treatment",
        featured: false,
        included: [
          "Dedicated professional guide (1:2 ratio)",
          "Gourmet meals by private chef",
          "Private cabin accommodation",
          "Complete field dressing & processing",
          "Premium transportation (4x4 vehicles)",
          "Professional trophy photos & video",
          "Meat processing & shipping",
          "Taxidermy consultation",
          "Pre-hunt scouting reports",
        ],
        notIncluded: [
          "Hunting license",
          "Tags and permits",
          "Taxidermy services",
        ],
      },
      {
        id: 4,
        name: "Family Adventure",
        tier: "specialty",
        price: 2799,
        duration: "5 Days",
        groupSize: "4-8 People",
        description: "Perfect for families - hunting and recreation combined",
        featured: false,
        included: [
          "Professional guide service",
          "All meals (breakfast, lunch, dinner)",
          "Family-style lodge accommodation",
          "Youth mentoring program",
          "Non-hunting activities (fishing, hiking)",
          "Field dressing assistance",
          "Transportation to hunting grounds",
          "Campfire experiences",
        ],
        notIncluded: [
          "Hunting licenses",
          "Tags and permits",
          "Personal equipment",
          "Ammunition",
        ],
      },
    ],
    addOns: [
      {
        id: 1,
        name: "Additional Guide",
        price: 350,
        unit: "per day",
        description: "Extra professional guide for larger groups",
      },
      {
        id: 2,
        name: "Trophy Processing",
        price: 500,
        unit: "flat rate",
        description: "Complete field processing and meat preparation",
      },
      {
        id: 3,
        name: "Equipment Rental",
        price: 75,
        unit: "per day",
        description: "Rifle, scope, and accessories rental",
      },
      {
        id: 4,
        name: "Airport Transfer",
        price: 200,
        unit: "round trip",
        description: "Transportation from/to nearest airport",
      },
      {
        id: 5,
        name: "Extended Stay",
        price: 299,
        unit: "per day",
        description: "Extend your hunt beyond package duration",
      },
    ],
    groupDiscounts: [
      {
        groupSize: "5-7 hunters",
        discount: 10,
        description: "Save 10% when booking for 5-7 hunters",
      },
      {
        groupSize: "8+ hunters",
        discount: 15,
        description: "Save 15% when booking for 8 or more hunters",
      },
    ],
    seasonalPromotions: [
      {
        season: "Early Bird",
        deadline: "Book 6 months in advance",
        discount: 12,
        description: "Save 12% on any package",
      },
    ],
    selectedPackageId: null,
  };

  it("should render correct initial state", () => {
    expect(reducer(undefined, { type: undefined })).toStrictEqual(
      initPackageState,
    );
  });

  it("should set selectedPackageId to 2 when setSelectedPackage is dispatched with 2", () => {
    const result = {
      ...initPackageState,
      selectedPackageId: 2,
    };

    expect(
      reducer(initPackageState, { type: setSelectedPackage, payload: 2 }),
    ).toStrictEqual(result);
  });

  it("should set selectedPackageId to null when clearSelectedPackage is dispatched", () => {
    const stateWithSelection = {
      ...initPackageState,
      selectedPackageId: 2,
    };

    const result = {
      ...initPackageState,
      selectedPackageId: null,
    };

    expect(
      reducer(stateWithSelection, { type: clearSelectedPackage }),
    ).toStrictEqual(result);
  });

  it("should maintain packages array in state", () => {
    const state = reducer(undefined, { type: undefined });
    expect(state.packages).toHaveLength(4);
    expect(state.packages[0].name).toBe("Weekend Warrior");
    expect(state.packages[1].name).toBe("Week-Long Expedition");
  });

  it("should maintain addOns array in state", () => {
    const state = reducer(undefined, { type: undefined });
    expect(state.addOns).toHaveLength(5);
    expect(state.addOns[0].name).toBe("Additional Guide");
  });

  it("should maintain groupDiscounts array in state", () => {
    const state = reducer(undefined, { type: undefined });
    expect(state.groupDiscounts).toHaveLength(2);
    expect(state.groupDiscounts[0].discount).toBe(10);
  });
});
