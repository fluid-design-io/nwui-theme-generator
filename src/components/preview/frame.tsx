"use client";

import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";
import { cva } from "class-variance-authority";

const frameVariants = cva(
  "ring-border transition-all overflow-hidden flex m-4 lg:m-8 2xl:h-full",
  {
    variants: {
      variant: {
        ios: "ring-5 rounded-[2.5rem]",
        android: "ring-5 rounded-2xl",
        web: "ring-2 rounded-md",
      },
    },
  }
);

export const Frame = ({ children }: { children: React.ReactNode }) => {
  const { platform, theme } = useThemeStore();
  return (
    <div
      className={cn(frameVariants({ variant: platform }), {
        "scheme-dark": theme === "dark",
        "scheme-light": theme === "light",
      })}
    >
      {children}
    </div>
  );
};
