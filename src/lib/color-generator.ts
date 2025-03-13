import {
  Platform,
  Theme,
  ColorState,
  SyncStatePlatform,
} from "@/store/theme-store";
import Color, { ColorInstance } from "color";

// Types for generated colors from different base colors
export type GrayScaleColors =
  | "grey6"
  | "grey5"
  | "grey4"
  | "grey3"
  | "grey2"
  | "grey";

export type PrimaryGeneratedColors = Pick<
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
  | GrayScaleColors
>;

export type SecondaryGeneratedColors = Pick<
  ColorState,
  "secondary" | "secondaryForeground"
>;

export type AccentGeneratedColors = Pick<
  ColorState,
  "accent" | "accentForeground"
>;

export type DestructiveGeneratedColors = Pick<
  ColorState,
  "destructive" | "destructiveForeground"
>;

export type MutedGeneratedColors = Pick<
  ColorState,
  "muted" | "mutedForeground"
>;

/**
 * Base color generator class that can be extended for different platforms and color types
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
    if (isLight) {
      return {
        grey6: baseColor.desaturate(0.95).lightness(99).hex(),
        grey5: baseColor.desaturate(0.95).lightness(98).hex(),
        grey4: baseColor.desaturate(0.95).lightness(95).hex(),
        grey3: baseColor.desaturate(0.95).lightness(90).hex(),
        grey2: baseColor.desaturate(0.95).lightness(80).hex(),
        grey: baseColor.desaturate(0.95).lightness(70).hex(),
      };
    }
    return {
      grey6: baseColor.desaturate(0.95).lightness(2).hex(),
      grey5: baseColor.desaturate(0.95).lightness(3).hex(),
      grey4: baseColor.desaturate(0.95).lightness(5).hex(),
      grey3: baseColor.desaturate(0.95).lightness(8).hex(),
      grey2: baseColor.desaturate(0.95).lightness(15).hex(),
      grey: baseColor.desaturate(0.95).lightness(25).hex(),
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

/**
 * Web platform color generator
 */
export class WebColorGenerator extends BaseColorGenerator {
  constructor(theme: Theme, sync: SyncStatePlatform["web"]) {
    super("web", theme, sync);
  }

