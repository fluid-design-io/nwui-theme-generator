import { Preview } from "@/components/preview";
import { ThemeCodeGen } from "@/components/theme-picker/code-gen";
import ThemePickerHeader from "@/components/theme-picker/header";
import { Palettes } from "@/components/theme-picker/palettes";
import { cn } from "@/lib/utils";
export default function Home() {
  return (
    <div>
      <div className='line-y mt-12 grid gap-x-10 sm:mt-20 lg:mt-24 lg:grid-cols-[3.5fr_2fr]'>
        <div className='lg:border-r'>
          <ThemePickerHeader />
          <Palettes />
          <ThemeCodeGen />
        </div>
        <div className='lg:border-l flex-1 relative isolate flex flex-col @container/preview'>
          <div
            className={cn(
              "absolute inset-0 z-[-1]",
              "px-4 py-2 sm:px-2",
              "h-full w-full",
              "bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-border)]"
            )}
          />
          <Preview />
        </div>
      </div>
    </div>
  );
}
