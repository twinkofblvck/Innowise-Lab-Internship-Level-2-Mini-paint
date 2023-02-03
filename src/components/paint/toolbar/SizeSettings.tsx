import { FC, memo } from "react";
import {
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { ISizeSettingsProps } from "@/components/paint/toolbar";

const SizeSettings: FC<ISizeSettingsProps> = memo(({ min, max, size, onChange }) => {
  return (
    <>
      <Heading size="md">Brush Size</Heading>
      <Flex direction="column" gap={2}>
        <NumberInput min={min} max={max} value={size} onChange={onChange}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider aria-label="slider-ex-1" min={min} max={max} value={size} onChange={onChange}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
    </>
  );
});

export default SizeSettings;
