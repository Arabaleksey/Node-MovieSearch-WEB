import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "../models/response/IUser";
import { registration } from "./actionCreator";

interface AuthState {
  user: IUser;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: {
    id: "",
    email: "",
    isActivated: false,
  },
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload.isAuth;
    },
    setUser(state, action) {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action: any) => {
      state.isAuth = true;
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { setAuth, setUser } = authSlice.actions;
