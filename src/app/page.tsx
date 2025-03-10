import { Preview } from "@/components/preview";
import { PreviewBackground } from "@/components/preview/background";
import { ThemeCodeGen } from "@/components/theme-picker/code-gen";
import ThemePickerHeader from "@/components/theme-picker/header";
import { ThemePalettes } from "@/components/theme-picker/palettes";
export default function Home() {
  return (
    <div className='line-y mt-12 grid gap-x-10 sm:mt-20 lg:mt-24 lg:grid-cols-[3.5fr_2fr]'>
      <div className='lg:border-r'>
        <ThemePickerHeader />
        <ThemePalettes />
        <ThemeCodeGen />
      </div>
      <div className='lg:border-l flex-1 relative isolate flex flex-col @container/preview'>
        <PreviewBackground />
        <Preview />
      </div>
    </div>
  );
}
