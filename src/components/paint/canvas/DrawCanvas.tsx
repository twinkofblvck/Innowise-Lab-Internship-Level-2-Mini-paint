import { Flex } from "@chakra-ui/react";
import { forwardRef, memo, MouseEvent, RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import PaintTool from "../../../paint/tools";
import History from "../../../paint/control/History";
import Layer from "../../../paint/control/Layer";
import KeyboardAccess from "../../../keyboard/KeyboardAccess";
import useTransform from "../../../hooks/canvas/useTransform";
import TransformButtons from "./TransformButtons";
import ActionBar from "./ActionBar";
import HistoryButtons from "./HistoryButtons";
import CanvasContainer from "./CanvasContainer";

interface IDrawCanvasProps
{
  tool: PaintTool | null;
  color: string;
  size: number;
  layer: Layer | undefined;
  stack: RefObject<History>;
}

const DrawCanvas = memo(forwardRef<HTMLCanvasElement, IDrawCanvasProps>(({ tool, color, size, layer, stack }, ref) =>
{
  const [transform, actions] = useTransform();

  const onMouseMove = useCallback((e: MouseEvent) =>
    e.ctrlKey ? actions.translate(e) : tool?.OnMouseMove(e), [tool, actions.translate]);

  const onMouseDown = useCallback((e: MouseEvent) =>
  {
    if (!tool || !layer) return;
    tool.OnMouseDown(e, color, size);

    if (stack.current?.IsEmpty(layer)) stack.current.Push(layer, tool.BackupContext());
  }, [tool, color, size, layer, stack]);

  const onMouseUp = useCallback((e: MouseEvent) =>
  {
    if (!tool || !layer) return;
    tool?.OnMouseUp(e);

    stack.current?.Push(layer, tool.BackupContext());
  }, [tool, layer, stack]);

  const undo = useCallback(() => layer && stack.current?.Backward(layer), [layer, stack]);
  const redo = useCallback(() => layer && stack.current?.Forward(layer), [layer, stack]);

  const keyboard = useRef(new KeyboardAccess(window));

  useEffect(() =>
  {
    keyboard.current.AddKeys(["z", undo], ["y", redo], ["h", actions.flipX], ["v", actions.flipY],
      ["=", actions.zoomIn], ["-", actions.zoomOut], ["9", actions.rotateLeft], ["0", actions.rotateRight]);

    keyboard.current.Allow();
    return () => 
    {
      keyboard.current.Block(); 
    };
  }, [undo, redo, actions]);

  const historyElement = useMemo(() => <HistoryButtons redo={redo} undo={undo} />, [undo, redo]);
  const transformElement = useMemo(() => (
    <TransformButtons actions={actions} xFlipped={transform.scaleX < 0} yFlipped={transform.scaleY < 0} />
  ), [actions, transform]);

  return (
    <Flex direction="column" align="center" justify="center" overflow="hidden" flex={1} h="full">
      <ActionBar history={historyElement} transform={transformElement} />
      <CanvasContainer
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        transform={transform}
        ref={ref}
      />
    </Flex>
  );
}));

export default DrawCanvas;