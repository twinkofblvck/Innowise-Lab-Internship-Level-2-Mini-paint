import { Button, ButtonProps, Tooltip } from "@chakra-ui/react";
import { FC, memo } from "react";

interface IActionBtnProps extends ButtonProps
{
  action: () => void;
  hotkey: string | undefined;
}

const ActionBtn: FC<IActionBtnProps> = memo(({ action, hotkey, children, ...props }) =>
{
  return (
    <Tooltip placement="top" label={hotkey}>
      <Button {...props} onClick={action}>{children}</Button>
    </Tooltip>
  );
});

export default ActionBtn;