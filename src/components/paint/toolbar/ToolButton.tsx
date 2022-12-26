import { Button } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { IconType } from "react-icons/lib";
import PaintTool from "../../../paint/tools";

interface IToolButtonProps
{
  tool: PaintTool;
  onClick: (tool: PaintTool) => void;
  Icon: IconType;
  isCurrent: boolean;
}

const ToolButton: FC<IToolButtonProps> = memo(({ tool, onClick, Icon, isCurrent }) =>
{
  const setTool = useCallback(() => onClick(tool), [tool, onClick]);

  return (
    <Button outline={isCurrent ? "orange solid 2px" : "unset"} onClick={setTool}>
      <Icon />
    </Button>
  );
});

export default ToolButton;