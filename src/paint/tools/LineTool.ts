import { MouseEvent } from "react";
import FigureTool from "./FigureTool";

export default class LineTool extends FigureTool
{
  public override Draw(e: MouseEvent): void
  {
    this._ctx.beginPath();

    this._ctx.moveTo(this._startX, this._startY);
    this._ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    this._ctx.stroke();
  }
}