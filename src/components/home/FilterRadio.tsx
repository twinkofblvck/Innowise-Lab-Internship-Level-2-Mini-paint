import { Flex, FormLabel, Radio } from "@chakra-ui/react";
import { FC, memo } from "react";
import { IListImage } from "../../types/images";

interface IFilterRadioProps
{
  id: string;
  label: string;
  value: keyof IListImage;
}

const FilterRadio: FC<IFilterRadioProps> = memo(({ id, label, value }) =>
{
  return (
    <Flex>
      <FormLabel display="block" mt={1} htmlFor={id}>{label}</FormLabel>
      <Radio id={id} value={value} />
    </Flex>
  );
});

export default FilterRadio;