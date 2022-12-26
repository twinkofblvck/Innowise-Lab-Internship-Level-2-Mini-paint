import { Spinner } from "@chakra-ui/react";
import { memo } from "react";

const SpinnerLg = memo(() =>
{
  return (
    <Spinner w="200px" h="200px" pos="fixed" top="calc(50vh - 100px)" left="calc(50vw - 100px)" />
  );
});

export default SpinnerLg;