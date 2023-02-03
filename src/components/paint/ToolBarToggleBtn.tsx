import { Button } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { TbSettings, TbSettingsOff } from "react-icons/tb";
import { IToolBarToggleBtnProps } from "@/components/paint";

const ToolBarToggleBtn: FC<IToolBarToggleBtnProps> = memo(({ isToolBarHidden, setIsToolBarHidden }) => {
  const toggle = useCallback(() => setIsToolBarHidden((prev) => !prev), [setIsToolBarHidden]);

  return (
    <Button
      onClick={toggle}
      colorScheme="orange"
      zIndex={1}
      pos="absolute"
      right={isToolBarHidden ? "10px" : "263px"}
      top="58px"
    >
      {isToolBarHidden ? <TbSettings /> : <TbSettingsOff />}
    </Button>
  );
});

export default ToolBarToggleBtn;
