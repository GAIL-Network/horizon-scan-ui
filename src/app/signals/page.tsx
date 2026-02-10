"use client";

import Button from "@/components/Button";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";
import { useSignals } from "@/features/signals/hooks/useSignals";
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
              <Panel className="h-40 cursor-pointer transition-shadow hover:shadow-md">
                <div className="flex h-full flex-col justify-between">
                  <div className="line-clamp-2 font-medium">{signal.title}</div>

                  <div>
                    <p className="line-clamp-3 text-sm text-slate-700">
                      {signal.description}
                    </p>
                  </div>

                  <div className="text-sm text-slate-500">
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
