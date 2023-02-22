import { Box } from "@chakra-ui/react";
import { forwardRef, memo } from "react";
import { ICanvasContainerProps } from "@/components/paint/canvas";

const CanvasContainer = memo(
  forwardRef<HTMLCanvasElement, ICanvasContainerProps>((props, ref) => {
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
  })
);

export default CanvasContainer;
