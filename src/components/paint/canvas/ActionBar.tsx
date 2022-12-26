import { Flex, FlexProps, useMediaQuery } from "@chakra-ui/react";
import { FC, memo, ReactElement, useMemo } from "react";

interface IActionBarProps
{
  transform: ReactElement;
  history: ReactElement;
}

const ActionBar: FC<IActionBarProps> = memo(({ transform, history }) =>
{
  const [shouldAdapt] = useMediaQuery("(max-width: 768px)");

  const adaptiveProps: FlexProps = useMemo(() => (
    {
      pos: "fixed",
      top: "48px",
      left: "10px",
      direction: "column",
      justify: "center",
      h: "calc(100% - 48px)"
    }
  ), []);

  return (

    <Flex gap={2} mb={2} zIndex={1} {...(shouldAdapt && adaptiveProps)}>
      {history}
      {transform}
    </Flex>
  );
});

export default ActionBar;