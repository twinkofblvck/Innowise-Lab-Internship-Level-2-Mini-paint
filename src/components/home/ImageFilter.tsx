import { Box, RadioGroup } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FC, memo, SetStateAction } from "react";
import { IListImage } from "../../types/images";
import FormInput from "../generic/FormInput";
import FilterRadio from "./FilterRadio";

interface IImageFilterProps
{
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  criteria: keyof IListImage;
  setCriteria: Dispatch<SetStateAction<keyof IListImage>>;
}

const ImageFilter: FC<IImageFilterProps> = memo(({ criteria, onChange, setCriteria, value }) =>
{
  return (
    <Box>
      <FormInput id="filter_input" label="Filter" value={value} onChange={onChange} />
      <RadioGroup
        display="flex"
        justifyContent="center"
        gap={5}
        value={criteria}
        onChange={setCriteria as Dispatch<SetStateAction<string>>}
      >
        <FilterRadio label="By author" id="author" value="author" />
        <FilterRadio label="By name" id="name" value="name" />
      </RadioGroup>
    </Box>
  );
});

export default ImageFilter;