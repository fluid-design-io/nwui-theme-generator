"use client";

import { ConsentWelcomeIos } from "./ios";
import { ConsentWelcomeAndroid } from "./android";
import { ConsentWelcomeWeb } from "./web";
import { useThemeStore } from "@/store/theme-store";

const platformComponents = {
  ios: ConsentWelcomeIos,
  android: ConsentWelcomeAndroid,
  web: ConsentWelcomeWeb,
};

export const ConsentWelcome = () => {
  const platform = useThemeStore((state) => state.platform);
  const Component = platformComponents[platform];
  return <Component className="h-full w-full" />;
};
