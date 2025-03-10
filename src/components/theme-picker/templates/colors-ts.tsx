import { useThemeStore } from "@/store/theme-store";
import dedent from "dedent";

export const useColorsTsTemplate = () => {
  const colors = useThemeStore((state) => state.colors);

  return dedent`
  import { Platform } from 'react-native';

const IOS_SYSTEM_COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    grey6: '${colors.ios.light.grey6}',
    grey5: '${colors.ios.light.grey5}',
    grey4: '${colors.ios.light.grey4}',
    grey3: '${colors.ios.light.grey3}',
    grey2: '${colors.ios.light.grey2}',
    grey: '${colors.ios.light.grey}',
    background: '${colors.ios.light.background}',
    foreground: '${colors.ios.light.foreground}',
    root: '${colors.ios.light.background}',
    card: '${colors.ios.light.background}',
    destructive: '${colors.ios.light.destructive}',
    primary: '${colors.ios.light.primary}',
  },
  dark: {
    grey6: '${colors.ios.dark.grey6}',
    grey5: '${colors.ios.dark.grey5}',
    grey4: '${colors.ios.dark.grey4}',
    grey3: '${colors.ios.dark.grey3}',
    grey2: '${colors.ios.dark.grey2}',
    grey: '${colors.ios.dark.grey}',
    background: '${colors.ios.dark.background}',
    foreground: '${colors.ios.dark.foreground}',
    root: '${colors.ios.dark.background}',
    card: '${colors.ios.dark.background}',
    destructive: '${colors.ios.dark.destructive}',
    primary: '${colors.ios.dark.primary}',
  },
} as const;

const ANDROID_COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    grey6: '${colors.android.light.grey6}',
    grey5: '${colors.android.light.grey5}',
    grey4: '${colors.android.light.grey4}',
    grey3: '${colors.android.light.grey3}',
    grey2: '${colors.android.light.grey2}',
    grey: '${colors.android.light.grey}',
    background: '${colors.android.light.background}',
    foreground: '${colors.android.light.foreground}',
    root: '${colors.android.light.background}',
    card: '${colors.android.light.background}',
    destructive: '${colors.android.light.destructive}',
    primary: '${colors.android.light.primary}',
  },
  dark: {
    grey6: '${colors.android.dark.grey6}',
    grey5: '${colors.android.dark.grey5}',
    grey4: '${colors.android.dark.grey4}',
    grey3: '${colors.android.dark.grey3}',
    grey2: '${colors.android.dark.grey2}',
    grey: '${colors.android.dark.grey}',
    background: '${colors.android.dark.background}',
    foreground: '${colors.android.dark.foreground}',
    root: '${colors.android.dark.background}',
    card: '${colors.android.dark.background}',
    destructive: '${colors.android.dark.destructive}',
    primary: '${colors.android.dark.primary}',
  },
} as const;

const COLORS = Platform.OS === 'ios' ? IOS_SYSTEM_COLORS : ANDROID_COLORS;

export { COLORS };
`;
};
