"use client";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";
import { useChangeEvents } from "@/features/change-events/hooks/useChangeEvents";
import {
  ObjectTypeBadge,
  RiskRagBadge,
  ChangeEventTypeBadge,
  TemporalStatusBadge,
} from "@/features/change-events/ui/changeEventBadges";
import Link from "next/link";
import {
  CHANGE_EVENT_OBJECT_TYPES,
  CHANGE_EVENT_RISK_RAG,
  CHANGE_EVENT_TYPES,
  CHANGE_EVENT_TEMPORAL_STATUSES,
} from "@/features/change-events/models";
import Button from "@/components/Button";
import { GridPanel } from "@/components/GridPanel";
import { GridPanels } from "@/components/GridPanels";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";

export default function Page() {
  const { state: changeEvents } = useChangeEvents();
  const [filters, setFilters] = useState<{
    objectType?: (typeof CHANGE_EVENT_OBJECT_TYPES)[number];
    changeEventType?: (typeof CHANGE_EVENT_TYPES)[number];
    temporal?: (typeof CHANGE_EVENT_TEMPORAL_STATUSES)[number];
    riskRag?: (typeof CHANGE_EVENT_RISK_RAG)[number];
  }>({});

  function toggleFilter<K extends keyof typeof filters>(
    key: K,
    value: NonNullable<(typeof filters)[K]>,
  ) {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value,
    }));
  }

  const filteredChangeEvents = changeEvents?.filter((changeEvent) => {
    if (filters.objectType && changeEvent.objectType !== filters.objectType)
      return false;

    if (
      filters.changeEventType &&
      changeEvent.eventType !== filters.changeEventType
    )
      return false;

    if (filters.temporal && changeEvent.temporalStatus !== filters.temporal)
      return false;

    if (filters.riskRag && changeEvent.riskRag !== filters.riskRag)
      return false;

    return true;
  });

  return (
    <Container>
      <PageHeader>
        <Header>Change Events</Header>
      </PageHeader>

      <Section>
        <Panel className="space-y-3">
          {/* Object type */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-500">
              Object type:
            </span>

            {CHANGE_EVENT_OBJECT_TYPES.map((value) => (
              <button
                key={value}
                onClick={() => toggleFilter("objectType", value)}
              >
                <ObjectTypeBadge
                  value={value}
                  className={cn(
                    "cursor-pointer transition-opacity",
                    filters.objectType &&
                      filters.objectType !== value &&
                      "opacity-40",
                  )}
                />
              </button>
            ))}
          </div>

          {/* Change Event type */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-500">
              Change Event type:
            </span>

            {CHANGE_EVENT_TYPES.map((value) => (
              <button
                key={value}
                onClick={() => toggleFilter("changeEventType", value)}
              >
                <ChangeEventTypeBadge
                  value={value}
                  className={cn(
                    "cursor-pointer",
                    filters.changeEventType &&
                      filters.changeEventType !== value &&
                      "opacity-40",
                  )}
                />
              </button>
            ))}
          </div>

          {/* Risk RAG */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-500">Risk:</span>

            {CHANGE_EVENT_RISK_RAG.map((value) => (
              <button
                key={value}
                onClick={() => toggleFilter("riskRag", value)}
              >
                <RiskRagBadge
                  value={value}
                  className={cn(
                    "cursor-pointer",
                    filters.riskRag &&
                      filters.riskRag !== value &&
                      "opacity-40",
                  )}
                />
              </button>
            ))}
          </div>

          {/* TEMPORAL STATUS */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-500">
              Temporal Status:
            </span>

            {CHANGE_EVENT_TEMPORAL_STATUSES.map((value) => (
              <button
                key={value}
                onClick={() => toggleFilter("temporal", value)}
              >
                <TemporalStatusBadge
                  value={value}
                  className={cn(
                    "cursor-pointer",
                    filters.temporal &&
                      filters.temporal !== value &&
                      "opacity-40",
                  )}
                />
              </button>
            ))}
          </div>
        </Panel>

        {Object.values(filters).some(Boolean) && (
          <div>
            <Button
              variant="outline"
              onClick={() => setFilters({})}
            >
              Clear filters
            </Button>
          </div>
        )}
      </Section>

      <Section>
        <GridPanels>
          {filteredChangeEvents?.map((changeEvent) => (
            <GridPanel
              key={changeEvent.id}
              href={`/change-events/${changeEvent.id}`}
            >
              <GridPanel.Header>
                <GridPanel.Title>{changeEvent.title}</GridPanel.Title>

                <GridPanel.Meta>
                  <ObjectTypeBadge value={changeEvent.objectType} />
                  <ChangeEventTypeBadge value={changeEvent.eventType} />
                  <RiskRagBadge value={changeEvent.riskRag} />
                  <TemporalStatusBadge value={changeEvent.temporalStatus} />
                </GridPanel.Meta>
              </GridPanel.Header>

              <GridPanel.Body>{changeEvent.description}</GridPanel.Body>

              <GridPanel.Footer>
                {changeEvent.createdAt.toLocaleString()}
              </GridPanel.Footer>
            </GridPanel>
          ))}
        </GridPanels>
      </Section>
    </Container>
  );
}
