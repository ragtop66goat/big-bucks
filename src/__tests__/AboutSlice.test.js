import aboutSlice, {
  setFamilyHistory,
  addGuide,
  updateGuide,
  deleteGuide,
  setConservation,
  setEthics,
  toggleAdminMode,
  setEditingSection,
  clearEditingSection,
} from "../slice/AboutSlice";

describe("AboutSlice", () => {
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

  describe("initial state", () => {
    it("should have correct initial state structure", () => {
      const state = aboutSlice(undefined, { type: "@@INIT" });
      expect(state).toHaveProperty("familyHistory");
      expect(state).toHaveProperty("guides");
      expect(state).toHaveProperty("conservation");
      expect(state).toHaveProperty("ethics");
      expect(state).toHaveProperty("isAdminMode");
      expect(state).toHaveProperty("editingSection");
    });

    it("should initialize with 3 guides", () => {
      const state = aboutSlice(undefined, { type: "@@INIT" });
      expect(state.guides).toHaveLength(3);
    });

    it("should initialize with admin mode false", () => {
      const state = aboutSlice(undefined, { type: "@@INIT" });
      expect(state.isAdminMode).toBe(false);
    });
  });

  describe("setFamilyHistory", () => {
    it("should update family history content", () => {
      const updates = { title: "New Title", content: "New content" };
      const state = aboutSlice(initialState, setFamilyHistory(updates));
      expect(state.familyHistory.title).toBe("New Title");
      expect(state.familyHistory.content).toBe("New content");
    });

    it("should preserve id when updating", () => {
      const updates = { title: "New Title" };
      const state = aboutSlice(initialState, setFamilyHistory(updates));
      expect(state.familyHistory.id).toBe(1);
    });
  });

  describe("guide management", () => {
    describe("addGuide", () => {
      it("should add a new guide to the guides array", () => {
        const newGuide = {
          id: 4,
          name: "Emily Chen",
          role: "Guide",
          bio: "New guide bio",
          yearsExperience: 5,
          specialties: ["Archery"],
          imageUrl: null,
        };
        const state = aboutSlice(initialState, addGuide(newGuide));
        expect(state.guides).toHaveLength(4);
        expect(state.guides[3]).toEqual(newGuide);
      });
    });

    describe("updateGuide", () => {
      it("should update an existing guide", () => {
        const updates = {
          id: 1,
          updates: { yearsExperience: 26, bio: "Updated bio" },
        };
        const state = aboutSlice(initialState, updateGuide(updates));
        expect(state.guides[0].yearsExperience).toBe(26);
        expect(state.guides[0].bio).toBe("Updated bio");
        expect(state.guides[0].name).toBe("Jake Wilson");
      });

      it("should not modify other guides", () => {
        const updates = { id: 1, updates: { name: "Updated Name" } };
        const state = aboutSlice(initialState, updateGuide(updates));
        expect(state.guides[1].name).toBe("Sarah Martinez");
        expect(state.guides[2].name).toBe("Tom Blackwood");
      });
    });

    describe("deleteGuide", () => {
      it("should remove a guide by id", () => {
        const state = aboutSlice(initialState, deleteGuide(2));
        expect(state.guides).toHaveLength(2);
        expect(state.guides.find((g) => g.id === 2)).toBeUndefined();
      });

      it("should keep other guides intact", () => {
        const state = aboutSlice(initialState, deleteGuide(2));
        expect(state.guides[0].id).toBe(1);
        expect(state.guides[1].id).toBe(3);
      });
    });
  });

  describe("setConservation", () => {
    it("should update conservation content", () => {
      const updates = { title: "New Conservation Title" };
      const state = aboutSlice(initialState, setConservation(updates));
      expect(state.conservation.title).toBe("New Conservation Title");
    });

    it("should update conservation practices", () => {
      const updates = { practices: ["Practice 1", "Practice 2"] };
      const state = aboutSlice(initialState, setConservation(updates));
      expect(state.conservation.practices).toEqual(["Practice 1", "Practice 2"]);
    });
  });

  describe("setEthics", () => {
    it("should update ethics content", () => {
      const updates = { content: "New ethics content" };
      const state = aboutSlice(initialState, setEthics(updates));
      expect(state.ethics.content).toBe("New ethics content");
    });

    it("should update ethics principles", () => {
      const updates = { principles: ["Principle 1"] };
      const state = aboutSlice(initialState, setEthics(updates));
      expect(state.ethics.principles).toEqual(["Principle 1"]);
    });
  });

  describe("admin mode", () => {
    describe("toggleAdminMode", () => {
      it("should toggle admin mode from false to true", () => {
        const state = aboutSlice(initialState, toggleAdminMode());
        expect(state.isAdminMode).toBe(true);
      });

      it("should toggle admin mode from true to false", () => {
        const adminState = { ...initialState, isAdminMode: true };
        const state = aboutSlice(adminState, toggleAdminMode());
        expect(state.isAdminMode).toBe(false);
      });
    });

    describe("setEditingSection", () => {
      it("should set the editing section", () => {
        const state = aboutSlice(
          initialState,
          setEditingSection("familyHistory")
        );
        expect(state.editingSection).toBe("familyHistory");
      });
    });

    describe("clearEditingSection", () => {
      it("should clear the editing section", () => {
        const editingState = { ...initialState, editingSection: "guides" };
        const state = aboutSlice(editingState, clearEditingSection());
        expect(state.editingSection).toBeNull();
      });
    });
  });
});
