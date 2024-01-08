import { createSlice } from "@reduxjs/toolkit";
import { getForeCast } from "../api/weatherAPI";

const initialState = {
  longitude: "",
  latitude: "",
  forecastData: [],
  message: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getForeCast.fulfilled, (state, action) => {
      state.forecastData = [action.payload];
      state.message = "";
    });
    builder.addCase(getForeCast.pending, (state) => {
      state.message = "Loading...";
    });
    builder.addCase(getForeCast.rejected, (state) => {
      state.message = "There was an error retrieving the forecast data";
    });
  },
});

export const { setLongitude, setLatitude } = weatherSlice.actions;

export default weatherSlice.reducer;
