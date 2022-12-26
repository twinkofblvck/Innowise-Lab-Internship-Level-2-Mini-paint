import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "firebase/auth";
import server from "../../../../server";

interface IRemovalParams
{
  id: string;
  auth: Auth;
}

const removeImageAction = createAsyncThunk("images/rm", async (params: IRemovalParams, thunkAPI) =>
{
  try
  {
    return await server.images.RmImage(params.id, params.auth);
  }
  catch(e: any)
  {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export default removeImageAction;