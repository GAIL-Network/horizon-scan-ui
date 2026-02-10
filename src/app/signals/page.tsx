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

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSignals &&
          filteredSignals.map((signal) => (
            <Link
              key={signal.id}
              href={`/signals/${signal.id}`}
              className="group"
            >
              <Panel
                className={cn(
                  "h-60 cursor-pointer border border-gray-300",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5",
                  "hover:shadow-lg",
                  "hover:ring-2 hover:ring-slate-400",
                )}
              >
                <div className="flex h-full flex-col">
                  {/* Header */}
                  <div className="flex flex-col gap-2">
                    <div className="line-clamp-2 font-medium">
                      {signal.title}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      <ObjectTypeBadge value={signal.objectType} />
                      <SignalTypeBadge value={signal.type} />
                      <RiskRagBadge value={signal.riskRag} />
                      <TemporalStatusBadge value={signal.temporal} />
                    </div>
                  </div>

                  {/* Body (fills remaining space) */}
                  <div className="mt-2 flex-1 overflow-hidden">
                    <p className="line-clamp-5 text-sm text-slate-700">
                      {signal.description}
                    </p>
                  </div>

                  {/* Footer (pinned to bottom) */}
                  <div className="pt-2 text-sm text-slate-500">
                    {signal.createdAt.toLocaleString()}
                  </div>
                </div>
              </Panel>
            </Link>
          ))}
      </div>
    </Container>
  );
}
