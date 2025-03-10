import { Platform, ColorState, Theme } from "@/store/theme-store";
import Color, { ColorInstance } from "color";

const contrastColor = (color: ColorInstance) => {
  return color.isLight() ? Color.hsl(0, 0, 0) : Color.hsl(0, 0, 100);
};

export const generateColorsFromPrimary = (
  primary: string,
  theme: Theme,
  platform: Platform
): Partial<ColorState> => {
  const primaryColor = Color(primary);
  const isLight = theme === "light";

  if (platform === "ios") {
    const background = isLight
      ? primaryColor.lightness(97)
      : primaryColor.lightness(3);
    const foreground = contrastColor(background);
    if (isLight) {
      return {
        primary: primaryColor.hex(),
        primaryForeground: contrastColor(primaryColor).hex(),
        background: background.hex(),
        foreground: foreground.hex(),
        muted: primaryColor.lightness(75).desaturate(0.3).hex(),
        mutedForeground: primaryColor.lightness(40).desaturate(0.3).hex(),
        border: primaryColor.lightness(90).desaturate(0.5).hex(),
        input: primaryColor.lightness(85).desaturate(0.5).hex(),
        ring: primaryColor.lightness(90).desaturate(0.5).hex(),
        grey6: primaryColor.saturate(0.05).lightness(97).hex(),
        grey5: primaryColor.saturate(0.05).lightness(90).hex(),
        grey4: primaryColor.saturate(0.05).lightness(85).hex(),
        grey3: primaryColor.saturate(0.05).lightness(80).hex(),
        grey2: primaryColor.saturate(0.05).lightness(70).hex(),
        grey: primaryColor.saturate(0.05).lightness(60).hex(),
      };
    }
    return {
      primary: primaryColor.hex(),
      primaryForeground: contrastColor(primaryColor).hex(),
      background: background.hex(),
      foreground: foreground.hex(),
      muted: primaryColor.lightness(5).desaturate(0.3).hex(),
      mutedForeground: primaryColor.lightness(60).desaturate(0.3).hex(),
      border: primaryColor.lightness(20).desaturate(0.5).hex(),
      input: primaryColor.lightness(25).desaturate(0.5).hex(),
      ring: primaryColor.lightness(20).desaturate(0.5).hex(),
      grey6: primaryColor.saturate(0.05).lightness(3).hex(),
      grey5: primaryColor.saturate(0.05).lightness(10).hex(),
      grey4: primaryColor.saturate(0.05).lightness(15).hex(),
      grey3: primaryColor.saturate(0.05).lightness(20).hex(),
      grey2: primaryColor.saturate(0.05).lightness(30).hex(),
      grey: primaryColor.saturate(0.05).lightness(40).hex(),
    };
  }

  const background = isLight
    ? primaryColor.lightness(98)
    : primaryColor.lightness(5);
  const foreground = contrastColor(background);

  if (isLight) {
    return {
      primary: primaryColor.hex(),
      primaryForeground: contrastColor(primaryColor).hex(),
      background: background.hex(),
      foreground: foreground.hex(),
      muted: primaryColor.lightness(70).desaturate(0.36).hex(),
      mutedForeground: primaryColor.lightness(40).desaturate(0.36).hex(),
      border: primaryColor.lightness(90).desaturate(0.5).hex(),
      input: primaryColor.lightness(85).desaturate(0.5).hex(),
      ring: primaryColor.lightness(90).desaturate(0.5).hex(),
      grey6: primaryColor.saturate(0.05).lightness(97).hex(),
      grey5: primaryColor.saturate(0.05).lightness(90).hex(),
      grey4: primaryColor.saturate(0.05).lightness(85).hex(),
      grey3: primaryColor.saturate(0.05).lightness(80).hex(),
      grey2: primaryColor.saturate(0.05).lightness(70).hex(),
      grey: primaryColor.saturate(0.05).lightness(60).hex(),
    };
  }
  return {
    primary: primaryColor.hex(),
    primaryForeground: contrastColor(primaryColor).hex(),
    background: background.hex(),
    foreground: foreground.hex(),
    muted: primaryColor.lightness(15).desaturate(0.3).hex(),
    mutedForeground: primaryColor.lightness(65).desaturate(0.3).hex(),
    border: primaryColor.lightness(20).desaturate(0.5).hex(),
    input: primaryColor.lightness(25).desaturate(0.5).hex(),
    ring: primaryColor.lightness(20).desaturate(0.5).hex(),
    grey6: primaryColor.saturate(0.05).lightness(3).hex(),
    grey5: primaryColor.saturate(0.05).lightness(10).hex(),
    grey4: primaryColor.saturate(0.05).lightness(15).hex(),
    grey3: primaryColor.saturate(0.05).lightness(20).hex(),
    grey2: primaryColor.saturate(0.05).lightness(30).hex(),
    grey: primaryColor.saturate(0.05).lightness(40).hex(),
  };
};
