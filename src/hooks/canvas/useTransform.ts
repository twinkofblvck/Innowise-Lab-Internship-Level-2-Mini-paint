import { MouseEvent, useCallback, useMemo, useState } from "react";

export default function useTransform()
{
  const [transform, setTransform] = useState({ rotate: 0, scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 });

  const translate = useCallback((e: MouseEvent) => setTransform(prev => ({
    ...prev, translateX: prev.translateX + Math.floor(e.movementX),
    translateY: prev.translateY + Math.floor(e.movementY)
  })), []);

  const flipX = useCallback(() => setTransform(prev =>
    ({ ...prev, scaleX: -prev.scaleX })), []);

  const flipY = useCallback(() => setTransform(prev =>
    ({ ...prev, scaleY: -prev.scaleY })), []);

  const rotateLeft = useCallback(() => setTransform(prev =>
    ({ ...prev, rotate: prev.rotate - 90 })), []);

  const rotateRight = useCallback(() => setTransform(prev =>
    ({ ...prev, rotate: prev.rotate + 90 })), []);

  const zoomIn = useCallback(() => setTransform(prev =>
    ({ ...prev, scaleX: prev.scaleX * 2, scaleY: prev.scaleY * 2 })), []);

  const zoomOut = useCallback(() => setTransform(prev =>
    ({ ...prev, scaleX: prev.scaleX / 2, scaleY: prev.scaleY / 2 })), []);

  const actions = useMemo(() => (
    { translate, flipX, flipY, rotateLeft, rotateRight, zoomIn, zoomOut }
  ), [translate, flipX, flipY, rotateLeft, rotateRight, zoomIn, zoomOut]);

  return [transform, actions] as [typeof transform, typeof actions];
}