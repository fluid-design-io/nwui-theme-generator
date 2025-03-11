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

/**
 * Web platform color generator
 */
export class WebColorGenerator extends BaseColorGenerator {
  constructor(theme: Theme, sync: boolean) {
    super("web", theme, sync);
  }

  generateFromPrimary(
    primary: string,
  ): ColorGeneratorResult<PrimaryGeneratedColors> {
    const primaryColor = Color(primary);
    let light;
    let dark;

    // Generate light theme
    if (this.theme === "light" || this.sync) {
      light = {
        primary: primaryColor.hex(),
        primaryForeground: this.contrastColor(primaryColor).hex(),
        background: primaryColor.lightness(97).hex(),
        foreground: this.contrastColor(primaryColor.lightness(97)).hex(),
        muted: primaryColor.lightness(75).desaturate(0.3).hex(),
        mutedForeground: primaryColor.lightness(40).desaturate(0.3).hex(),
        border: primaryColor.lightness(90).desaturate(0.5).hex(),
        input: primaryColor.lightness(85).desaturate(0.5).hex(),
        ring: primaryColor.lightness(90).desaturate(0.5).hex(),
        ...this.generateGreyScale(primaryColor, true),
      };
    }

    // Generate dark theme
    if (this.theme === "dark" || this.sync) {
      const darkPrimaryColor =
        this.theme === "light" && this.sync
          ? this.darkVariant(primaryColor.blacken(0.1))
          : primaryColor;

      dark = {
        primary: darkPrimaryColor.hex(),
        primaryForeground: this.contrastColor(darkPrimaryColor).hex(),
        background: darkPrimaryColor.lightness(3).hex(),
        foreground: this.contrastColor(darkPrimaryColor.lightness(3)).hex(),
        muted: darkPrimaryColor.lightness(5).desaturate(0.3).hex(),
        mutedForeground: darkPrimaryColor.lightness(60).desaturate(0.3).hex(),
        border: darkPrimaryColor.lightness(20).desaturate(0.5).hex(),
        input: darkPrimaryColor.lightness(25).desaturate(0.5).hex(),
        ring: darkPrimaryColor.lightness(20).desaturate(0.5).hex(),
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

    if (this.theme === "light" || this.sync) {
      light = {
        secondary: secondaryColor.hex(),
        secondaryForeground: this.contrastColor(secondaryColor, 20).hex(),
      };
    }

    if (this.theme === "dark" || this.sync) {
      const darkSecondaryColor =
        this.theme === "light" && this.sync
          ? this.darkVariant(secondaryColor.blacken(0.1))
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

    if (this.theme === "light" || this.sync) {
      light = {
        accent: accentColor.hex(),
        accentForeground: this.contrastColor(accentColor).hex(),
      };
    }

    if (this.theme === "dark" || this.sync) {
      const darkAccentColor =
        this.theme === "light" && this.sync
          ? this.darkVariant(accentColor.blacken(0.1))
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

    if (this.theme === "light" || this.sync) {
      light = {
        muted: mutedColor.lightness(91).desaturate(0.75).hex(),
        mutedForeground: mutedColor.lightness(58).desaturate(0.2).hex(),
      };
    }

    if (this.theme === "dark" || this.sync) {
      dark = {
        muted: mutedColor.lightness(14).desaturate(0.2).hex(),
        mutedForeground: mutedColor.lightness(65).desaturate(0.2).hex(),
      };
    }

    return {
      ...(light && { light }),
      ...(dark && { dark }),
    };
  }
}
