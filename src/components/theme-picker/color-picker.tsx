"use client";

import { cn } from "@/lib/utils";
import { Popover, PopoverButton } from "@headlessui/react";
import { SyncColor, useThemeStore } from "@/store/theme-store";
import { useEffect, useRef, useState } from "react";
import { ColorDisplayButton } from "./color-display-button";
import { ColorPickerPanel } from "./color-picker-panel";

import {
  ColorPickerModifier,
  useColorPickerShortcuts,
} from "@/hooks/use-theme-shortcuts";
import { ColorPickerOptions } from "./color-picker-options";

export const ColorPicker = ({
  title,
  colorKey,
  modifier,
}: {
  title: string;
  colorKey: keyof SyncColor;
  modifier: ColorPickerModifier;
}) => {
  const color = useThemeStore(
    (state) => state.colors[state.platform][state.theme][colorKey],
  );

  const [popoverWidth, setPopoverWidth] = useState(0);

  const popoverRef = useRef<HTMLButtonElement>(null);

  // Use the color picker shortcuts hook
  useColorPickerShortcuts(modifier);

  const updatePopoverWidth = () => {
    if (popoverRef.current) {
      const width = popoverRef.current.clientWidth + 2;
      setPopoverWidth(Math.max(width, 200));
    }
  };

  useEffect(() => {
    updatePopoverWidth();
    window.addEventListener("resize", updatePopoverWidth);

    return () => {
      window.removeEventListener("resize", updatePopoverWidth);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative border-l first:border-none",
        "nth-[3]:border-t nth-[4]:border-t",
        "md:nth-[3]:border-t-0 md:nth-[4]:border-t-0",
      )}
    >
      <ColorPickerOptions colorKey={colorKey} />
      <Popover className="group/color-picker">
        <PopoverButton
          ref={popoverRef}
          data-color-picker-modifier={modifier}
          className={cn(
            "flex w-full items-start justify-between px-4 py-2",
            "group-hover/color-picker:hover:bg-border/35 group-data-open/color-picker:!bg-border/50",
            "data-focus:-outline-offset-2 data-focus:outline-blue-500",
          )}
        >
          <ColorDisplayButton title={title} color={color} />
        </PopoverButton>

        <ColorPickerPanel colorKey={colorKey} width={popoverWidth} />
      </Popover>
    </div>
  );
};
