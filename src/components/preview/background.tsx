import { cn } from "@/lib/utils";

export const PreviewBackground = () => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-[-1]",
        "px-4 py-2 sm:px-2",
        "h-full w-full",
        "bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-border)]"
      )}
    />
  );
};
