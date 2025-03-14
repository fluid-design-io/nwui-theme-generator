"use client";

import { MessagingAndroid } from "./android";
import { MessagingIos } from "./ios";
import { useThemeStore } from "@/store/theme-store";
import { MessagingWeb } from "./web";

const platformComponents = {
  ios: MessagingIos,
  android: MessagingAndroid,
  web: MessagingWeb,
};

export const Messaging = () => {
  const platform = useThemeStore((state) => state.platform);
  const Component = platformComponents[platform];
  return <Component className="h-full w-full" />;
};
