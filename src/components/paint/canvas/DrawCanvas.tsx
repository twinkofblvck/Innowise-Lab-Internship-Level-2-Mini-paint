import { Flex } from "@chakra-ui/react";
import { forwardRef, memo, MouseEvent, RefObject, useCallback, useEffect, useMemo, useState } from "react";
import PaintTool from "../../../paint/tools";
import History from "../../../paint/control/History";
import { ILayer } from "../../../paint/control/Layer";
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
  layer: ILayer | undefined;
  stack: RefObject<History>;
}

const DrawCanvas = memo(forwardRef<HTMLCanvasElement, IDrawCanvasProps>(({ tool, color, size, layer, stack }, ref) =>
{
  const [transform, actions] = useTransform();

  const [keyboard, setKeyboard] = useState<KeyboardAccess>();

  const onMouseMove = useCallback((e: MouseEvent) =>
    e.ctrlKey ? actions.translate(e) : tool?.OnMouseMove(e), [tool, actions.translate]);

  const onMouseDown = useCallback((e: MouseEvent) =>
  {
    if (!tool || !layer) return;
    tool.OnMouseDown(e, color, size);

    if (stack.current?.IsEmpty(layer)) stack.current.Push(layer, tool.BackupContext());
  }, [tool, color, size, layer, stack]);

  const onMouseUp = useCallback(async (e: MouseEvent) =>
  {
    if (!tool || !layer) return;
    await tool?.OnMouseUp(e);

    stack.current?.Push(layer, tool.BackupContext());
  }, [tool, layer, stack]);

  const undo = useCallback(() => layer && stack.current?.Backward(layer), [layer, stack]);
  const redo = useCallback(() => layer && stack.current?.Forward(layer), [layer, stack]);

  useEffect(() =>
  {
    setKeyboard(() =>
      new KeyboardAccess(window)
        .AddKeys(["z", undo], ["y", redo], ["h", actions.flipX], ["v", actions.flipY], ["=", actions.zoomIn],
          ["-", actions.zoomOut], ["9", actions.rotateLeft], ["0", actions.rotateRight])
        .Allow());

    return () =>
    {
      keyboard?.Block();
    };
  }, [undo, redo, actions]);

  const historyElement = useMemo(() =>
    <HistoryButtons keyboard={keyboard} redo={redo} undo={undo} />, [undo, redo, keyboard]);

  const transformElement = useMemo(() => (
    <TransformButtons keyboard={keyboard} actions={actions} xFlipped={transform.scaleX < 0} yFlipped={transform.scaleY < 0} />
  ), [actions, transform, keyboard]);

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