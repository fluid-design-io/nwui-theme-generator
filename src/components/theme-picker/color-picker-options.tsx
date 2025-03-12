import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
} from "@/components/ui/dropdown";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { ColorState, Platform, useThemeStore } from "@/store/theme-store";
import { useState } from "react";
import { Alert, AlertActions, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Label, Radio, RadioGroup } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { TextMono } from "../ui/text";
export const ColorPickerOptions = ({
  colorKey,
}: {
  colorKey: keyof ColorState;
}) => {
  return (
    <Dropdown>
      <DropdownButton
        className="group/options !absolute top-0 right-0 rounded-none data-focus:inset-ring-2 data-focus:inset-ring-blue-500"
        plain
      >
        <EllipsisVerticalIcon className="text-border mt-2 size-4 opacity-35" />
        <span className="sr-only">Options</span>
      </DropdownButton>
      <DropdownMenu anchor="bottom end">
        <CopyFromDialog colorKey={colorKey} />
        <DropdownDivider />
        <ResetButton colorKey={colorKey} />
        <DropdownDivider />
        <ResetAllButton />
      </DropdownMenu>
    </Dropdown>
  );
};
const ResetButton = ({ colorKey }: { colorKey: keyof ColorState }) => {
  const reset = useThemeStore((state) => state.reset);
  return (
    <DropdownItem onClick={() => reset(colorKey)}>
      Reset {colorKey}
    </DropdownItem>
  );
};
const ResetAllButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const resetAll = useThemeStore((state) => state.resetAll);
  return (
    <>
      <DropdownItem
        variant="destructive"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        {({ close }) => (
          <>
            Reset all...
            <Alert
              open={isOpen}
              onClose={() => {
                setIsOpen(false);
                close();
              }}
            >
              <AlertTitle>
                Are you sure you want to reset all colors?
              </AlertTitle>
              <AlertDescription>
                Reset all colors in all platforms to the default values.
              </AlertDescription>
              <AlertActions>
                <Button
                  plain
                  onClick={() => {
                    setIsOpen(false);
                    close();
                  }}
                >
                  Cancel
                </Button>

                <Button
                  color="red"
                  onClick={() => {
                    resetAll();
                    setIsOpen(false);
                    close();
                  }}
                >
                  Reset All
                </Button>
              </AlertActions>
            </Alert>
          </>
        )}
      </DropdownItem>
    </>
  );
};

const CopyFromDialog = ({ colorKey }: { colorKey: keyof ColorState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPlatform = useThemeStore((state) => state.platform);
  const [platform, setPlatform] = useState<Platform>(
    currentPlatform === "ios"
      ? "android"
      : currentPlatform === "android"
        ? "ios"
        : currentPlatform === "web"
          ? "android"
          : "ios",
  );
  return (
    <>
      <DropdownItem
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        {({ close }) => (
          <>
            Copy from...
            <Dialog
              open={isOpen}
              onClose={() => {
                setIsOpen(false);
                close();
              }}
            >
              <DialogTitle>Copy colors</DialogTitle>
              <DialogDescription>
                Copy colors from {platform} to {colorKey}.
              </DialogDescription>
              <DialogBody>
                <div className="flex flex-col items-start gap-2 md:items-stretch">
                  <RadioGroup
                    className="border-border flex flex-col md:flex-1 md:flex-row md:items-center md:justify-between"
                    onChange={(value) => setPlatform(value as Platform)}
                    value={platform}
                  >
                    <Label as={TextMono}>Copy from</Label>
                    <div className="flex items-center">
                      {["ios", "android", "web"]
                        .filter((p) => p !== currentPlatform)
                        .map((p) => (
                          <Radio
                            key={p}
                            value={p}
                            className={cn(
                              "min-w-20 cursor-default p-2 text-center",
                              platform === p
                                ? "!text-foreground data-checked:bg-border/50"
                                : "text-muted-foreground data-hover:bg-border/35",
                            )}
                            as={TextMono}
                          >
                            {p}
                          </Radio>
                        ))}
                    </div>
                  </RadioGroup>
                </div>
              </DialogBody>
              <DialogActions>
                <Button
                  plain
                  onClick={() => {
                    setIsOpen(false);
                    close();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    close();
                  }}
                >
                  Copy
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </DropdownItem>
    </>
  );
};
