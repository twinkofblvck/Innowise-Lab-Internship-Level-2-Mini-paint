import { ILayer } from "@/utils/paint/control";

export default class History {
  private _layers: WeakMap<ILayer, { stack: Snapshot[]; head: number }> = new WeakMap();
  private _size: number;

  public constructor(size: number) {
    this._size = size;
  }

  public Push(layer: ILayer, snapshot: Snapshot): void {
    if (!this._layers.get(layer)) this._layers.set(layer, { head: -1, stack: [] });

    const mapLayer = this._layers.get(layer)!;

    mapLayer.stack.splice(++mapLayer.head, Infinity, snapshot);
    if (mapLayer.stack.length <= this._size) return;

    mapLayer.stack.splice(0, 1);
    mapLayer.head--;
  }

  public Forward(layer: ILayer) {
    const mapLayer = this._layers.get(layer);
    if (!mapLayer || mapLayer.head >= mapLayer.stack.length - 1) return;

    mapLayer.stack[++mapLayer.head].Restore();
  }

  public Backward(layer: ILayer) {
    const mapLayer = this._layers.get(layer);
    if (!mapLayer || mapLayer.head <= 0) return;

    mapLayer.stack[--mapLayer.head].Restore();
  }

  public IsEmpty(layer: ILayer): boolean {
    const mapLayer = this._layers.get(layer);
    return !mapLayer?.stack?.length;
  }
}

export class Snapshot {
  private _state: string;
  private _ctx: CanvasRenderingContext2D;

  public constructor(ctx: CanvasRenderingContext2D) {
    this._state = ctx.canvas.toDataURL();
    this._ctx = ctx;
  }

  public Restore(onResolve?: () => void) {
    const img = new Image();
    img.src = this._state;

    img.onload = () => {
      this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
      this._ctx.drawImage(img, 0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
      onResolve?.();
    };
  }
}
