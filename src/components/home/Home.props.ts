import { IListImage } from "@/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IFilterRadioProps {
  id: string;
  label: string;
  value: keyof IListImage;
}

export interface IImageFilterProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  criteria: keyof IListImage;
  setCriteria: Dispatch<SetStateAction<keyof IListImage>>;
}

export interface IImageItemProps {
  image: IListImage;
}

export interface IImageListProps {
  query: string;
  criteria: keyof IListImage;
}
