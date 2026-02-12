import Button from "@/components/Button";
import { Modal, ModalProps } from "@/components/Modal";
import { ModalBody, ModalFooter, ModalHeader } from "@/components/ModalParts";

type Props = { ias: unknown[] } & Omit<ModalProps, "children">;

export function LinkCreateIAModal({ onClose, ...rest }: Props) {
  return (
    <Modal
      onClose={onClose}
      {...rest}
    >
      <ModalHeader>Link / Create Impact Assessment</ModalHeader>
      <ModalBody>body</ModalBody>
      <ModalFooter>
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button variant="primary">Create a new Impact Assessment</Button>
      </ModalFooter>
    </Modal>
  );
}
