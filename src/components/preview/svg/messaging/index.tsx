"use client";

import { MessagingAndroid } from "./android";
import { MessagingIos } from "./ios";
import { useThemeStore } from "@/store/theme-store";

export const Messaging = () => {
  const { platform } = useThemeStore();
  if (platform === "ios") {
    return <MessagingIos className="h-full w-full" />;
  } else if (platform === "android") {
    return <MessagingAndroid className="h-full w-full" />;
  } else {
    return <MessagingAndroid className="h-full w-full" />;
  }
};
