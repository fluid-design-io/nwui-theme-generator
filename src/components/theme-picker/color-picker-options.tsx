import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
} from "@/components/ui/dropdown";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { ColorState, useThemeStore } from "@/store/theme-store";
import { useState } from "react";
import { Alert, AlertActions, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

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
