import { rootReducer, store } from "@/store";

export type RootState = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;

export enum Slices {
  Auth = "auth",
  Generic = "generic",
  Images = "images",
}

export enum AuthActions {
  Login = "auth/login",
  SignUp = "auth/signup",
  Logout = "auth/logout",
}

export enum ImageActions {
  Get = "images/get",
  Add = "images/add",
  Remove = "images/rm",
}
