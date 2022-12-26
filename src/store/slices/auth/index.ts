import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface IAuthState
{
  userData: User | null | undefined;
  isLoading: boolean;
}

const initialState: IAuthState =
{
  userData: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:
  {
    setUserData: (state: IAuthState, action: PayloadAction<User | null | undefined>) =>
    {
      state.userData = action.payload;
      if (state.isLoading) state.isLoading = false;
    },
  },
});

export default authSlice;