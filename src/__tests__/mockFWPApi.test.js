import { fetchSeasons, updateSeason } from "../api/mockFWPApi";

describe("Mock FWP API Tests", () => {
  it("should return all seasons when fetchSeasons is called", async () => {
    const response = await fetchSeasons();

    expect(response.success).toBe(true);
    expect(response.data.seasons).toHaveLength(3);
    expect(response.data.seasons[0].name).toBe("Deer Season");
    expect(response.data.seasons[1].name).toBe("Elk Season");
    expect(response.data.seasons[2].name).toBe("Black Bear Season");
  });

  it("should include lastUpdated and source in fetchSeasons response", async () => {
    const response = await fetchSeasons();

    expect(response.data.lastUpdated).toBeDefined();
    expect(response.data.source).toBe("Montana FWP Mock API v1.0");
  });

  it("should update season and return updated data when updateSeason is called", async () => {
    const updates = {
      dateRange: {
        start: "2026-10-05",
        end: "2026-10-25",
      },
    };

    const response = await updateSeason(1, updates);

    expect(response.success).toBe(true);
    expect(response.data.season.id).toBe(1);
    expect(response.data.season.dateRange.start).toBe("2026-10-05");
    expect(response.data.season.dateRange.end).toBe("2026-10-25");
    expect(response.data.season.name).toBe("Deer Season");
  });

  it("should simulate network delay", async () => {
    const startTime = Date.now();
    await fetchSeasons();
    const endTime = Date.now();
    const duration = endTime - startTime;

    expect(duration).toBeGreaterThanOrEqual(450);
  });

  it("should return error for invalid season id in updateSeason", async () => {
    const updates = { dateRange: { start: "2026-10-05", end: "2026-10-25" } };
    const response = await updateSeason(999, updates);

    expect(response.success).toBe(false);
    expect(response.error).toBeDefined();
  });
});
