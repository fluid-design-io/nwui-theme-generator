"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/theme-store";

export function useThemeShortcuts() {
  const setPlatform = useThemeStore((state) => state.setPlatform);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      switch (event.key) {
        // Platform switching
        case "1":
          setPlatform("ios");
          break;
        case "2":
          setPlatform("android");
          break;
        case "3":
          setPlatform("web");
          break;

        // Theme switching
        case "d":
          setTheme("dark");
          break;
        case "l":
          setTheme("light");
          break;
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [setPlatform, setTheme]);
}

export type ColorPickerModifier = "p" | "s" | "a" | "m";

export function useColorPickerShortcuts(modifier: ColorPickerModifier) {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      // Only trigger if the modifier key matches
      if (event.key.toLowerCase() === modifier) {
        // Find the color picker button with this modifier
        const colorPickers = document.querySelectorAll(
          "[data-color-picker-modifier]",
        );
        const targetPicker = Array.from(colorPickers).find(
          (picker) =>
            picker.getAttribute("data-color-picker-modifier") === modifier,
        ) as HTMLButtonElement;

        if (targetPicker) {
          // Click the button to open the popover
          targetPicker.click();
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [modifier]);
}
