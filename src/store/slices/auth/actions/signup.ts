import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/server";
import { AuthActions, IAuthParams } from "@/types";
import { authValidate } from "@/utils/auth";
import { getErrorMessage } from "@/utils/exceptions";

const signupAction = createAsyncThunk(AuthActions.SignUp, async (params: IAuthParams, thunkAPI) => {
  try {
    authValidate(params);
    await server.auth.SignUp(params.email, params.password);
  } catch (e) {
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export default signupAction;
