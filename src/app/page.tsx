import { ThemePicker } from "@/components/theme-picker";

export default function Home() {
  return (
    <div>
      <div className='line-y mt-12 grid gap-x-10 sm:mt-20 lg:mt-24 lg:grid-cols-[3fr_1px_2fr]'>
        <div className='px-4 py-2 sm:px-2'>
          <ThemePicker />
        </div>
        <div className='bg-gray-950/5' />
        <div className='px-4 py-2 sm:px-2'>
          <h1>Preview</h1>
        </div>
      </div>
    </div>
  );
}
