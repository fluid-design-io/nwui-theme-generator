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
 * Web platform color generator
 */
export class WebColorGenerator extends BaseColorGenerator {
  constructor(theme: Theme, sync: SyncStatePlatform["web"]) {
    super("web", theme, sync);
  }

  generateFromPrimary(
    primary: string,
  ): ColorGeneratorResult<PrimaryGeneratedColors> {
    const primaryColor = Color(primary);
    let light;
    let dark;

    // Generate light theme
    if (this.theme === "light" || this.sync.primary === "auto") {
      const l = primaryColor.l();
      light = {
        primary: primaryColor.hex(),
        primaryForeground: this.contrastColor(primaryColor, 4.5).hex(),
        background: primaryColor
          .desaturate(0.15)
          .lightness(98 + 0.012 * l)
          .hex(),
        foreground: this.contrastColor(
          primaryColor.desaturate(0.92).lightness(98 + 0.012 * l),
          0.13 * (100 - l),
        ).hex(),
        muted: primaryColor
          .desaturate(0.8)
          .lightness(85 + 0.04 * l)
          .hex(),
        mutedForeground: primaryColor
          .desaturate(0.8)
          .lightness(35 + 0.08 * l)
          .hex(),
        border: primaryColor
          .lightness(92 + 0.02 * l)
          .desaturate(0.9)
          .hex(),
        input: primaryColor
          .lightness(95 + 0.02 * l)
          .desaturate(0.85)
          .hex(),
        ring: primaryColor
          .lightness(88 + 0.02 * l)
          .desaturate(0.85)
          .hex(),
        ...this.generateGreyScale(primaryColor, true),
      };
    }

    // Generate dark theme
    if (this.theme === "dark" || this.sync.primary === "auto") {
      const darkPrimaryColor =
        this.theme === "light" && this.sync.primary !== "off"
          ? this.darkVariant(primaryColor.blacken(0.1))
          : primaryColor;

      const l = darkPrimaryColor.l();
      dark = {
        primary: darkPrimaryColor.hex(),
        primaryForeground: this.contrastColor(darkPrimaryColor, 4.5).hex(),
        background: darkPrimaryColor
          .desaturate(0.8)
          .lightness(8 + 0.015 * (100 - l))
          .hex(),
        foreground: this.contrastColor(
          darkPrimaryColor.desaturate(0.75).lightness(8 + 0.015 * (100 - l)),
          10 + 0.02 * (100 - l),
        ).hex(),
        muted: darkPrimaryColor
          .lightness(12 + 0.02 * l)
          .desaturate(0.9)
          .hex(),
        mutedForeground: darkPrimaryColor
          .lightness(82 + 0.02 * l)
          .desaturate(0.85)
          .hex(),
        border: darkPrimaryColor
          .lightness(22 + 0.02 * l)
          .desaturate(0.9)
          .hex(),
        input: darkPrimaryColor
          .lightness(18 + 0.02 * l)
          .desaturate(0.85)
          .hex(),
        ring: darkPrimaryColor
          .lightness(28 + 0.02 * l)
          .desaturate(0.85)
          .hex(),
        ...this.generateGreyScale(darkPrimaryColor, false),
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
        secondaryForeground: this.contrastColor(secondaryColor, 4.5).hex(),
      };
    }

    if (this.theme === "dark" || this.sync.secondary === "dark") {
      const darkSecondaryColor =
        this.theme === "light" && this.sync.secondary === "dark"
          ? this.darkVariant(secondaryColor.blacken(0.08))
          : secondaryColor;

      dark = {
        secondary: darkSecondaryColor.hex(),
        secondaryForeground: this.contrastColor(darkSecondaryColor, 4.5).hex(),
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
        accent: accentColor.saturate(0.1).hex(),
        accentForeground: this.contrastColor(accentColor, 4.5).hex(),
      };
    }

    if (this.theme === "dark" || this.sync.accent === "dark") {
      const darkAccentColor =
        this.theme === "light" && this.sync.accent === "dark"
          ? this.darkVariant(accentColor.blacken(0.08))
          : accentColor;

      dark = {
        accent: darkAccentColor.saturate(0.1).hex(),
        accentForeground: this.contrastColor(darkAccentColor, 4.5).hex(),
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
      const l = mutedColor.l();
      light = {
        muted: mutedColor
          .lightness(92 + 0.02 * l)
          .desaturate(0.8)
          .hex(),
        mutedForeground: mutedColor
          .lightness(40 + 0.08 * l)
          .desaturate(0.25)
          .hex(),
      };
    }

    if (this.theme === "dark" || this.sync.muted === "dark") {
      const l = mutedColor.l();
      dark = {
        muted: mutedColor
          .lightness(15 + 0.02 * l)
          .desaturate(0.25)
          .hex(),
        mutedForeground: mutedColor
          .lightness(70 + 0.02 * l)
          .desaturate(0.25)
          .hex(),
      };
    }

    return {
      ...(light && { light }),
      ...(dark && { dark }),
    };
  }
}
