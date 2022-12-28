import { Flex } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import PaintTool from "../paint/tools";
import SizeSlider from "../components/paint/toolbar/SizeSettings";
import ToolsList from "../components/paint/toolbar/ToolsList";
import ColorPicker from "../components/paint/toolbar/ColorPicker";
import DrawCanvas from "../components/paint/canvas/DrawCanvas";
import usePaint from "../hooks/canvas/usePaint";
import LayersList from "../components/paint/toolbar/LayersList";
import Tools from "../paint/tools/variants";
import ImportInput from "../components/paint/toolbar/ImportInput";
import ExportDialog from "../components/paint/toolbar/ExportDialog";
import History from "../paint/control/History";
import ToolBar from "../components/paint/toolbar/ToolBar";
import Layer from "../paint/control/Layer";
import ToolBarToggleBtn from "../components/paint/ToolBarToggleBtn";

const PaintPage = memo(() =>
{
  const canvas = useRef<HTMLCanvasElement>(null);
  const stack = useRef(new History(20));

  const [layers, setLayers] = useState(() =>
  {
    Layer.ResetIdentity();
    return [new Layer(800, 600)];
  });
  const [currLayerId, setCurrLayerId] = useState<number>();
  const [tool, setTool] = useState<PaintTool>(Tools[0].variant);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState(1);
  const [isToolBarHidden, setIsToolBarHidden] = useState(false);

  const onSizeChange = useCallback((value: number | string) => setSize(+value), []);
  const onToolChange = useCallback((tool: PaintTool) => setTool(tool), []);

  const currLayer = useMemo(() => layers.find(layer => layer.id === currLayerId), [layers, currLayerId]);
  const visibleLayers = useMemo(() => layers.filter(layer => layer.isVisible), [layers]);

  useEffect(() =>
  {
    if (!currLayer) return;
    tool?.SetCtx(currLayer?.ctx);
  }, [tool, currLayer]);

  useEffect(() =>
  {
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
        size={<SizeSlider min={1} max={500} size={size} onChange={onSizeChange} />}
        tools={<ToolsList currTool={tool} tools={Tools} onToolChange={onToolChange} />}
        layers={<LayersList currLayer={currLayer} layers={layers} setCurrLayerId={setCurrLayerId} setLayers={setLayers} />}
      />
      <ToolBarToggleBtn isToolBarHidden={isToolBarHidden} setIsToolBarHidden={setIsToolBarHidden} />
    </Flex>
  );
});

export default PaintPage;