  generateFromPrimary(
    primary: string,
  ): Partial<Record<Theme, PrimaryGeneratedColors>> {
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
        // Explicitly define grey scales
        grey6: primaryColor.saturate(0.05).lightness(97).hex(),
        grey5: primaryColor.saturate(0.05).lightness(90).hex(),
        grey4: primaryColor.saturate(0.05).lightness(85).hex(),
        grey3: primaryColor.saturate(0.05).lightness(80).hex(),
        grey2: primaryColor.saturate(0.05).lightness(70).hex(),
        grey: primaryColor.saturate(0.05).lightness(60).hex(),
      };
    }

    // Generate dark theme
    if (this.theme === "dark" || this.sync) {
      // Adjust primary color for dark theme if coming from light theme
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
        // Explicitly define grey scales
        grey6: darkPrimaryColor.saturate(0.05).lightness(3).hex(),
        grey5: darkPrimaryColor.saturate(0.05).lightness(10).hex(),
        grey4: darkPrimaryColor.saturate(0.05).lightness(15).hex(),
        grey3: darkPrimaryColor.saturate(0.05).lightness(20).hex(),
        grey2: darkPrimaryColor.saturate(0.05).lightness(30).hex(),
        grey: darkPrimaryColor.saturate(0.05).lightness(40).hex(),
      };
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
      // Adjust secondary color for dark theme if coming from light theme
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
  ): Partial<Record<Theme, AccentGeneratedColors>> {
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
      // Adjust accent color for dark theme if coming from light theme
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

  generateFromMuted(
    muted: string,
  ): Partial<Record<Theme, MutedGeneratedColors>> {
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

/**
 * iOS platform color generator
 */
export class IOSColorGenerator extends BaseColorGenerator {
  constructor(theme: Theme, sync: SyncStatePlatform["ios"]) {
    super("ios", theme, sync);
  }

  // iOS tends to use more saturated colors
  generateFromPrimary(
    primary: string,
  ): Partial<Record<Theme, PrimaryGeneratedColors>> {
    const primaryColor = Color(primary);
    let light;
    let dark;

    // Generate light theme
    if (this.theme === "light" || this.sync) {
      light = {
        primary: primaryColor.hex(),
        primaryForeground: this.contrastColor(primaryColor, 3).hex(),
        background: primaryColor.lightness(99.5).hex(),
        foreground: this.contrastColor(primaryColor.lightness(98)).hex(),
        muted: primaryColor.desaturate(0.85).lightness(91).hex(),
        mutedForeground: primaryColor.lightness(58).desaturate(0.2).hex(),
        border: primaryColor.lightness(92).desaturate(0.3).hex(),
        input: primaryColor.lightness(88).desaturate(0.3).hex(),
        ring: primaryColor.lightness(85).desaturate(0.2).hex(),
        ...this.generateGreyScale(primaryColor, true),
      };
    }

    // Generate dark theme
    if (this.theme === "dark" || this.sync) {
      // Adjust primary color for dark theme if coming from light theme
      const darkPrimaryColor =
        this.theme === "light" && this.sync
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

/**
 * Android platform color generator
 */
export class AndroidColorGenerator extends BaseColorGenerator {
  constructor(theme: Theme, sync: SyncStatePlatform["android"]) {
    super("android", theme, sync);
  }

  // Android Material Design inspired color generation
  generateFromPrimary(
    primary: string,
  ): Partial<Record<Theme, PrimaryGeneratedColors>> {
    const primaryColor = Color(primary);
    let light;
    let dark;

    // Generate light theme
    if (this.theme === "light" || this.sync) {
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
        grey6: Color("#F5F5F5").hex(),
        grey5: Color("#EEEEEE").hex(),
        grey4: Color("#E0E0E0").hex(),
        grey3: Color("#BDBDBD").hex(),
        grey2: Color("#9E9E9E").hex(),
        grey: Color("#757575").hex(),
      };
    }

    // Generate dark theme
    if (this.theme === "dark" || this.sync) {
      // Adjust primary color for dark theme if coming from light theme
      const darkPrimaryColor =
        this.theme === "light" && this.sync
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
        grey6: Color("#212121").hex(),
        grey5: Color("#303030").hex(),
        grey4: Color("#424242").hex(),
        grey3: Color("#616161").hex(),
        grey2: Color("#757575").hex(),
        grey: Color("#9E9E9E").hex(),
      };
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
        secondaryForeground: this.contrastColor(secondaryColor).hex(),
      };
    }

    if (this.theme === "dark" || this.sync) {
      const darkSecondaryColor =
        this.theme === "light" && this.sync
          ? this.darkVariant(secondaryColor)
          : secondaryColor;

      dark = {
        secondary: darkSecondaryColor.hex(),
        secondaryForeground: this.contrastColor(darkSecondaryColor).hex(),
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
        accentForeground: this.contrastColor(accentColor).hex(),
      };
    }

    if (this.theme === "dark" || this.sync) {
      const darkAccentColor =
        this.theme === "light" && this.sync
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

/**
 * Factory function to get the appropriate color generator based on platform
 */
export function getColorGenerator<T extends Platform>(
  platform: T,
  theme: Theme,
  sync: SyncStatePlatform[T],
): BaseColorGenerator {
  switch (platform) {
    case "ios":
      return new IOSColorGenerator(theme, sync);
    case "android":
      return new AndroidColorGenerator(theme, sync);
    case "web":
    default:
      return new WebColorGenerator(theme, sync);
  }
}

export type ColorGenerator = ReturnType<typeof getColorGenerator>;
export type PrimaryColorGenerator = ReturnType<
  ColorGenerator["generateFromPrimary"]
>;
export type SecondaryColorGenerator = ReturnType<
  ColorGenerator["generateFromSecondary"]
>;
export type AccentColorGenerator = ReturnType<
  ColorGenerator["generateFromAccent"]
>;
export type MutedColorGenerator = ReturnType<
  ColorGenerator["generateFromMuted"]
>;
