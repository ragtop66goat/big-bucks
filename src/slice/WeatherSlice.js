import { createSlice } from "@reduxjs/toolkit";
import { getForeCast } from "../api/weatherAPI";

const initialState = {
  longitude: "",
  latitude: "",
  forecastData: [],
  loading: false,
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
    });
  },
});

export const { setLongitude, setLatitude } = weatherSlice.actions;

export default weatherSlice.reducer;
