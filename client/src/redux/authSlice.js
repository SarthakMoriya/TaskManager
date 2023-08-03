/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  userTasks: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      (state.token = action.payload.token),
        (state.user = action.payload);
    },
    signup(state, action) {
      (state.token = action.payload.token), (state.user = action.payload);
    },
    logout(state, action) {
      (state.token = null), (state.user = null);
    },
    setTasks(state, action) {
      state.userTasks = action.payload.userTasks;
    },
  },
});

export default authSlice.reducer;
export const { login, logout, setTasks, signup } = authSlice.actions;
