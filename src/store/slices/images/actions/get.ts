import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/server";
import { ImageActions } from "@/types";
import { getErrorMessage } from "@/utils/exceptions";

const getImagesAction = createAsyncThunk(ImageActions.Get, async (_, thunkAPI) => {
  try {
    return await server.images.GetImages();
  } catch (e) {
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export default getImagesAction;
