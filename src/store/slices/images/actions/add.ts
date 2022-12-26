import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../server";
import { IImage } from "../../../../types/images";

const addImageAction = createAsyncThunk("images/add", async (image: IImage, thunkAPI) =>
{
  try
  {
    await server.images.AddImage(image);
  }
  catch(e: any)
  {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export default addImageAction;