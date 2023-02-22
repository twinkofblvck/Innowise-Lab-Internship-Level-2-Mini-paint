import { Flex } from "@chakra-ui/react";
import { forwardRef, memo, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { KeyboardAccess } from "@/utils/keyboard";
import { useTransform } from "@/hooks/canvas";
import {
  TransformButtons,
  ActionBar,
  HistoryButtons,
  CanvasContainer,
  IDrawCanvasProps,
} from "@/components/paint/canvas";

const DrawCanvas = memo(
  forwardRef<HTMLCanvasElement, IDrawCanvasProps>(({ tool, color, size, layer, stack }, ref) => {
    const [transform, actions] = useTransform();

    const [keyboard, setKeyboard] = useState<KeyboardAccess>();

    const onMouseMove = useCallback(
      (e: MouseEvent) => (e.ctrlKey ? actions.translate(e) : tool?.OnMouseMove(e)),
      [tool, actions.translate]
    );

    const onMouseDown = useCallback(
      (e: MouseEvent) => {
        if (!tool || !layer) return;
        tool.OnMouseDown(e, color, size);

        if (stack.current?.IsEmpty(layer)) stack.current.Push(layer, tool.BackupContext());
      },
      [tool, color, size, layer, stack]
    );

    const onMouseUp = useCallback(
      async (e: MouseEvent) => {
        if (!tool || !layer) return;
        await tool?.OnMouseUp(e);

        stack.current?.Push(layer, tool.BackupContext());
      },
      [tool, layer, stack]
    );

    const undo = useCallback(() => layer && stack.current?.Backward(layer), [layer, stack]);
    const redo = useCallback(() => layer && stack.current?.Forward(layer), [layer, stack]);

    useEffect(() => {
      setKeyboard(() =>
        new KeyboardAccess(window)
          .AddKeys(
            ["z", undo],
            ["y", redo],
            ["h", actions.flipX],
            ["v", actions.flipY],
            ["=", actions.zoomIn],
            ["-", actions.zoomOut],
            ["9", actions.rotateLeft],
            ["0", actions.rotateRight]
          )
          .Allow()
      );

      return () => {
        keyboard?.Block();
      };
    }, [undo, redo, actions]);

    const historyElement = useMemo(
      () => <HistoryButtons keyboard={keyboard} redo={redo} undo={undo} />,
      [undo, redo, keyboard]
    );

    const transformElement = useMemo(
      () => (
        <TransformButtons
          keyboard={keyboard}
          actions={actions}
          xFlipped={transform.scaleX < 0}
          yFlipped={transform.scaleY < 0}
        />
      ),
      [actions, transform, keyboard]
    );

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
  })
);

export default DrawCanvas;
