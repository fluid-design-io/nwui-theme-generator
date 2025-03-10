"use client";

import { useThemeStore } from "@/store/theme-store";

import { CodeBlock } from "../code-block/code-block";
import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";

import dedent from "dedent";
import { TextMono } from "../ui/text";
import Color from "color";
import { useState } from "react";

function getRgbValues(colorStr: string): string {
  try {
    const color = Color(colorStr);
    return color.rgb().array().join(" ");
  } catch (error) {
    console.error("Invalid color:", colorStr, error);
    return "0 0 0"; // fallback to black
  }
}

export function ThemeCodeGen() {
  const { colors } = useThemeStore();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const globalsCss = dedent`
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: ${getRgbValues(colors.light.ios.background)};
    --foreground: ${getRgbValues(colors.light.ios.foreground)};
    --card: ${getRgbValues(colors.light.ios.card)};
    --card-foreground: ${getRgbValues(colors.light.ios.cardForeground)};
    --popover: ${getRgbValues(colors.light.ios.popover)};
    --popover-foreground: ${getRgbValues(colors.light.ios.popoverForeground)};
    --primary: ${getRgbValues(colors.light.ios.primary)};
    --primary-foreground: ${getRgbValues(colors.light.ios.primaryForeground)};
    --secondary: ${getRgbValues(colors.light.ios.secondary)};
    --secondary-foreground: ${getRgbValues(
      colors.light.ios.secondaryForeground
    )};
    --muted: ${getRgbValues(colors.light.ios.muted)};
    --muted-foreground: ${getRgbValues(colors.light.ios.mutedForeground)};
    --accent: ${getRgbValues(colors.light.ios.accent)};
    --accent-foreground: ${getRgbValues(colors.light.ios.accentForeground)};
    --destructive: ${getRgbValues(colors.light.ios.destructive)};
    --destructive-foreground: ${getRgbValues(
      colors.light.ios.destructiveForeground
    )};
    --border: ${getRgbValues(colors.light.ios.border)};
    --input: ${getRgbValues(colors.light.ios.input)};
    --ring: ${getRgbValues(colors.light.ios.ring)};

    --android-background: ${getRgbValues(colors.light.android.background)};
    --android-foreground: ${getRgbValues(colors.light.android.foreground)};
    --android-card: ${getRgbValues(colors.light.android.card)};
    --android-card-foreground: ${getRgbValues(
      colors.light.android.cardForeground
    )};
    --android-popover: ${getRgbValues(colors.light.android.popover)};
    --android-popover-foreground: ${getRgbValues(
      colors.light.android.popoverForeground
    )};
    --android-primary: ${getRgbValues(colors.light.android.primary)};
    --android-primary-foreground: ${getRgbValues(
      colors.light.android.primaryForeground
    )};
    --android-secondary: ${getRgbValues(colors.light.android.secondary)};
    --android-secondary-foreground: ${getRgbValues(
      colors.light.android.secondaryForeground
    )};
    --android-muted: ${getRgbValues(colors.light.android.muted)};
    --android-muted-foreground: ${getRgbValues(
      colors.light.android.mutedForeground
    )};
    --android-accent: ${getRgbValues(colors.light.android.accent)};
    --android-accent-foreground: ${getRgbValues(
      colors.light.android.accentForeground
    )};
    --android-destructive: ${getRgbValues(colors.light.android.destructive)};
    --android-destructive-foreground: ${getRgbValues(
      colors.light.android.destructiveForeground
    )};
    --android-border: ${getRgbValues(colors.light.android.border)};
    --android-input: ${getRgbValues(colors.light.android.input)};
    --android-ring: ${getRgbValues(colors.light.android.ring)};
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: ${getRgbValues(colors.dark.ios.background)};
      --foreground: ${getRgbValues(colors.dark.ios.foreground)};
      --card: ${getRgbValues(colors.dark.ios.card)};
      --card-foreground: ${getRgbValues(colors.dark.ios.cardForeground)};
      --popover: ${getRgbValues(colors.dark.ios.popover)};
      --popover-foreground: ${getRgbValues(colors.dark.ios.popoverForeground)};
      --primary: ${getRgbValues(colors.dark.ios.primary)};
      --primary-foreground: ${getRgbValues(colors.dark.ios.primaryForeground)};
      --secondary: ${getRgbValues(colors.dark.ios.secondary)};
      --secondary-foreground: ${getRgbValues(
        colors.dark.ios.secondaryForeground
      )};
      --muted: ${getRgbValues(colors.dark.ios.muted)};
      --muted-foreground: ${getRgbValues(colors.dark.ios.mutedForeground)};
      --accent: ${getRgbValues(colors.dark.ios.accent)};
      --accent-foreground: ${getRgbValues(colors.dark.ios.accentForeground)};
      --destructive: ${getRgbValues(colors.dark.ios.destructive)};
      --destructive-foreground: ${getRgbValues(
        colors.dark.ios.destructiveForeground
      )};
      --border: ${getRgbValues(colors.dark.ios.border)};
      --input: ${getRgbValues(colors.dark.ios.input)};
      --ring: ${getRgbValues(colors.dark.ios.ring)};

      --android-background: ${getRgbValues(colors.dark.android.background)};
      --android-foreground: ${getRgbValues(colors.dark.android.foreground)};
      --android-card: ${getRgbValues(colors.dark.android.card)};
      --android-card-foreground: ${getRgbValues(
        colors.dark.android.cardForeground
      )};
      --android-popover: ${getRgbValues(colors.dark.android.popover)};
      --android-popover-foreground: ${getRgbValues(
        colors.dark.android.popoverForeground
      )};
      --android-primary: ${getRgbValues(colors.dark.android.primary)};
      --android-primary-foreground: ${getRgbValues(
        colors.dark.android.primaryForeground
      )};
      --android-secondary: ${getRgbValues(colors.dark.android.secondary)};
      --android-secondary-foreground: ${getRgbValues(
        colors.dark.android.secondaryForeground
      )};
      --android-muted: ${getRgbValues(colors.dark.android.muted)};
      --android-muted-foreground: ${getRgbValues(
        colors.dark.android.mutedForeground
      )};
      --android-accent: ${getRgbValues(colors.dark.android.accent)};
      --android-accent-foreground: ${getRgbValues(
        colors.dark.android.accentForeground
      )};
      --android-destructive: ${getRgbValues(colors.dark.android.destructive)};
      --android-destructive-foreground: ${getRgbValues(
        colors.dark.android.destructiveForeground
      )};
      --android-border: ${getRgbValues(colors.dark.android.border)};
      --android-input: ${getRgbValues(colors.dark.android.input)};
      --android-ring: ${getRgbValues(colors.dark.android.ring)};
    }
  }
}
`;

  const colorsTs = dedent`
  import { Platform } from 'react-native';

const IOS_SYSTEM_COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    grey6: '${colors.light.ios.grey6}',
    grey5: '${colors.light.ios.grey5}',
    grey4: '${colors.light.ios.grey4}',
    grey3: '${colors.light.ios.grey3}',
    grey2: '${colors.light.ios.grey2}',
    grey: '${colors.light.ios.grey}',
    background: '${colors.light.ios.background}',
    foreground: '${colors.light.ios.foreground}',
    root: '${colors.light.ios.background}',
    card: '${colors.light.ios.background}',
    destructive: '${colors.light.ios.destructive}',
    primary: '${colors.light.ios.primary}',
  },
  dark: {
    grey6: '${colors.dark.ios.grey6}',
    grey5: '${colors.dark.ios.grey5}',
    grey4: '${colors.dark.ios.grey4}',
    grey3: '${colors.dark.ios.grey3}',
    grey2: '${colors.dark.ios.grey2}',
    grey: '${colors.dark.ios.grey}',
    background: '${colors.dark.ios.background}',
    foreground: '${colors.dark.ios.foreground}',
    root: '${colors.dark.ios.background}',
    card: '${colors.dark.ios.background}',
    destructive: '${colors.dark.ios.destructive}',
    primary: '${colors.dark.ios.primary}',
  },
} as const;

const ANDROID_COLORS = {
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  light: {
    grey6: '${colors.light.android.grey6}',
    grey5: '${colors.light.android.grey5}',
    grey4: '${colors.light.android.grey4}',
    grey3: '${colors.light.android.grey3}',
    grey2: '${colors.light.android.grey2}',
    grey: '${colors.light.android.grey}',
    background: '${colors.light.android.background}',
    foreground: '${colors.light.android.foreground}',
    root: '${colors.light.android.background}',
    card: '${colors.light.android.background}',
    destructive: '${colors.light.android.destructive}',
    primary: '${colors.light.android.primary}',
  },
  dark: {
    grey6: '${colors.dark.android.grey6}',
    grey5: '${colors.dark.android.grey5}',
    grey4: '${colors.dark.android.grey4}',
    grey3: '${colors.dark.android.grey3}',
    grey2: '${colors.dark.android.grey2}',
    grey: '${colors.dark.android.grey}',
    background: '${colors.dark.android.background}',
    foreground: '${colors.dark.android.foreground}',
    root: '${colors.dark.android.background}',
    card: '${colors.dark.android.background}',
    destructive: '${colors.dark.android.destructive}',
    primary: '${colors.dark.android.primary}',
  },
} as const;

const COLORS = Platform.OS === 'ios' ? IOS_SYSTEM_COLORS : ANDROID_COLORS;

export { COLORS };  
  `;

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <div className='flex justify-between items-stretch line-t lg:line-t/half mt-8'>
        <TabList>
          <Tab className='border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-selected:bg-border/50 sm:px-6'>
            <TextMono>globals.css</TextMono>
          </Tab>
          <Tab className='border-r p-3 hover:bg-border/35 focus:not-data-focus:outline-none data-selected:bg-border/50 sm:px-6'>
            <TextMono>colors.ts</TextMono>
          </Tab>
        </TabList>
        <CopyButton
          onCopy={() =>
            navigator.clipboard.writeText(
              selectedIndex === 0 ? globalsCss : colorsTs
            )
          }
        />
      </div>
      <TabPanels className='line-y lg:line-y/half'>
        <TabPanel>
          <div className='bg-border p-2'>
            <div className='flex items-center rounded-2xl bg-background sm:rounded-4xl'>
              <div className='max-h-120 max-w-[calc(100vw-2rem)] scrollbar overflow-y-auto min-h-120 w-full sm:p-10 p-6 selection:bg-muted'>
                <CodeBlock language='css'>{globalsCss}</CodeBlock>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className='bg-border p-2'>
            <div className='flex items-center rounded-2xl bg-background sm:rounded-4xl'>
              <div className='max-h-120 max-w-[calc(100vw-2rem)] scrollbar overflow-y-auto min-h-120 w-full sm:p-10 p-6 selection:bg-muted'>
                <CodeBlock language='typescript'>{colorsTs}</CodeBlock>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}

