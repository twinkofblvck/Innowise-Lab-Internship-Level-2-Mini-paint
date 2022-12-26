import { RefObject, useEffect, useRef } from "react";
import Layer from "../../paint/control/Layer";

export default function usePaint(mainCanvas: RefObject<HTMLCanvasElement>, layers: Layer[])
{
  const raf = useRef<number | null>(null);

  useEffect(() =>
  {
    if (raf.current) cancelAnimationFrame(raf.current);

    const ctx = mainCanvas.current?.getContext("2d")!;

    const loop = () =>
    {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for(let i = 0; i < layers.length; i++)
      {
        ctx.globalCompositeOperation = layers[i].effect;
        ctx.drawImage(layers[i].ctx.canvas, 0, 0);
      }

      raf.current = requestAnimationFrame(loop);
    };

    loop();

    return function ()
    {
      raf.current && cancelAnimationFrame(raf.current);
    };
  }, [layers, mainCanvas]);
}