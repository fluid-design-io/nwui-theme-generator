"use client";

import { PopoverGroup, Radio, RadioGroup } from "@headlessui/react";
import { TextMono } from "@/components/ui/text";
import { ColorPicker } from "./color-picker";
import { SyncColor, useThemeStore } from "@/store/theme-store";
import { ColorThemeToggle } from "./color-theme-toggle";
import { ColorPickerModifier } from "@/hooks/use-theme-shortcuts";

export function ThemePalettes() {
  const pickers: {
    title: string;
    colorKey: keyof (SyncColor & { muted: string });
    modifier: ColorPickerModifier;
  }[] = [
    { title: "Primary", colorKey: "primary", modifier: "p" },
    { title: "Secondary", colorKey: "secondary", modifier: "s" },
    { title: "Accent", colorKey: "accent", modifier: "a" },
    { title: "Muted", colorKey: "muted", modifier: "m" },
  ];
  const platform = useThemeStore((state) => state.platform);
  const setPlatform = useThemeStore((state) => state.setPlatform);
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
            className='*:select-none border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-checked:bg-border/50 sm:px-6 data-focus:-outline-offset-2 data-focus:outline-blue-500'
          >
            <TextMono>iOS</TextMono>
          </Radio>
          <Radio
            as='div'
            value='android'
            className='*:select-none border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-checked:bg-border/50 sm:px-6 data-focus:-outline-offset-2 data-focus:outline-blue-500'
          >
            <TextMono>Android</TextMono>
          </Radio>
          <Radio
            as='div'
            value='web'
            className='*:select-none border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-checked:bg-border/50 sm:px-6 data-focus:-outline-offset-2 data-focus:outline-blue-500'
          >
            <TextMono>Web</TextMono>
          </Radio>
        </RadioGroup>
        <ColorThemeToggle />
      </div>
      <PopoverGroup className='grid grid-cols-2 md:grid-cols-4 line-b lg:line-b/half'>
        {pickers.map(({ title, colorKey, modifier }, index) => (
          <ColorPicker
            key={index}
            title={title}
            colorKey={colorKey}
            modifier={modifier}
          />
        ))}
      </PopoverGroup>
    </>
  );
}
