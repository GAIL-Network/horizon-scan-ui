"use client";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";
import { useSignals } from "@/features/signals/hooks/useSignals";
import {
  ObjectTypeBadge,
  RiskRagBadge,
  SignalTypeBadge,
  TemporalStatusBadge,
} from "@/features/signals/ui/signalBadges";
import Link from "next/link";
import {
  SIGNAL_OBJECT_TYPES,
  SIGNAL_RISK_RAG,
  SIGNAL_TYPES,
  SIGNAL_TEMPORAL_STATUSES,
} from "@/features/signals/models";
import Button from "@/components/Button";
import { GridPanel } from "@/components/GridPanel";
import { GridPanels } from "@/components/GridPanels";

export default function Page() {
  const { state: signals } = useSignals();
  const [filters, setFilters] = useState<{
    objectType?: (typeof SIGNAL_OBJECT_TYPES)[number];
    signalType?: (typeof SIGNAL_TYPES)[number];
    temporal?: (typeof SIGNAL_TEMPORAL_STATUSES)[number];
    riskRag?: (typeof SIGNAL_RISK_RAG)[number];
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

  const filteredSignals = signals?.filter((signal) => {
    if (filters.objectType && signal.objectType !== filters.objectType)
      return false;

    if (filters.signalType && signal.type !== filters.signalType) return false;

    if (filters.temporal && signal.temporal !== filters.temporal) return false;

    if (filters.riskRag && signal.riskRag !== filters.riskRag) return false;

    return true;
  });

  return (
    <Container>
      <Panel>
        <Header className="mb-0">Signals</Header>
      </Panel>

      <Panel className="space-y-3">
        {/* Object type */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-500">
            Object type:
          </span>

          {SIGNAL_OBJECT_TYPES.map((value) => (
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

        {/* Signal type */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-500">
            Signal type:
          </span>

          {SIGNAL_TYPES.map((value) => (
            <button
              key={value}
              onClick={() => toggleFilter("signalType", value)}
            >
              <SignalTypeBadge
                value={value}
                className={cn(
                  "cursor-pointer",
                  filters.signalType &&
                    filters.signalType !== value &&
                    "opacity-40",
                )}
              />
            </button>
          ))}
        </div>

        {/* Risk RAG */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-500">Risk:</span>

          {SIGNAL_RISK_RAG.map((value) => (
            <button
              key={value}
              onClick={() => toggleFilter("riskRag", value)}
            >
              <RiskRagBadge
                value={value}
                className={cn(
                  "cursor-pointer",
                  filters.riskRag && filters.riskRag !== value && "opacity-40",
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

          {SIGNAL_TEMPORAL_STATUSES.map((value) => (
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

      <GridPanels>
        {filteredSignals?.map((signal) => (
          <GridPanel
            key={signal.id}
            href={`/signals/${signal.id}`}
          >
            <GridPanel.Header>
              <GridPanel.Title>{signal.title}</GridPanel.Title>

              <GridPanel.Meta>
                <ObjectTypeBadge value={signal.objectType} />
                <SignalTypeBadge value={signal.type} />
                <RiskRagBadge value={signal.riskRag} />
                <TemporalStatusBadge value={signal.temporal} />
              </GridPanel.Meta>
            </GridPanel.Header>

            <GridPanel.Body>{signal.description}</GridPanel.Body>

            <GridPanel.Footer>
              {signal.createdAt.toLocaleString()}
            </GridPanel.Footer>
          </GridPanel>
        ))}
      </GridPanels>
    </Container>
  );
}
