import { LayerEffects } from "../../types/paint";

export default class Layer
{
  private static _serial = 1;

  private _id = Date.now();
  private _name = "Layer " + Layer._serial++;
  private _ctx: CanvasRenderingContext2D;
  private _isVisible = true;
  private _effect = LayerEffects.default;

  public constructor(width: number, height: number)
  {
    this._ctx = document.createElement("canvas").getContext("2d")!;
    this._ctx.canvas.width = width;
    this._ctx.canvas.height = height;
  }

  public get id(): number
  {
    return this._id;
  }

  public get name(): string
  {
    return this._name;
  }

  public set name(name: string)
  {
    this._name = name;
  }

  public get ctx(): CanvasRenderingContext2D
  {
    return this._ctx;
  }

  public get isVisible(): boolean
  {
    return this._isVisible;
  }

  public ToggleVisibility()
  {
    this._isVisible = !this._isVisible;
  }

  public get effect()
  {
    return this._effect;
  }

  public set effect(effect: LayerEffects)
  {
    this._effect = effect;
  }

  public static ResetIdentity()
  {
    this._serial = 1;
  }
}
