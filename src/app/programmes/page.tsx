import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";

export default function Page() {
  return (
    <Container>
      <Panel>
        <Header className="mb-0 flex">Programme Detail</Header>
      </Panel>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 flex flex-col gap-2 md:col-span-8">
          <Panel>Page Header</Panel>
          <Panel>Readiness</Panel>
          <Panel>Readiness History</Panel>
        </div>
        <div className="col-span-12 flex flex-col gap-2 md:col-span-4">
          <Panel>Stance Summary</Panel>
          <Panel>Open Work</Panel>
        </div>
      </div>
    </Container>
  );
}
