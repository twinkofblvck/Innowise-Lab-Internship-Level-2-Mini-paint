import { IAuthParams } from "@/types";

export default function authValidate(credentials: IAuthParams) {
  const { email, password } = credentials;
  if (!email || !password) throw new Error("Some fields lack content");
}
