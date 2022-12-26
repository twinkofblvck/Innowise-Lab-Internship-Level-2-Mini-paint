import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

interface IModalWindowProps
{
  isOpen: boolean;
  onClose: () => void;
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

const ModalWindow: FC<IModalWindowProps> = memo(({ body, footer, header, isOpen, onClose }) =>
{
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ModalWindow;