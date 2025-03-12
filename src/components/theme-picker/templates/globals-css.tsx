import { useThemeStore } from "@/store/theme-store";
import { getRgbValues } from "@/lib/utils/color";
import dedent from "dedent";
import { useDeferredValue } from "react";

export const useGlobalsCssTemplate = () => {
  const _colors = useThemeStore((state) => state.colors);
  const colors = useDeferredValue(_colors);

  return dedent`
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: ${getRgbValues(colors.ios.light.background)};
    --foreground: ${getRgbValues(colors.ios.light.foreground)};
    --card: ${getRgbValues(colors.ios.light.card)};
    --card-foreground: ${getRgbValues(colors.ios.light.cardForeground)};
    --popover: ${getRgbValues(colors.ios.light.popover)};
    --popover-foreground: ${getRgbValues(colors.ios.light.popoverForeground)};
    --primary: ${getRgbValues(colors.ios.light.primary)};
    --primary-foreground: ${getRgbValues(colors.ios.light.primaryForeground)};
    --secondary: ${getRgbValues(colors.ios.light.secondary)};
    --secondary-foreground: ${getRgbValues(
      colors.ios.light.secondaryForeground,
    )};
    --muted: ${getRgbValues(colors.ios.light.muted)};
    --muted-foreground: ${getRgbValues(colors.ios.light.mutedForeground)};
    --accent: ${getRgbValues(colors.ios.light.accent)};
    --accent-foreground: ${getRgbValues(colors.ios.light.accentForeground)};
    --destructive: ${getRgbValues(colors.ios.light.destructive)};
    --destructive-foreground: ${getRgbValues(
      colors.ios.light.destructiveForeground,
    )};
    --border: ${getRgbValues(colors.ios.light.border)};
    --input: ${getRgbValues(colors.ios.light.input)};
    --ring: ${getRgbValues(colors.ios.light.ring)};

    --android-background: ${getRgbValues(colors.android.light.background)};
    --android-foreground: ${getRgbValues(colors.android.light.foreground)};
    --android-card: ${getRgbValues(colors.android.light.card)};
    --android-card-foreground: ${getRgbValues(
      colors.android.light.cardForeground,
    )};
    --android-popover: ${getRgbValues(colors.android.light.popover)};
    --android-popover-foreground: ${getRgbValues(
      colors.android.light.popoverForeground,
    )};
    --android-primary: ${getRgbValues(colors.android.light.primary)};
    --android-primary-foreground: ${getRgbValues(
      colors.android.light.primaryForeground,
    )};
    --android-secondary: ${getRgbValues(colors.android.light.secondary)};
    --android-secondary-foreground: ${getRgbValues(
      colors.android.light.secondaryForeground,
    )};
    --android-muted: ${getRgbValues(colors.android.light.muted)};
    --android-muted-foreground: ${getRgbValues(
      colors.android.light.mutedForeground,
    )};
    --android-accent: ${getRgbValues(colors.android.light.accent)};
    --android-accent-foreground: ${getRgbValues(
      colors.android.light.accentForeground,
    )};
    --android-destructive: ${getRgbValues(colors.android.light.destructive)};
    --android-destructive-foreground: ${getRgbValues(
      colors.android.light.destructiveForeground,
    )};
    --android-border: ${getRgbValues(colors.android.light.border)};
    --android-input: ${getRgbValues(colors.android.light.input)};
    --android-ring: ${getRgbValues(colors.android.light.ring)};
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: ${getRgbValues(colors.ios.dark.background)};
      --foreground: ${getRgbValues(colors.ios.dark.foreground)};
      --card: ${getRgbValues(colors.ios.dark.card)};
      --card-foreground: ${getRgbValues(colors.ios.dark.cardForeground)};
      --popover: ${getRgbValues(colors.ios.dark.popover)};
      --popover-foreground: ${getRgbValues(colors.ios.dark.popoverForeground)};
      --primary: ${getRgbValues(colors.ios.dark.primary)};
      --primary-foreground: ${getRgbValues(colors.ios.dark.primaryForeground)};
      --secondary: ${getRgbValues(colors.ios.dark.secondary)};
      --secondary-foreground: ${getRgbValues(
        colors.ios.dark.secondaryForeground,
      )};
      --muted: ${getRgbValues(colors.ios.dark.muted)};
      --muted-foreground: ${getRgbValues(colors.ios.dark.mutedForeground)};
      --accent: ${getRgbValues(colors.ios.dark.accent)};
      --accent-foreground: ${getRgbValues(colors.ios.dark.accentForeground)};
      --destructive: ${getRgbValues(colors.ios.dark.destructive)};
      --destructive-foreground: ${getRgbValues(
        colors.ios.dark.destructiveForeground,
      )};
      --border: ${getRgbValues(colors.ios.dark.border)};
      --input: ${getRgbValues(colors.ios.dark.input)};
      --ring: ${getRgbValues(colors.ios.dark.ring)};

      --android-background: ${getRgbValues(colors.android.dark.background)};
      --android-foreground: ${getRgbValues(colors.android.dark.foreground)};
      --android-card: ${getRgbValues(colors.android.dark.card)};
      --android-card-foreground: ${getRgbValues(
        colors.android.dark.cardForeground,
      )};
      --android-popover: ${getRgbValues(colors.android.dark.popover)};
      --android-popover-foreground: ${getRgbValues(
        colors.android.dark.popoverForeground,
      )};
      --android-primary: ${getRgbValues(colors.android.dark.primary)};
      --android-primary-foreground: ${getRgbValues(
        colors.android.dark.primaryForeground,
      )};
      --android-secondary: ${getRgbValues(colors.android.dark.secondary)};
      --android-secondary-foreground: ${getRgbValues(
        colors.android.dark.secondaryForeground,
      )};
      --android-muted: ${getRgbValues(colors.android.dark.muted)};
      --android-muted-foreground: ${getRgbValues(
        colors.android.dark.mutedForeground,
      )};
      --android-accent: ${getRgbValues(colors.android.dark.accent)};
      --android-accent-foreground: ${getRgbValues(
        colors.android.dark.accentForeground,
      )};
      --android-destructive: ${getRgbValues(colors.android.dark.destructive)};
      --android-destructive-foreground: ${getRgbValues(
        colors.android.dark.destructiveForeground,
      )};
      --android-border: ${getRgbValues(colors.android.dark.border)};
      --android-input: ${getRgbValues(colors.android.dark.input)};
      --android-ring: ${getRgbValues(colors.android.dark.ring)};
    }
  }
}
`;
};
