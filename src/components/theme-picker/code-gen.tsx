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
  const colors = useThemeStore((state) => state.colors);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const globalsCss = dedent`
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
      colors.ios.light.secondaryForeground
    )};
    --muted: ${getRgbValues(colors.ios.light.muted)};
    --muted-foreground: ${getRgbValues(colors.ios.light.mutedForeground)};
    --accent: ${getRgbValues(colors.ios.light.accent)};
    --accent-foreground: ${getRgbValues(colors.ios.light.accentForeground)};
    --destructive: ${getRgbValues(colors.ios.light.destructive)};
    --destructive-foreground: ${getRgbValues(
      colors.ios.light.destructiveForeground
    )};
    --border: ${getRgbValues(colors.ios.light.border)};
    --input: ${getRgbValues(colors.ios.light.input)};
    --ring: ${getRgbValues(colors.ios.light.ring)};

    --android-background: ${getRgbValues(colors.android.light.background)};
    --android-foreground: ${getRgbValues(colors.android.light.foreground)};
    --android-card: ${getRgbValues(colors.android.light.card)};
    --android-card-foreground: ${getRgbValues(
      colors.android.light.cardForeground
    )};
    --android-popover: ${getRgbValues(colors.android.light.popover)};
    --android-popover-foreground: ${getRgbValues(
      colors.android.light.popoverForeground
    )};
    --android-primary: ${getRgbValues(colors.android.light.primary)};
    --android-primary-foreground: ${getRgbValues(
      colors.android.light.primaryForeground
    )};
    --android-secondary: ${getRgbValues(colors.android.light.secondary)};
    --android-secondary-foreground: ${getRgbValues(
      colors.android.light.secondaryForeground
    )};
    --android-muted: ${getRgbValues(colors.android.light.muted)};
    --android-muted-foreground: ${getRgbValues(
      colors.android.light.mutedForeground
    )};
    --android-accent: ${getRgbValues(colors.android.light.accent)};
    --android-accent-foreground: ${getRgbValues(
      colors.android.light.accentForeground
    )};
    --android-destructive: ${getRgbValues(colors.android.light.destructive)};
    --android-destructive-foreground: ${getRgbValues(
      colors.android.light.destructiveForeground
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
        colors.ios.dark.secondaryForeground
      )};
      --muted: ${getRgbValues(colors.ios.dark.muted)};
      --muted-foreground: ${getRgbValues(colors.ios.dark.mutedForeground)};
      --accent: ${getRgbValues(colors.ios.dark.accent)};
      --accent-foreground: ${getRgbValues(colors.ios.dark.accentForeground)};
      --destructive: ${getRgbValues(colors.ios.dark.destructive)};
      --destructive-foreground: ${getRgbValues(
        colors.ios.dark.destructiveForeground
      )};
      --border: ${getRgbValues(colors.ios.dark.border)};
      --input: ${getRgbValues(colors.ios.dark.input)};
      --ring: ${getRgbValues(colors.ios.dark.ring)};

      --android-background: ${getRgbValues(colors.android.dark.background)};
      --android-foreground: ${getRgbValues(colors.android.dark.foreground)};
      --android-card: ${getRgbValues(colors.android.dark.card)};
      --android-card-foreground: ${getRgbValues(
        colors.android.dark.cardForeground
      )};
      --android-popover: ${getRgbValues(colors.android.dark.popover)};
      --android-popover-foreground: ${getRgbValues(
        colors.android.dark.popoverForeground
      )};
      --android-primary: ${getRgbValues(colors.android.dark.primary)};
      --android-primary-foreground: ${getRgbValues(
        colors.android.dark.primaryForeground
      )};
      --android-secondary: ${getRgbValues(colors.android.dark.secondary)};
      --android-secondary-foreground: ${getRgbValues(
        colors.android.dark.secondaryForeground
      )};
      --android-muted: ${getRgbValues(colors.android.dark.muted)};
      --android-muted-foreground: ${getRgbValues(
        colors.android.dark.mutedForeground
      )};
      --android-accent: ${getRgbValues(colors.android.dark.accent)};
      --android-accent-foreground: ${getRgbValues(
        colors.android.dark.accentForeground
      )};
      --android-destructive: ${getRgbValues(colors.android.dark.destructive)};
      --android-destructive-foreground: ${getRgbValues(
        colors.android.dark.destructiveForeground
      )};
      --android-border: ${getRgbValues(colors.android.dark.border)};
      --android-input: ${getRgbValues(colors.android.dark.input)};
      --android-ring: ${getRgbValues(colors.android.dark.ring)};
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
