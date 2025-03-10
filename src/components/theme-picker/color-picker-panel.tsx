import { HexColorPicker } from "react-colorful";
import { SyncColor, useThemeStore } from "@/store/theme-store";
import { SyncControls } from "./sync-controls";
import { cn } from "@/lib/utils";
import { startTransition } from "react";
import { getColorGenerator } from "@/lib/color-generator";
import { PopoverPanel } from "@headlessui/react";

interface ColorPickerPanelProps {
  colorKey: keyof (SyncColor & { muted: string });
  width: number;
}

export const ColorPickerPanel = ({
  colorKey,
  width,
}: ColorPickerPanelProps) => {
  const color = useThemeStore(
    (state) => state.colors[state.platform][state.theme][colorKey],
  );
  const sync = useThemeStore(
    (state) => state.sync[state.platform][colorKey as keyof SyncColor],
  );
  const platform = useThemeStore((state) => state.platform);
  const theme = useThemeStore((state) => state.theme);

  const setSync = useThemeStore((state) => state.setSync);
  const setColor = useThemeStore((state) => state.setColor);
  const setPrimaryColor = useThemeStore((state) => state.setPrimaryColor);
  const setSecondaryColor = useThemeStore((state) => state.setSecondaryColor);
  const setAccentColor = useThemeStore((state) => state.setAccentColor);

  // const [colorInput, setColorInput] = useState(color);

  const updateColor = (newColor: string) => {
    startTransition(() => {
      const generator = getColorGenerator(platform);
      switch (colorKey) {
        case "primary":
          const newColors = generator.generateFromPrimary(
            newColor,
            theme,
            sync,
          );
          setPrimaryColor(newColors);
          break;
        case "secondary":
          const newSecondaryColors = generator.generateFromSecondary(
            newColor,
            theme,
            sync,
          );
          setSecondaryColor(newSecondaryColors);
          break;
        case "accent":
          const newAccentColors = generator.generateFromAccent(
            newColor,
            theme,
            sync,
          );
          setAccentColor(newAccentColors);
          break;
        default:
          setColor(colorKey, newColor);
      }
    });
  };

  // const handleColorInputChange = (value: string) => {
  //   try {
  //     const color = Color(value);
  //     const hexColor = color.hex();
  //     setColorInput(hexColor);
  //   } catch (error: unknown) {
  //     // allow invalid colors to be set, but don't generate colors from them
  //     setColorInput(color);
  //     if (error instanceof Error) return;
  //     return;
  //   }
  // };

  return (
    <PopoverPanel
      focus
      anchor="bottom"
      as="div"
      className={cn(
        "bg-border/50 -mt-px w-[var(--popover-width)] !overflow-visible backdrop-blur-sm",
        "shadow-2xl shadow-neutral-900/10",
        "inset-ring-border inset-ring",
      )}
      style={
        {
          "--popover-width": `${width}px`,
        } as React.CSSProperties
      }
    >
      {/* <Input
        className='w-full'
        value={colorInput}
        onChange={(e) => handleColorInputChange(e.target.value)}
      /> */}
      <HexColorPicker
        color={color}
        onChange={updateColor}
        // color={colorInput}
        // onMouseUp={() => setColorInput(color)}
        // onPointerUp={() => setColorInput(color)}
      />
      {colorKey !== "muted" && (
        <div className="px-2 py-2 xl:px-3">
          <SyncControls
            colorKey={colorKey}
            isSync={sync}
            onSyncChange={(checked) => setSync(colorKey, checked)}
          />
        </div>
      )}
    </PopoverPanel>
  );
};
