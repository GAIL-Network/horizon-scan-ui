"use client";

import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { Panel } from "@/components/Panel";
import { useSignals } from "@/features/signals/hooks/useSignals";
import Link from "next/link";

export default function Page() {
  const { state: signals } = useSignals();

  return (
    <Container>
      <Panel>
        <Header className="mb-0 flex">Signals</Header>
      </Panel>

      <div className="grid grid-cols-12 gap-2">
        <Panel className="col-span-12">
          <List>
            {signals &&
              signals.map((signal) => (
                <ListItem key={signal.id}>
                  <Link
                    className="block flex w-full justify-between"
                    href={`/signals/${signal.id}`}
                  >
                    <div>{signal.title}</div>
                    <div>{signal.createdAt.toLocaleString()}</div>
                  </Link>
                </ListItem>
              ))}
          </List>
        </Panel>
      </div>
    </Container>
  );
}