const CopyButton = ({ onCopy }: { onCopy: () => void }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Button
      onClick={() => {
        onCopy();
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }}
      aria-label='Copy code to clipboard'
      data-copied={isCopied}
      className='p-4 border-l hover:bg-border/35 text-muted-foreground/50 data-hover:text-muted-foreground data-focus:text-muted-foreground data-[copied=true]:text-lime-500'
    >
      {isCopied ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='size-4'
        >
          <path
            fillRule='evenodd'
            d='M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z'
            clipRule='evenodd'
          />
          <path
            fillRule='evenodd'
            d='M2 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm6.585 1.08a.75.75 0 0 1 .336 1.005l-1.75 3.5a.75.75 0 0 1-1.16.234l-1.75-1.5a.75.75 0 0 1 .977-1.139l1.02.875 1.321-2.64a.75.75 0 0 1 1.006-.336Z'
            clipRule='evenodd'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='size-4'
        >
          <path
            fillRule='evenodd'
            d='M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z'
            clipRule='evenodd'
          />
          <path
            fillRule='evenodd'
            d='M3 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3Zm1.75 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5ZM4 11.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z'
            clipRule='evenodd'
          />
        </svg>
      )}
      <span className='sr-only'>Copy code to clipboard</span>
    </Button>
  );
};
