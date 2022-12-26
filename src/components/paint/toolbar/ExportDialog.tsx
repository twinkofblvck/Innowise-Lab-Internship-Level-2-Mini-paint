import { Button, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, RefObject, useCallback, useState } from "react";
import useTypeDispatch from "../../../hooks/redux/useTypeDispatch";
import useTypeSelector from "../../../hooks/redux/useTypeSelector";
import authSelector from "../../../store/selectors/auth";
import addImageAction from "../../../store/slices/images/actions/add";
import FormInput from "../../generic/FormInput";
import ModalWindow from "../../generic/ModalWindow";

interface IExportDialogProps
{
  canvasRef: RefObject<HTMLCanvasElement>;
}

const ExportDialog: FC<IExportDialogProps> = memo(({ canvasRef }) =>
{
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = useTypeSelector(authSelector);

  const d = useTypeDispatch();

  const [name, setName] = useState("");

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);

  const exportImage = useCallback(() =>
  {
    const cleanName = name.trim();
    if (!cleanName) return;

    const a = document.createElement("a");
    a.href = canvasRef.current!.toDataURL();
    a.download = cleanName;

    a.click();
    onClose();
    setName("");
  }, [canvasRef, name, onClose]);

  const publish = useCallback(async () =>
  {
    if (!userData) return;
    const cleanName = name.trim();
    if (!cleanName) return;

    await d(addImageAction({ url: canvasRef.current!.toDataURL(), author: userData.email!, name }));
    onClose();
    setName("");
  }, [canvasRef, d, name, userData, onClose]);

  return (
    <>
      <Button minH="40px" onClick={onOpen}>Export As</Button>
      <ModalWindow
        isOpen={isOpen}
        onClose={onClose}
        header="Image Export"
        body={<FormInput id="img_name" label="Name" value={name} onChange={onNameChange} />}
        footer={
          <>
            <Button variant='ghost' mr={3} onClick={onClose}>Cancel</Button>
            <Button mr={3} onClick={exportImage}>Export</Button>
            <Button onClick={publish}>Publish</Button>
          </>}
      />
    </>
  );
});

export default ExportDialog;