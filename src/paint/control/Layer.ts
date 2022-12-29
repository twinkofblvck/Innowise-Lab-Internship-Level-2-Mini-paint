import { LayerEffects } from "../../types/paint";

export class Layer
{
  private static _serial = 1;
  private static _memoizedSize: [number, number] | null;

  public static ResetIdentity()
  {
    this._serial = 1;
  }

  public static Create(): ILayer;
  public static Create(width: number, height: number): ILayer;

  public static Create(width?: number, height?: number): ILayer
  {
    if(!width && !height && !this._memoizedSize) throw new Error("Dimensions required");

    if(width && height) this._memoizedSize = [width, height];

    const ctx = document.createElement("canvas").getContext("2d")!;
    ctx.canvas.width = width ?? this._memoizedSize![0];
    ctx.canvas.height = height ?? this._memoizedSize![1];

    return {
      id: Date.now(),
      name: "Layer" + this._serial++,
      effect: LayerEffects.default,
      isVisible: true,
      ctx,
    };
  }
}

export interface ILayer
{
  id: number;
  name: string;
  isVisible: boolean;
  ctx: CanvasRenderingContext2D;
  effect: LayerEffects;
}
