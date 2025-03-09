"use client";

import { Radio, RadioGroup } from "@headlessui/react";
import { TextMono } from "../ui/text";
import { ColorPicker } from "./color-picker";
import { ColorState, useThemeStore } from "@/store/theme-store";

export function Palettes() {
  const pickers: { title: string; colorKey: keyof ColorState }[] = [
    { title: "Primary", colorKey: "primary" },
    { title: "Secondary", colorKey: "secondary" },
    { title: "Accent", colorKey: "accent" },
    { title: "Muted", colorKey: "muted" },
  ];
  const { mode, setMode } = useThemeStore();
  return (
    <>
      <RadioGroup
        className='line-y lg:line-y/half flex items-center'
        value={mode}
        onChange={setMode}
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
      <div className='grid grid-cols-2 md:grid-cols-4 line-b lg:line-b/half'>
        {pickers.map(({ title, colorKey }, index) => (
          <ColorPicker key={index} title={title} colorKey={colorKey} />
        ))}
      </div>
    </>
  );
}
