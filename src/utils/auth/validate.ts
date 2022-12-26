import { IAuthParams } from "../../types/auth";

export default function validate(credentials: IAuthParams)
{
  const { email, password } = credentials;
  if(!email || !password) throw new Error("Some fields lack content");
}