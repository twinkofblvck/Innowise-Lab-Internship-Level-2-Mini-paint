import { Button, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useCallback, useState } from "react";
import { useTypeDispatch, useTypeSelector } from "@/hooks/redux";
import { authSelector } from "@/store/selectors";
import { addImageAction } from "@/store/slices/images/actions";
import { FormInput, ModalWindow } from "@/components/generic";
import { IExportDialogProps } from "@/components/paint/toolbar";

const ExportDialog: FC<IExportDialogProps> = memo(({ canvasRef }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = useTypeSelector(authSelector);

  const dispatch = useTypeDispatch();

  const [name, setName] = useState("");

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);

  const exportImage = useCallback(() => {
    const cleanName = name.trim();
    if (!cleanName) return;

    const a = document.createElement("a");
    a.href = canvasRef.current!.toDataURL();
    a.download = cleanName;

    a.click();
    onClose();
    setName("");
  }, [canvasRef, name, onClose]);

  const publish = useCallback(async () => {
    if (!userData) return;
    const cleanName = name.trim();
    if (!cleanName) return;

    await dispatch(addImageAction({ url: canvasRef.current!.toDataURL(), author: userData.email!, name }));
    onClose();
    setName("");
  }, [canvasRef, dispatch, name, userData, onClose]);

  return (
    <>
      <Button minH="40px" onClick={onOpen}>
        Export As
      </Button>
      <ModalWindow
        isOpen={isOpen}
        onClose={onClose}
        header="Image Export"
        body={<FormInput id="img_name" label="Name" value={name} onChange={onNameChange} />}
        footer={
          <>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button mr={3} onClick={exportImage}>
              Export
            </Button>
            <Button onClick={publish}>Publish</Button>
          </>
        }
      />
    </>
  );
});

export default ExportDialog;
