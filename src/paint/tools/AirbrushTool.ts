import { MouseEvent } from "react";
import BrushTool from "./BrushTool";

export default class AirbrushTool extends BrushTool
{
  public override Draw(e: MouseEvent): void
  {
    this._ctx.save();
    this._ctx.filter = `blur(${Math.max(this._ctx.lineWidth / 2, 1)}px)`;

    super.Draw(e);

    this._ctx.restore();
  }
}