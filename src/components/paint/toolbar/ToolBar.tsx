import { Flex } from "@chakra-ui/react";
import { FC, memo, ReactElement } from "react";

interface IToolBarProps
{
  isHidden: boolean;
  import_: ReactElement;
  export_: ReactElement;
  color: ReactElement;
  size: ReactElement;
  tools: ReactElement;
  layers: ReactElement;
}

const ToolBar: FC<IToolBarProps> = memo(({ isHidden, import_, export_, color, layers, size, tools }) =>
{
  return (
    <Flex
      pos="relative"
      direction="column"
      gap={10}
      px={5}
      py={10}
      shadow="dark-lg"
      h="full"
      overflowY="auto"
      zIndex={1}
      {...(isHidden && {display: "none"})}
    >
      {import_}
      {export_}
      {color}
      {size}
      {tools}
      {layers}
    </Flex>
  );
});

export default ToolBar;