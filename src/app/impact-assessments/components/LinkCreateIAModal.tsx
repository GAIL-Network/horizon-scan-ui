"use client";

import Button from "@/components/Button";
import { Modal, ModalProps } from "@/components/Modal";
import { ModalBody, ModalFooter, ModalHeader } from "@/components/ModalParts";
import { Signal } from "@/features/signals/models";
import { useRouter } from "next/navigation";

type Props = {
  signal: Signal;
  ias: unknown[];
} & Omit<ModalProps, "children">;

export function LinkCreateIAModal({ signal, ias, onClose, ...rest }: Props) {
  const router = useRouter();

  function handleCreate() {
    onClose?.();
    router.push(
      `/impact-assessments/new?signalId=${encodeURIComponent(signal.id)}`,
    );
  }

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

        <Button
          variant="primary"
          onClick={handleCreate}
        >
          Create a new Impact Assessment
        </Button>
      </ModalFooter>
    </Modal>
  );
}
