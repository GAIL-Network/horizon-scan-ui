"use client";
import { useState } from "react";

import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";
import { GridPanel } from "@/components/GridPanel";
import { GridPanels } from "@/components/GridPanels";
import Button from "@/components/Button";
import { useRPs } from "@/features/regulatory-programmes/hooks/useRPs";

export default function Page() {
  const { state: rps } = useRPs();

  const [jurisdiction, setJurisdiction] = useState<string | undefined>();
  const [regulator, setRegulator] = useState<string | undefined>();

  const jurisdictions = Array.from(
    new Set(rps?.map((t) => t.jurisdiction) ?? []),
  );

  const regulators = Array.from(
    new Set(rps?.flatMap((t) => t.regulators) ?? []),
  );

  const filtered = rps?.filter((rp) => {
    if (jurisdiction && rp.jurisdiction !== jurisdiction) return false;
    if (regulator && !rp.regulators.includes(regulator)) return false;
    return true;
  });

  return (
    <Container>
      <Panel>
        <Header className="mb-0">Regulatory Programme Knowledge Packs</Header>
      </Panel>

      {/* Filters */}
      <Panel className="space-y-3">
        {/* Jurisdiction */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-500">
            Jurisdiction:
          </span>

          {jurisdictions.map((j) => (
            <button
              key={j}
              onClick={() =>
                setJurisdiction((prev) => (prev === j ? undefined : j))
              }
              className={`rounded border px-2 py-1 text-sm ${
                jurisdiction && jurisdiction !== j ? "opacity-40" : ""
              }`}
            >
              {j}
            </button>
          ))}
        </div>

        {/* Regulator */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-500">Regulator:</span>

          {regulators.map((r) => (
            <button
              key={r}
              onClick={() =>
                setRegulator((prev) => (prev === r ? undefined : r))
              }
              className={`rounded border px-2 py-1 text-sm ${
                regulator && regulator !== r ? "opacity-40" : ""
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </Panel>

      {(jurisdiction || regulator) && (
        <div>
          <Button
            variant="outline"
            onClick={() => {
              setJurisdiction(undefined);
              setRegulator(undefined);
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Grid */}
      <GridPanels>
        {filtered?.map((rp) => (
          <GridPanel
            key={rp.id}
            href={`/regulatory-programmes/${rp.id}`}
          >
            <GridPanel.Header>
              <GridPanel.Title>{rp.name}</GridPanel.Title>

              <GridPanel.Meta>
                <span className="text-xs opacity-70">{rp.jurisdiction}</span>
                {rp.regulators.map((r) => (
                  <span
                    key={r}
                    className="text-xs opacity-70"
                  >
                    {r}
                  </span>
                ))}
              </GridPanel.Meta>
            </GridPanel.Header>

            <GridPanel.Body>
              {rp.description ?? "No description"}
            </GridPanel.Body>

            <GridPanel.Footer>
              Updated {rp.updatedAt.toLocaleDateString()}
            </GridPanel.Footer>
          </GridPanel>
        ))}
      </GridPanels>
    </Container>
  );
}
