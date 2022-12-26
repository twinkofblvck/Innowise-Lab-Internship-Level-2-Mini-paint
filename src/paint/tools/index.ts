import { MouseEvent } from "react";
import { Snapshot } from "../control/History";

export default abstract class PaintTool
{
  protected _isActive = false;
  protected _ctx: CanvasRenderingContext2D;

  private _state: Snapshot | null = null;


  public constructor(ctx?: CanvasRenderingContext2D)
  {
    this._ctx = ctx ?? document.createElement("canvas").getContext("2d")!;
  }

  public SetCtx(ctx?: CanvasRenderingContext2D)
  {
    if (!ctx) return;

    this._ctx = ctx;
    this._ctx.lineCap = "round";
    this._ctx.lineJoin = "round";
  }

  public OnMouseDown(e: MouseEvent, color: string, size?: number): void
  {
    this._isActive = true;

    this._ctx.lineWidth = size ?? 1;
    this._ctx.strokeStyle = color;

    this._state = this.BackupContext();
  }

  public OnMouseUp(e: MouseEvent): void
  {
    this._isActive = false;
  }

  public OnMouseMove(e: MouseEvent): void
  {
    if (!this._isActive) return;

    this._state?.Restore(() => this.Draw(e));
  }

  public BackupContext(): Snapshot
  {
    return new Snapshot(this._ctx);
  }

  public abstract Draw(e: MouseEvent): void;


  public toString(): string
  {
    return this.constructor.name;
  }
}