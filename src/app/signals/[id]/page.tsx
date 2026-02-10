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

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { state: signal } = useSignal({ id });

  return (
    <Container>
      <div className="flex justify-end gap-2">
        <Button variant="default">
          <Flag className="h-4 w-4" /> Set Priority
        </Button>
        <Button variant="outline">Ignore</Button>
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

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 flex flex-col gap-2 md:col-span-3">
          <Panel>Review Sections</Panel>
        </div>

        <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
          <Panel>Summary Strip</Panel>
          <Panel>Provenance and what changed</Panel>
          <Panel>Why it matters</Panel>
          <Panel>Program and Stance Impact</Panel>
          <Panel>Obligations and Execution Implications</Panel>
        </div>

        <div className="col-span-12 flex flex-col gap-2 md:col-span-3">
          <Panel className="flex items-center justify-between">
            <div>Triage Decision</div>
            <Button>Start Impact Assessment</Button>
          </Panel>
          <Panel>Agent Evidence</Panel>
          <Panel>Activity</Panel>
        </div>
      </div>
    </Container>
  );
}
