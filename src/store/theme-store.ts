import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { produce } from "immer";
import Color from "color";
import { hashStorage } from "./hash-storage";
import {
  AccentColorGenerator,
  MutedColorGenerator,
  PrimaryColorGenerator,
  SecondaryColorGenerator,
} from "@/lib/color-generator";

type Platform = "ios" | "android" | "web";
type Theme = "light" | "dark";

interface ColorState {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  grey6: string;
  grey5: string;
  grey4: string;
  grey3: string;
  grey2: string;
  grey: string;
  root: string;
}

type ColorStates = Record<Platform, Record<Theme, ColorState>>;

type SyncColor = Pick<ColorState, "primary" | "secondary" | "accent" | "muted">;

type SyncStatePrimary = "all" | "dark" | "none";
type SyncStateNonPrimary = "dark" | "none";

type SyncStateSetter = <T extends keyof SyncColor>(
  syncColor: T,
  value: SyncStatePlatform[Platform][T],
) => void;

type SyncState = {
  primary: SyncStatePrimary;
  secondary: SyncStateNonPrimary;
  accent: SyncStateNonPrimary;
  muted: SyncStateNonPrimary;
};

type SyncStatePlatform = Record<Platform, SyncState>;

interface ThemeState {
  platform: Platform;
  theme: Theme;
  colors: ColorStates;
  sync: SyncStatePlatform;
  setPlatform: (platform: Platform) => void;
  setTheme: (theme: Theme) => void;
  setPrimaryColor: (computedColors: PrimaryColorGenerator) => void;
  setSecondaryColor: (computedColors: SecondaryColorGenerator) => void;
  setAccentColor: (computedColors: AccentColorGenerator) => void;
  setMutedColor: (computedColors: MutedColorGenerator) => void;
  setColor: (key: keyof ColorState, value: string) => void;
  setSync: SyncStateSetter;
  reset: (colorKey: keyof ColorState) => void;
  resetAll: () => void;
  getCssVariables: () => string;
}

