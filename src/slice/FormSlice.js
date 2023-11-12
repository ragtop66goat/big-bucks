import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  startDate: "",
  endDate: ""
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    }
  }
})

export const {
  setEmail,
  setName,
  setStartDate,
  setEndDate
} = formSlice.actions;

export default  formSlice.reducer;