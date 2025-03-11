export * from "./types";
export * from "./base-generator";
export * from "./generators/web";
export * from "./generators/ios";
export * from "./generators/android";
export * from "./utils/color-utils";

import { Platform, Theme } from "./types";
import { WebColorGenerator } from "./generators/web";
import { BaseColorGenerator } from "./base-generator";
import { IOSColorGenerator } from "./generators/ios";
import { AndroidColorGenerator } from "./generators/android";

/**
 * Factory function to get the appropriate color generator based on platform
 */
export function getColorGenerator(
  platform: Platform,
  theme: Theme,
  sync: boolean,
): BaseColorGenerator {
  switch (platform) {
    case "ios":
      return new IOSColorGenerator(theme, sync);
    case "android":
      return new AndroidColorGenerator(theme, sync);
    case "web":
    default:
      return new WebColorGenerator(theme, sync);
  }
}

export type ColorGenerator = ReturnType<typeof getColorGenerator>;
export type PrimaryColorGenerator = ReturnType<
  ColorGenerator["generateFromPrimary"]
>;
export type SecondaryColorGenerator = ReturnType<
  ColorGenerator["generateFromSecondary"]
>;
export type AccentColorGenerator = ReturnType<
  ColorGenerator["generateFromAccent"]
>;
export type MutedColorGenerator = ReturnType<
  ColorGenerator["generateFromMuted"]
>;
