"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";
import { TagPill } from "@/components/TagPill";
import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";

import { useChangeEvent } from "@/features/change-events/hooks/useChangeEvent";
import { cn } from "@/lib/utils";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Panel className="flex flex-col gap-5">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      {children}
    </Panel>
  );
}

export default function NewImpactAssessmentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeEventId = searchParams.get("changeEventId");

  const { state: changeEvent } = useChangeEvent(
    changeEventId ? { id: changeEventId } : null,
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Seeded + editable IA fields
  const [whyMatters, setWhyMatters] = useState("");
  const [provenance, setProvenance] = useState("");

  // IA-owned obligations
  const [obligations, setObligations] = useState<string[]>([]);
  const [newObligation, setNewObligation] = useState("");

  useEffect(() => {
    if (!changeEvent) return;

    setTitle((prev) => prev || changeEvent.title);
    setDescription((prev) => (prev || changeEvent.description) ?? "");

    setWhyMatters((prev) => prev || changeEvent.whyMatters || "");
    setProvenance((prev) => prev || changeEvent.provenance || "");

    setObligations((prev) =>
      prev.length === 0 ? changeEvent.obligations : prev,
    );
  }, [changeEvent]);

  function handleCancel() {
    router.back();
  }

  function handleCreate() {
    if (!changeEvent) return;

    console.log("Create IA", {
      title,
      description,
      whyMatters,
      provenance,
      obligations,
      changeEventId: changeEvent.id,
    });
  }

  if (!changeEventId) {
    return (
      <Container>
        <Panel>
          <p className="text-sm text-slate-600">No change event specified.</p>
        </Panel>
      </Container>
    );
  }

  if (!changeEvent) return null;

  return (
    <Container className="gap-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <Header className="mt-4 mb-8">New Impact Assessment</Header>

        <div className="mb-8 flex items-center gap-2">
          <TagPill value={changeEvent.title} />
          <span className="text-xs text-slate-500">linked automatically</span>
        </div>

        {/* Core details */}
        <Section title="Impact Assessment Details">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500">Title</label>
            <input
              className={cn(
                "rounded-md border px-3 py-2 text-sm font-medium",
                "focus:ring-2 focus:ring-slate-300 focus:outline-none",
              )}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500">
              Description
            </label>
            <textarea
              className={cn(
                "min-h-[250px] resize-y rounded-md border",
                "px-3 py-2 text-sm leading-relaxed",
                "focus:ring-2 focus:ring-slate-300 focus:outline-none",
              )}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Section>

        {/* Why it matters */}
        <Section title="Why it matters">
          <textarea
            className={cn(
              "min-h-[120px] resize-y rounded-md border",
              "px-3 py-2 text-sm leading-relaxed",
              "focus:ring-2 focus:ring-slate-300 focus:outline-none",
            )}
            value={whyMatters}
            onChange={(e) => setWhyMatters(e.target.value)}
            placeholder="Explain the regulatory, compliance, or operational significance…"
          />
        </Section>

        {/* Provenance */}
        <Section title="Provenance">
          <textarea
            className={cn(
              "min-h-[100px] resize-y rounded-md border",
              "px-3 py-2 text-sm leading-relaxed",
              "focus:ring-2 focus:ring-slate-300 focus:outline-none",
            )}
            value={provenance}
            onChange={(e) => setProvenance(e.target.value)}
            placeholder="Source of this assessment (e.g. regulator notice, internal analysis, legal update)…"
          />
        </Section>

        {/* Obligations */}
        <Section title="Obligations">
          <p className="max-w-prose text-xs text-slate-500">
            Seeded from the linked change event. You can edit, remove, or add
            obligations specific to this impact assessment.
          </p>

          {obligations.length === 0 ? (
            <p className="text-sm text-slate-500">No obligations added.</p>
          ) : (
            <List className="space-y-2">
              {obligations.map((obligation, index) => (
                <ListItem
                  key={index}
                  className="rounded-md border bg-slate-50 p-3"
                >
                  <div className="flex items-start gap-3">
                    <textarea
                      className={cn(
                        "flex-1 resize-none rounded-md border",
                        "px-3 py-2 text-sm leading-relaxed",
                        "focus:ring-2 focus:ring-slate-300 focus:outline-none",
                      )}
                      value={obligation}
                      onChange={(e) =>
                        setObligations((prev) =>
                          prev.map((o, i) =>
                            i === index ? e.target.value : o,
                          ),
                        )
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setObligations((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }
                      className="mt-1 text-xs text-slate-400 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </ListItem>
              ))}
            </List>
          )}

          <div className="flex gap-2 pt-2">
            <input
              value={newObligation}
              onChange={(e) => setNewObligation(e.target.value)}
              placeholder="Add a new obligation…"
              className={cn(
                "flex-1 rounded-md border px-3 py-2 text-sm",
                "focus:ring-2 focus:ring-slate-300 focus:outline-none",
              )}
            />

            <Button
              variant="secondary"
              disabled={!newObligation.trim()}
              onClick={() => {
                setObligations((prev) => [...prev, newObligation.trim()]);
                setNewObligation("");
              }}
            >
              Add
            </Button>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-10 border-t pt-6">
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
              disabled={!title}
            >
              Create Regulatory Impact Assessment
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
