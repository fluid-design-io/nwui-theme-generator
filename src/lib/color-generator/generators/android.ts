import Color from "color";
import { BaseColorGenerator } from "../base-generator";
import {
  Theme,
  ColorGeneratorResult,
  PrimaryGeneratedColors,
  SecondaryGeneratedColors,
  AccentGeneratedColors,
  MutedGeneratedColors,
} from "../types";
import { generateGreyScaleAndroid } from "../utils/color-utils";
import { SyncStatePlatform } from "@/store/theme-store";
/**
 * Android platform color generator with Material Design inspired colors
 */
export class AndroidColorGenerator extends BaseColorGenerator {
  constructor(theme: Theme, sync: SyncStatePlatform["android"]) {
    super("android", theme, sync);
  }

  generateFromPrimary(
    primary: string,
  ): ColorGeneratorResult<PrimaryGeneratedColors> {
    const primaryColor = Color(primary);
    let light;
    let dark;

    // Generate light theme (Material Design 3 inspired)
    if (this.theme === "light" || this.sync.primary === "all") {
      light = {
        primary: primaryColor.hex(),
        primaryForeground: this.contrastColor(primaryColor).hex(),
        background: Color("#FAFAFA").hex(), // Material light background
        foreground: Color("#212121").hex(), // Material dark text
        muted: primaryColor.lightness(95).desaturate(0.5).hex(),
        mutedForeground: primaryColor.lightness(30).desaturate(0.3).hex(),
        border: primaryColor.lightness(85).desaturate(0.6).hex(),
        input: primaryColor.lightness(90).desaturate(0.5).hex(),
        ring: primaryColor.alpha(0.5).hex(),
        // Material Design inspired grey scale
        ...generateGreyScaleAndroid(primaryColor, true),
      };
    }

    // Generate dark theme (Material Design 3 inspired)
    if (this.theme === "dark" || this.sync.primary === "all") {
      const darkPrimaryColor =
        this.theme === "light" && this.sync.primary !== "none"
          ? this.darkVariant(primaryColor)
          : primaryColor;

      dark = {
        primary: darkPrimaryColor.hex(),
        primaryForeground: this.contrastColor(darkPrimaryColor).hex(),
        background: Color("#121212").hex(), // Material dark background
        foreground: Color("#E0E0E0").hex(), // Material light text
        muted: darkPrimaryColor.lightness(15).desaturate(0.3).hex(),
        mutedForeground: darkPrimaryColor.lightness(70).desaturate(0.2).hex(),
        border: darkPrimaryColor.lightness(25).desaturate(0.5).hex(),
        input: darkPrimaryColor.lightness(20).desaturate(0.4).hex(),
        ring: darkPrimaryColor.alpha(0.5).hex(),
        // Material Design inspired dark grey scale
        ...generateGreyScaleAndroid(primaryColor, false),
      };
    }

    return {
      ...(light && { light }),
      ...(dark && { dark }),
    };
  }

  generateFromSecondary(
    secondary: string,
  ): ColorGeneratorResult<SecondaryGeneratedColors> {
    const secondaryColor = Color(secondary);
    let light;
    let dark;

    if (this.theme === "light" || this.sync.secondary === "dark") {
      light = {
        secondary: secondaryColor.hex(),
        secondaryForeground: this.contrastColor(secondaryColor, 20).hex(),
      };
    }

    if (this.theme === "dark" || this.sync.secondary === "dark") {
      const darkSecondaryColor =
        this.theme === "light" && this.sync.secondary === "dark"
          ? this.darkVariant(secondaryColor)
          : secondaryColor;

      dark = {
        secondary: darkSecondaryColor.hex(),
        secondaryForeground: this.contrastColor(darkSecondaryColor, 20).hex(),
      };
    }

    return {
      ...(light && { light }),
      ...(dark && { dark }),
    };
  }

  generateFromAccent(
    accent: string,
  ): ColorGeneratorResult<AccentGeneratedColors> {
    const accentColor = Color(accent);
    let light;
    let dark;

    if (this.theme === "light" || this.sync.accent === "dark") {
      light = {
        accent: accentColor.hex(),
        accentForeground: this.contrastColor(accentColor).hex(),
      };
    }

    if (this.theme === "dark" || this.sync.accent === "dark") {
      const darkAccentColor =
        this.theme === "light" && this.sync.accent === "dark"
          ? this.darkVariant(accentColor)
          : accentColor;

      dark = {
        accent: darkAccentColor.hex(),
        accentForeground: this.contrastColor(darkAccentColor).hex(),
      };
    }

    return {
      ...(light && { light }),
      ...(dark && { dark }),
    };
  }

  generateFromMuted(muted: string): ColorGeneratorResult<MutedGeneratedColors> {
    const mutedColor = Color(muted);
    let light;
    let dark;

    if (this.theme === "light" || this.sync.muted === "dark") {
      light = {
        muted: mutedColor.lightness(95).desaturate(0.5).hex(),
        mutedForeground: mutedColor.lightness(30).desaturate(0.3).hex(),
      };
    }

    if (this.theme === "dark" || this.sync.muted === "dark") {
      dark = {
        muted: mutedColor.lightness(15).desaturate(0.3).hex(),
        mutedForeground: mutedColor.lightness(70).desaturate(0.2).hex(),
      };
    }

    return {
      ...(light && { light }),
      ...(dark && { dark }),
    };
  }
}
