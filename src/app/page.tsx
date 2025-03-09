import { ThemePicker } from "@/components/theme-picker";
import ThemePickerHeader from "@/components/theme-picker/header";
import { Palettes } from "@/components/theme-picker/palettes";
export default function Home() {
  return (
    <div>
      <div className='line-y mt-12 grid gap-x-10 sm:mt-20 lg:mt-24 lg:grid-cols-[3fr_2fr]'>
        <div className='lg:border-r'>
          <ThemePickerHeader />
          <Palettes />
          <ThemePicker />
        </div>
        <div className='lg:border-l'>
          <div className='relative z-[1] mt-px -mb-px px-4 py-2 sm:px-2 bg-background min-h-screen'>
            <h1>Preview</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
