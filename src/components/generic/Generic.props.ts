import { InputProps } from "@chakra-ui/input";
import { ReactNode } from "react";

export interface IFormInputProps extends InputProps {
  label: string;
  id: string;
}

export interface IModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

export interface INavLinkProps {
  to: string;
  children: ReactNode;
}
