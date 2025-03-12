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

import { SyncStatePlatform } from "@/store/theme-store";

/**
 * iOS platform color generator with iOS design system inspired colors
 */
export class IOSColorGenerator extends BaseColorGenerator {
  constructor(theme: Theme, sync: SyncStatePlatform["ios"]) {
    super("ios", theme, sync);
  }

  generateFromPrimary(
    primary: string,
  ): ColorGeneratorResult<PrimaryGeneratedColors> {
    const primaryColor = Color(primary);
    let light;
    let dark;

    // Generate light theme (iOS inspired)
    if (this.theme === "light" || this.sync.primary === "all") {
      light = {
        primary: primaryColor.hex(),
        primaryForeground: this.contrastColor(primaryColor, 3).hex(),
        background: primaryColor.lightness(99.5).hex(),
        foreground: this.contrastColor(primaryColor.lightness(98)).hex(),
        muted: primaryColor.lightness(91).desaturate(0.75).hex(),
        mutedForeground: primaryColor.lightness(58).desaturate(0.2).hex(),
        border: primaryColor.lightness(92).desaturate(0.3).hex(),
        input: primaryColor.lightness(88).desaturate(0.3).hex(),
        ring: primaryColor.lightness(85).desaturate(0.2).hex(),
        // iOS-style grey scale (slightly cooler)
        grey6: Color("#F8F9FA").hex(),
        grey5: Color("#F1F3F5").hex(),
        grey4: Color("#E9ECEF").hex(),
        grey3: Color("#DEE2E6").hex(),
        grey2: Color("#CED4DA").hex(),
        grey: Color("#ADB5BD").hex(),
      };
    }

    // Generate dark theme (iOS inspired)
    if (this.theme === "dark" || this.sync.primary === "all") {
      const darkPrimaryColor =
        this.theme === "light" && this.sync.primary !== "none"
          ? this.darkVariant(primaryColor.blacken(0.05))
          : primaryColor;

      dark = {
        primary: darkPrimaryColor.hex(),
        primaryForeground: this.contrastColor(darkPrimaryColor).hex(),
        background: darkPrimaryColor.lightness(0).hex(),
        foreground: this.contrastColor(darkPrimaryColor.lightness(4)).hex(),
        muted: darkPrimaryColor.lightness(14).desaturate(0.2).hex(),
        mutedForeground: darkPrimaryColor.lightness(65).desaturate(0.2).hex(),
        border: darkPrimaryColor.lightness(25).desaturate(0.3).hex(),
        input: darkPrimaryColor.lightness(30).desaturate(0.3).hex(),
        ring: darkPrimaryColor.lightness(25).desaturate(0.2).hex(),
        // iOS-style dark grey scale
        grey6: Color("#1A1C1E").hex(),
        grey5: Color("#26282B").hex(),
        grey4: Color("#2F3237").hex(),
        grey3: Color("#3D4144").hex(),
        grey2: Color("#52575C").hex(),
        grey: Color("#6C7177").hex(),
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
          ? this.darkVariant(secondaryColor.blacken(0.05))
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
        accentForeground: this.contrastColor(accentColor, 20).hex(),
      };
    }

    if (this.theme === "dark" || this.sync.accent === "dark") {
      const darkAccentColor =
        this.theme === "light" && this.sync.accent === "dark"
          ? this.darkVariant(accentColor.blacken(0.05))
          : accentColor;

      dark = {
        accent: darkAccentColor.hex(),
        accentForeground: this.contrastColor(darkAccentColor, 20).hex(),
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
        muted: mutedColor.hex(),
        mutedForeground: this.contrastColor(mutedColor, 30).hex(),
      };
    }

    if (this.theme === "dark" || this.sync.muted === "dark") {
      dark = {
        muted: mutedColor.hex(),
        mutedForeground: this.contrastColor(mutedColor, 30).hex(),
      };
    }

    return {
      ...(light && { light }),
      ...(dark && { dark }),
    };
  }
}
