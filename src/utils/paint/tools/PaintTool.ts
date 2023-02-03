import { MouseEvent } from "react";
import { Snapshot } from "@/utils/paint/control";

export default abstract class PaintTool {
  protected _isActive = false;
  protected _ctx: CanvasRenderingContext2D;

  private _state: Snapshot | null = null;
  private _pending: Promise<void> | null = null;

  public constructor(ctx?: CanvasRenderingContext2D) {
    this._ctx = ctx ?? document.createElement("canvas").getContext("2d")!;
  }

  public SetCtx(ctx?: CanvasRenderingContext2D): void {
    if (!ctx) return;

    this._ctx = ctx;
    this._ctx.lineCap = "round";
    this._ctx.lineJoin = "round";
  }

  public OnMouseDown(e: MouseEvent, color: string, size?: number): void {
    this._isActive = true;

    this._ctx.lineWidth = size ?? 1;
    this._ctx.strokeStyle = color;

    this._state = this.BackupContext();
  }

  public async OnMouseUp(e: MouseEvent): Promise<void> {
    this._isActive = false;
    await this._pending;
  }

  public OnMouseMove(e: MouseEvent): void {
    if (!this._isActive) return;

    const pending = new Promise<void>((resolve) => this._state?.Restore(() => resolve(this.Draw(e))));

    this._pending = pending;
  }

  public BackupContext(): Snapshot {
    return new Snapshot(this._ctx);
  }

  public abstract Draw(e: MouseEvent): void;

  public toString(): string {
    return this.constructor.name;
  }
}
