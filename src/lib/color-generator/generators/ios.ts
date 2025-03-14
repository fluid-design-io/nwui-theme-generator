import Color from "color";
import { BaseColorGenerator } from "../base-generator";
import {
  Theme,
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
  ): Partial<Record<Theme, PrimaryGeneratedColors>> {
    let lightPrimaryColor;
    let darkPrimaryColor;

    // Assign colors based on theme
    if (this.theme === "light") {
      lightPrimaryColor = Color(primary);
      darkPrimaryColor = this.darkVariant(lightPrimaryColor);
    } else {
      darkPrimaryColor = Color(primary);
      lightPrimaryColor = this.lightVariant(darkPrimaryColor);
    }

    let dark;
    let light;

    // Generate base light and dark theme if sync is not "none"
    if (this.sync.primary !== "off") {
      light = {
        primary: lightPrimaryColor.hex(),
        primaryForeground: this.contrastColor(lightPrimaryColor, 3).hex(),
      };
      dark = {
        primary: darkPrimaryColor.hex(),
        primaryForeground: this.contrastColor(darkPrimaryColor).hex(),
      };
    } else {
      // Generate light or dark theme based on current theme
      if (this.theme === "light") {
        light = {
          primary: lightPrimaryColor.hex(),
          primaryForeground: this.contrastColor(lightPrimaryColor, 3).hex(),
        };
      } else {
        dark = {
          primary: darkPrimaryColor.hex(),
          primaryForeground: this.contrastColor(darkPrimaryColor).hex(),
        };
      }
    }

    // Generate whole theme if sync is set to all
    if (this.sync.primary === "auto") {
      const l = lightPrimaryColor.l();
      Object.assign(light || {}, {
        background: lightPrimaryColor
          .desaturate(0.8)
          .lightness(95 + 0.035 * l)
          .hex(),
        foreground: this.contrastColor(
          lightPrimaryColor.desaturate(0.8).lightness(95 + 0.035 * l),
          0.035 * (100 - l),
        ).hex(),
        muted: lightPrimaryColor
          .desaturate(0.85)
          .lightness(82 + 0.05 * l)
          .hex(),
        mutedForeground: lightPrimaryColor
          .desaturate(0.85)
          .lightness(40 + 0.05 * l)
          .hex(),
        card: lightPrimaryColor
          .lightness(98.5 + 0.035 * l) // allow overflow of lightness (will cap at 100)
          .desaturate(0.3)
          .hex(),
        cardForeground: this.contrastColor(
          lightPrimaryColor.lightness(98.5 + 0.035 * l),
          0.06 * (100 - l),
        ).hex(),
        popover: lightPrimaryColor
          .lightness(94 + 0.035 * l) // allow overflow of lightness (will cap at 100)
          .desaturate(0.3)
          .hex(),
        popoverForeground: this.contrastColor(
          lightPrimaryColor.lightness(94 + 0.035 * l),
          0.06 * (100 - l),
        ).hex(),
        border: lightPrimaryColor
          .lightness(92 + 0.02 * l)
          .desaturate(0.7)
          .hex(),
        ring: lightPrimaryColor
          .lightness(92 + 0.02 * l)
          .desaturate(0.7)
          .hex(),
        input: lightPrimaryColor
          .lightness(83 + 0.02 * l)
          .desaturate(0.7)
          .hex(),
        ...this.generateGreyScale(lightPrimaryColor, true),
      });
      Object.assign(dark || {}, {
        background: darkPrimaryColor.lightness(0.025 * (100 - l) - 0.35).hex(), // allow negative lightness (will truncate at 0)
        foreground: this.contrastColor(
          darkPrimaryColor.lightness(0.025 * (100 - l) - 0.35),
          0.035 * (100 - l),
        ).hex(),
        muted: darkPrimaryColor
          .lightness(37 + 0.035 * l)
          .desaturate(0.88)
          .hex(),
        mutedForeground: darkPrimaryColor
          .lightness(77 + 0.035 * l)
          .desaturate(0.88)
          .hex(),
        card: darkPrimaryColor
          .lightness(10 + 0.035 * l)
          .desaturate(0.6)
          .hex(),
        cardForeground: this.contrastColor(
          darkPrimaryColor.lightness(10 + 0.035 * l),
          0.035 * (100 - l),
        ).hex(),
        popover: darkPrimaryColor
          .lightness(15 + 0.035 * l)
          .desaturate(0.88)
          .hex(),
        popoverForeground: this.contrastColor(
          darkPrimaryColor.lightness(15 + 0.035 * l),
          0.035 * (100 - l),
        ).hex(),
        border: darkPrimaryColor
          .lightness(23 + 0.035 * l)
          .desaturate(0.88)
          .hex(),
        input: darkPrimaryColor
          .lightness(28 + 0.035 * l)
          .desaturate(0.88)
          .hex(),
        ring: darkPrimaryColor
          .lightness(23 + 0.035 * l)
          .desaturate(0.88)
          .hex(),
        ...this.generateGreyScale(darkPrimaryColor, false),
      });
    }

    return {
      ...(light && { light }),
      ...(dark && { dark }),
    };
  }

  generateFromSecondary(
    secondary: string,
  ): Partial<Record<Theme, SecondaryGeneratedColors>> {
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
  ): Partial<Record<Theme, AccentGeneratedColors>> {
    const accentColor = Color(accent);
    let light;
    let dark;

    if (this.theme === "light" || this.sync) {
      light = {
        accent: accentColor.hex(),
        accentForeground: this.contrastColor(accentColor, 20).hex(),
      };
    }

    if (this.theme === "dark" || this.sync) {
      const darkAccentColor =
        this.theme === "light" && this.sync
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

  generateFromMuted(
    muted: string,
  ): Partial<Record<Theme, MutedGeneratedColors>> {
    const mutedColor = Color(muted);
    let light;
    let dark;

    if (this.theme === "light" || this.sync) {
      light = {
        muted: mutedColor.hex(),
        mutedForeground: this.contrastColor(mutedColor, 30).hex(),
      };
    }

    if (this.theme === "dark" || this.sync) {
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
