"use client";

import { atom, useAtom } from "jotai";
import { Listbox, ListboxOption } from "@/components/ui/listbox";
import { TextMono } from "../ui/text";
import { usePreviewShortcuts } from "@/hooks/use-theme-shortcuts";

export type PreviewOption = "consent" | "messaging" | "color-grid";

export type PreviewSelector = {
  label: string;
  value: PreviewOption;
};

const previewOptions: PreviewSelector[] = [
  {
    label: "Consent Welcome",
    value: "consent",
  },
  {
    label: "Messaging",
    value: "messaging",
  },
  {
    label: "Color Grid",
    value: "color-grid",
  },
];

export const previewAtom = atom<PreviewOption>("consent");

export const PreviewDropDown = () => {
  const [preview, setPreview] = useAtom(previewAtom);
  usePreviewShortcuts(previewOptions, setPreview);

  return (
    <Listbox
      aria-label="Preview Screens"
      value={preview}
      onChange={setPreview}
      className="bg-background *:data-[slot=selected-option]:border-x-0 *:data-[slot=selected-option]:border-t-0 lg:absolute lg:inset-x-0 lg:-top-[calc(3.25rem-1px)] lg:-ml-[1px] lg:min-w-[calc(100%+1px)] *:lg:data-[slot=selected-option]:border-t *:lg:data-[slot=selected-option]:border-b-0 *:lg:data-[slot=selected-option]:border-l"
    >
      {previewOptions.map((option, index) => (
        <ListboxOption
          key={option.value}
          value={option.value}
          aria-selected={preview === option.value}
          className="flex items-center justify-between py-1.25 lg:px-3 lg:py-2"
        >
          <TextMono className="group-data-active/option:text-white">
            {option.label}
          </TextMono>
          <TextMono className="pointer-fine:block hidden group-data-active/option:text-white/70">
            Shift + {index + 1}
          </TextMono>
        </ListboxOption>
      ))}
    </Listbox>
  );
};
