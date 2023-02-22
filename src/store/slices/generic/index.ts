import { createSlice, isAnyOf, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { IGenericState } from "@/store/slices/generic/GenericSlice.type";
import { Slices } from "@/types";

const initialState: IGenericState = {
  isLoading: false,
  error: null,
};

const genericSlice = createSlice({
  name: Slices.Generic,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(isFulfilled, isRejected), (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default genericSlice;
