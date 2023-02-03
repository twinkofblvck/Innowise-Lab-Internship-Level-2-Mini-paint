import { Dispatch, SetStateAction } from "react";

export interface IToolBarToggleBtnProps {
  setIsToolBarHidden: Dispatch<SetStateAction<boolean>>;
  isToolBarHidden: boolean;
}
