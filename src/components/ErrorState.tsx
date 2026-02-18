import { Panel } from "@/components/Panel";

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center">
      <div className="w-full max-w-md">
        <Panel>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 py-6 text-center">
            <div className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.6c.75 1.336-.213 2.99-1.742 2.99H3.48c-1.53 0-2.492-1.654-1.743-2.99l6.52-11.6zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-7a1 1 0 00-.993.883L9 7v3a1 1 0 001.993.117L11 10V7a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="text-base font-semibold text-red-800">
              Something went wrong
            </div>

            <div className="text-sm text-red-700">{message}</div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
