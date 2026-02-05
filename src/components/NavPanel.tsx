import { Panel, type PanelProps } from "@/components/Panel";

type NavPanelProps = PanelProps;

export function NavPanel({ ...rest }: NavPanelProps) {
  return <Panel {...rest} />;
}
