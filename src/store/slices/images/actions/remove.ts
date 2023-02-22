import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "firebase/auth";
import { server } from "@/server";
import { ImageActions } from "@/types";
import { getErrorMessage } from "@/utils/exceptions";

interface IRemovalParams {
  id: string;
  auth: Auth;
}

const removeImageAction = createAsyncThunk(ImageActions.Remove, async (params: IRemovalParams, thunkAPI) => {
  try {
    return await server.images.RmImage(params.id, params.auth);
  } catch (e) {
    return thunkAPI.rejectWithValue(getErrorMessage(e));
  }
});

export default removeImageAction;
