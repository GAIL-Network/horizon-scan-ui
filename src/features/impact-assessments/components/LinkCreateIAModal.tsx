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
import { ImpactAssessmentOverlay } from "./ImpactAssessmentOverlay";

type Props = {
  signal: Signal;
  ias: ImpactAssessment[];
} & Omit<ModalProps, "children">;

export function LinkCreateIAModal({ signal, ias, onClose, ...rest }: Props) {
  const router = useRouter();
  const [selectedIA, setSelectedIA] = useState<ImpactAssessment | null>(null);
  const [query, setQuery] = useState("");
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const lastGridScroll = useRef(0);

  const filteredIAs = ias.filter((ia) => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    if (terms.length === 0) return true;

    const haystack = `${ia.title} ${ia.description}`.toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });

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
    setQuery("");
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
        {/* Sticky filter bar */}

        {!selectedIA && (
          <div className="sticky top-0 z-10 border-b bg-white px-6 py-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search impact assessments…"
              className={cn(
                "w-full rounded-md border px-3 py-2 text-sm",
                "focus:ring-2 focus:ring-slate-300 focus:outline-none",
              )}
            />
          </div>
        )}

        <ModalBody className="animate-in slide-in-from-right fade-in relative duration-200">
          <div
            className={cn(
              "transition-opacity duration-150",
              selectedIA
                ? "pointer-events-none h-0 overflow-hidden opacity-0 sm:opacity-20"
                : "opacity-100",
            )}
          >
            {filteredIAs.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-slate-500">
                No impact assessments match your search.
              </div>
            ) : (
              <GridPanels>
                {filteredIAs.map((ia) => (
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
            )}
          </div>

          {/* Detail (overlaid, but IN-CANVAS) */}

          {selectedIA && (
            <ImpactAssessmentOverlay
              ia={selectedIA}
              onBack={handleBack}
            />
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
