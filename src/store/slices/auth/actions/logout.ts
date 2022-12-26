import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../server";

const logoutAction = createAsyncThunk("auth/logout", async (_, thunkAPI) =>
{
  try
  {
    await server.auth.LogOut();
  }
  catch(e: any)
  {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export default logoutAction;