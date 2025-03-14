import { HexColorPicker } from "react-colorful";
import { SyncColor, useThemeStore } from "@/store/theme-store";
import { SyncControls } from "./sync-controls";
import { cn } from "@/lib/utils";
import { startTransition, useMemo } from "react";
import { getColorGenerator } from "@/lib/color-generator";
import { PopoverPanel } from "@headlessui/react";
import { SyncControlsPrimary } from "./sync-controls-primary";

interface ColorPickerPanelProps {
  colorKey: keyof SyncColor;
  width: number;
}

export const ColorPickerPanel = ({
  colorKey,
  width,
}: ColorPickerPanelProps) => {
  const color = useThemeStore(
    (state) => state.colors[state.platform][state.theme][colorKey],
  );
  const sync = useThemeStore((state) => state.sync[state.platform]);
  const platform = useThemeStore((state) => state.platform);
  const theme = useThemeStore((state) => state.theme);

  const setPrimaryColor = useThemeStore((state) => state.setPrimaryColor);
  const setSecondaryColor = useThemeStore((state) => state.setSecondaryColor);
  const setAccentColor = useThemeStore((state) => state.setAccentColor);
  const setMutedColor = useThemeStore((state) => state.setMutedColor);
  // const [colorInput, setColorInput] = useState(color);

  const generator = useMemo(
    () => getColorGenerator(platform, theme, sync),
    [platform, theme, sync],
  );

  const updateColor = (newColor: string) => {
    startTransition(() => {
      switch (colorKey) {
        case "primary":
          const newColors = generator.generateFromPrimary(newColor);
          setPrimaryColor(newColors);
          break;
        case "secondary":
          const newSecondaryColors = generator.generateFromSecondary(newColor);
          setSecondaryColor(newSecondaryColors);
          break;
        case "accent":
          const newAccentColors = generator.generateFromAccent(newColor);
          setAccentColor(newAccentColors);
          break;
        case "muted":
          const newMutedColors = generator.generateFromMuted(newColor);
          setMutedColor(newMutedColors);
          break;
        default:
          break;
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
      anchor={{ to: "bottom", padding: 16 }}
      as="div"
      className={cn(
        "bg-border/35 -mt-px w-[var(--popover-width)] !overflow-visible backdrop-blur-xl",
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

      {colorKey === "primary" ? (
        <SyncControlsPrimary />
      ) : (
        <SyncControls colorKey={colorKey} />
      )}
    </PopoverPanel>
  );
};
