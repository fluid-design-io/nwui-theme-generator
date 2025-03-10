import { Platform, Theme, ColorState } from "@/store/theme-store";
import Color, { ColorInstance } from "color";

type PrimaryGeneratedColors = Pick<
  ColorState,
  | "primary"
  | "primaryForeground"
  | "background"
  | "foreground"
  | "muted"
  | "mutedForeground"
  | "border"
  | "input"
  | "ring"
  | "grey6"
  | "grey5"
  | "grey4"
  | "grey3"
  | "grey2"
  | "grey"
>;

const contrastColor = (color: ColorInstance) => {
  return color.isLight() ? Color.hsl(0, 0, 0) : Color.hsl(0, 0, 100);
};

export const generateColorsFromPrimary = (
  primary: string,
  theme: Theme,
  platform: Platform,
  sync: boolean,
): Partial<Record<Theme, PrimaryGeneratedColors>> => {
  const primaryColor = Color(primary);

  /* 
  If sync is on, we will compute dark theme from light theme.
  If sync is off, we only compute the current theme.
  
  Future:
  - Different color logic for different platforms.
  */

  let light;
  let dark;

  //* Compute light theme if sync is on or theme is light
  if (theme === "light") {
    light = {
      primary: primaryColor.hex(),
      primaryForeground: contrastColor(primaryColor).hex(),
      background: primaryColor.lightness(97).hex(),
      foreground: contrastColor(primaryColor.lightness(97)).hex(),
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

    //* If user is adjusting light mode, calculate dark theme by inverting light theme if sync is on
    if (sync === true) {
      //* Adjust lightness to ensure it's not too dark
      const primaryDark = (function adjustLightness(
        color,
        depth = 0,
      ): ColorInstance {
        if (depth >= 10) return color; //* Prevent infinite loop

        const l = color.l();
        return l < 50
          ? adjustLightness(Color(color).lightness(l + 10), depth + 1)
          : color;
      })(primaryColor.blacken(0.1));

      dark = {
        primary: primaryDark.hex(),
        primaryForeground: contrastColor(primaryDark).hex(),
        background: primaryDark.lightness(3).hex(),
        foreground: contrastColor(primaryDark.lightness(3)).hex(),
        muted: primaryDark.lightness(5).desaturate(0.3).hex(),
        mutedForeground: primaryDark.lightness(60).desaturate(0.3).hex(),
        border: primaryDark.lightness(20).desaturate(0.5).hex(),
        input: primaryDark.lightness(25).desaturate(0.5).hex(),
        ring: primaryDark.lightness(20).desaturate(0.5).hex(),
        grey6: primaryDark.saturate(0.05).lightness(3).hex(),
        grey5: primaryDark.saturate(0.05).lightness(10).hex(),
        grey4: primaryDark.saturate(0.05).lightness(15).hex(),
        grey3: primaryDark.saturate(0.05).lightness(20).hex(),
        grey2: primaryDark.saturate(0.05).lightness(30).hex(),
        grey: primaryDark.saturate(0.05).lightness(40).hex(),
      };
    }
  }

  //* Compute dark theme if theme is dark
  if (theme === "dark") {
    dark = {
      primary: primaryColor.hex(),
      primaryForeground: contrastColor(primaryColor).hex(),
      background: primaryColor.lightness(3).hex(),
      foreground: contrastColor(primaryColor.lightness(3)).hex(),
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

    //* If user is adjusting dark mode, calculate light theme by inverting dark theme if sync is on
    if (sync === true) {
      const primaryLight = (function adjustLightness(
        color,
        depth = 0,
      ): ColorInstance {
        if (depth >= 10) return color; //* Prevent infinite loop

        const l = color.l();
        return l > 50
          ? adjustLightness(Color(color).lightness(l - 10), depth + 1)
          : color;
      })(primaryColor.whiten(0.1));

      light = {
        primary: primaryLight.hex(),
        primaryForeground: contrastColor(primaryLight).hex(),
        background: primaryLight.lightness(97).hex(),
        foreground: contrastColor(primaryLight.lightness(97)).hex(),
        muted: primaryLight.lightness(75).desaturate(0.3).hex(),
        mutedForeground: primaryLight.lightness(40).desaturate(0.3).hex(),
        border: primaryLight.lightness(90).desaturate(0.5).hex(),
        input: primaryLight.lightness(85).desaturate(0.5).hex(),
        ring: primaryLight.lightness(90).desaturate(0.5).hex(),
        grey6: primaryLight.saturate(0.05).lightness(97).hex(),
        grey5: primaryLight.saturate(0.05).lightness(90).hex(),
        grey4: primaryLight.saturate(0.05).lightness(85).hex(),
        grey3: primaryLight.saturate(0.05).lightness(80).hex(),
        grey2: primaryLight.saturate(0.05).lightness(70).hex(),
        grey: primaryLight.saturate(0.05).lightness(60).hex(),
      };
    }
  }

  return {
    ...(light && { light }),
    ...(dark && { dark }),
  };
};
