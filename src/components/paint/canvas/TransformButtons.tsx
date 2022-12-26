import { Button } from "@chakra-ui/react";
import { FC, memo, useMemo } from "react";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import { AiOutlineRotateLeft, AiOutlineRotateRight } from "react-icons/ai";
import { CgEditFlipH, CgEditFlipV } from "react-icons/cg";
import useTransform from "../../../hooks/canvas/useTransform";

interface ITransformButtonsProps
{
  actions: ReturnType<typeof useTransform>[1];
  xFlipped: boolean;
  yFlipped: boolean;
}

const TransformButtons: FC<ITransformButtonsProps> = memo(({ actions, xFlipped, yFlipped }) =>
{
  const { flipX, flipY, rotateLeft, rotateRight, zoomIn, zoomOut } = useMemo(() => actions, [actions]);

  return (
    <>
      <Button outline={xFlipped ? "solid orange 2px" : "unset"} onClick={flipX}>
        <CgEditFlipH />
      </Button>
      <Button outline={yFlipped ? "solid orange 2px" : "unset"} onClick={flipY}>
        <CgEditFlipV />
      </Button>
      <Button onClick={rotateLeft}>
        <AiOutlineRotateLeft />
      </Button>
      <Button onClick={rotateRight}>
        <AiOutlineRotateRight />
      </Button>
      <Button onClick={zoomIn}>
        <BsZoomIn />
      </Button>
      <Button onClick={zoomOut}>
        <BsZoomOut />
      </Button>
    </>
  );
});

export default TransformButtons;