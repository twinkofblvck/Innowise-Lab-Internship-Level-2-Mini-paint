import { Box } from "@chakra-ui/react";
import { forwardRef, memo, MouseEvent } from "react";
import useTransform from "../../../hooks/canvas/useTransform";

interface ICanvasContainerProps
{
  transform: ReturnType<typeof useTransform>[0];
  onMouseMove: (e: MouseEvent) => void;
  onMouseDown: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
}

const CanvasContainer = memo(forwardRef<HTMLCanvasElement, ICanvasContainerProps>((props, ref) =>
{
  const { onMouseDown, onMouseMove, onMouseUp, transform } = props;

  return (
    <Box
      borderWidth={2}
      shadow="dark-lg"
      transform="auto"
      rotate={transform.rotate}
      scaleX={transform.scaleX}
      scaleY={transform.scaleY}
      translateX={transform.translateX + "px"}
      translateY={transform.translateY + "px"}
    >
      <canvas
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        width={800}
        height={600}
      />
    </Box>
  );
}));

export default CanvasContainer;