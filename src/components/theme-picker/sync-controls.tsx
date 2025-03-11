import { Switch, SwitchField } from "../ui/switch";
import { TextMono } from "../ui/text";
import { SyncColor } from "@/store/theme-store";
import { Description, Label } from "../ui/fieldset";

interface SyncControlsProps {
  colorKey: keyof SyncColor;
  isSync: boolean;
  onSyncChange: (checked: boolean) => void;
}

export const SyncControls = ({
  colorKey,
  isSync,
  onSyncChange,
}: SyncControlsProps) => {
  return (
    <>
      <SwitchField className="flex items-center justify-between gap-2">
        <div className="flex flex-col items-start">
          <Label className="text-muted-foreground text-xs">
            <TextMono>Sync {colorKey}</TextMono>
          </Label>
          <Description className="text-xs/4 text-pretty sm:text-xs/4">
            Sync colors between light and dark themes
          </Description>
        </div>
        <Switch checked={isSync} onChange={onSyncChange} />
      </SwitchField>
    </>
  );
};
