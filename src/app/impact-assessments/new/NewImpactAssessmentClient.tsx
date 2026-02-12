"use client";

import { useSearchParams, useRouter } from "next/navigation";

import Button from "@/components/Button";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";
import { TagPill } from "@/components/TagPill";

import { useSignal } from "@/features/signals/hooks/useSignal";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Panel className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      {children}
    </Panel>
  );
}

export default function NewImpactAssessmentClient() {
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

  if (!signal) return null;

  return (
    <Container className="gap-4">
      <div className="mx-auto w-full max-w-3xl">
        <Header className="mt-4 mb-8">New Impact Assessment</Header>

        <div className="flex items-center gap-2">
          <TagPill value={signal.title} />
          <span className="text-xs text-slate-500">linked automatically</span>
        </div>

        {/* Impact Assessment Details */}
        <Section title="Impact Assessment Details">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500">Title</label>

            <input
              className={cn(
                "rounded-md border px-3 py-2",
                "text-sm font-medium",
                "focus:ring-2 focus:ring-slate-300 focus:outline-none",
              )}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short, descriptive title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500">
              Description
            </label>

            <textarea
              className={cn(
                "min-h-[180px] resize-y rounded-md border",
                "px-3 py-2 text-sm leading-relaxed",
                "focus:ring-2 focus:ring-slate-300 focus:outline-none",
              )}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the regulatory, operational, or compliance impact in more detail…"
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
              }}
            />
          </div>
        </Section>

        {/* Footer actions */}
        <div className="mt-8 border-t pt-6">
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
        </div>
      </div>
    </Container>
  );
}
