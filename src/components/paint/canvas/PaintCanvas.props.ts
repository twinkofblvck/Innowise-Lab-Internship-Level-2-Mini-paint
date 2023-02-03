import { useTransform } from "@/hooks/canvas";
import { KeyboardAccess } from "@/utils/keyboard";
import { History, ILayer } from "@/utils/paint/control";
import { PaintTool } from "@/utils/paint/tools";
import { ButtonProps } from "@chakra-ui/button";
import { MouseEvent, ReactElement, RefObject } from "react";

export interface IActionBarProps {
  transform: ReactElement;
  history: ReactElement;
}

export interface IActionBtnProps extends ButtonProps {
  action: () => void;
  hotkey: string | undefined;
}

export interface ICanvasContainerProps {
  transform: ReturnType<typeof useTransform>[0];
  onMouseMove: (e: MouseEvent) => void;
  onMouseDown: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
}

export interface IDrawCanvasProps {
  tool: PaintTool | null;
  color: string;
  size: number;
  layer: ILayer | undefined;
  stack: RefObject<History>;
}

export interface IHistoryButtonsProps {
  keyboard: KeyboardAccess | undefined;
  undo: () => void;
  redo: () => void;
}

export interface ITransformButtonsProps {
  keyboard: KeyboardAccess | undefined;
  actions: ReturnType<typeof useTransform>[1];
  xFlipped: boolean;
  yFlipped: boolean;
}
