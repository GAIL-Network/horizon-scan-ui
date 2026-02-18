import { Panel } from "./Panel";

export function LoadingComponent({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <Panel className="flex items-center gap-3 px-6 py-4 text-sm text-slate-600">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
        Loading...
      </Panel>
    </div>
  );
}
