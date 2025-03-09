"use client";

import { useThemeStore } from "@/store/theme-store";
import { ConsentWelcomeIos } from "./consent-welcome/ios";
import { Frame } from "./frame";

export const Preview = () => {
  const { mode } = useThemeStore();
  return (
    <div className='flex flex-col gap-4 justify-center items-center flex-1'>
      <Frame variant={mode}>
        <ConsentWelcomeIos className='w-full h-full' />
      </Frame>
    </div>
  );
};
