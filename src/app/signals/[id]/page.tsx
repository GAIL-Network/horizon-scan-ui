"use client";
import { Flag } from "lucide-react";

import Button from "@/components/Button";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { TagPill } from "@/components/TagPill";
import { Panel } from "@/components/Panel";
import { useSignal } from "@/features/signals/hooks/useSignal";
import { useParams } from "next/navigation";
import MasonryColumns from "@/components/MasonryColumns";
import {
  ObjectTypeBadge,
  RiskRagBadge,
  SignalTypeBadge,
  TemporalStatusBadge,
} from "@/features/signals/ui/signalBadges";
import { CheckboxListItem } from "@/components/CheckboxListItem";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import { ModalHeader, ModalBody, ModalFooter } from "@/components/ModalParts";
import { LinkCreateIAModal } from "@/app/impact-assessments/components/LinkCreateIAModal";
import { useIAs } from "@/app/impact-assessments/hooks/useIAs";

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-500 sm:w-40 sm:shrink-0">
        {label}
      </span>
      <span className="text-sm break-words text-slate-900">{value ?? "—"}</span>
    </div>
  );
}

function ComingSoonModal({
  isShow,
  onClose,
  title,
}: {
  isShow: boolean;
  onClose: () => void;
  title: string;
}) {
  return (
    <Modal
      isShow={isShow}
      onClose={onClose}
    >
      <ModalHeader>{title}</ModalHeader>

      <ModalBody>
        <div className="rounded border border-dashed p-4 text-sm text-slate-400">
          This section is coming soon.
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="outline"
          onClick={onClose}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

const comingSoonPanelClass =
  "relative cursor-pointer border border-orange-300 bg-orange-50/40 " +
  "hover:bg-orange-50 transition";

function ComingSoonBadge() {
  return (
    <span className="absolute top-2 right-2 rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
      Coming soon
    </span>
  );
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { state: signal } = useSignal({ id });
  const [isPriorityOpen, setPriorityOpen] = useState(false);
  const [isIgnoreOpen, setIgnoreOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isShowIAs, setIsShowIAs] = useState<boolean>(false);

  const { state: iAs, actions: iAActions } = useIAs();

  return (
    <Container className="gap-4">
      <div className="flex justify-end gap-2">
        <Button
          variant="default"
          onClick={() => setPriorityOpen(true)}
        >
          <Flag className="h-4 w-4" />
          Set Priority
        </Button>

        <Button
          variant="outline"
          onClick={() => setIgnoreOpen(true)}
        >
          Ignore
        </Button>
      </div>
      <Panel>
        <Header className="mt-4 mb-8">Signal: {signal?.title}</Header>

        {signal && (
          <div className="flex flex-col gap-2">
            <MasonryColumns gap={25}>
              <Field
                label="Description"
                value={signal.description}
              />

              <Field
                label={"Object type"}
                value={<ObjectTypeBadge value={signal.objectType} />}
              />

              <Field
                label="Signal type"
                value={<SignalTypeBadge value={signal.type} />}
              />

              <Field
                label="Temporal type"
                value={<TemporalStatusBadge value={signal.temporal} />}
              />

              <Field
                label="Normalized status"
                value={signal.normalizedStatus}
              />

              <Field
                label="SOP"
                value={signal.sop}
              />

              <Field
                label="Certainty"
                value={signal.certainty}
              />

              <Field
                label="Magnitude"
                value={signal.magnitude}
              />

              <Field
                label="Risk RAG"
                value={<RiskRagBadge value={signal.riskRag} />}
              />

              {/*
            <Field
              label="Readiness Score"
              value={signal.readinessScore}
            />
	    */}

              <Field
                label="Source"
                value={signal.source}
              />

              <Field
                label="Sources"
                value={signal.sources
                  .flatMap((source) =>
                    Object.entries(source).map(([k, v]) => `${k}: ${v}`),
                  )
                  .join(", ")}
              />

              <Field
                label="Tags"
                value={
                  <div className="flex flex-wrap gap-1">
                    {signal.tags.map((tag) => (
                      <TagPill
                        key={tag}
                        value={tag}
                      />
                    ))}
                  </div>
                }
              />

              <Field
                label="Obligations"
                value={
                  <List>
                    {signal.obligations.map((obligation) => (
                      <CheckboxListItem key={obligation}>
                        {obligation}
                      </CheckboxListItem>
                    ))}
                  </List>
                }
              />

              <Field
                label="Metadata"
                value={Object.entries(signal.signalMetadata)
                  .map(([key, value]) => `${key}: ${String(value)}`)
                  .join(", ")}
              />
            </MasonryColumns>

            <div className="text-small flex flex-col">
              <div>
                <label className="text-sm font-medium text-slate-500">
                  Created at:{" "}
                </label>
                {signal.createdAt.toLocaleString()}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500">
                  Updated at:{" "}
                </label>
                {signal.updatedAt.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </Panel>

      <Panel
        onClick={() => setOpenSection("Summary Strip")}
        className={comingSoonPanelClass}
      >
        <ComingSoonBadge />
        Summary Strip
      </Panel>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
          <div className="flex flex-col gap-2">
            <Panel
              onClick={() => setOpenSection("Provenance and what changed")}
              className={comingSoonPanelClass}
            >
              <ComingSoonBadge />
              Provenance and what changed
            </Panel>

            <Panel
              onClick={() => setOpenSection("Why it matters")}
              className={comingSoonPanelClass}
            >
              <ComingSoonBadge />
              Why it matters
            </Panel>

            <Panel
              onClick={() => setOpenSection("Program and Stance Impact")}
              className={comingSoonPanelClass}
            >
              <ComingSoonBadge />
              Program and Stance Impact
            </Panel>

            <Panel
              onClick={() =>
                setOpenSection("Obligations and Execution Implications")
              }
              className={comingSoonPanelClass}
            >
              <ComingSoonBadge />
              Obligations and Execution Implications
            </Panel>
          </div>
        </div>

        <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
          <div>
            <Button
              className="w-full"
              onClick={() => setIsShowIAs(true)}
            >
              Start Impact Assessment
            </Button>
          </div>

          <Panel
            onClick={() => setOpenSection("Agent Evidence")}
            className={comingSoonPanelClass}
          >
            <ComingSoonBadge />
            Agent Evidence
          </Panel>

          <Panel
            onClick={() => setOpenSection("Activity")}
            className={comingSoonPanelClass}
          >
            <ComingSoonBadge />
            Activity
          </Panel>
        </div>
      </div>

      <Modal
        isShow={isPriorityOpen}
        onClose={() => setPriorityOpen(false)}
      >
        <ModalHeader className="flex items-center gap-2">
          <Flag className="h-4 w-4 text-slate-500" />
          Set Priority
        </ModalHeader>

        <ModalBody className="space-y-3">
          <p className="text-sm text-slate-600">
            Priority controls how this signal is triaged and escalated.
          </p>

          <div className="rounded border border-dashed p-3 text-sm text-slate-400">
            Priority selection coming soon.
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => setPriorityOpen(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isShow={isIgnoreOpen}
        onClose={() => setIgnoreOpen(false)}
      >
        <ModalHeader>Ignore Signal</ModalHeader>

        <ModalBody className="space-y-3">
          <p className="text-sm text-slate-600">
            Ignoring a signal removes it from active triage and follow-up.
          </p>

          <div className="rounded border border-dashed p-3 text-sm text-slate-400">
            Ignore behavior configuration coming soon.
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => setIgnoreOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled
          >
            Ignore
          </Button>
        </ModalFooter>
      </Modal>

      <ComingSoonModal
        isShow={openSection !== null}
        title={openSection ?? ""}
        onClose={() => setOpenSection(null)}
      />

      <LinkCreateIAModal
        ias={iAs}
        isShow={isShowIAs}
        onClose={() => setIsShowIAs(false)}
      />
    </Container>
  );
}
