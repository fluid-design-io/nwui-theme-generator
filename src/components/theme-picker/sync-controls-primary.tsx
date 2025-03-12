"use client";

import { SyncStatePrimary, useThemeStore } from "@/store/theme-store";
import { Field, Radio, RadioGroup } from "@headlessui/react";
import { TextMono } from "../ui/text";
import { Description } from "../ui/fieldset";

const states: { value: SyncStatePrimary; description: string }[] = [
  {
    value: "all",
    description:
      "Automatically generate primary and muted colors in light and dark mode",
  },
  { value: "dark", description: "Sync primary colors in light and dark mode" },
  { value: "none", description: "Don't sync primary colors" },
];

export const SyncControlsPrimary = () => {
  const sync = useThemeStore((state) => state.sync[state.platform].primary);
  const setSync = useThemeStore((state) => state.setSync);

  return (
    <div className="px-2 py-2">
      <RadioGroup
        value={sync}
        onChange={(value) => setSync("primary", value)}
        aria-label="Primary Sync"
        className="border-border divide-border grid grid-cols-3 divide-x"
      >
        {states.map(({ value }) => (
          <Field key={value} className="flex last-of-type:border-r-0">
            <Radio
              value={value}
              className="group text-foreground hover:bg-background/50 data-checked:bg-background/75 dark:data-checked:bg-foreground/75 dark:hover:bg-foreground/15 flex w-full cursor-default justify-center p-2 focus:outline-none data-focus:-outline-offset-2 data-focus:outline-blue-500"
            >
              <TextMono className="dark:group-data-checked:text-background group-data-checked:text-foreground/85">
                {value}
              </TextMono>
            </Radio>
          </Field>
        ))}
        <Description className="col-span-3 mt-2 text-center text-xs/4 text-pretty sm:text-xs/4">
          {states.find(({ value }) => value === sync)?.description}
        </Description>
      </RadioGroup>
    </div>
  );
};
