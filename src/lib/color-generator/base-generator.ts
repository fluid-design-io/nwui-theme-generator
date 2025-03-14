import { SyncStatePlatform } from "@/store/theme-store";
import {
  Platform,
  Theme,
  PrimaryGeneratedColors,
  SecondaryGeneratedColors,
  AccentGeneratedColors,
  MutedGeneratedColors,
  GrayScaleColors,
} from "./types";
import Color, { ColorInstance } from "color";

/**
 * Base color generator class that can be extended for different platforms
 */
export abstract class BaseColorGenerator {
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

  /**
   * Helper to get contrast color based on background color
   */
  protected contrastColor(color: ColorInstance, soften = 0): ColorInstance {
    return color.isLight()
      ? color.lightness(soften)
      : color.lightness(100 - soften);
  }

  /**
   * Adjust the lightness of a color to ensure it's not too dark or too light
   */
  protected adjustLightness(
    color: ColorInstance,
    minLightness: number,
    maxLightness: number,
  ): ColorInstance {
    const l = color.lightness();
    if (l < minLightness) return color.lightness(minLightness);
    if (l > maxLightness) return color.lightness(maxLightness);
    return color;
  }

  /**
   * Generate a brightened version of a color for light theme
   */
  protected lightVariant(color: ColorInstance, depth = 0): ColorInstance {
    if (depth >= 10) return color; // Prevent infinite loop
    const l = color.l();
    return l > 50
      ? this.lightVariant(Color(color).lightness(l - 10), depth + 1)
      : color;
  }

  /**
   * Generate a darkened version of a color for dark theme
   */
  protected darkVariant(color: ColorInstance, depth = 0): ColorInstance {
    if (depth >= 10) return color; // Prevent infinite loop
    const l = color.l();
    return l < 50
      ? this.darkVariant(Color(color).lightness(l + 10), depth + 1)
      : color;
  }

  /**
   * Generate shades of grey based on a color
   */
  protected generateGreyScale(
    baseColor: ColorInstance,
    isLight: boolean,
  ): Record<GrayScaleColors, string> {
    const l = baseColor.l();
    if (isLight) {
      return {
        grey6: baseColor
          .desaturate(0.95)
          .lightness(96 + 0.025 * l)
          .hex(),
        grey5: baseColor
          .desaturate(0.95)
          .lightness(92 + 0.025 * l)
          .hex(),
        grey4: baseColor
          .desaturate(0.95)
          .lightness(88 + 0.025 * l)
          .hex(),
        grey3: baseColor
          .desaturate(0.95)
          .lightness(82 + 0.025 * l)
          .hex(),
        grey2: baseColor
          .desaturate(0.95)
          .lightness(70 + 0.025 * l)
          .hex(),
        grey: baseColor
          .desaturate(0.95)
          .lightness(62 + 0.025 * l)
          .hex(),
      };
    }
    return {
      grey6: baseColor
        .desaturate(0.95)
        .lightness(9 + 0.03 * l)
        .hex(),
      grey5: baseColor
        .desaturate(0.95)
        .lightness(15 + 0.05 * l)
        .hex(),
      grey4: baseColor
        .desaturate(0.95)
        .lightness(20 + 0.05 * l)
        .hex(),
      grey3: baseColor
        .desaturate(0.95)
        .lightness(28 + 0.05 * l)
        .hex(),
      grey2: baseColor
        .desaturate(0.95)
        .lightness(45 + 0.05 * l)
        .hex(),
      grey: baseColor
        .desaturate(0.95)
        .lightness(60 + 0.05 * l)
        .hex(),
    };
  }

  /**
   * Abstract methods to be implemented by platform-specific generators
   */
  abstract generateFromPrimary(
    primary: string,
  ): Partial<Record<Theme, PrimaryGeneratedColors>>;

  abstract generateFromSecondary(
    secondary: string,
  ): Partial<Record<Theme, SecondaryGeneratedColors>>;

  abstract generateFromAccent(
    accent: string,
  ): Partial<Record<Theme, AccentGeneratedColors>>;

  abstract generateFromMuted(
    muted: string,
  ): Partial<Record<Theme, MutedGeneratedColors>>;
}
