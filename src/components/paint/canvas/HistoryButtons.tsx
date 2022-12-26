import { Button } from "@chakra-ui/react";
import { FC, memo } from "react";
import { IoArrowRedoOutline, IoArrowUndoOutline } from "react-icons/io5";

interface IHistoryButtonsProps
{
  undo: () => void;
  redo: () => void;
}

const HistoryButtons: FC<IHistoryButtonsProps> = memo(({ undo, redo }) =>
{
  return (
    <>
      <Button onClick={undo}><IoArrowUndoOutline /></Button>
      <Button onClick={redo}><IoArrowRedoOutline /></Button>
    </>
  );
});

export default HistoryButtons;
