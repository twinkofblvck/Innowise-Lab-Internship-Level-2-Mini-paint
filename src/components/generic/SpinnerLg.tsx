import { Spinner } from "@chakra-ui/react";

const SpinnerLg = () =>
{
  return (
    <Spinner w="200px" h="200px" pos="fixed" top="calc(50vh - 100px)" left="calc(50vw - 100px)" />
  );
};

export default SpinnerLg;