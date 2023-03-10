import { BsBrush, BsEraser } from "react-icons/bs";
import { TfiSpray } from "react-icons/tfi";
import { TbCircle, TbLine, TbRectangle } from "react-icons/tb";
import { AirbrushTool, BrushTool, CircleTool, EraseTool, LineTool, PaintTool, RectTool } from "@/utils/paint/tools";
import { IconType } from "react-icons";

const Tools: { variant: PaintTool; icon: IconType }[] = [
  { variant: new BrushTool(), icon: BsBrush },
  { variant: new AirbrushTool(), icon: TfiSpray },
  { variant: new EraseTool(), icon: BsEraser },
  { variant: new LineTool(), icon: TbLine },
  { variant: new RectTool(), icon: TbRectangle },
  { variant: new CircleTool(), icon: TbCircle },
];

export default Tools;
