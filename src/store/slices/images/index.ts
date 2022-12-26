import { createSlice } from "@reduxjs/toolkit";
import { IListImage } from "../../../types/images";
import getImagesAction from "./actions/get";
import removeImageAction from "./actions/remove";

interface IImagesState
{
  images: IListImage[];
}

const initialState: IImagesState =
{
  images: [],
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: builder =>
  {
    builder
      .addCase(getImagesAction.fulfilled, (state, action) =>
      {
        state.images = action.payload;
      })
      .addCase(removeImageAction.fulfilled, (state, action) =>
      {
        state.images = state.images.filter(image => image.id !== action.payload);
      });
  }
});

export default imagesSlice;