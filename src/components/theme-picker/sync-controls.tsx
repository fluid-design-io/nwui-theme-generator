import { Switch, SwitchField } from "../ui/switch";
import { TextMono } from "../ui/text";
import { SyncColor, useThemeStore } from "@/store/theme-store";
import { Description, Label } from "../ui/fieldset";

interface SyncControlsProps {
  colorKey: Exclude<keyof SyncColor, "primary">;
}

export const SyncControls = ({ colorKey }: SyncControlsProps) => {
  const sync = useThemeStore((state) => state.sync[state.platform][colorKey]);
  const setSync = useThemeStore((state) => state.setSync);

  const onSyncChange = (checked: boolean) => {
    setSync(colorKey, checked ? "dark" : "off");
  };

  return (
    <div className="px-2 py-2">
      <SwitchField className="flex items-center justify-between gap-2">
        <div className="flex flex-col items-start">
          <Label className="text-muted-foreground text-xs">
            <TextMono>Sync {colorKey}</TextMono>
          </Label>
          <Description className="text-xs/4 text-pretty sm:text-xs/4">
            Sync colors between light and dark themes
          </Description>
        </div>
        <Switch checked={sync === "dark"} onChange={onSyncChange} />
      </SwitchField>
    </div>
  );
};
