"use client";
import { useLayoutEffect } from "react";

import Button from "@/components/Button";
import { GridPanel } from "@/components/GridPanel";
import { GridPanels } from "@/components/GridPanels";
import { Modal, ModalProps } from "@/components/Modal";
import { ModalBody, ModalFooter, ModalHeader } from "@/components/ModalParts";
import { Signal } from "@/features/signals/models";
import { useRouter } from "next/navigation";
import { ImpactAssessment } from "../models";
import { useEffect, useRef, useState } from "react";
import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { cn } from "@/lib/utils";

type Props = {
  signal: Signal;
  ias: ImpactAssessment[];
} & Omit<ModalProps, "children">;

export function LinkCreateIAModal({ signal, ias, onClose, ...rest }: Props) {
  const router = useRouter();
  const [selectedIA, setSelectedIA] = useState<ImpactAssessment | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const lastGridScroll = useRef(0);

  const handleBack = () => {
    setSelectedIA(null);
  };

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

  useEffect(() => {
    if (selectedIA && bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [selectedIA]);

  useLayoutEffect(() => {
    if (!selectedIA && bodyRef.current) {
      bodyRef.current.scrollTop = lastGridScroll.current;
    }
  }, [selectedIA]);

  return (
    <Modal
      {...rest}
      size="xxl"
      onClose={handleClose}
    >
      <ModalHeader>Link to or Create an Impact Assessment</ModalHeader>

      <div
        ref={bodyRef}
        className="relative h-[70vh] overflow-y-auto"
      >
        <ModalBody className="animate-in slide-in-from-right fade-in relative duration-200">
          <div
            className={cn(
              "transition-opacity duration-150",
              selectedIA
                ? "pointer-events-none h-0 overflow-hidden opacity-0 sm:opacity-20"
                : "opacity-100",
            )}
          >
            <GridPanels>
              {ias.map((ia) => (
                <GridPanel
                  key={ia.id}
                  onClick={() => {
                    if (bodyRef.current) {
                      lastGridScroll.current = bodyRef.current.scrollTop;
                    }
                    setSelectedIA(ia);
                  }}
                  className="cursor-pointer transition hover:shadow-md hover:ring-1 hover:ring-slate-200"
                >
                  <GridPanel.Header>
                    <GridPanel.Title className="line-clamp-2">
                      {ia.title}
                    </GridPanel.Title>
                  </GridPanel.Header>

                  <GridPanel.Body className="line-clamp-3 text-sm text-slate-600">
                    {ia.description}
                  </GridPanel.Body>

                  <GridPanel.Footer>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Link Signal
                    </Button>
                  </GridPanel.Footer>
                </GridPanel>
              ))}
            </GridPanels>
          </div>

          {/* Detail (overlaid, but IN-CANVAS) */}

          {selectedIA && (
            <div className="relative flex min-h-full flex-col bg-white">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-6 py-4">
                <div className="max-w-2xl">
                  <h2 className="text-lg leading-tight font-semibold">
                    {selectedIA.title}
                  </h2>
                </div>

                <Button
                  variant="secondary"
                  onClick={handleBack}
                >
                  Back to list
                </Button>
              </div>

              {/* Content */}

              <div className="flex-1 px-6 py-6">
                <div className="mx-auto max-w-2xl space-y-6">
                  <section>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                      {selectedIA.description}
                    </p>
                  </section>

                  <section className="rounded-lg border bg-slate-50 p-4">
                    <h3 className="mb-1 text-sm font-medium text-slate-900">
                      Why it matters
                    </h3>
                    <p className="text-sm text-slate-600">
                      {selectedIA.whyMatters}
                    </p>
                  </section>

                  <section className="rounded-lg border bg-slate-50 p-4">
                    <h3 className="mb-1 text-sm font-medium text-slate-900">
                      Provenance
                    </h3>
                    <p className="text-sm text-slate-600">
                      {selectedIA.provenance}
                    </p>
                  </section>

                  <section className="rounded-lg border bg-slate-50 p-4">
                    <h3 className="mb-3 text-sm font-medium text-slate-900">
                      Obligations
                    </h3>

                    <List className="space-y-2">
                      {selectedIA.obligations.map((o) => (
                        <ListItem
                          key={o.id}
                          className="flex gap-3 rounded-md bg-white px-3 py-2 text-sm shadow-sm"
                        >
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                          <span>{o.text}</span>
                        </ListItem>
                      ))}
                    </List>
                  </section>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t px-6 py-4">
                <div className="mx-auto max-w-2xl">
                  <Button className="w-full">
                    Link this Impact Assessment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
      </div>

      {!selectedIA && (
        <ModalFooter className="flex justify-between">
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
            Create new Impact Assessment
          </Button>
        </ModalFooter>
      )}
    </Modal>
  );
}
