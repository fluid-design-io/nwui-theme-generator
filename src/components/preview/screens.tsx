"use client";

import { previewAtom } from "./dropdown";
import { useAtomValue } from "jotai";
import { Messaging } from "./svg/messaging";
import { ConsentWelcome } from "./svg/consent-welcome";
import { ColorGrid } from "./svg/color-grid";

export const PreviewScreens = () => {
  const screen = useAtomValue(previewAtom);
  if (screen === "color-grid") return <ColorGrid />;
  if (screen === "messaging") return <Messaging />;
  if (screen === "consent") return <ConsentWelcome />;
};
