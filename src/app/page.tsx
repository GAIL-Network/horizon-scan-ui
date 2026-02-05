import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";

export default function Page() {
  return (
    <Container>
      <Panel>
        <Header className="mb-0 flex">Welcome to Compliance Live</Header>
      </Panel>
    </Container>
  );
}