export const DEFAULT_COLORS: ColorStates = {
  ios: {
    light: {
      grey6: "#f2f2f7",
      grey5: "#e6e6eb",
      grey4: "#d2d2d7",
      grey3: "#c7c7cc",
      grey2: "#b0b0b5",
      grey: "#99999e",
      background: "#f2f2f7",
      foreground: "#000000",
      root: "#ffffff",
      card: "#ffffff",
      cardForeground: "#000000",
      popover: "#e6e6eb",
      popoverForeground: "#000000",
      destructive: "#ff382b",
      destructiveForeground: "#ffffff",
      primary: "#007bff",
      primaryForeground: "#ffffff",
      secondary: "#2db9e3",
      secondaryForeground: "#ffffff",
      accent: "#ff2854",
      accentForeground: "#ffffff",
      muted: "#b0b0b5",
      mutedForeground: "#666666",
      border: "#e6e6eb",
      input: "#d2d2d7",
      ring: "#e6e6eb",
    },
    dark: {
      grey6: "#151518",
      grey5: "#282828",
      grey4: "#333333",
      grey3: "#464646",
      grey2: "#636363",
      grey: "#9e9e9e",
      background: "#000000",
      foreground: "#ffffff",
      root: "#000000",
      card: "#151518",
      cardForeground: "#ffffff",
      popover: "#282828",
      popoverForeground: "#ffffff",
      destructive: "#fe4336",
      destructiveForeground: "#ffffff",
      primary: "#0385ff",
      primaryForeground: "#ffffff",
      secondary: "#64d3fe",
      secondaryForeground: "#ffffff",
      accent: "#ff345f",
      accentForeground: "#ffffff",
      muted: "#707073",
      mutedForeground: "#e2e2e7",
      border: "#282828",
      input: "#333333",
      ring: "#282828",
    },
  },
  android: {
    light: {
      grey6: "#f9f9ff",
      grey5: "#d7d9e4",
      grey4: "#b1b5c2",
      grey3: "#717786",
      grey2: "#414754",
      grey: "#282c35",
      background: "#F9F9FF",
      foreground: "#000000",
      root: "#ffffff",
      card: "#ffffff",
      cardForeground: "#181c23",
      popover: "#d7d9e4",
      popoverForeground: "#000000",
      destructive: "#b91a1a",
      destructiveForeground: "#ffffff",
      primary: "#65558F",
      primaryForeground: "#ffffff",
      secondary: "#b0c9ff",
      secondaryForeground: "#ffffff",
      accent: "#a949cc",
      accentForeground: "#ffffff",
      muted: "#c1c6d7",
      mutedForeground: "#414754",
      border: "#d7d9e4",
      input: "#d2d2d7",
      ring: "#d7d9e4",
    },
    dark: {
      grey6: "#10131b",
      grey5: "#282c35",
      grey4: "#313540",
      grey3: "#3b3f4a",
      grey2: "#8b90a0",
      grey: "#b1b5c2",
      background: "#000000",
      foreground: "#ffffff",
      root: "#000000",
      card: "#10131b",
      cardForeground: "#ffffff",
      popover: "#211e26",
      popoverForeground: "#e0e2ed",
      destructive: "#93000a",
      destructiveForeground: "#ffffff",
      primary: "#65558F",
      primaryForeground: "#ffffff",
      secondary: "#1c3c72",
      secondaryForeground: "#ffffff",
      accent: "#53006f",
      accentForeground: "#ffffff",
      muted: "#d8e2ff",
      mutedForeground: "#8b90a0",
      border: "#211e26",
      input: "#333333",
      ring: "#211e26",
    },
  },
  web: {
    light: {
      grey6: "#f9f9ff",
      grey5: "#d7d9e4",
      grey4: "#b1b5c2",
      grey3: "#717786",
      grey2: "#414754",
      grey: "#282c35",
      background: "#F9F9FF",
      foreground: "#000000",
      root: "#ffffff",
      card: "#ffffff",
      cardForeground: "#181c23",
      popover: "#d7d9e4",
      popoverForeground: "#000000",
      destructive: "#b91a1a",
      destructiveForeground: "#ffffff",
      primary: "#65558F",
      primaryForeground: "#ffffff",
      secondary: "#b0c9ff",
      secondaryForeground: "#ffffff",
      accent: "#a949cc",
      accentForeground: "#ffffff",
      muted: "#c1c6d7",
      mutedForeground: "#414754",
      border: "#d7d9e4",
      input: "#d2d2d7",
      ring: "#d7d9e4",
    },
    dark: {
      grey6: "#10131b",
      grey5: "#282c35",
      grey4: "#313540",
      grey3: "#3b3f4a",
      grey2: "#8b90a0",
      grey: "#b1b5c2",
      background: "#000000",
      foreground: "#ffffff",
      root: "#000000",
      card: "#10131b",
      cardForeground: "#ffffff",
      popover: "#211e26",
      popoverForeground: "#e0e2ed",
      destructive: "#93000a",
      destructiveForeground: "#ffffff",
      primary: "#65558F",
      primaryForeground: "#ffffff",
      secondary: "#1c3c72",
      secondaryForeground: "#ffffff",
      accent: "#53006f",
      accentForeground: "#ffffff",
      muted: "#d8e2ff",
      mutedForeground: "#8b90a0",
      border: "#211e26",
      input: "#333333",
      ring: "#211e26",
    },
  },
};

const DEFAULT_SYNC: SyncStatePlatform = {
  ios: {
    primary: "all",
    secondary: "dark",
    accent: "dark",
    muted: "dark",
  },
  android: {
    primary: "all",
    secondary: "dark",
    accent: "dark",
    muted: "dark",
  },
  web: {
    primary: "all",
    secondary: "dark",
    accent: "dark",
    muted: "dark",
  },
};

const getDefaultState = () => ({
  platform: "ios" as Platform,
  theme: "light" as Theme,
  colors: DEFAULT_COLORS,
  sync: DEFAULT_SYNC,
});

