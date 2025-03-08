"use client";

import { Tab } from "@headlessui/react";
import { useThemeStore } from "@/store/theme-store";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block/code-block";

const ColorInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className='flex items-center gap-4'>
      <label className='w-32 text-sm font-medium'>{label}</label>
      <div className='flex items-center gap-2'>
        <div
          className='h-8 w-8 rounded-md border'
          style={{ backgroundColor: value }}
        />
        <Input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='w-32'
        />
      </div>
    </div>
  );
};

export function ThemePicker() {
  const store = useThemeStore();
  const [isDark, setIsDark] = useState(store.theme === "dark");

  const colorsTs = `export const COLORS = {
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
} as const;`;

  return (
    <div className='mx-auto max-w-7xl px-4 py-8'>
      <div className='space-y-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Theme Picker</h1>
          <div className='flex items-center gap-2'>
            <span className='text-sm'>Dark Mode</span>
            <Switch
              checked={isDark}
              onChange={(checked: boolean) => {
                setIsDark(checked);
                store.setTheme(checked ? "dark" : "light");
              }}
            />
          </div>
        </div>

        <Tab.Group>
          <Tab.List className='flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
            <Tab
              className={({ selected }) =>
                cn(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow text-blue-700"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              iOS
            </Tab>
            <Tab
              className={({ selected }) =>
                cn(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow text-blue-700"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Android
            </Tab>
          </Tab.List>
          <Tab.Panels className='mt-8'>
            <Tab.Panel>
              <div className='space-y-4'>
                <ColorInput
                  label='Primary'
                  value={store.colors.primary}
                  onChange={(value) => store.setPrimaryColor(value)}
                />
                <ColorInput
                  label='Secondary'
                  value={store.colors.secondary}
                  onChange={(value) => store.setColor("secondary", value)}
                />
                <ColorInput
                  label='Accent'
                  value={store.colors.accent}
                  onChange={(value) => store.setColor("accent", value)}
                />
                <ColorInput
                  label='Destructive'
                  value={store.colors.destructive}
                  onChange={(value) => store.setColor("destructive", value)}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {/* Android colors - for now using same as iOS */}
              <div className='space-y-4'>
                <ColorInput
                  label='Primary'
                  value={store.colors.primary}
                  onChange={(value) => store.setPrimaryColor(value)}
                />
                <ColorInput
                  label='Secondary'
                  value={store.colors.secondary}
                  onChange={(value) => store.setColor("secondary", value)}
                />
                <ColorInput
                  label='Accent'
                  value={store.colors.accent}
                  onChange={(value) => store.setColor("accent", value)}
                />
                <ColorInput
                  label='Destructive'
                  value={store.colors.destructive}
                  onChange={(value) => store.setColor("destructive", value)}
                />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        <div className='mt-8'>
          <h2 className='text-xl font-semibold mb-4'>Generated Code</h2>
          <div className='rounded-lg overflow-hidden'>
            <CodeBlock language='typescript'>{colorsTs}</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
