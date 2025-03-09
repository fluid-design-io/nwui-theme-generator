import { Heading, Subheading } from "@/components/ui/heading";

function ThemePickerHeader() {
  return (
    <div className='px-4 py-2 sm:px-2'>
      <div className='flex items-center justify-between'>
        <div>
          <Heading>NativeWind UI Theme Picker</Heading>
          <Subheading>
            Fine-tune your colors for your iOS, Android, and web apps.
          </Subheading>
        </div>
      </div>
    </div>
  );
}

export default ThemePickerHeader;
