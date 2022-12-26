import { Heading, SimpleGrid } from "@chakra-ui/react";
import { FC, memo } from "react";
import { IconType } from "react-icons";
import PaintTool from "../../../paint/tools";
import ToolButton from "./ToolButton";

interface IToolsListProps
{
  tools: { variant: PaintTool, icon: IconType; }[];
  onToolChange: (tool: PaintTool) => void;
  currTool: PaintTool | null;
}

const ToolsList: FC<IToolsListProps> = memo(({ tools, onToolChange, currTool }) =>
{
  return (
    <>
      <Heading size="md">Tools</Heading>
      <SimpleGrid minChildWidth="100px" gap={2}>
        {tools.map(entry =>
          <ToolButton
            isCurrent={currTool === entry.variant}
            key={"" + entry.variant}
            tool={entry.variant}
            onClick={onToolChange}
            Icon={entry.icon}
          />)}
      </SimpleGrid>
    </>
  );
});

export default ToolsList;