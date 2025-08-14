import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "vikram",
    role: "admin", // Change to "user" to test role-based UI
    email: "vikram@example.com"
  },
  token: "dummy-jwt-token"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  }
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
