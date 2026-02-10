"use client";

import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";
import Button from "@/components/Button";
import Link from "next/link";

export default function Page() {
  return (
    <Container>
      <Panel>
        <Header className="mb-4">Start Impact Assessment</Header>

        <p className="text-sm text-slate-600">
          Impact assessment creation is coming soon.
        </p>

        <div className="mt-6 flex gap-2">
          <Link href="/signals">
            <Button variant="outline">Back to Signals</Button>
          </Link>
        </div>
      </Panel>
    </Container>
  );
}
