import { Button } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { IToolButtonProps } from "@/components/paint/toolbar";

const ToolButton: FC<IToolButtonProps> = memo(({ tool, onClick, Icon, isCurrent }) => {
  const setTool = useCallback(() => onClick(tool), [tool, onClick]);

  return (
    <Button outline={isCurrent ? "orange solid 2px" : "unset"} onClick={setTool}>
      <Icon />
    </Button>
  );
});

export default ToolButton;
