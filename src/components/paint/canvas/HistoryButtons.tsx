import { FC, memo } from "react";
import { IoArrowRedoOutline, IoArrowUndoOutline } from "react-icons/io5";
import KeyboardAccess from "../../../keyboard/KeyboardAccess";
import ActionBtn from "./ActionBtn";

interface IHistoryButtonsProps
{
  keyboard: KeyboardAccess | undefined;
  undo: () => void;
  redo: () => void;
}

const HistoryButtons: FC<IHistoryButtonsProps> = memo(({ undo, redo, keyboard }) =>
{
  return (
    <>
      <ActionBtn action={undo} hotkey={keyboard?.CharFor(undo)}>
        <IoArrowUndoOutline />
      </ActionBtn>
      <ActionBtn action={redo} hotkey={keyboard?.CharFor(redo)}>
        <IoArrowRedoOutline />
      </ActionBtn>
    </>
  );
});

export default HistoryButtons;
