import { ColorState } from "@/store/theme-store";

export type Platform = "web" | "ios" | "android";
export type Theme = "light" | "dark";

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

// Generator return types
export type ColorGeneratorResult<T> = Partial<Record<Theme, T>>;

export interface ColorGeneratorInterface {
  generateFromPrimary(
    primary: string,
  ): ColorGeneratorResult<PrimaryGeneratedColors>;
  generateFromSecondary(
    secondary: string,
  ): ColorGeneratorResult<SecondaryGeneratedColors>;
  generateFromAccent(
    accent: string,
  ): ColorGeneratorResult<AccentGeneratedColors>;
  generateFromMuted(muted: string): ColorGeneratorResult<MutedGeneratedColors>;
}
