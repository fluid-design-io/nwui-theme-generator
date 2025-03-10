"use client";

import { ConsentWelcomeIos } from "./ios";
import { ConsentWelcomeAndroid } from "./android";
import { ConsentWelcomeWeb } from "./web";
import { useThemeStore } from "@/store/theme-store";

export const ConsentWelcome = () => {
  const { platform } = useThemeStore();
  if (platform === "ios") {
    return <ConsentWelcomeIos className='w-full h-full' />;
  } else if (platform === "android") {
    return <ConsentWelcomeAndroid className='w-full h-full' />;
  } else {
    return <ConsentWelcomeWeb className='w-full h-full' />;
  }
};
