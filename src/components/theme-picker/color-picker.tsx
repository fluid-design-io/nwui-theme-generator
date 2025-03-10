"use client";

import { HexColorPicker } from "react-colorful";

import { cn } from "@/lib/utils";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ColorState, useThemeStore } from "@/store/theme-store";
import { useEffect, useRef, useState, useTransition } from "react";
import { Switch } from "../ui/switch";
import { TextMono } from "../ui/text";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogActions,
} from "../ui/dialog";
import { Button } from "../ui/button";

export const ColorPicker = ({
  title,
  colorKey,
}: {
  title: string;
  colorKey: keyof ColorState;
}) => {
  const { colors, setColor, setPrimaryColor, platform, theme } =
    useThemeStore();
  const [popoverWidth, setPopoverWidth] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const popoverRef = useRef<HTMLButtonElement>(null);
  const updateColor = (color: string) => {
    startTransition(() => {
      if (colorKey === "primary") {
        setPrimaryColor(color);
      } else {
        setColor(colorKey, color);
      }
    });
  };

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
  }, [popoverRef.current]);

  return (
    <Popover
      ref={popoverRef}
      className='relative border-l first:border-none group/color-picker'
    >
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
              style={{ backgroundColor: colors[theme][platform][colorKey] }}
            />
            <p className='font-mono font-light text-muted-foreground uppercase'>
              {isPending ? "Updating..." : colors[theme][platform][colorKey]}
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
        className={cn(
          "!overflow-visible w-[var(--popover-width)] bg-border/50 backdrop-blur-sm -mt-px",
          "shadow-2xl shadow-neutral-900/10"
        )}
        style={{
          // @ts-expect-error - popoverWidth is not a valid CSS variable
          "--popover-width": `${popoverWidth}px`,
        }}
      >
        <HexColorPicker
          color={colors[theme][platform][colorKey]}
          onChange={updateColor}
          autoFocus
        />
        <div className='px-2 xl:px-3 py-2'>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-1.5'>
              <TextMono className='text-xs text-muted-foreground'>
                Sync {colorKey}
              </TextMono>
              <button
                onClick={() => setIsDialogOpen(true)}
                className='text-muted-foreground hover:text-foreground'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='size-3'
                >
                  <path
                    fillRule='evenodd'
                    d='M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.293 5.293a1 1 0 1 1 .99 1.667c-.459.134-1.033.566-1.033 1.29v.25a.75.75 0 1 0 1.5 0v-.115a2.5 2.5 0 1 0-2.518-4.153.75.75 0 1 0 1.061 1.06Z'
                    clipRule='evenodd'
                  />
                </svg>

                <span className='sr-only'>Sync {colorKey} theme</span>
              </button>
            </div>
            <Switch />
          </div>
        </div>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>Theme Sync</DialogTitle>
          <DialogDescription>
            When theme sync is enabled, any color changes you make will be
            automatically applied to both light and dark themes. This ensures a
            consistent color palette across themes.
          </DialogDescription>
          <DialogActions>
            <Button color='dark/zinc' onClick={() => setIsDialogOpen(false)}>
              Got it
            </Button>
          </DialogActions>
        </Dialog>
      </PopoverPanel>
    </Popover>
  );
};
