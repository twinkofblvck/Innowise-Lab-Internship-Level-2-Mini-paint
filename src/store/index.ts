import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import genericSlice from "./slices/generic";
import imagesSlice from "./slices/images";

export const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [imagesSlice.name]: imagesSlice.reducer,
  [genericSlice.name]: genericSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware)
  {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});