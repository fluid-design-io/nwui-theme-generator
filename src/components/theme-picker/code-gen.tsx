"use client";

import { useThemeStore } from "@/store/theme-store";
import { useMemo } from "react";
import { CodeBlock } from "../code-block/code-block";

export function ThemeCodeGen() {
  const store = useThemeStore();

  const colorsTs = useMemo(
    () => `export const COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    background: '${store.colors.background}',
    foreground: '${store.colors.foreground}',
    primary: '${store.colors.primary}',
    secondary: '${store.colors.secondary}',
    accent: '${store.colors.accent}',
    muted: '${store.colors.muted}',
    border: '${store.colors.border}',
    input: '${store.colors.input}',
    ring: '${store.colors.ring}',
  },
  dark: {
    // Dark theme colors...
  }
} as const;`,
    [store.colors]
  );

  return (
    <div className='line-y lg:line-y/half mt-8'>
      <div className='bg-border p-2'>
        <div className='flex items-center rounded-2xl bg-background p-6 sm:rounded-4xl sm:p-10'>
          <CodeBlock language='typescript'>{colorsTs}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
