import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { NavLink } from "@/components/NavLink";
import { NavPanel } from "@/components/NavPanel";
import { PageHeader } from "@/components/PageHeader";
import { Panel } from "@/components/Panel";

const PANEL_NAV_LINKS = [
  { href: "/work", label: "Overview" },
  { href: "/work/change-events", label: "Change Events" },
  { href: "/work/agent-outputs", label: "Agent Outputs" },
  { href: "/work/execution", label: "Execution" },
  { href: "/work/activity", label: "Activity" },
];

export default function Page() {
  return (
    <Container>
      <PageHeader>
        <Header>Impact Assessment Detail</Header>
      </PageHeader>

      <NavPanel className="flex gap-1 p-2">
        {PANEL_NAV_LINKS.map(({ href, label }) => (
          <NavLink
            key={href}
            href={href}
          >
            {label}
          </NavLink>
        ))}
      </NavPanel>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 flex flex-col gap-2">
          <Panel>Page Header</Panel>
          <Panel>Why it matters</Panel>
          <Panel>Linked Change Events</Panel>
          <Panel>Agent runs</Panel>
          <Panel>Execution Artefacts</Panel>
          <Panel>Activity</Panel>
        </div>
      </div>
    </Container>
  );
}
