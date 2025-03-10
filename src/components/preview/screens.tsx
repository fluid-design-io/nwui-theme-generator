"use client";

import { previewAtom } from "./dropdown";
import { useAtomValue } from "jotai";
import { Messaging } from "./svg/messaging";
import { ConsentWelcome } from "./svg/consent-welcome";

export const PreviewScreens = () => {
  const screen = useAtomValue(previewAtom);
  if (screen === "messaging") return <Messaging />;
  return <ConsentWelcome />;
};
