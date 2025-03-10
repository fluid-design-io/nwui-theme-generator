/**
 * Example usage of the ColorGenerator system
 */

import { getColorGenerator } from "./color-generator";

/**
 * Example showing how to use the platform-specific color generators
 */
export const generateThemes = () => {
  // ---- Web platform examples ----

  // Get a web platform color generator
  const webGenerator = getColorGenerator("web");

  // Generate colors from primary color
  const webColors = webGenerator.generateFromPrimary(
    "#3b82f6", // Blue color
    "light", // Current theme
    true, // Sync light/dark
  );

  console.log("Web platform colors:", webColors);

  // Generate secondary colors
  const webSecondaryColors = webGenerator.generateFromSecondary(
    "#10b981", // Green color
    "light", // Current theme
    true, // Sync light/dark
  );

  console.log("Web secondary colors:", webSecondaryColors);

  // Generate accent colors
  const webAccentColors = webGenerator.generateFromAccent(
    "#f97316", // Orange color
    "light", // Current theme
    true, // Sync light/dark
  );

  console.log("Web accent colors:", webAccentColors);

  // ---- iOS platform examples ----

  // Get an iOS platform color generator
  const iosGenerator = getColorGenerator("ios");

  // Generate colors from primary color with iOS-specific styling
  const iosColors = iosGenerator.generateFromPrimary(
    "#3b82f6", // Blue color
    "light", // Current theme
    true, // Sync light/dark
  );

  console.log("iOS platform colors:", iosColors);

  // ---- Android platform examples ----

  // Get an Android platform color generator
  const androidGenerator = getColorGenerator("android");

  // Generate colors from primary color with Android-specific styling
  const androidColors = androidGenerator.generateFromPrimary(
    "#3b82f6", // Blue color
    "light", // Current theme
    true, // Sync light/dark
  );

  console.log("Android platform colors:", androidColors);

  // Compare the differences between platforms
  console.log("Comparing platform differences:");
  console.log("Web background (light):", webColors.light?.background);
  console.log("iOS background (light):", iosColors.light?.background);
  console.log("Android background (light):", androidColors.light?.background);
};

/**
 * Example showing how to extend the color generator system
 * with a custom platform
 */
export const extendingColorGenerator = () => {
  // This is just pseudocode to show the concept
  // Extend BaseColorGenerator with your own platform implementation
  /*
  class CustomPlatformGenerator extends BaseColorGenerator {
    constructor() {
      super("custom");
    }
    
    generateFromPrimary(
      primary: string,
      theme: Theme,
      sync: boolean
    ): Partial<Record<Theme, PrimaryGeneratedColors>> {
      // Your custom implementation here
      // Customize colors for your specific platform needs
      
      return {
        light: {
          // Your light theme implementation
        },
        dark: {
          // Your dark theme implementation
        }
      };
    }
    
    generateFromSecondary(
      secondary: string,
      theme: Theme,
      sync: boolean
    ): Partial<Record<Theme, SecondaryGeneratedColors>> {
      // Your custom implementation
    }
    
    generateFromAccent(
      accent: string,
      theme: Theme,
      sync: boolean
    ): Partial<Record<Theme, AccentGeneratedColors>> {
      // Your custom implementation
    }
  }
  
  // Then register it in the getColorGenerator factory function:
  function getColorGenerator(platform: Platform | "custom"): BaseColorGenerator {
    switch (platform) {
      case "custom":
        return new CustomPlatformGenerator();
      // ... other cases
    }
  }
  */
};
