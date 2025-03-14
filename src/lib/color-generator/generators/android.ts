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
 * Android platform color generator with Material Design inspired colors
 */
export class AndroidColorGenerator extends BaseColorGenerator {
  constructor(theme: Theme, sync: SyncStatePlatform["android"]) {
    super("android", theme, sync);
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
          .desaturate(0.2)
          .lightness(98 + 0.015 * l)
          .hex(),
        foreground: this.contrastColor(
          lightPrimaryColor.desaturate(0.95).lightness(98 + 0.015 * l),
          0.11 * (100 - l),
        ).hex(),
        muted: lightPrimaryColor
          .desaturate(0.85)
          .lightness(82 + 0.05 * l)
          .hex(),
        mutedForeground: lightPrimaryColor
          .desaturate(0.85)
          .lightness(30 + 0.1 * l)
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
          .lightness(45 + 0.03 * l)
          .desaturate(0.95)
          .hex(),
        ring: lightPrimaryColor
          .lightness(45 + 0.03 * l)
          .desaturate(0.95)
          .hex(),
        input: lightPrimaryColor
          .lightness(75 + 0.04 * l)
          .desaturate(0.9)
          .hex(),
        grey6: lightPrimaryColor.lightness(97 + 0.02 * l).hex(),
        grey5: lightPrimaryColor
          .desaturate(0.47)
          .lightness(95 + 0.02 * l)
          .hex(),
        grey4: lightPrimaryColor
          .desaturate(0.54)
          .lightness(93 + 0.02 * l)
          .hex(),
        grey3: lightPrimaryColor
          .desaturate(0.55)
          .lightness(92 + 0.02 * l)
          .hex(),
        grey2: lightPrimaryColor
          .desaturate(0.56)
          .lightness(91 + 0.02 * l)
          .hex(),
        grey: lightPrimaryColor
          .desaturate(0.59)
          .lightness(90 + 0.02 * l)
          .hex(),
      });
      Object.assign(dark || {}, {
        background: darkPrimaryColor
          .desaturate(0.85)
          .lightness(9 + 0.02 * (100 - l) - 0.35)
          .hex(), // allow negative lightness (will truncate at 0)
        foreground: this.contrastColor(
          darkPrimaryColor
            .desaturate(0.79)
            .lightness(9 + 0.02 * (100 - l) - 0.35),
          9 + 0.02 * (100 - l),
        ).hex(),
        muted: darkPrimaryColor
          .lightness(9 + 0.02 * l)
          .desaturate(0.95)
          .hex(),
        mutedForeground: darkPrimaryColor
          .lightness(87 + 0.02 * l)
          .desaturate(0.89)
          .hex(),
        card: darkPrimaryColor
          .lightness(26 + 0.03 * l)
          .desaturate(0.95)
          .hex(),
        cardForeground: darkPrimaryColor
          .lightness(76 + 0.03 * l)
          .desaturate(0.92)
          .hex(),
        popover: darkPrimaryColor
          .lightness(26 + 0.03 * l)
          .desaturate(0.95)
          .hex(),
        popoverForeground: darkPrimaryColor
          .lightness(76 + 0.03 * l)
          .desaturate(0.92)
          .hex(),
        border: darkPrimaryColor
          .lightness(55 + 0.03 * l)
          .desaturate(0.95)
          .hex(),
        ring: darkPrimaryColor
          .lightness(55 + 0.03 * l)
          .desaturate(0.95)
          .hex(),
        input: darkPrimaryColor
          .lightness(26 + 0.03 * l)
          .desaturate(0.94)
          .hex(),
        grey6: darkPrimaryColor
          .desaturate(0.83)
          .lightness(10 + 0.02 * l)
          .hex(),
        grey5: darkPrimaryColor
          .desaturate(0.82)
          .lightness(13 + 0.02 * l)
          .hex(),
        grey4: darkPrimaryColor
          .desaturate(0.81)
          .lightness(15 + 0.02 * l)
          .hex(),
        grey3: darkPrimaryColor
          .desaturate(0.79)
          .lightness(17 + 0.02 * l)
          .hex(),
        grey2: darkPrimaryColor
          .desaturate(0.79)
          .lightness(18 + 0.02 * l)
          .hex(),
        grey: darkPrimaryColor
          .desaturate(0.78)
          .lightness(20 + 0.02 * l)
          .hex(),
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
