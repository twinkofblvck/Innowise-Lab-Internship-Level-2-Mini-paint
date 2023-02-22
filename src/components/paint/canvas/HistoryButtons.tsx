import { FC, memo } from "react";
import { IoArrowRedoOutline, IoArrowUndoOutline } from "react-icons/io5";
import { ActionBtn, IHistoryButtonsProps } from "@/components/paint/canvas";

const HistoryButtons: FC<IHistoryButtonsProps> = memo(({ undo, redo, keyboard }) => {
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
