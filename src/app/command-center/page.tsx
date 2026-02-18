"use client";

import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { PageHeader } from "@/components/PageHeader";
import { Panel } from "@/components/Panel";

export default function Page() {
  return (
    <Container>
      <PageHeader>
        <Header>Command Center</Header>
      </PageHeader>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 flex flex-col gap-2 md:col-span-8">
          <Panel>Page Header</Panel>
          <Panel>KPI Tiles</Panel>
          <Panel>Programmes Table</Panel>
        </div>
        <div className="col-span-12 flex flex-col gap-2 md:col-span-4">
          <Panel>Top Open Items</Panel>
          <Panel>Upcoming Deadlines</Panel>
        </div>
      </div>
    </Container>
  );
}
