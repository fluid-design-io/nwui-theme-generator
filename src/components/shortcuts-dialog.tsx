"use client";

import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@headlessui/react";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { TextMono } from "./ui/text";
import { Heading } from "./ui/heading";

type ShortcutItem = {
  name: string;
  shortcuts: string[];
};

type ShortcutCategory = {
  title: string;
  items: ShortcutItem[];
};

const shortcutCategories: ShortcutCategory[] = [
  {
    title: "Platform",
    items: [
      { name: "iOS", shortcuts: ["1"] },
      { name: "Android", shortcuts: ["2"] },
      { name: "Web", shortcuts: ["3"] },
    ],
  },
  {
    title: "Theme",
    items: [
      { name: "Dark mode", shortcuts: ["D"] },
      { name: "Light mode", shortcuts: ["L"] },
    ],
  },
  {
    title: "Color Picker",
    items: [
      { name: "Primary color", shortcuts: ["P"] },
      { name: "Secondary color", shortcuts: ["S"] },
      { name: "Accent color", shortcuts: ["A"] },
      { name: "Muted color", shortcuts: ["M"] },
    ],
  },
  {
    title: "Preview",
    items: [
      { name: "Preview 1", shortcuts: ["Shift + 1"] },
      { name: "Preview 2", shortcuts: ["Shift + 2"] },
      { name: "Preview 3", shortcuts: ["Shift + 3"] },
      { name: "Preview 4", shortcuts: ["Shift + 4"] },
      { name: "Preview 5", shortcuts: ["Shift + 5"] },
    ],
  },
];

export const ShortcutsDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        className="group text-muted-foreground/70 data-hover:text-foreground flex items-center justify-center gap-1"
        onClick={() => setIsOpen(true)}
      >
        <TextMono
          size="xs"
          className="group-data-hover:text-foreground flex items-center gap-1.5"
        >
          <span className="hidden md:block">Keyboard </span>shortcuts
        </TextMono>{" "}
        <QuestionMarkCircleIcon className="size-3 -translate-y-px opacity-50" />
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle className="mb-4 text-xl font-semibold">
          Keyboard shortcuts
        </DialogTitle>

        <div className="grid grid-cols-2 gap-6">
          {shortcutCategories.map((category) => (
            <div key={category.title}>
              <Heading level={3} className="mb-3">
                {category.title}
              </Heading>
              <div className="space-y-3.5">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center gap-2">
                      {item.shortcuts.map((shortcut, index) => (
                        <>
                          <kbd className="bg-muted rounded px-2 py-1 text-xs">
                            {shortcut}
                          </kbd>
                          {index < item.shortcuts.length - 1 && <span>or</span>}
                        </>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => setIsOpen(false)}
          className="data-hover:bg-muted group hover:bg-border/35 data-checked:bg-border/50 absolute top-2 right-2 rounded-md p-2 focus:outline-none data-focus:-outline-offset-2 data-focus:outline-blue-500 data-focus:outline-none"
          aria-label="Close"
        >
          <XMarkIcon className="text-muted-foreground group-data-hover:text-foreground size-4" />
        </Button>
      </Dialog>
    </>
  );
};
