"use client";

import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { Panel } from "@/components/Panel";
import { useSignal } from "@/features/signals/hooks/useSignal";
import { useParams } from "next/navigation";

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
      <span className="font-bold sm:w-40 sm:shrink-0">{label}:</span>
      <span className="break-words sm:leading-6">{value ?? "—"}</span>
    </div>
  );
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { state: signal, actions: signalActions } = useSignal({ id });

  return (
    <Container>
      <Panel>
        <Header className="mt-4 mb-8">Signal: {signal?.title}</Header>

        {signal && (
          <div className="flex flex-col gap-2">
            <Field
              label="Description"
              value={signal.description}
            />

            <Field
              label={"Object type"}
              value={signal.objectType}
            />

            <Field
              label="Signal type"
              value={signal.type}
            />

            <Field
              label="Temporal type"
              value={signal.temporal}
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
              label="Risk Rag"
              value={signal.riskRag}
            />

            <Field
              label="Readiness Score"
              value={signal.readinessScore}
            />

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
              value={signal.tags.join(", ")}
            />

            <Field
              label="Obligations"
              value={
                <List>
                  {signal.obligations.map((obligation) => (
                    <ListItem key={obligation}>{obligation}</ListItem>
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

            <div className="text-small flex justify-between">
              <div>
                <label className="font-bold">Created at: </label>
                {signal.createdAt.toLocaleString()}
              </div>
              <div>
                <label className="font-bold">Updated at: </label>
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
          <Panel>Triage Decision</Panel>
          <Panel>Agent Evidence</Panel>
          <Panel>Activity</Panel>
        </div>
      </div>
    </Container>
  );
}
