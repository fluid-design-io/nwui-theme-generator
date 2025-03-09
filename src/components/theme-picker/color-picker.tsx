"use client";

import { HexColorPicker } from "react-colorful";

import { cn } from "@/lib/utils";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ColorState, useThemeStore } from "@/store/theme-store";

export const ColorPicker = ({
  title,
  colorKey,
}: {
  title: string;
  colorKey: keyof ColorState;
}) => {
  const { colors, setColor, mode, theme } = useThemeStore();
  const updateColor = (color: string) => {
    setColor(colorKey, color);
  };
  return (
    <Popover className='relative border-l first:border-none group/color-picker'>
      <PopoverButton
        className={cn(
          "outline-none",
          "w-full px-4 py-2 flex justify-between items-start",
          "group-hover/color-picker:hover:bg-border/35 group-data-open/color-picker:!bg-border/50"
        )}
      >
        <div className='flex flex-col items-start'>
          <p className='font-mono font-medium text-base/8 uppercase tracking-wide'>
            {title}
          </p>
          <div className='flex items-center gap-1'>
            <div
              className='size-3.5 inset-ring inset-ring-border rounded-full'
              style={{ backgroundColor: colors[theme][mode][colorKey] }}
            />
            <p className='font-mono font-light text-muted-foreground uppercase'>
              {colors[theme][mode][colorKey]}
            </p>
          </div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='mt-2 size-4 text-border dark:text-muted-foreground/25 group-hover/color-picker:text-muted-foreground/75 group-data-[open]/color-picker:text-muted-foreground/75'
          aria-hidden
        >
          <path
            fillRule='evenodd'
            d='M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z'
            clipRule='evenodd'
          />
        </svg>
      </PopoverButton>
      <PopoverPanel
        anchor='bottom'
        className='p-4.5 bg-background border -mt-px rounded-b-2xl'
      >
        <HexColorPicker
          color={colors[theme][mode][colorKey]}
          onChange={updateColor}
          autoFocus
        />
      </PopoverPanel>
    </Popover>
  );
};
