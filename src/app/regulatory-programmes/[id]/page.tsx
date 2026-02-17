"use client";

import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";
import { useRP } from "@/features/regulatory-programmes/hooks/useRP";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const { state, actions } = useRP({ id });

  if (state.loading) {
    return (
      <Container>
        <Panel>
          <Header className="mb-0">Loading Regulatory Programme…</Header>
        </Panel>
      </Container>
    );
  }

  if (state.error) {
    return (
      <Container>
        <Panel>
          <Header className="mb-0">Error</Header>
          <p className="text-sm opacity-70">{state.error}</p>
        </Panel>
      </Container>
    );
  }

  if (!state.data) return null;

  const rp = state.data;

  return (
    <Container>
      {/* Header */}
      <Panel>
        <div className="flex items-center justify-between">
          <Header className="mb-0">{rp.name}</Header>

          <button
            onClick={actions.refresh}
            className="text-sm opacity-70 hover:opacity-100"
          >
            Refresh
          </button>
        </div>

        <p className="mt-2 text-sm opacity-70">
          {rp.jurisdiction} • {rp.regulators.join(", ")}
        </p>

        {rp.description && <p className="mt-3 text-sm">{rp.description}</p>}
      </Panel>

      <div className="grid grid-cols-12 gap-2">
        {/* Scope */}
        <div className="col-span-12 md:col-span-6">
          <Panel>
            <Header className="mb-2">Scope In</Header>
            <ul className="list-disc pl-5 text-sm">
              {rp.scopeIn.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="col-span-12 md:col-span-6">
          <Panel>
            <Header className="mb-2">Scope Out</Header>
            <ul className="list-disc pl-5 text-sm">
              {rp.scopeOut.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Normative statements */}
        <div className="col-span-12">
          <Panel>
            <Header className="mb-3">Key Rules</Header>

            <div className="flex flex-col gap-2">
              {rp.normativeStatements.map((ns) => (
                <div
                  key={ns.id}
                  className="rounded border p-3 text-sm"
                >
                  <div className="mb-1 font-mono text-xs opacity-60">
                    {ns.id} • {ns.strength}
                  </div>
                  <div>{ns.text}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Documents */}
        {rp.documents.length > 0 && (
          <div className="col-span-12">
            <Panel>
              <Header className="mb-2">Documents</Header>

              <ul className="text-sm">
                {rp.documents.map((doc) => (
                  <li key={doc.id}>
                    {doc.url ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        className="underline"
                      >
                        {doc.title}
                      </a>
                    ) : (
                      doc.title
                    )}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        )}
      </div>
    </Container>
  );
}
