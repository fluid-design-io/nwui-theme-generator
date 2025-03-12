"use client";

import * as Headless from "@headlessui/react";
import { cn } from "@/lib/utils";
import type React from "react";
import { Button } from "./button";
import { Link } from "./link";
import { cva } from "class-variance-authority";

export function Dropdown(props: Headless.MenuProps) {
  return <Headless.Menu {...props} />;
}

export function DropdownButton<T extends React.ElementType = typeof Button>({
  as = Button,
  ...props
}: { className?: string } & Omit<Headless.MenuButtonProps<T>, "className">) {
  return <Headless.MenuButton as={as} {...props} />;
}

export function DropdownMenu({
  anchor = "bottom",
  className,
  ...props
}: { className?: string } & Omit<Headless.MenuItemsProps, "as" | "className">) {
  return (
    <Headless.MenuItems
      {...props}
      transition
      anchor={anchor}
      className={cn(
        className,
        // Anchor positioning
        "[--anchor-gap:--spacing(2)] [--anchor-padding:--spacing(1)] data-[anchor~=end]:[--anchor-offset:6px] data-[anchor~=start]:[--anchor-offset:-6px] sm:data-[anchor~=end]:[--anchor-offset:4px] sm:data-[anchor~=start]:[--anchor-offset:-4px]",
        // Base styles
        "isolate w-max rounded-xl p-1",
        // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
        "outline outline-transparent focus:outline-hidden",
        // Handle scrolling when menu won't fit in viewport
        "overflow-y-auto",
        // Popover background
        "bg-background/75 backdrop-blur-xl",
        // Shadows
        "ring-border shadow-lg ring-1",
        // Define grid at the menu level if subgrid is supported
        "supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]",
        // Transitions
        "transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0",
      )}
    />
  );
}

const dropdownItemVariants = cva(
  "group cursor-default rounded-lg px-3.5 py-2.5 sm:px-3 sm:py-1.5",
  {
    variants: {
      variant: {
        default: "text-foreground data-focus:bg-blue-500 data-focus:text-white",
        destructive:
          "text-red-600 data-focus:bg-red-600 dark:data-focus:bg-red-400 data-focus:text-white sm:text-red-600 dark:text-red-400 dark:sm:text-red-400",
      },
    },
  },
);

type DropdownItemProps = {
  className?: string;
  variant?: "default" | "destructive";
} & (
  | Omit<Headless.MenuItemProps<"button">, "as" | "className">
  | Omit<Headless.MenuItemProps<typeof Link>, "as" | "className">
);

export function DropdownItem({
  className,
  variant = "default",
  ...props
}: DropdownItemProps) {
  const classes = cn(
    dropdownItemVariants({ variant }),
    // Text styles
    "text-left text-base/6 sm:text-sm/6 forced-colors:text-[CanvasText]",
    // Disabled state
    "data-disabled:opacity-50",
    // Forced colors mode
    "forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText] forced-colors:data-focus:*:data-[slot=icon]:text-[HighlightText]",
    // Use subgrid when available but fallback to an explicit grid layout if not
    "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
    // Icons
    "*:data-[slot=icon]:col-start-1 *:data-[slot=icon]:row-start-1 *:data-[slot=icon]:mr-2.5 *:data-[slot=icon]:-ml-0.5 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:mr-2 sm:*:data-[slot=icon]:size-4",
    "*:data-[slot=icon]:text-muted-foreground data-focus:*:data-[slot=icon]:text-white dark:data-focus:*:data-[slot=icon]:text-white",
    // Avatar
    "*:data-[slot=avatar]:mr-2.5 *:data-[slot=avatar]:-ml-1 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:mr-2 sm:*:data-[slot=avatar]:size-5",
    className,
  );

  return "href" in props ? (
    <Headless.MenuItem as={Link} {...props} className={classes} />
  ) : (
    <Headless.MenuItem
      as="button"
      type="button"
      {...props}
      className={classes}
    />
  );
}

export function DropdownHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={cn(className, "col-span-5 px-3.5 pt-2.5 pb-1 sm:px-3")}
    />
  );
}

export function DropdownSection({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.MenuSectionProps,
  "as" | "className"
>) {
  return (
    <Headless.MenuSection
      {...props}
      className={cn(
        className,
        // Define grid at the section level instead of the item level if subgrid is supported
        "col-span-full supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]",
      )}
    />
  );
}

export function DropdownHeading({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.MenuHeadingProps,
  "as" | "className"
>) {
  return (
    <Headless.MenuHeading
      {...props}
      className={cn(
        className,
        "text-muted-foreground col-span-full grid grid-cols-[1fr_auto] gap-x-12 px-3.5 pt-2 pb-1 text-sm/5 font-medium sm:px-3 sm:text-xs/5",
      )}
    />
  );
}

export function DropdownDivider({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.MenuSeparatorProps,
  "as" | "className"
>) {
  return (
    <Headless.MenuSeparator
      {...props}
      className={cn(
        className,
        "col-span-full mx-3.5 my-1 h-px border-0 bg-zinc-950/5 sm:mx-3 dark:bg-white/10 forced-colors:bg-[CanvasText]",
        "bg-border col-span-full mx-3.5 my-1 h-px border-0 sm:mx-3",
      )}
    />
  );
}

export function DropdownLabel({
  className,
  ...props
}: { className?: string } & Omit<Headless.LabelProps, "as" | "className">) {
  return (
    <Headless.Label
      {...props}
      data-slot="label"
      className={cn(className, "col-start-2 row-start-1")}
      {...props}
    />
  );
}

export function DropdownDescription({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.DescriptionProps,
  "as" | "className"
>) {
  return (
    <Headless.Description
      data-slot="description"
      {...props}
      className={cn(
        className,
        "text-muted-foreground col-span-2 col-start-2 row-start-2 text-sm/5 group-data-focus:text-white sm:text-xs/5",
      )}
    />
  );
}

export function DropdownShortcut({
  keys,
  className,
  ...props
}: { keys: string | string[]; className?: string } & Omit<
  Headless.DescriptionProps<"kbd">,
  "as" | "className"
>) {
  return (
    <Headless.Description
      as="kbd"
      {...props}
      className={cn(className, "col-start-5 row-start-1 flex justify-self-end")}
    >
      {(Array.isArray(keys) ? keys : keys.split("")).map((char, index) => (
        <kbd
          key={index}
          className={cn([
            "text-muted-foreground min-w-[2ch] text-center font-sans capitalize group-data-focus:text-white",
            // Make sure key names that are longer than one character (like "Tab") have extra space
            index > 0 && char.length > 1 && "pl-1",
          ])}
        >
          {char}
        </kbd>
      ))}
    </Headless.Description>
  );
}
