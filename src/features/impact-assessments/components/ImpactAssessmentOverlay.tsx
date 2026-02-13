"use client";

import Button from "@/components/Button";
import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { ImpactAssessment } from "../models";

type Props = {
  ia: ImpactAssessment;
  onBack: () => void;
};

export function ImpactAssessmentOverlay({ ia, onBack }: Props) {
  return (
    <div className="relative flex min-h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-lg leading-tight font-semibold">{ia.title}</h2>

            {/* Owner meta */}
            <div className="text-xs text-slate-500">
              Owned by{" "}
              <span className="font-medium text-slate-700">
                {ia.owner.email}
              </span>{" "}
              · created{" "}
              {ia.owner.createdAt.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={onBack}
          >
            Back to list
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <section>
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
              {ia.description}
            </p>
          </section>

          <section className="rounded-lg border bg-slate-50 p-4">
            <h3 className="mb-1 text-sm font-medium text-slate-900">
              Why it matters
            </h3>
            <p className="text-sm text-slate-600">{ia.whyMatters}</p>
          </section>

          <section className="rounded-lg border bg-slate-50 p-4">
            <h3 className="mb-1 text-sm font-medium text-slate-900">
              Provenance
            </h3>
            <p className="text-sm text-slate-600">{ia.provenance}</p>
          </section>

          <section className="rounded-lg border bg-slate-50 p-4">
            <h3 className="mb-3 text-sm font-medium text-slate-900">
              Obligations
            </h3>

            <List className="space-y-2">
              {ia.obligations.map((o) => (
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

          {/* Change Events */}
          <section className="rounded-lg border bg-slate-50 p-4">
            <h3 className="mb-3 text-sm font-medium text-slate-900">
              Linked change events
            </h3>

            {ia.changeEvents.length === 0 ? (
              <p className="text-sm text-slate-500">
                No change events linked to this impact assessment.
              </p>
            ) : (
              <List className="space-y-2">
                {ia.changeEvents.map((changeEvent) => (
                  <ListItem
                    key={changeEvent.id}
                    className="flex flex-col gap-1 rounded-md bg-white px-3 py-2 text-sm shadow-sm"
                  >
                    <span className="font-medium text-slate-900">
                      {changeEvent.title}
                    </span>

                    <span className="text-xs text-slate-500">
                      Created{" "}
                      {changeEvent.createdAt.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </ListItem>
                ))}
              </List>
            )}
          </section>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t px-6 py-4">
        <div className="mx-auto max-w-2xl">
          <Button className="w-full">Link this Impact Assessment</Button>
        </div>
      </div>
    </div>
  );
}
