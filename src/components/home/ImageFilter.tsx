import { Box, RadioGroup } from "@chakra-ui/react";
import { Dispatch, FC, memo, SetStateAction } from "react";
import { FormInput } from "@/components/generic";
import { FilterRadio, IImageFilterProps } from "@/components/home";

const ImageFilter: FC<IImageFilterProps> = memo(({ criteria, onChange, setCriteria, value }) => {
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
