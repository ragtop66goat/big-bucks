import { createSlice } from "@reduxjs/toolkit";
import deer from "../images/deer.jpg";
import elk from "../images/elk.jpg";
import bear from "../images/bear.jpg";

const initialState = {
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
        antlerRestrictions: "Must have 4+ points on one side for buck harvest",
        notes: ["Either sex in some districts", "Check district regulations"],
      },
      regulations: [
        "Blaze orange required (400 sq inches)",
        "Shooting hours: 30 min before sunrise to 30 min after sunset",
        "Mandatory harvest reporting within 24 hours",
        "Field dressing required before transport",
      ],
      image: deer,
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
      image: elk,
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
      image: bear,
    },
  ],
  isAdminMode: false,
  editingSeasonId: null,
  loading: false,
  error: null,
};

const seasonsSlice = createSlice({
  name: "seasons",
  initialState,
  reducers: {
    setSeason: (state, action) => {
      const { id, updates } = action.payload;
      const seasonIndex = state.seasons.findIndex((season) => season.id === id);
      if (seasonIndex !== -1) {
        state.seasons[seasonIndex] = {
          ...state.seasons[seasonIndex],
          ...updates,
        };
      }
    },
    toggleAdminMode: (state) => {
      state.isAdminMode = !state.isAdminMode;
    },
    setEditingSeason: (state, action) => {
      state.editingSeasonId = action.payload;
    },
    clearEditingSeason: (state) => {
      state.editingSeasonId = null;
    },
  },
});

export const { setSeason, toggleAdminMode, setEditingSeason, clearEditingSeason } =
  seasonsSlice.actions;

export default seasonsSlice.reducer;
