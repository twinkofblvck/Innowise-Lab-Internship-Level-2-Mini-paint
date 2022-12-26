import { MouseEvent } from "react";
import FigureTool from "./FigureTool";

export default class CircleTool extends FigureTool
{
  public override Draw(e: MouseEvent): void
  {
    const dx = e.nativeEvent.offsetX - this._startX;
    const dy = e.nativeEvent.offsetY - this._startY;
    const r = Math.sqrt(dx ** 2 + dy ** 2) * 0.5;

    this._ctx.beginPath();
    this._ctx.arc(this._startX + 0.5 * dx, this._startY + 0.5 * dy, r, 0, 2 * Math.PI);
    this._ctx.fill();
  }
}