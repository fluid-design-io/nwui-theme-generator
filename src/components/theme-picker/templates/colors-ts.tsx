import { useThemeStore } from "@/store/theme-store";
import Color from "color";
import dedent from "dedent";
import { useDeferredValue } from "react";

const c = (color: string) => Color(color).rgb().toString();

export const useColorsTsTemplate = () => {
  const _colors = useThemeStore((state) => state.colors);
  const colors = useDeferredValue(_colors);

  return dedent`
  import { Platform } from 'react-native';

const IOS_SYSTEM_COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    grey6: '${c(colors.ios.light.grey6)}',
    grey5: '${c(colors.ios.light.grey5)}',
    grey4: '${c(colors.ios.light.grey4)}',
    grey3: '${c(colors.ios.light.grey3)}',
    grey2: '${c(colors.ios.light.grey2)}',
    grey: '${c(colors.ios.light.grey)}',
    background: '${c(colors.ios.light.background)}',
    foreground: '${c(colors.ios.light.foreground)}',
    root: '${c(colors.ios.light.background)}',
    card: '${c(colors.ios.light.background)}',
    destructive: '${c(colors.ios.light.destructive)}',
    primary: '${c(colors.ios.light.primary)}',
  },
  dark: {
    grey6: '${c(colors.ios.dark.grey6)}',
    grey5: '${c(colors.ios.dark.grey5)}',
    grey4: '${c(colors.ios.dark.grey4)}',
    grey3: '${c(colors.ios.dark.grey3)}',
    grey2: '${c(colors.ios.dark.grey2)}',
    grey: '${c(colors.ios.dark.grey)}',
    background: '${c(colors.ios.dark.background)}',
    foreground: '${c(colors.ios.dark.foreground)}',
    root: '${c(colors.ios.dark.background)}',
    card: '${c(colors.ios.dark.background)}',
    destructive: '${c(colors.ios.dark.destructive)}',
    primary: '${c(colors.ios.dark.primary)}',
  },
} as const;

const ANDROID_COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    grey6: '${c(colors.android.light.grey6)}',
    grey5: '${c(colors.android.light.grey5)}',
    grey4: '${c(colors.android.light.grey4)}',
    grey3: '${c(colors.android.light.grey3)}',
    grey2: '${c(colors.android.light.grey2)}',
    grey: '${c(colors.android.light.grey)}',
    background: '${c(colors.android.light.background)}',
    foreground: '${c(colors.android.light.foreground)}',
    root: '${c(colors.android.light.background)}',
    card: '${c(colors.android.light.background)}',
    destructive: '${c(colors.android.light.destructive)}',
    primary: '${c(colors.android.light.primary)}',
  },
  dark: {
    grey6: '${c(colors.android.dark.grey6)}',
    grey5: '${c(colors.android.dark.grey5)}',
    grey4: '${c(colors.android.dark.grey4)}',
    grey3: '${c(colors.android.dark.grey3)}',
    grey2: '${c(colors.android.dark.grey2)}',
    grey: '${c(colors.android.dark.grey)}',
    background: '${c(colors.android.dark.background)}',
    foreground: '${c(colors.android.dark.foreground)}',
    root: '${c(colors.android.dark.background)}',
    card: '${c(colors.android.dark.background)}',
    destructive: '${c(colors.android.dark.destructive)}',
    primary: '${c(colors.android.dark.primary)}',
  },
} as const;

const COLORS = Platform.OS === 'ios' ? IOS_SYSTEM_COLORS : ANDROID_COLORS;

export { COLORS };
`;
};
