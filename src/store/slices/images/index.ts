import { createSlice } from "@reduxjs/toolkit";
import { getImagesAction, removeImageAction } from "@/store/slices/images/actions";
import { IImagesState } from "@/store/slices/images/ImagesSlice.type";
import { Slices } from "@/types";

const initialState: IImagesState = {
  images: [],
};

const imagesSlice = createSlice({
  name: Slices.Images,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getImagesAction.fulfilled, (state, action) => {
        state.images = action.payload;
      })
      .addCase(removeImageAction.fulfilled, (state, action) => {
        state.images = state.images.filter((image) => image.id !== action.payload);
      });
  },
});

export default imagesSlice;
