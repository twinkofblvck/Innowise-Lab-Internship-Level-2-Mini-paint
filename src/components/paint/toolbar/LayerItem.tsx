import { Button, Flex } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { ILayerItemProps } from "@/components/paint/toolbar";

const LayerItem: FC<ILayerItemProps> = ({ layer, isCurrent, setCurrentId, toggleVisibility }) => {
  const setCurrent = useCallback(() => setCurrentId(layer.id), [layer, setCurrentId]);

  return (
    <Flex
      outline={isCurrent ? "orange solid 2px" : "unset"}
      onClick={setCurrent}
      borderWidth={1}
      justify="space-between"
      align="center"
      cursor="pointer"
      p={2}
    >
      {layer.name}
      <Button size="xs" onClick={toggleVisibility}>
        {layer.isVisible ? <RxEyeOpen /> : <RxEyeClosed />}
      </Button>
    </Flex>
  );
};

export default LayerItem;
