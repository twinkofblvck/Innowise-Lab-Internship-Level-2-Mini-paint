import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/server";
import { AuthActions } from "@/types";
import { getErrorMessage } from "@/utils/exceptions";

const logoutAction = createAsyncThunk(AuthActions.Logout, async (_, thunkAPI) => {
  try {
    await server.auth.LogOut();
  } catch (e) {
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export default logoutAction;
