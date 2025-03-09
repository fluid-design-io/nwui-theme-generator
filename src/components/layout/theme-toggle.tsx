"use client";

import { useTheme } from "next-themes";
import { Listbox, ListboxLabel, ListboxOption } from "@/components/ui/listbox";
import { useState } from "react";
import { useEffect } from "react";

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted)
    return (
      <div className='min-h-11 sm:min-h-9 w-[calc(4.5rem+0.5px)] border rounded-lg' />
    );
  return (
    <Listbox name='theme' defaultValue={theme} onChange={setTheme}>
      <ListboxOption value='light'>
        <ListboxLabel>Light</ListboxLabel>
      </ListboxOption>
      <ListboxOption value='dark'>
        <ListboxLabel>Dark</ListboxLabel>
      </ListboxOption>
      <ListboxOption value='system'>
        <ListboxLabel>System</ListboxLabel>
      </ListboxOption>
    </Listbox>
  );
}
