import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../server";
import { IAuthParams } from "../../../../types/auth";
import validate from "../../../../utils/auth/validate";

const loginAction = createAsyncThunk("auth/login", async (params: IAuthParams, thunkAPI) =>
{
  try
  {
    validate(params);
    await server.auth.LogIn(params.email, params.password);
  }
  catch(e: any)
  {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export default loginAction;