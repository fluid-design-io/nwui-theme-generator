import { SyncStatePlatform } from "@/store/theme-store";
import { Platform, Theme, ColorGeneratorInterface } from "./types";
import {
  getContrastColor,
  adjustLightness,
  getLightVariant,
  getDarkVariant,
  generateGreyScaleIos,
} from "./utils/color-utils";

/**
 * Base color generator class that can be extended for different platforms
 */
export abstract class BaseColorGenerator implements ColorGeneratorInterface {
  protected platform: Platform;
  protected theme: Theme;
  protected sync: SyncStatePlatform[Platform];

  constructor(
    platform: Platform,
    theme: Theme,
    sync: SyncStatePlatform[Platform],
  ) {
    this.platform = platform;
    this.theme = theme;
    this.sync = sync;
  }

  // Expose utility methods for derived classes
  protected contrastColor = getContrastColor;
  protected adjustLightness = adjustLightness;
  protected lightVariant = getLightVariant;
  protected darkVariant = getDarkVariant;
  protected generateGreyScale = generateGreyScaleIos;

  // Abstract methods to be implemented by platform-specific generators
  abstract generateFromPrimary(
    primary: string,
  ): ReturnType<ColorGeneratorInterface["generateFromPrimary"]>;
  abstract generateFromSecondary(
    secondary: string,
  ): ReturnType<ColorGeneratorInterface["generateFromSecondary"]>;
  abstract generateFromAccent(
    accent: string,
  ): ReturnType<ColorGeneratorInterface["generateFromAccent"]>;
  abstract generateFromMuted(
    muted: string,
  ): ReturnType<ColorGeneratorInterface["generateFromMuted"]>;
}
