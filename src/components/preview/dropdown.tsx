"use client";

import { atom, useAtom } from "jotai";
import { Listbox, ListboxOption } from "@/components/ui/listbox";
import { TextMono } from "../ui/text";
import { usePreviewShortcuts } from "@/hooks/use-theme-shortcuts";

export type PreviewOption = {
  label: string;
  value: "consent" | "messaging";
};

const previewOptions: PreviewOption[] = [
  {
    label: "Consent Welcome",
    value: "consent",
  },
  {
    label: "Messaging",
    value: "messaging",
  },
];

export const previewAtom = atom<"consent" | "messaging">("consent");

export const PreviewDropDown = () => {
  const [preview, setPreview] = useAtom(previewAtom);
  usePreviewShortcuts(previewOptions, setPreview);

  return (
    <Listbox
      aria-label="Preview Screens"
      value={preview}
      onChange={setPreview}
      className="-mt-11 *:data-[slot=selected-option]:border-r-0 *:data-[slot=selected-option]:border-b-0 sm:-mt-9 lg:-ml-[1px] lg:min-w-[calc(100%+1px)]"
    >
      {previewOptions.map((option) => (
        <ListboxOption
          key={option.value}
          value={option.value}
          aria-selected={preview === option.value}
        >
          <TextMono>{option.label}</TextMono>
        </ListboxOption>
      ))}
    </Listbox>
  );
};
