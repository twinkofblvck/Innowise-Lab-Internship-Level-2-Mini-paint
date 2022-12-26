import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../server";
import { IAuthParams } from "../../../../types/auth";
import validate from "../../../../utils/auth/validate";

const signupAction = createAsyncThunk("auth/signup", async (params: IAuthParams, thunkAPI) =>
{
  try
  {
    validate(params);
    await server.auth.SignUp(params.email, params.password);
  }
  catch(e: any)
  {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export default signupAction;