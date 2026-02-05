import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  familyHistory: {
    id: 1,
    title: "Our Heritage",
    content:
      "Founded in 1952 by the Wilson family, Big Bucks Outfitters has been guiding hunters through Montana's pristine wilderness for over 70 years. What started as a small family operation has grown into a legacy of conservation, ethical hunting, and unforgettable outdoor experiences.",
    imageUrl: null,
  },
  guides: [
    {
      id: 1,
      name: "Jake Wilson",
      role: "Head Guide & Owner",
      bio: "Third-generation outfitter with 25 years of experience in Montana backcountry.",
      yearsExperience: 25,
      specialties: ["Elk", "Mule Deer", "Backcountry Navigation"],
      imageUrl: null,
    },
    {
      id: 2,
      name: "Sarah Martinez",
      role: "Senior Guide",
      bio: "Wildlife biologist turned hunting guide, specializing in ethical harvesting and conservation education.",
      yearsExperience: 15,
      specialties: ["Whitetail", "Black Bear", "Wildlife Biology"],
      imageUrl: null,
    },
    {
      id: 3,
      name: "Tom Blackwood",
      role: "Lead Wilderness Guide",
      bio: "Former search and rescue specialist with unmatched knowledge of Montana's wilderness terrain.",
      yearsExperience: 18,
      specialties: ["Mountain Hunting", "Safety & First Aid", "Wilderness Survival"],
      imageUrl: null,
    },
  ],
  conservation: {
    id: 1,
    title: "Conservation & Sustainability",
    content:
      "At Big Bucks Outfitters, we believe in giving back to the land that provides us with so much. Our commitment to conservation goes beyond compliance—it's a core value.",
    practices: [
      "Partner with Montana Fish, Wildlife & Parks for habitat restoration",
      "Maintain sustainable harvest quotas below legal limits",
      "Donate 10% of profits to local wildlife conservation organizations",
      "Practice Leave No Trace principles on all guided hunts",
      "Educate hunters on ethical shot placement and quick, humane kills",
      "Support predator management programs for ecosystem balance",
    ],
  },
  ethics: {
    id: 1,
    title: "Hunting Ethics & Philosophy",
    content:
      "We believe hunting is a privilege that comes with profound responsibility. Our philosophy centers on respect—for the animal, the land, and the tradition.",
    principles: [
      "Fair Chase: No baiting, no fenced hunts, no guaranteed kills",
      "One Shot, One Kill: Emphasis on marksmanship and ethical shot selection",
      "Full Utilization: Respect the harvest by using meat, hide, and antlers",
      "Mentorship: Pass on traditions and ethics to the next generation",
      "Conservation First: Hunters are the original conservationists",
      "Safety Above All: No trophy is worth compromising safety",
    ],
  },
  isAdminMode: false,
  editingSection: null,
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    setFamilyHistory: (state, action) => {
      state.familyHistory = { ...state.familyHistory, ...action.payload };
    },
    addGuide: (state, action) => {
      state.guides.push(action.payload);
    },
    updateGuide: (state, action) => {
      const { id, updates } = action.payload;
      const guideIndex = state.guides.findIndex((guide) => guide.id === id);
      if (guideIndex !== -1) {
        state.guides[guideIndex] = { ...state.guides[guideIndex], ...updates };
      }
    },
    deleteGuide: (state, action) => {
      state.guides = state.guides.filter((guide) => guide.id !== action.payload);
    },
    setConservation: (state, action) => {
      state.conservation = { ...state.conservation, ...action.payload };
    },
    setEthics: (state, action) => {
      state.ethics = { ...state.ethics, ...action.payload };
    },
    toggleAdminMode: (state) => {
      state.isAdminMode = !state.isAdminMode;
    },
    setEditingSection: (state, action) => {
      state.editingSection = action.payload;
    },
    clearEditingSection: (state) => {
      state.editingSection = null;
    },
  },
});

export const {
  setFamilyHistory,
  addGuide,
  updateGuide,
  deleteGuide,
  setConservation,
  setEthics,
  toggleAdminMode,
  setEditingSection,
  clearEditingSection,
} = aboutSlice.actions;

export default aboutSlice.reducer;
