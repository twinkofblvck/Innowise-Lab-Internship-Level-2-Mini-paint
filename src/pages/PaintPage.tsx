import { Flex } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PaintTool } from "@/utils/paint/tools";
import {
  SizeSettings,
  ColorPicker,
  ExportDialog,
  ImportInput,
  LayersList,
  ToolBar,
  ToolsList,
} from "@/components/paint/toolbar";
import { ToolBarToggleBtn } from "@/components/paint";
import { DrawCanvas } from "@/components/paint/canvas";
import { usePaint } from "@/hooks/canvas";
import { Tools } from "@/utils/paint/tools";
import { History, Layer } from "@/utils/paint/control";

const PaintPage = memo(() => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const stack = useRef(new History(20));

  const [layers, setLayers] = useState(() => {
    Layer.ResetIdentity();
    return [Layer.Create(800, 600)];
  });
  const [currLayerId, setCurrLayerId] = useState<number>();
  const [tool, setTool] = useState<PaintTool>(Tools[0].variant);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState(1);
  const [isToolBarHidden, setIsToolBarHidden] = useState(false);

  const onSizeChange = useCallback((value: number | string) => setSize(+value), []);
  const onToolChange = useCallback((tool: PaintTool) => setTool(tool), []);

  const currLayer = useMemo(() => layers.find((layer) => layer.id === currLayerId), [layers, currLayerId]);
  const visibleLayers = useMemo(() => layers.filter((layer) => layer.isVisible), [layers]);

  useEffect(() => {
    if (!currLayer) return;
    tool?.SetCtx(currLayer?.ctx);
  }, [tool, currLayer]);

  useEffect(() => {
    !currLayer && setCurrLayerId(layers[layers.length - 1].id);
  }, [currLayer]);

  usePaint(canvas, visibleLayers);

  return (
    <Flex align="center" h="calc(100vh - 48px)" w="full" overflow="hidden">
      <DrawCanvas tool={tool} color={color} size={size} ref={canvas} layer={currLayer} stack={stack} />
      <ToolBar
        isHidden={isToolBarHidden}
        import_={<ImportInput targetLayer={currLayer} stack={stack} />}
        export_={<ExportDialog canvasRef={canvas} />}
        color={<ColorPicker color={color} setColor={setColor} />}
        size={<SizeSettings min={1} max={500} size={size} onChange={onSizeChange} />}
        tools={<ToolsList currTool={tool} tools={Tools} onToolChange={onToolChange} />}
        layers={
          <LayersList currLayer={currLayer} layers={layers} setCurrLayerId={setCurrLayerId} setLayers={setLayers} />
        }
      />
      <ToolBarToggleBtn isToolBarHidden={isToolBarHidden} setIsToolBarHidden={setIsToolBarHidden} />
    </Flex>
  );
});

export default PaintPage;
