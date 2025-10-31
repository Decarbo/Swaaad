// src/redux/slice/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,   // store admin info
  token: null,   // store auth token
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
});

export const { setAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
