import { Flex, FlexProps, useMediaQuery } from "@chakra-ui/react";
import { FC, memo, useMemo } from "react";
import { IActionBarProps } from "@/components/paint/canvas";

const ActionBar: FC<IActionBarProps> = memo(({ transform, history }) => {
  const [shouldAdapt] = useMediaQuery("(max-width: 768px)");

  const adaptiveProps: FlexProps = useMemo(
    () => ({
      pos: "fixed",
      top: "228px",
      left: "10px",
      direction: "column",
    }),
    []
  );

  return (
    <Flex gap={2} mb={2} zIndex={1} {...(shouldAdapt && adaptiveProps)}>
      {history}
      {transform}
    </Flex>
  );
});

export default ActionBar;
