import { LayerEffects } from "@/types";
import { History, ILayer } from "@/utils/paint/control";
import { PaintTool } from "@/utils/paint/tools";
import { ChangeEvent, Dispatch, MouseEvent, ReactElement, RefObject, SetStateAction } from "react";
import { IconType } from "react-icons";

export interface IColorPickerProps {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

export interface IExportDialogProps {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export interface IImportInputProps {
  targetLayer: ILayer | undefined;
  stack: RefObject<History>;
}

export interface ILayerActionsProps {
  add: () => void;
  remove: () => void;
  move: (direction: (arr: ILayer[], i: number) => ILayer[]) => void;
  rename: (name: string) => void;
  removalBlocked: boolean;
}

export interface ILayerEffectsSelectProps {
  value: LayerEffects | undefined;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export interface ILayerItemProps {
  layer: ILayer;
  isCurrent: boolean;
  setCurrentId: Dispatch<SetStateAction<number | undefined>>;
  toggleVisibility: (e: MouseEvent) => void;
}

export interface ILayersListProps {
  layers: ILayer[];
  currLayer: ILayer | undefined;
  setLayers: Dispatch<SetStateAction<ILayer[]>>;
  setCurrLayerId: Dispatch<SetStateAction<number | undefined>>;
}

export interface ISizeSettingsProps {
  min: number;
  max: number;
  size: number;
  onChange: (value: number | string) => void;
}

export interface IToolBarProps {
  isHidden: boolean;
  import_: ReactElement;
  export_: ReactElement;
  color: ReactElement;
  size: ReactElement;
  tools: ReactElement;
  layers: ReactElement;
}

export interface IToolButtonProps {
  tool: PaintTool;
  onClick: (tool: PaintTool) => void;
  Icon: IconType;
  isCurrent: boolean;
}

export interface IToolsListProps {
  tools: { variant: PaintTool; icon: IconType }[];
  onToolChange: (tool: PaintTool) => void;
  currTool: PaintTool | null;
}
