"use client";

import { cn } from "@/lib/utils";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { SyncColor, useThemeStore } from "@/store/theme-store";
import { useEffect, useRef, useState } from "react";
import { ColorDisplayButton } from "./color-display-button";
import { ColorPickerPanel } from "./color-picker-panel";

export const ColorPicker = ({
  title,
  colorKey,
}: {
  title: string;
  colorKey: keyof (SyncColor & { muted: string });
}) => {
  const color = useThemeStore(
    (state) => state.colors[state.platform][state.theme][colorKey]
  );

  const [popoverWidth, setPopoverWidth] = useState(0);

  const popoverRef = useRef<HTMLButtonElement>(null);

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
    <Popover className='relative border-l first:border-none group/color-picker'>
      <PopoverButton
        ref={popoverRef}
        className={cn(
          "outline-none",
          "w-full px-4 py-2 flex justify-between items-start",
          "group-hover/color-picker:hover:bg-border/35 group-data-open/color-picker:!bg-border/50"
        )}
      >
        <ColorDisplayButton title={title} color={color} />
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

      <PopoverPanel focus anchor='bottom'>
        <ColorPickerPanel colorKey={colorKey} width={popoverWidth} />
      </PopoverPanel>
    </Popover>
  );
};
