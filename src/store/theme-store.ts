import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { produce } from "immer";
import Color from "color";
import { hashStorage } from "./hash-storage";

type ColorMode = "ios" | "android" | "web";
type Theme = "light" | "dark";

interface ColorState {
  primary: string;
  secondary: string;
  accent: string;
  destructive: string;
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
}

type ColorStates = Record<Theme, Record<ColorMode, ColorState>>;

interface ThemeState {
  mode: ColorMode;
  theme: Theme;
  colors: ColorStates;
  setMode: (mode: ColorMode) => void;
  setTheme: (theme: Theme) => void;
  setPrimaryColor: (color: string) => void;
  setColor: (key: keyof ColorState, value: string) => void;
  generateColors: (primary: string) => void;
  reset: () => void;
  getCssVariables: () => string;
}

const generateColorsFromPrimary = (
  primary: string,
  theme: Theme
): Partial<ColorState> => {
  const primaryColor = Color(primary);
  const isLight = theme === "light";

  const background = isLight ? Color.rgb(242, 242, 247) : Color.rgb(0, 0, 0);
  const foreground = isLight ? Color.rgb(0, 0, 0) : Color.rgb(255, 255, 255);

  return {
    background: background.rgb().string(),
    foreground: foreground.rgb().string(),
    muted: primaryColor
      .lightness(isLight ? 70 : 30)
      .desaturate(0.3)
      .rgb()
      .string(),
    mutedForeground: primaryColor
      .lightness(isLight ? 40 : 60)
      .desaturate(0.3)
      .rgb()
      .string(),
    border: primaryColor
      .lightness(isLight ? 90 : 20)
      .desaturate(0.5)
      .rgb()
      .string(),
    input: primaryColor
      .lightness(isLight ? 85 : 25)
      .desaturate(0.5)
      .rgb()
      .string(),
    ring: primaryColor
      .lightness(isLight ? 90 : 20)
      .desaturate(0.5)
      .rgb()
      .string(),
  };
};

const defaultColors: ColorState = {
  primary: "#007bfe",
  secondary: "#2dafe7",
  accent: "#ff2854",
  destructive: "#ff382b",
  background: "#f2f2f7",
  foreground: "#000000",
  muted: "#afb0b4",
  mutedForeground: "#8e8e93",
  border: "#e6e6eb",
  input: "#d2d2d7",
  ring: "#e6e6eb",
  grey6: "#f2f2f7",
  grey5: "#e6e6eb",
  grey4: "#d2d2d7",
  grey3: "#b3b3b3",
  grey2: "#8e8e93",
  grey: "#636366",
};

const getDefaultState = () => ({
  mode: "ios" as ColorMode,
  theme: "light" as Theme,
  colors: {
    light: {
      ios: defaultColors,
      android: defaultColors,
      web: defaultColors,
    },
    dark: {
      ios: defaultColors,
      android: defaultColors,
      web: defaultColors,
    },
  },
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
      setMode: (mode) =>
        set(
          produce((state) => {
            state.mode = mode;
          })
        ),
      setTheme: (theme) =>
        set(
          produce((state) => {
            state.theme = theme;
          })
        ),
      setPrimaryColor: (color) =>
        set(
          produce((state) => {
            const newColors = generateColorsFromPrimary(color, state.theme);
            state.colors = {
              ...state.colors,
              [state.theme]: {
                ...state.colors[state.theme],
                [state.mode]: {
                  ...state.colors[state.theme][state.mode],
                  ...newColors,
                },
              },
            };
          })
        ),
      setColor: (key, value) =>
        set(
          produce((state: ThemeState) => {
            state.colors[state.theme][state.mode][key] = value;
          })
        ),
      generateColors: (primary) =>
        set(
          produce((state: ThemeState) => {
            state.colors = {
              ...state.colors,
              [state.theme]: {
                ...state.colors[state.theme],
                [state.mode]: {
                  ...state.colors[state.theme][state.mode],
                  ...generateColorsFromPrimary(primary, state.theme),
                },
              },
            };
          })
        ),
      reset: () => {
        // Clear the hash storage
        hashStorage.removeItem("theme-storage");
        // Reset to default state
        set(getDefaultState());
      },
      getCssVariables: () => {
        const state = get();
        return generateCssVariables(state.colors[state.theme][state.mode]);
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => hashStorage),
      onRehydrateStorage: (state) => {
        console.log("onRehydrateStorage", state);
        const isValid = validateState(state);
        console.log("isValid", isValid);
        // If state is null or missing required keys, reset to defaults
        if (!isValid) {
          console.log("resetting");
          useThemeStore.getState().reset();
        }
      },
    }
  )
);

// Validate the state structure and color values
function validateState(state: unknown): state is ThemeState {
  try {
    // Check if required top-level properties exist
    if (!state || typeof state !== "object") {
      return false;
    }

    const s = state as Partial<ThemeState>;

    if (!s.mode || !s.theme || !s.colors) {
      return false;
    }

    // Validate mode and theme values
    if (!["ios", "android", "web"].includes(s.mode)) {
      return false;
    }
    if (!["light", "dark"].includes(s.theme)) {
      return false;
    }

    // Validate color structure
    const themes: Theme[] = ["light", "dark"];
    const modes: ColorMode[] = ["ios", "android", "web"];

    for (const theme of themes) {
      if (!s.colors[theme]) return false;

      for (const mode of modes) {
        const colorSet = s.colors[theme][mode];
        if (!colorSet) return false;

        // Check if all required color keys exist and are valid color values
        const requiredKeys: (keyof ColorState)[] = [
          "primary",
          "secondary",
          "accent",
          "destructive",
          "background",
          "foreground",
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

export type { ColorMode, ColorState, Theme, ThemeState };
