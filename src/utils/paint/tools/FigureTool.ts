import { MouseEvent } from "react";
import PaintTool from "@/utils/paint/tools/PaintTool";

export default abstract class FigureTool extends PaintTool {
  protected _startX: number = 0;
  protected _startY: number = 0;

  public override OnMouseDown(e: MouseEvent, color: string, size?: number): void {
    super.OnMouseDown(e, color, size);
    this._ctx.fillStyle = color;

    this._startX = e.nativeEvent.offsetX;
    this._startY = e.nativeEvent.offsetY;
  }
}
