import { MouseEvent } from "react";
import BrushTool from "@/utils/paint/tools/BrushTool";

export default class EraseTool extends BrushTool {
  public override Draw(e: MouseEvent): void {
    this._ctx.save();
    this._ctx.globalCompositeOperation = "destination-out";

    super.Draw(e);

    this._ctx.restore();
  }
}
