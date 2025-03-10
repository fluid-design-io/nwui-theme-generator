import { HexColorPicker } from "react-colorful";
import { Input } from "../ui/input";
import { SyncColor, useThemeStore } from "@/store/theme-store";
import { SyncControls } from "./sync-controls";
import Color from "color";
import { cn } from "@/lib/utils";
import { startTransition, useState } from "react";
import { generateColorsFromPrimary } from "@/lib/generator";

interface ColorPickerPanelProps {
  colorKey: keyof (SyncColor & { muted: string });
  width: number;
}

export const ColorPickerPanel = ({
  colorKey,
  width,
}: ColorPickerPanelProps) => {
  const color = useThemeStore(
    (state) => state.colors[state.platform][state.theme][colorKey]
  );
  const sync = useThemeStore(
    (state) => state.sync[state.platform][colorKey as keyof SyncColor]
  );
  const platform = useThemeStore((state) => state.platform);
  const theme = useThemeStore((state) => state.theme);

  const setSync = useThemeStore((state) => state.setSync);
  const setColor = useThemeStore((state) => state.setColor);
  const setPrimaryColor = useThemeStore((state) => state.setPrimaryColor);

  const [colorInput, setColorInput] = useState(color);

  const updateColor = (newColor: string) => {
    startTransition(() => {
      const isOverwrittingSync =
        theme === "dark" && colorKey !== "muted" && sync;

      if (isOverwrittingSync) {
        setSync(colorKey, false);
      }

      if (colorKey === "primary") {
        const newColors = generateColorsFromPrimary(
          newColor,
          theme,
          platform,
          !isOverwrittingSync
        );
        setPrimaryColor(newColors);
      } else {
        setColor(colorKey, newColor);
      }
    });
  };

  const handleColorInputChange = (value: string) => {
    try {
      const color = Color(value);
      const hexColor = color.hex();
      setColorInput(hexColor);
    } catch (error: unknown) {
      if (error instanceof Error) return;
      return;
    }
  };

  return (
    <div
      className={cn(
        "!overflow-visible w-[var(--popover-width)] bg-border/50 backdrop-blur-sm -mt-px",
        "shadow-2xl shadow-neutral-900/10",
        "inset-ring inset-ring-border"
      )}
      style={
        {
          "--popover-width": `${width}px`,
        } as React.CSSProperties
      }
    >
      <Input
        className='w-full'
        value={colorInput}
        onChange={(e) => handleColorInputChange(e.target.value)}
      />
      <HexColorPicker color={colorInput} onChange={updateColor} />
      {colorKey !== "muted" && sync !== undefined && setSync && (
        <div className='px-2 xl:px-3 py-2'>
          <SyncControls
            colorKey={colorKey}
            isSync={sync}
            onSyncChange={(checked) => setSync(colorKey, checked)}
          />
        </div>
      )}
    </div>
  );
};
