import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../server";

const getImagesAction = createAsyncThunk("images/get", async (_, thunkAPI) =>
{
  try
  {
    return await server.images.GetImages();
  }
  catch(e: any)
  {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export default getImagesAction;