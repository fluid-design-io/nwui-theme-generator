"use client";

import { Button, Radio, RadioGroup } from "@headlessui/react";
import { TextMono } from "../ui/text";
import { ColorPicker } from "./color-picker";
import { SyncColor, useThemeStore } from "@/store/theme-store";

export function ThemePalettes() {
  const pickers: {
    title: string;
    colorKey: keyof (SyncColor & { muted: string });
  }[] = [
    { title: "Primary", colorKey: "primary" },
    { title: "Secondary", colorKey: "secondary" },
    { title: "Accent", colorKey: "accent" },
    { title: "Muted", colorKey: "muted" },
  ];
  const platform = useThemeStore((state) => state.platform);
  const setPlatform = useThemeStore((state) => state.setPlatform);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <>
      <div className='flex items-stretch justify-between line-y lg:line-y/half'>
        <RadioGroup
          className='flex items-center'
          value={platform}
          onChange={setPlatform}
        >
          <Radio
            as='div'
            value='ios'
            className='*:select-none border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-checked:bg-border/50 sm:px-6'
          >
            <TextMono>iOS</TextMono>
          </Radio>
          <Radio
            as='div'
            value='android'
            className='*:select-none border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-checked:bg-border/50 sm:px-6'
          >
            <TextMono>Android</TextMono>
          </Radio>
          <Radio
            as='div'
            value='web'
            className='*:select-none border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-checked:bg-border/50 sm:px-6'
          >
            <TextMono>Web</TextMono>
          </Radio>
        </RadioGroup>
        <Button
          onClick={handleThemeChange}
          className='group/theme-toggle border-l p-3 sm:ps-6 sm:pe-4 sm:min-w-44 flex items-center justify-between gap-1 data-hover:bg-border/35 data-focus:bg-border/50'
        >
          <TextMono>{theme} theme</TextMono>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='size-3.5 text-border dark:text-muted-foreground/25 group-hover/theme-toggle:text-muted-foreground/75 group-data-[open]/theme-toggle:text-muted-foreground/75'
          >
            <path
              fillRule='evenodd'
              d='M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z'
              clipRule='evenodd'
            />
          </svg>
        </Button>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 line-b lg:line-b/half'>
        {pickers.map(({ title, colorKey }, index) => (
          <ColorPicker key={index} title={title} colorKey={colorKey} />
        ))}
      </div>
    </>
  );
}
