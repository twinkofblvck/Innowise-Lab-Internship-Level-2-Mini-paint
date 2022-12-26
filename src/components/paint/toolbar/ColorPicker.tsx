import { Button, Flex } from "@chakra-ui/react";
import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { BsEyedropper } from "react-icons/bs";
import useEyeDropper from "use-eye-dropper";

interface IColorPickerProps
{
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

const ColorPicker: FC<IColorPickerProps> = memo(({ color, setColor }) =>
{
  const { open, isSupported } = useEyeDropper();

  const pickColor = useCallback(() =>
    open().then(colors => setColor(colors.sRGBHex)).catch(() => 
    {}), [setColor, open]);

  return (
    <Flex flex={1} direction="column" align="center">
      <HexAlphaColorPicker color={color} onChange={setColor} />
      {isSupported() && <Button mt={2} onClick={pickColor}><BsEyedropper /></Button>}
    </Flex>
  );
});

export default ColorPicker;