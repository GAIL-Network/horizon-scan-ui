"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";
import { TagPill } from "@/components/TagPill";

import { useSignal } from "@/features/signals/hooks/useSignal";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Panel className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-slate-700">{title}</h3>
      {children}
    </Panel>
  );
}

export default function NewImpactAssessmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const signalId = searchParams.get("signalId");

  const { state: signal } = useSignal(signalId ? { id: signalId } : null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!signal) return;

    setTitle((prev) => prev || signal.title);
    setDescription((prev) => (prev || signal.description) ?? "");
  }, [signal]);

  function handleCancel() {
    router.back();
  }

  function handleCreate() {
    if (!signal) return;

    console.log("Create IA", {
      title,
      description,
      signalId: signal.id,
    });

    // router.push(`/impact-assessments/${createdId}`);
  }

  if (!signalId) {
    return (
      <Container>
        <Panel>
          <p className="text-sm text-slate-600">No signal specified.</p>
        </Panel>
      </Container>
    );
  }

  return (
    <Container className="gap-4">
      <Header className="mt-4 mb-8">New Impact Assessment</Header>

      {/* Linked Signal (read-only) */}
      <Section title="Linked Signal">
        {!signal ? (
          <div className="rounded border border-dashed p-4 text-sm text-slate-400">
            Loading signal…
          </div>
        ) : (
          <TagPill value={signal.title} />
        )}
      </Section>

      {/* Impact Assessment Details */}
      <Section title="Impact Assessment Details">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-500">Title</label>
          <input
            className="rounded border px-3 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-500">
            Description
          </label>
          <textarea
            className="min-h-[80px] rounded border px-3 py-2 text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
          />
        </div>
      </Section>

      {/* Footer actions */}
      <div className="flex justify-end gap-2">
        <Button
          variant="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          onClick={handleCreate}
          disabled={!title || !signal}
        >
          Create Impact Assessment
        </Button>
      </div>
    </Container>
  );
}
