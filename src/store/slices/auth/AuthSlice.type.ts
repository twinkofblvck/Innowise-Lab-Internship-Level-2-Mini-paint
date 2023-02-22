import { User } from "@firebase/auth";

export interface IAuthState {
  userData: User | null | undefined;
  isLoading: boolean;
}
