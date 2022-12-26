import { Box, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { FC, KeyboardEvent, memo, useCallback } from "react";

interface IFormInputProps extends InputProps
{
  label: string;
  id: string;
}

const FormInput: FC<IFormInputProps> = memo(({ label, ...props }) =>
{

  const onKeyDown = useCallback((e: KeyboardEvent) => e.stopPropagation(), []);

  return (
    <Box borderWidth={1} w="max(50%, 300px)" p={2} mx="auto" my={4}>
      <FormLabel htmlFor={props.id}>{label}</FormLabel>
      <Input {...props} onKeyDown={onKeyDown} />
    </Box>
  );
});

export default FormInput;