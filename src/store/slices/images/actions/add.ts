import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/server";
import { IImage, ImageActions } from "@/types";
import { getErrorMessage } from "@/utils/exceptions";

const addImageAction = createAsyncThunk(ImageActions.Add, async (image: IImage, thunkAPI) => {
  try {
    await server.images.AddImage(image);
  } catch (e) {
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export default addImageAction;
