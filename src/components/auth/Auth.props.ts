import { ReactNode } from "react";

export interface IAuthFormProps {
  title: string;
  action: (email: string, pass: string) => void;
  children?: ReactNode;
}
