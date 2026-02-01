import reducer, {
  setSeason,
  toggleAdminMode,
  setEditingSeason,
  clearEditingSeason,
} from "../slice/SeasonsSlice";

describe("Seasons Slice Reducer Tests", () => {
  const initSeasonsState = {
    seasons: [
      {
        id: 1,
        name: "Deer Season",
        species: "Mule Deer & Whitetail",
        dateRange: {
          start: "2026-10-04",
          end: "2026-10-19",
        },
        type: "general",
        licenseInfo: {
          required: ["Montana Hunting License", "Deer Tag"],
          cost: {
            resident: { license: 19, tag: 17 },
            nonResident: { license: 101, tag: 142 },
          },
          links: {
            purchase: "https://fwp.mt.gov/buyandapply",
            regulations: "https://fwp.mt.gov/hunt/regulations",
          },
        },
        bagLimits: {
          general: "1 deer per license year",
          antlerRestrictions:
            "Must have 4+ points on one side for buck harvest",
          notes: ["Either sex in some districts", "Check district regulations"],
        },
        regulations: [
          "Blaze orange required (400 sq inches)",
          "Shooting hours: 30 min before sunrise to 30 min after sunset",
          "Mandatory harvest reporting within 24 hours",
          "Field dressing required before transport",
        ],
        image: "deer.jpg",
      },
      {
        id: 2,
        name: "Elk Season",
        species: "Rocky Mountain Elk",
        dateRange: {
          start: "2026-11-07",
          end: "2026-11-29",
          weekendsOnly: true,
        },
        type: "permit-only",
        licenseInfo: {
          required: ["Montana Hunting License", "Elk Permit (Limited Draw)"],
          cost: {
            resident: { license: 19, permit: 20 },
            nonResident: { license: 101, permit: 884 },
          },
          applicationDeadline: "2026-06-01",
          links: {
            purchase: "https://fwp.mt.gov/buyandapply",
            drawResults: "https://fwp.mt.gov/hunt/draw-results",
          },
        },
        bagLimits: {
          general: "1 elk per permit",
          antlerRestrictions: "Varies by hunting district (check permit)",
          notes: ["Either sex or antlered-only based on permit type"],
        },
        regulations: [
          "Blaze orange required (400 sq inches)",
          "Weekend hunting only (Sat-Sun)",
          "Shooting hours: 30 min before sunrise to 30 min after sunset",
          "Mandatory harvest reporting within 24 hours",
          "Quarter elk in field before transport",
        ],
        image: "elk.jpg",
      },
      {
        id: 3,
        name: "Black Bear Season",
        species: "Black Bear",
        dateRange: {
          start: "2026-12-14",
          end: "2026-12-28",
        },
        type: "general",
        licenseInfo: {
          required: ["Montana Hunting License", "Black Bear License"],
          cost: {
            resident: { license: 19, bearLicense: 19 },
            nonResident: { license: 101, bearLicense: 350 },
          },
          links: {
            purchase: "https://fwp.mt.gov/buyandapply",
            bearsmart: "https://fwp.mt.gov/conservation/wildlife/bear",
          },
        },
        bagLimits: {
          general: "1 bear per license year",
          restrictions: "No cubs or sows with cubs",
          notes: ["Season closes when quota reached in district"],
        },
        regulations: [
          "Mandatory bear identification test required before purchase",
          "Blaze orange required (400 sq inches)",
          "Shooting hours: 30 min before sunrise to 30 min after sunset",
          "Skull and hide must be presented to FWP within 10 days",
          "Mandatory harvest reporting within 24 hours",
          "Baiting prohibited in most districts",
        ],
        image: "bear.jpg",
      },
    ],
    isAdminMode: false,
    editingSeasonId: null,
    loading: false,
    error: null,
  };

  it("should render correct initial state", () => {
    expect(reducer(undefined, { type: undefined })).toStrictEqual(
      initSeasonsState,
    );
  });

  it("should have 3 seasons in initial state", () => {
    const state = reducer(undefined, { type: undefined });
    expect(state.seasons).toHaveLength(3);
    expect(state.seasons[0].name).toBe("Deer Season");
    expect(state.seasons[1].name).toBe("Elk Season");
    expect(state.seasons[2].name).toBe("Black Bear Season");
  });

  it("should update specific season when setSeason is dispatched", () => {
    const updates = {
      dateRange: {
        start: "2026-10-05",
        end: "2026-10-25",
      },
    };

    const result = reducer(initSeasonsState, {
      type: setSeason,
      payload: { id: 1, updates },
    });

    expect(result.seasons[0].dateRange.start).toBe("2026-10-05");
    expect(result.seasons[0].dateRange.end).toBe("2026-10-25");
    expect(result.seasons[0].name).toBe("Deer Season"); // Unchanged
    expect(result.seasons[1]).toStrictEqual(initSeasonsState.seasons[1]); // Other seasons unchanged
  });

  it("should toggle isAdminMode when toggleAdminMode is dispatched", () => {
    const stateWithAdminOff = {
      ...initSeasonsState,
      isAdminMode: false,
    };

    const result = reducer(stateWithAdminOff, { type: toggleAdminMode });
    expect(result.isAdminMode).toBe(true);

    const resultToggleBack = reducer(result, { type: toggleAdminMode });
    expect(resultToggleBack.isAdminMode).toBe(false);
  });

  it("should set editingSeasonId when setEditingSeason is dispatched", () => {
    const result = reducer(initSeasonsState, {
      type: setEditingSeason,
      payload: 2,
    });

    expect(result.editingSeasonId).toBe(2);
  });

  it("should clear editingSeasonId when clearEditingSeason is dispatched", () => {
    const stateWithEditing = {
      ...initSeasonsState,
      editingSeasonId: 2,
    };

    const result = reducer(stateWithEditing, { type: clearEditingSeason });
    expect(result.editingSeasonId).toBe(null);
  });
});
