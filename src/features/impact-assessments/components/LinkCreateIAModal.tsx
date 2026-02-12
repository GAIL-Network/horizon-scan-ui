"use client";

import Button from "@/components/Button";
import { GridPanel } from "@/components/GridPanel";
import { GridPanels } from "@/components/GridPanels";
import { Modal, ModalProps } from "@/components/Modal";
import { ModalBody, ModalFooter, ModalHeader } from "@/components/ModalParts";
import { Signal } from "@/features/signals/models";
import { useRouter } from "next/navigation";
import { ImpactAssessment } from "../models";
import { useState } from "react";

type Props = {
  signal: Signal;
  ias: ImpactAssessment[];
} & Omit<ModalProps, "children">;

export function LinkCreateIAModal({ signal, ias, onClose, ...rest }: Props) {
  const router = useRouter();
  const [selectedIA, setSelectedIA] = useState<ImpactAssessment | null>(null);

  function handleCreate() {
    onClose?.();
    router.push(
      `/impact-assessments/new?signalId=${encodeURIComponent(signal.id)}`,
    );
  }

  const handleClose = () => {
    setSelectedIA(null);
    onClose();
  };

  return (
    <Modal
      {...rest}
      size="xxl"
      onClose={handleClose}
    >
      <ModalHeader>Link to or Create an Impact Assessment</ModalHeader>

      <ModalBody className="animate-in slide-in-from-right fade-in relative duration-200">
        <GridPanels>
          {ias.map((ia) => (
            <GridPanel
              key={ia.id}
              onClick={() => setSelectedIA(ia)}
            >
              <GridPanel.Header>
                <GridPanel.Title>{ia.title}</GridPanel.Title>
              </GridPanel.Header>

              <GridPanel.Body>{ia.description}</GridPanel.Body>

              <GridPanel.Footer>
                <Button
                  className="w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  Link To Signal
                </Button>
              </GridPanel.Footer>
            </GridPanel>
          ))}
        </GridPanels>
      </ModalBody>

      {selectedIA && (
        <div className="absolute inset-0 z-20 bg-white">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-medium">{selectedIA.title}</h2>

              <Button
                variant="secondary"
                onClick={() => setSelectedIA(null)}
              >
                Back
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4">
              <p className="text-sm whitespace-pre-wrap text-slate-700">
                {selectedIA.description}
              </p>
            </div>

            {/* Actions */}
            <div className="border-t p-4">
              <Button
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // link action
                }}
              >
                Link this Impact Assessment
              </Button>
            </div>
          </div>
        </div>
      )}

      {!selectedIA && (
        <ModalFooter>
          <Button
            variant="secondary"
            onClick={handleClose}
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
      )}
    </Modal>
  );
}
