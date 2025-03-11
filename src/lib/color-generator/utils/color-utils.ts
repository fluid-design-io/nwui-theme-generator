import Color, { ColorInstance } from "color";
import { GrayScaleColors } from "../types";

/**
 * Helper to get contrast color based on background color
 */
export function getContrastColor(
  color: ColorInstance,
  soften = 0,
): ColorInstance {
  return color.isLight()
    ? color.lightness(soften)
    : color.lightness(100 - soften);
}

/**
 * Adjust the lightness of a color to ensure it's not too dark or too light
 */
export function adjustLightness(
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
export function getLightVariant(
  color: ColorInstance,
  depth = 0,
): ColorInstance {
  if (depth >= 10) return color; // Prevent infinite loop
  const l = color.l();
  return l > 50
    ? getLightVariant(Color(color).lightness(l - 10), depth + 1)
    : color;
}

/**
 * Generate a darkened version of a color for dark theme
 */
export function getDarkVariant(color: ColorInstance, depth = 0): ColorInstance {
  if (depth >= 10) return color; // Prevent infinite loop
  const l = color.l();
  return l < 50
    ? getDarkVariant(Color(color).lightness(l + 10), depth + 1)
    : color;
}

/**
 * Generate shades of grey based on a color
 */
export function generateGreyScale(
  baseColor: ColorInstance,
  isLight: boolean,
): Record<GrayScaleColors, string> {
  if (isLight) {
    return {
      grey6: baseColor.saturate(0.05).lightness(99).hex(),
      grey5: baseColor.saturate(0.05).lightness(98).hex(),
      grey4: baseColor.saturate(0.05).lightness(95).hex(),
      grey3: baseColor.saturate(0.05).lightness(90).hex(),
      grey2: baseColor.saturate(0.05).lightness(80).hex(),
      grey: baseColor.saturate(0.05).lightness(70).hex(),
    };
  }
  return {
    grey6: baseColor.saturate(0.05).lightness(2).hex(),
    grey5: baseColor.saturate(0.05).lightness(3).hex(),
    grey4: baseColor.saturate(0.05).lightness(5).hex(),
    grey3: baseColor.saturate(0.05).lightness(8).hex(),
    grey2: baseColor.saturate(0.05).lightness(15).hex(),
    grey: baseColor.saturate(0.05).lightness(25).hex(),
  };
}
