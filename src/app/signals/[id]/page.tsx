import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Container>
      <Panel>
        <Header className="mb-0 flex">Signal: {id}</Header>
      </Panel>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 flex flex-col gap-2 md:col-span-3">
          <Panel>Review Sections</Panel>
        </div>

        <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
          <Panel>Summary Strip</Panel>
          <Panel>Provenance and what changed</Panel>
          <Panel>Why it matters</Panel>
          <Panel>Program and Stance Impact</Panel>
          <Panel>Obligations and Execution Implications</Panel>
        </div>

        <div className="col-span-12 flex flex-col gap-2 md:col-span-3">
          <Panel>Triage Decision</Panel>
          <Panel>Agent Evidence</Panel>
          <Panel>Activity</Panel>
        </div>
      </div>
    </Container>
  );
}
