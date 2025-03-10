"use client";

import * as Headless from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { Fragment } from "react";

export const listboxButtonClasses = [
  "group relative block w-full",
  // Hide default focus styles
  "focus:outline-hidden",
  // Focus ring
  "after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset data-focus:after:ring-2 data-focus:after:ring-blue-500",
  // Disabled state
  "data-disabled:opacity-50 data-disabled:before:bg-zinc-950/5 data-disabled:before:shadow-none",
];

export function Listbox<T>({
  className,
  placeholder,
  autoFocus,
  "aria-label": ariaLabel,
  children: options,
  ...props
}: {
  className?: string;
  placeholder?: React.ReactNode;
  autoFocus?: boolean;
  "aria-label"?: string;
  children?: React.ReactNode;
} & Omit<Headless.ListboxProps<typeof Fragment, T>, "as" | "multiple">) {
  return (
    <Headless.Listbox {...props} multiple={false}>
      <Headless.ListboxButton
        autoFocus={autoFocus}
        data-slot="control"
        aria-label={ariaLabel}
        className={clsx([className, listboxButtonClasses])}
      >
        <Headless.ListboxSelectedOption
          as="span"
          data-slot="selected-option"
          options={options}
          placeholder={
            placeholder && (
              <span className="text-muted-foreground block truncate">
                {placeholder}
              </span>
            )
          }
          className={clsx([
            // Basic layout
            "relative block w-full appearance-none py-[calc(--spacing(2.5)-1px)] sm:py-[calc(--spacing(1.5)-1px)]",
            // Set minimum height for when no value is selected
            "min-h-11 sm:min-h-9",
            // Horizontal padding
            "pr-[calc(--spacing(7)-1px)] pl-[calc(--spacing(3.5)-1px)] sm:pl-[calc(--spacing(3)-1px)]",
            // Typography
            "placeholder:text-muted-foreground text-left text-base/6 sm:text-sm/6 forced-colors:text-[CanvasText]",
            // Border
            "border-border border",
            // Background color
            "group-data-hover:bg-border/35 group-data-focus:bg-border/50",
            // Invalid state
            "group-data-invalid:border-red-500 group-data-hover:group-data-invalid:border-red-500 dark:group-data-invalid:border-red-600 dark:data-hover:group-data-invalid:border-red-600",
            // Disabled state
            "group-data-disabled:border-zinc-950/20 group-data-disabled:opacity-100 dark:group-data-disabled:border-white/15 dark:group-data-disabled:bg-white/[2.5%] dark:group-data-disabled:data-hover:border-white/15",
          ])}
        />
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="text-border dark:text-muted-foreground/25 group-data-hover:text-muted-foreground/75 group-data-[open]:text-muted-foreground/75 size-3.5" />
        </span>
      </Headless.ListboxButton>
      <Headless.ListboxOptions
        transition
        anchor="selection start"
        className={clsx(
          "z-50",
          // Anchor positioning
          "[--anchor-offset:-1.625rem] [--anchor-padding:--spacing(4)] sm:[--anchor-offset:-1.375rem]",
          // Base styles
          "isolate w-max min-w-[calc(var(--button-width)+1.75rem)] scroll-py-1 rounded-xl p-1 select-none",
          // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
          "outline outline-transparent focus:outline-hidden",
          // Handle scrolling when menu won't fit in viewport
          "overflow-y-scroll overscroll-contain",
          // Popover background
          "bg-background/75 backdrop-blur-xl",
          // Shadows
          "ring-border shadow-lg ring-1 dark:ring-inset",
          // Transitions
          "transition-opacity duration-100 ease-in data-closed:data-leave:opacity-0 data-transition:pointer-events-none",
        )}
      >
        {options}
      </Headless.ListboxOptions>
    </Headless.Listbox>
  );
}

export function ListboxOption<T>({
  children,
  className,
  ...props
}: { className?: string; children?: React.ReactNode } & Omit<
  Headless.ListboxOptionProps<"div", T>,
  "as" | "className"
>) {
  const sharedClasses = clsx(
    // Base
    "flex min-w-0 items-center",
    // Icons
    "*:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 sm:*:data-[slot=icon]:size-4",
    "*:data-[slot=icon]:text-muted-foreground group-data-focus/option:*:data-[slot=icon]:text-white dark:*:data-[slot=icon]:text-zinc-400",
    "forced-colors:*:data-[slot=icon]:text-[CanvasText] forced-colors:group-data-focus/option:*:data-[slot=icon]:text-[Canvas]",
    // Avatars
    "*:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:size-5",
  );

  return (
    <Headless.ListboxOption as={Fragment} {...props}>
      {({ selectedOption }) => {
        if (selectedOption) {
          return (
            <div className={clsx(className, sharedClasses)}>{children}</div>
          );
        }

        return (
          <div
            className={clsx(
              // Basic layout
              "group/option grid cursor-default grid-cols-[--spacing(5)_1fr] items-baseline gap-x-2 rounded-lg py-2.5 pr-3.5 pl-2 sm:grid-cols-[--spacing(4)_1fr] sm:py-1.5 sm:pr-3 sm:pl-1.5",
              // Typography
              "text-foreground text-base/6 sm:text-sm/6 forced-colors:text-[CanvasText]",
              // Focus
              "data-focus:text-foreground outline-hidden data-focus:bg-blue-500",
              // Forced colors mode
              "forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText]",
              // Disabled
              "data-disabled:opacity-50",
            )}
          >
            <svg
              className="relative hidden size-5 self-center stroke-current group-data-selected/option:inline sm:size-4"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 8.5l3 3L12 4"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={clsx(className, sharedClasses, "col-start-2")}>
              {children}
            </span>
          </div>
        );
      }}
    </Headless.ListboxOption>
  );
}

export function ListboxLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        "ml-2.5 truncate first:ml-0 sm:ml-2 sm:first:ml-0",
      )}
    />
  );
}

export function ListboxDescription({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        "text-muted-foreground flex flex-1 overflow-hidden group-data-focus/option:text-white before:w-2 before:min-w-0 before:shrink dark:text-zinc-400",
      )}
    >
      <span className="flex-1 truncate">{children}</span>
    </span>
  );
}
