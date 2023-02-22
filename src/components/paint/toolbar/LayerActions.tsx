import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useCallback, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { ILayer } from "@/utils/paint/control";
import { FormInput, ModalWindow } from "@/components/generic";
import { ILayerActionsProps } from "@/components/paint/toolbar";

const LayerActions: FC<ILayerActionsProps> = memo(({ add, remove, move, rename, removalBlocked }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [name, setName] = useState("");

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);
  const saveNameChanges = useCallback(() => {
    const cleanName = name.trim();
    if (!cleanName) return;

    rename(cleanName);
    onClose();
    setName("");
  }, [rename, name, onClose]);

  const forward = useCallback((arr: ILayer[], i: number) => {
    if (i < arr.length - 1) [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    return arr;
  }, []);

  const back = useCallback((arr: ILayer[], i: number) => {
    if (i > 0) [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    return arr;
  }, []);

  return (
    <>
      <Button onClick={onOpen}>
        <AiOutlineEdit />
      </Button>
      <Flex justify="space-between" mt={4} align="center">
        <Button minW={16} h={12} size="sm" onClick={add}>
          +
        </Button>
        <Flex direction="column" gap="1px">
          <Button minW={16} h={6} size="sm" onClick={() => move(back)}>
            <IoMdArrowDropup />
          </Button>
          <Button minW={16} h={6} size="sm" onClick={() => move(forward)}>
            <IoMdArrowDropdown />
          </Button>
        </Flex>
        <Button minW={16} h={12} size="sm" disabled={removalBlocked} onClick={remove}>
          -
        </Button>
      </Flex>
      <ModalWindow
        isOpen={isOpen}
        onClose={onClose}
        header="Rename Layer"
        body={<FormInput id="layer_name" label="New Name" onChange={onNameChange} value={name} />}
        footer={
          <>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={saveNameChanges}>Save</Button>
          </>
        }
      />
    </>
  );
});

export default LayerActions;
