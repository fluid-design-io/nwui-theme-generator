"use client";

import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";
import { cva } from "class-variance-authority";
import { previewAtom } from "./dropdown";
import { useAtomValue } from "jotai";

const frameVariants = cva(
  "ring-border transition-all overflow-hidden flex m-4 lg:m-8 2xl:h-full",
  {
    variants: {
      variant: {
        ios: "ring-5 rounded-[2.5rem]",
        android: "ring-5 rounded-2xl",
        web: "ring-2 rounded-md",
      },
      screen: {
        "color-grid": "ring-0 rounded-none",
        messaging: "",
        consent: "",
      },
    },
  },
);

export const Frame = ({ children }: { children: React.ReactNode }) => {
  const platform = useThemeStore((state) => state.platform);
  const theme = useThemeStore((state) => state.theme);
  const colors = useThemeStore((state) => state.colors);
  const screen = useAtomValue(previewAtom);
  return (
    <div
      className={cn(frameVariants({ variant: platform, screen }), {
        "scheme-dark": theme === "dark",
        "scheme-light": theme === "light",
      })}
      style={
        {
          "--ios-grey6": colors.ios[theme].grey6,
          "--ios-grey5": colors.ios[theme].grey5,
          "--ios-grey4": colors.ios[theme].grey4,
          "--ios-grey3": colors.ios[theme].grey3,
          "--ios-grey2": colors.ios[theme].grey2,
          "--ios-grey": colors.ios[theme].grey,
          "--ios-background": colors.ios[theme].background,
          "--ios-foreground": colors.ios[theme].foreground,
          "--ios-root": colors.ios[theme].root,
          "--ios-card": colors.ios[theme].card,
          "--ios-card-foreground": colors.ios[theme].cardForeground,
          "--ios-popover": colors.ios[theme].popover,
          "--ios-popover-foreground": colors.ios[theme].popoverForeground,
          "--ios-destructive": colors.ios[theme].destructive,
          "--ios-destructive-foreground":
            colors.ios[theme].destructiveForeground,
          "--ios-primary": colors.ios[theme].primary,
          "--ios-primary-foreground": colors.ios[theme].primaryForeground,
          "--ios-secondary": colors.ios[theme].secondary,
          "--ios-secondary-foreground": colors.ios[theme].secondaryForeground,
          "--ios-accent": colors.ios[theme].accent,
          "--ios-accent-foreground": colors.ios[theme].accentForeground,
          "--ios-muted": colors.ios[theme].muted,
          "--ios-muted-foreground": colors.ios[theme].mutedForeground,
          "--ios-border": colors.ios[theme].border,
          "--ios-input": colors.ios[theme].input,
          "--ios-ring": colors.ios[theme].ring,
          "--android-grey6": colors.android[theme].grey6,
          "--android-grey5": colors.android[theme].grey5,
          "--android-grey4": colors.android[theme].grey4,
          "--android-grey3": colors.android[theme].grey3,
          "--android-grey2": colors.android[theme].grey2,
          "--android-grey": colors.android[theme].grey,
          "--android-background": colors.android[theme].background,
          "--android-foreground": colors.android[theme].foreground,
          "--android-root": colors.android[theme].root,
          "--android-card": colors.android[theme].card,
          "--android-card-foreground": colors.android[theme].cardForeground,
          "--android-popover": colors.android[theme].popover,
          "--android-popover-foreground":
            colors.android[theme].popoverForeground,
          "--android-destructive": colors.android[theme].destructive,
          "--android-destructive-foreground":
            colors.android[theme].destructiveForeground,
          "--android-primary": colors.android[theme].primary,
          "--android-primary-foreground":
            colors.android[theme].primaryForeground,
          "--android-secondary": colors.android[theme].secondary,
          "--android-secondary-foreground":
            colors.android[theme].secondaryForeground,
          "--android-accent": colors.android[theme].accent,
          "--android-accent-foreground": colors.android[theme].accentForeground,
          "--android-muted": colors.android[theme].muted,
          "--android-muted-foreground": colors.android[theme].mutedForeground,
          "--android-border": colors.android[theme].border,
          "--android-input": colors.android[theme].input,
          "--android-ring": colors.android[theme].ring,
          "--web-grey6": colors.web[theme].grey6,
          "--web-grey5": colors.web[theme].grey5,
          "--web-grey4": colors.web[theme].grey4,
          "--web-grey3": colors.web[theme].grey3,
          "--web-grey2": colors.web[theme].grey2,
          "--web-grey": colors.web[theme].grey,
          "--web-background": colors.web[theme].background,
          "--web-foreground": colors.web[theme].foreground,
          "--web-root": colors.web[theme].root,
          "--web-card": colors.web[theme].card,
          "--web-card-foreground": colors.web[theme].cardForeground,
          "--web-popover": colors.web[theme].popover,
          "--web-popover-foreground": colors.web[theme].popoverForeground,
          "--web-destructive": colors.web[theme].destructive,
          "--web-destructive-foreground":
            colors.web[theme].destructiveForeground,
          "--web-primary": colors.web[theme].primary,
          "--web-primary-foreground": colors.web[theme].primaryForeground,
          "--web-secondary": colors.web[theme].secondary,
          "--web-secondary-foreground": colors.web[theme].secondaryForeground,
          "--web-accent": colors.web[theme].accent,
          "--web-accent-foreground": colors.web[theme].accentForeground,
          "--web-muted": colors.web[theme].muted,
          "--web-muted-foreground": colors.web[theme].mutedForeground,
          "--web-border": colors.web[theme].border,
          "--web-input": colors.web[theme].input,
          "--web-ring": colors.web[theme].ring,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export const IosIndicator = () => (
  <rect
    width={135}
    height={5}
    x={136}
    y={861}
    fill="light-dark(#888,#AAA)"
    rx={2.5}
  />
);

export const IosStatusBar = ({ fill }: { fill: string }) => (
  <>
    <path
      fill={fill}
      d="M61.767 25.723c.641 0 1.25.12 1.826.357a4.07 4.07 0 0 1 1.527 1.096c.448.492.8 1.126 1.054 1.9.255.77.382 1.697.382 2.781v.017c0 1.345-.194 2.496-.58 3.453-.388.958-.944 1.694-1.67 2.208-.719.51-1.58.764-2.58.764-.737 0-1.401-.133-1.993-.399a4.076 4.076 0 0 1-1.461-1.112 3.886 3.886 0 0 1-.772-1.627l-.017-.091h2.1l.034.083c.105.276.254.52.448.73.2.21.437.374.714.49.282.11.597.166.946.166.631 0 1.146-.185 1.544-.556.404-.376.706-.877.905-1.502.205-.631.32-1.329.348-2.092.006-.083.009-.164.009-.241v-.24l-.374-2.001c0-.454-.105-.866-.315-1.237a2.374 2.374 0 0 0-.855-.88 2.267 2.267 0 0 0-1.204-.324 2.31 2.31 0 0 0-1.187.316c-.36.21-.647.498-.863.863a2.31 2.31 0 0 0-.324 1.212v.017c0 .464.103.877.307 1.236.205.355.484.634.839.839.354.204.758.307 1.212.307.453 0 .86-.1 1.22-.299.36-.2.645-.476.855-.83.21-.354.315-.755.315-1.204v-.016h.498v2.208h-.29a2.878 2.878 0 0 1-.64.88c-.282.27-.63.49-1.045.655-.41.166-.891.25-1.445.25-.763 0-1.438-.172-2.025-.515a3.73 3.73 0 0 1-1.386-1.411c-.332-.598-.498-1.273-.498-2.026v-.016c0-.814.188-1.536.564-2.167a4.02 4.02 0 0 1 1.577-1.494c.675-.365 1.442-.548 2.3-.548ZM70.325 36.39a1.3 1.3 0 0 1-.947-.374 1.28 1.28 0 0 1-.373-.93c0-.37.124-.68.373-.93.255-.254.57-.381.947-.381.382 0 .697.127.946.382.249.249.373.559.373.93 0 .365-.124.675-.373.93-.249.248-.564.373-.946.373Zm0-6.16a1.3 1.3 0 0 1-.947-.373 1.28 1.28 0 0 1-.373-.93c0-.37.124-.68.373-.93.255-.254.57-.381.947-.381.382 0 .697.127.946.382.249.249.373.558.373.93 0 .364-.124.674-.373.929-.249.249-.564.373-.946.373ZM79.904 38v-2.3h-5.86v-1.75l.946-1.62a156.346 156.346 0 0 1 1.959-3.22c.332-.531.661-1.054.987-1.569.333-.52.665-1.026.997-1.519h3.013v7.91h1.618v1.769h-1.618V38h-2.042Zm-3.868-4.018h3.901v-6.25h-.124l-.756 1.162c-.254.399-.512.805-.772 1.22-.26.415-.517.833-.772 1.254-.254.415-.506.832-.755 1.253-.25.415-.49.827-.722 1.237v.124ZM88.52 38v-9.87h-.15l-2.98 2.1v-2.008l3.13-2.2h2.133V38H88.52Z"
    />
    <path
      fill={fill}
      fillRule="evenodd"
      d="M307.865 27.033c0-.633-.477-1.146-1.067-1.146h-1.066c-.589 0-1.067.513-1.067 1.146v9.934c0 .633.478 1.146 1.067 1.146h1.066c.59 0 1.067-.513 1.067-1.146v-9.934Zm-7.434 1.3h1.067c.589 0 1.066.525 1.066 1.173v7.434c0 .648-.477 1.173-1.066 1.173h-1.067c-.589 0-1.067-.525-1.067-1.173v-7.434c0-.648.478-1.174 1.067-1.174Zm-4.332 2.648h-1.066c-.59 0-1.067.532-1.067 1.189v4.755c0 .656.477 1.188 1.067 1.188h1.066c.589 0 1.067-.532 1.067-1.188V32.17c0-.657-.478-1.189-1.067-1.189Zm-5.301 2.445h-1.066c-.589 0-1.067.525-1.067 1.172v2.343c0 .648.478 1.172 1.067 1.172h1.066c.59 0 1.067-.524 1.067-1.172v-2.343c0-.647-.477-1.172-1.067-1.172ZM323.436 28.302c2.488 0 4.88.922 6.682 2.576a.354.354 0 0 0 .486-.004l1.298-1.263a.343.343 0 0 0 .105-.248.346.346 0 0 0-.108-.246c-4.731-4.375-12.195-4.375-16.926 0a.346.346 0 0 0-.108.246c0 .093.037.182.105.248l1.298 1.263c.133.13.35.132.486.004a9.89 9.89 0 0 1 6.682-2.576Zm-.003 4.22c1.357 0 2.666.512 3.672 1.436a.344.344 0 0 0 .484-.006l1.287-1.32a.367.367 0 0 0-.005-.52 7.9 7.9 0 0 0-10.873.001.367.367 0 0 0-.005.52l1.287 1.319a.342.342 0 0 0 .483.006 5.43 5.43 0 0 1 3.67-1.436Zm2.525 2.794a.413.413 0 0 1-.103.28l-2.177 2.455a.32.32 0 0 1-.241.113.324.324 0 0 1-.242-.113l-2.177-2.454a.408.408 0 0 1-.102-.281.403.403 0 0 1 .113-.276c1.39-1.314 3.426-1.314 4.816 0 .07.07.111.17.113.276Z"
      clipRule="evenodd"
    />
    <path
      fill={fill}
      d="M365.007 30.281v4.076a2.212 2.212 0 0 0 1.328-2.038c0-.89-.523-1.693-1.328-2.038ZM341.007 31.5c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.092c.535-.273 1.235-.273 2.635-.273h13c1.4 0 2.1 0 2.635.273.47.24.853.622 1.092 1.092.273.535.273 1.235.273 2.635v1c0 1.4 0 2.1-.273 2.635-.239.47-.622.853-1.092 1.093-.535.272-1.235.272-2.635.272h-13c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092c-.272-.535-.272-1.235-.272-2.635v-1Z"
    />
  </>
);
