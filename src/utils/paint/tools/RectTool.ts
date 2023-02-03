import { MouseEvent } from "react";
import FigureTool from "@/utils/paint/tools/FigureTool";

export default class RectTool extends FigureTool {
  public override Draw(e: MouseEvent): void {
    this._ctx.fillRect(
      this._startX,
      this._startY,
      e.nativeEvent.offsetX - this._startX,
      e.nativeEvent.offsetY - this._startY
    );
  }
}
