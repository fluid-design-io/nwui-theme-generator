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
    colorKey: keyof SyncColor;
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
      <div className="line-y lg:line-y/half flex items-stretch justify-between">
        <RadioGroup
          className="flex items-center"
          value={platform}
          onChange={setPlatform}
        >
          <Radio
            as="div"
            value="ios"
            className="hover:bg-border/35 data-checked:bg-border/50 border-r p-3 *:select-none focus:not-data-focus:outline-none data-focus:-outline-offset-2 data-focus:outline-blue-500 sm:px-6"
          >
            <TextMono>iOS</TextMono>
          </Radio>
          <Radio
            as="div"
            value="android"
            className="hover:bg-border/35 data-checked:bg-border/50 border-r p-3 *:select-none focus:not-data-focus:outline-none data-focus:-outline-offset-2 data-focus:outline-blue-500 sm:px-6"
          >
            <TextMono>Android</TextMono>
          </Radio>
          <Radio
            as="div"
            value="web"
            className="hover:bg-border/35 data-checked:bg-border/50 border-r p-3 *:select-none focus:not-data-focus:outline-none data-focus:-outline-offset-2 data-focus:outline-blue-500 sm:px-6"
          >
            <TextMono>Web</TextMono>
          </Radio>
        </RadioGroup>
        <ColorThemeToggle />
      </div>
      <PopoverGroup className="line-b lg:line-b/half grid grid-cols-2 md:grid-cols-4">
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
