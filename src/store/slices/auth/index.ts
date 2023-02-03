import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { IAuthState } from "@/store/slices/auth/AuthSlice.type";
import { Slices } from "@/types";

const initialState: IAuthState = {
  userData: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: Slices.Auth,
  initialState,
  reducers: {
    setUserData: (state: IAuthState, action: PayloadAction<User | null | undefined>) => {
      state.userData = action.payload;
      if (state.isLoading) state.isLoading = false;
    },
  },
});

export default authSlice;
