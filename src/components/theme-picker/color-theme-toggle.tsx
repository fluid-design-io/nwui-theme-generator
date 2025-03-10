import { useThemeStore } from "@/store/theme-store";
import { Button } from "@headlessui/react";
import { TextMono } from "@/components/ui/text";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";

export const ColorThemeToggle = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Button
      onClick={handleThemeChange}
      className="group/theme-toggle data-hover:bg-border/35 data-focus:bg-border/50 flex items-center justify-between gap-1 border-l p-3 data-focus:-outline-offset-2 data-focus:outline-blue-500 sm:min-w-44 sm:ps-6 sm:pe-4"
    >
      <TextMono>{theme} theme</TextMono>
      <ChevronUpDownIcon className="text-border dark:text-muted-foreground/25 group-hover/theme-toggle:text-muted-foreground/75 group-data-[open]/theme-toggle:text-muted-foreground/75 size-3.5" />
    </Button>
  );
};
