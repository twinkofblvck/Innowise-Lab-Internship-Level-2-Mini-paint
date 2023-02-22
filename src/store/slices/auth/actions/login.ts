import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/server";
import { AuthActions, IAuthParams } from "@/types";
import { authValidate } from "@/utils/auth";
import { getErrorMessage } from "@/utils/exceptions";

const loginAction = createAsyncThunk(AuthActions.Login, async (params: IAuthParams, thunkAPI) => {
  try {
    authValidate(params);
    await server.auth.LogIn(params.email, params.password);
  } catch (e) {
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export default loginAction;
