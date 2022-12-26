import { createSlice, isAnyOf, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";

export interface IGenericState
{
  isLoading: boolean;
  error: string | null;
}

const initialState: IGenericState =
{
  isLoading: false,
  error: null
};

const genericSlice = createSlice({
  name: "generic",
  initialState,
  reducers: {},
  extraReducers: builder =>
  {
    builder
      .addMatcher(isPending, state =>
      {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(isFulfilled, isRejected), state =>
      {
        state.isLoading = false;
      })
      .addMatcher(isRejected, (state, action) =>
      {
        state.error = action.payload as string;
      });
  }
});

export default genericSlice;