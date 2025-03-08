import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { produce } from "immer";
import Color from "color";
import { hashStorage } from "./hash-storage";

type ColorMode = "ios" | "android";
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
}

interface ThemeState {
  mode: ColorMode;
  theme: Theme;
  colors: ColorState;
  setMode: (mode: ColorMode) => void;
  setTheme: (theme: Theme) => void;
  setPrimaryColor: (color: string) => void;
  setColor: (key: keyof ColorState, value: string) => void;
  generateColors: (primary: string) => void;
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

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "ios",
      theme: "light",
      colors: {
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
      },
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
              primary: color,
              ...newColors,
            };
          })
        ),
      setColor: (key, value) =>
        set(
          produce((state) => {
            state.colors[key] = value;
          })
        ),
      generateColors: (primary) =>
        set(
          produce((state) => {
            state.colors = {
              ...state.colors,
              ...generateColorsFromPrimary(primary, state.theme),
            };
          })
        ),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => hashStorage),
    }
  )
);
