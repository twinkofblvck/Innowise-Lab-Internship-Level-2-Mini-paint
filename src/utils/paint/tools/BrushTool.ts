import { MouseEvent } from "react";
import PaintTool from "@/utils/paint/tools/PaintTool";

export default class BrushTool extends PaintTool {
  public override OnMouseDown(e: MouseEvent, color: string, size?: number): void {
    super.OnMouseDown(e, color, size);

    this._ctx.beginPath();
    this._ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  }

  public override Draw(e: MouseEvent): void {
    this._ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    this._ctx.stroke();
  }
}
