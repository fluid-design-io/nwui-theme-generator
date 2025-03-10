import { useState } from "react";
import { Switch } from "../ui/switch";
import { TextMono } from "../ui/text";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogActions,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { SyncColor } from "@/store/theme-store";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-1.5'>
          <TextMono className='text-xs text-muted-foreground'>
            Sync {colorKey}
          </TextMono>
          <button
            onClick={() => setIsDialogOpen(true)}
            className='text-muted-foreground hover:text-foreground'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='size-3'
            >
              <path
                fillRule='evenodd'
                d='M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-6 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.293 5.293a1 1 0 1 1 .99 1.667c-.459.134-1.033.566-1.033 1.29v.25a.75.75 0 1 0 1.5 0v-.115a2.5 2.5 0 1 0-2.518-4.153.75.75 0 1 0 1.061 1.06Z'
                clipRule='evenodd'
              />
            </svg>
            <span className='sr-only'>Sync {colorKey} theme</span>
          </button>
        </div>
        <Switch checked={isSync} onChange={onSyncChange} />
      </div>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Theme Sync</DialogTitle>
        <DialogDescription>
          When theme sync is enabled, any color changes you make will be
          automatically applied to both light and dark themes. This ensures a
          consistent color palette across themes.
        </DialogDescription>
        <DialogActions>
          <Button color='dark/zinc' onClick={() => setIsDialogOpen(false)}>
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