const generateCssVariables = (colors: ColorState): string => {
  const cssVars = Object.entries(colors)
    .map(([key, value]) => {
      // Convert color to rgb format for better CSS variable usage
      const color = Color(value);
      const rgb = color.rgb().array();
      return `  --${key}: ${rgb.join(" ")};`;
    })
    .join("\n");

  return `
:root {
${cssVars}
  --radius: 0.5rem;
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}

* {
  border-color: rgb(var(--border));
}

body {
  background-color: rgb(var(--background));
  color: rgb(var(--foreground));
  font-feature-settings: "rlig" 1, "calt" 1;
}
`;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      ...getDefaultState(),
      setPlatform: (platform) =>
        set(
          produce((state) => {
            state.platform = platform;
          }),
        ),
      setTheme: (theme) =>
        set(
          produce((state) => {
            state.theme = theme;
          }),
        ),
      setPrimaryColor: (computedColors: PrimaryColorGenerator) =>
        set(
          produce((state: ThemeState) => {
            state.colors[state.platform] = {
              ...state.colors[state.platform],
              light: {
                ...state.colors[state.platform].light,
                ...computedColors.light,
              },
              dark: {
                ...state.colors[state.platform].dark,
                ...computedColors.dark,
              },
            };
          }),
        ),
      setSecondaryColor: (computedColors: SecondaryColorGenerator) =>
        set(
          produce((state: ThemeState) => {
            state.colors[state.platform] = {
              ...state.colors[state.platform],
              light: {
                ...state.colors[state.platform].light,
                ...computedColors.light,
              },
              dark: {
                ...state.colors[state.platform].dark,
                ...computedColors.dark,
              },
            };
          }),
        ),
      setAccentColor: (computedColors: AccentColorGenerator) =>
        set(
          produce((state: ThemeState) => {
            state.colors[state.platform] = {
              ...state.colors[state.platform],
              light: {
                ...state.colors[state.platform].light,
                ...computedColors.light,
              },
              dark: {
                ...state.colors[state.platform].dark,
                ...computedColors.dark,
              },
            };
          }),
        ),
      setMutedColor: (computedColors: MutedColorGenerator) =>
        set(
          produce((state: ThemeState) => {
            state.colors[state.platform] = {
              ...state.colors[state.platform],
              light: {
                ...state.colors[state.platform].light,
                ...computedColors.light,
              },
              dark: {
                ...state.colors[state.platform].dark,
                ...computedColors.dark,
              },
            };
          }),
        ),
      setColor: (key: keyof ColorState, value: string) =>
        set(
          produce((state: ThemeState) => {
            state.colors[state.platform][state.theme][key] = value;
          }),
        ),
      setSync: <T extends keyof SyncColor>(
        syncColor: T,
        value: SyncStatePlatform[Platform][T],
      ) =>
        set(
          produce((state: ThemeState) => {
            state.sync[state.platform][syncColor] = value;
          }),
        ),
      reset: (colorKey: keyof ColorState) => {
        set(
          produce((state: ThemeState) => {
            state.colors[state.platform][state.theme][colorKey] =
              DEFAULT_COLORS[state.platform][state.theme][colorKey];
          }),
        );
      },
      resetAll: () => {
        // Clear the hash storage
        hashStorage.removeItem("theme-storage");
        // Reset to default state
        set(getDefaultState());
      },
      getCssVariables: () => {
        const state = get();
        return generateCssVariables(state.colors[state.platform][state.theme]);
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => hashStorage),
      onRehydrateStorage: (state) => {
        const isValid = validateState(state);
        // If state is null or missing required keys, reset to defaults
        if (!isValid) {
          useThemeStore.getState().resetAll();
        }
      },
    },
  ),
);

// Validate the state structure and color values
function validateState(state: unknown): state is ThemeState {
  try {
    // Check if required top-level properties exist
    if (!state || typeof state !== "object") {
      return false;
    }

    const s = state as Partial<ThemeState>;

    if (!s.platform || !s.theme || !s.colors) {
      return false;
    }

    // Validate platform and theme values
    if (!["ios", "android", "web"].includes(s.platform)) {
      return false;
    }
    if (!["light", "dark"].includes(s.theme)) {
      return false;
    }

    // Validate color structure
    const themes: Theme[] = ["light", "dark"];
    const platforms: Platform[] = ["ios", "android", "web"];

    for (const platform of platforms) {
      if (!s.colors[platform]) return false;

      for (const theme of themes) {
        const colorSet = s.colors[platform][theme];
        if (!colorSet) return false;

        // Check if all required color keys exist and are valid color values
        const requiredKeys: (keyof ColorState)[] = [
          "primary",
          "primaryForeground",
          "secondary",
          "secondaryForeground",
          "accent",
          "accentForeground",
          "destructive",
          "destructiveForeground",
          "background",
          "foreground",
          "card",
          "cardForeground",
          "popover",
          "popoverForeground",
          "muted",
          "mutedForeground",
          "border",
          "input",
          "ring",
          "grey6",
          "grey5",
          "grey4",
          "grey3",
          "grey2",
          "grey",
          "root",
        ];

        for (const key of requiredKeys) {
          if (!colorSet[key]) return false;
          // Validate if the value is a valid color
          try {
            Color(colorSet[key]);
          } catch {
            return false;
          }
        }
      }
    }

    return true;
  } catch {
    return false;
  }
}

export type {
  Platform,
  ColorState,
  ColorStates,
  SyncColor,
  SyncState,
  SyncStatePlatform,
  SyncStatePrimary,
  SyncStateNonPrimary,
  SyncStateSetter,
  Theme,
  ThemeState,
};
