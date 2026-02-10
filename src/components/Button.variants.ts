import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "rounded border transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        default:
          "border-slate-600 bg-slate-600 text-white hover:bg-slate-700 active:bg-slate-800",
        outline: "border-slate-600 text-slate-700 hover:bg-slate-100",
        ghost: "border-transparent hover:bg-slate-100",
        destructive: "border-red-600 bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2",
        lg: "px-4 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
