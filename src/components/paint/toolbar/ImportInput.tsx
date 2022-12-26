import { FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, RefObject, useCallback } from "react";
import History, { Snapshot } from "../../../paint/control/History";
import Layer from "../../../paint/control/Layer";

interface IImportInputProps
{
  targetLayer: Layer | undefined;
  stack: RefObject<History>;
}

const ImportInput: FC<IImportInputProps> = memo(({ targetLayer, stack }) =>
{
  const importImage = useCallback((e: ChangeEvent<HTMLInputElement>) =>
  {
    if (!e.target.files?.length || !targetLayer) return;

    const url = URL.createObjectURL(e.target.files[0]);
    const img = new Image();

    img.src = url;
    img.onload = () =>
    {
      targetLayer.ctx.clearRect(0, 0, targetLayer.ctx.canvas.width, targetLayer.ctx.canvas.height);
      targetLayer.ctx.drawImage(img, 0, 0);

      stack.current?.Push(targetLayer, new Snapshot(targetLayer.ctx));
    };
  }, [targetLayer, stack]);

  return (
    <>
      <FormLabel
        cursor="pointer"
        _hover={{ bg: "ButtonHighlight" }}
        m={0}
        p={2}
        borderWidth={1}
        textAlign="center"
        htmlFor="import"
      >
        Import
      </FormLabel>
      <Input
        display="none"
        id="import"
        type="file"
        minH="50px"
        w="200px"
        onChange={importImage}
        accept="image/*"
      />
    </>
  );
});

export default ImportInput;