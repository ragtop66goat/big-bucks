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
    }
  }
})

export const {
  setEmail
} = formSlice.actions;

export default  formSlice.reducer;