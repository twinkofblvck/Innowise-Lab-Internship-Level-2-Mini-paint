import { Button, Tooltip } from "@chakra-ui/react";
import { FC, memo } from "react";
import { IActionBtnProps } from "@/components/paint/canvas";

const ActionBtn: FC<IActionBtnProps> = memo(({ action, hotkey, children, ...props }) => {
  return (
    <Tooltip placement="top" label={hotkey}>
      <Button {...props} onClick={action}>
        {children}
      </Button>
    </Tooltip>
  );
});

export default ActionBtn;
