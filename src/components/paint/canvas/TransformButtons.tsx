import { FC, memo, useMemo } from "react";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import { AiOutlineRotateLeft, AiOutlineRotateRight } from "react-icons/ai";
import { CgEditFlipH, CgEditFlipV } from "react-icons/cg";
import useTransform from "../../../hooks/canvas/useTransform";
import KeyboardAccess from "../../../keyboard/KeyboardAccess";
import ActionBtn from "./ActionBtn";

interface ITransformButtonsProps
{
  keyboard: KeyboardAccess | undefined;
  actions: ReturnType<typeof useTransform>[1];
  xFlipped: boolean;
  yFlipped: boolean;
}

const TransformButtons: FC<ITransformButtonsProps> = memo(({ keyboard, actions, xFlipped, yFlipped }) =>
{
  const { flipX, flipY, rotateLeft, rotateRight, zoomIn, zoomOut } = useMemo(() => actions, [actions]);

  return (
    <>
      <ActionBtn
        outline={xFlipped ? "solid orange 2px" : "unset"}
        action={flipX}
        hotkey={keyboard?.CharFor(flipX)}
      >
        <CgEditFlipH />
      </ActionBtn>
      <ActionBtn
        outline={yFlipped ? "solid orange 2px" : "unset"}
        action={flipY}
        hotkey={keyboard?.CharFor(flipY)}
      >
        <CgEditFlipV />
      </ActionBtn>
      <ActionBtn action={rotateLeft} hotkey={keyboard?.CharFor(rotateLeft)}>
        <AiOutlineRotateLeft />
      </ActionBtn>
      <ActionBtn action={rotateRight} hotkey={keyboard?.CharFor(rotateRight)}>
        <AiOutlineRotateRight />
      </ActionBtn>
      <ActionBtn action={zoomIn} hotkey={keyboard?.CharFor(zoomIn)}>
        <BsZoomIn />
      </ActionBtn>
      <ActionBtn action={zoomOut} hotkey={keyboard?.CharFor(zoomOut)}>
        <BsZoomOut />
      </ActionBtn>
    </>
  );
});

export default TransformButtons;