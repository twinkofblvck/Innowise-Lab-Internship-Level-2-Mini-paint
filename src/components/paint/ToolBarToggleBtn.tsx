import { Button } from "@chakra-ui/react";
import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";
import { TbSettings, TbSettingsOff } from "react-icons/tb";

interface IToolBarToggleBtnProps
{
  setIsToolBarHidden: Dispatch<SetStateAction<boolean>>;
  isToolBarHidden: boolean;
}

const ToolBarToggleBtn: FC<IToolBarToggleBtnProps> = memo(({ isToolBarHidden, setIsToolBarHidden }) =>
{
  const toggle = useCallback(() => setIsToolBarHidden(prev => !prev), [setIsToolBarHidden]);

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