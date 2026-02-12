"use client";

import Button from "@/components/Button";
import { GridPanel } from "@/components/GridPanel";
import { GridPanels } from "@/components/GridPanels";
import { Modal, ModalProps } from "@/components/Modal";
import { ModalBody, ModalFooter, ModalHeader } from "@/components/ModalParts";
import { Signal } from "@/features/signals/models";
import { useRouter } from "next/navigation";
import { ImpactAssessment } from "../models";

type Props = {
  signal: Signal;
  ias: ImpactAssessment[];
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
      <ModalHeader>Link to or Create an Impact Assessment</ModalHeader>

      <ModalBody>
        <GridPanels>
          {ias.map((ia) => (
            <GridPanel key={ia.id}>
              <GridPanel.Header>
                <GridPanel.Title>{ia.title}</GridPanel.Title>
              </GridPanel.Header>

              <GridPanel.Body>{ia.description}</GridPanel.Body>

              <GridPanel.Footer>
                <Button className="w-full">Link To Signal</Button>
              </GridPanel.Footer>
            </GridPanel>
          ))}
        </GridPanels>
      </ModalBody>

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
