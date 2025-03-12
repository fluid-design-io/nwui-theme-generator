import { Preview } from "@/components/preview";
import { PreviewBackground } from "@/components/preview/background";
import { ThemeCodeGen } from "@/components/theme-picker/code-gen";
import ThemePickerHeader from "@/components/theme-picker/header";
import { ThemeKeyboardShortcuts } from "@/components/theme-picker/keyboard-shortcuts";
import { ThemePalettes } from "@/components/theme-picker/palettes";
export default function Home() {
  return (
    <div className="line-y mt-12 grid gap-x-10 sm:mt-20 lg:mt-24 lg:grid-cols-[3.5fr_2fr]">
      <div className="lg:border-r">
        <ThemeKeyboardShortcuts />
        <ThemePickerHeader />
        <ThemePalettes />
        <ThemeCodeGen slot="desktop" />
      </div>
      <div className="line-b lg:line-b-none @container/preview relative isolate flex flex-1 flex-col lg:border-l">
        <PreviewBackground />
        <Preview />
      </div>
      <ThemeCodeGen slot="mobile" />
    </div>
  );
}
