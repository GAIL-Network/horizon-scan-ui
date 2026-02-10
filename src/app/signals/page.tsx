"use client";

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

export default function Page() {
  const { state: signals } = useSignals();

  return (
    <Container>
      <Panel>
        <Header className="mb-0">Signals</Header>
      </Panel>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {signals &&
          signals.map((signal) => (
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
