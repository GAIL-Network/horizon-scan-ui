import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";

export default function Page() {
  return (
    <Container>
      <Panel>
        <Header className="mb-0 flex">Work Tasks</Header>
      </Panel>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 flex flex-col gap-2">
          <Panel>Page Header</Panel>
          <Panel>Filters</Panel>
          <Panel>Tasks Table</Panel>
        </div>
      </div>
    </Container>
  );
}
