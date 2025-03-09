import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import Color from "color";
import { ColorMode, Theme } from "@/store/theme-store";

// Convert RGB string to hex
function rgbToHex(rgb: string): string {
  return Color(rgb).hex().toLowerCase();
}

// Generate color maps for each platform
const IOS_COLORS = {
  light: {
    grey6: rgbToHex("rgb(242, 242, 247)"),
    grey5: rgbToHex("rgb(230, 230, 235)"),
    grey4: rgbToHex("rgb(210, 210, 215)"),
    grey3: rgbToHex("rgb(199, 199, 204)"),
    grey2: rgbToHex("rgb(175, 176, 180)"),
    grey: rgbToHex("rgb(142, 142, 147)"),
    background: rgbToHex("rgb(242, 242, 247)"),
    foreground: rgbToHex("rgb(0, 0, 0)"),
    root: rgbToHex("rgb(255, 255, 255)"),
    card: rgbToHex("rgb(255, 255, 255)"),
    destructive: rgbToHex("rgb(255, 56, 43)"),
    primary: rgbToHex("rgb(0, 123, 254)"),
  },
  dark: {
    grey6: rgbToHex("rgb(21, 21, 24)"),
    grey5: rgbToHex("rgb(40, 40, 42)"),
    grey4: rgbToHex("rgb(55, 55, 57)"),
    grey3: rgbToHex("rgb(70, 70, 73)"),
    grey2: rgbToHex("rgb(99, 99, 102)"),
    grey: rgbToHex("rgb(142, 142, 147)"),
    background: rgbToHex("rgb(0, 0, 0)"),
    foreground: rgbToHex("rgb(255, 255, 255)"),
    root: rgbToHex("rgb(0, 0, 0)"),
    card: rgbToHex("rgb(21, 21, 24)"),
    destructive: rgbToHex("rgb(254, 67, 54)"),
    primary: rgbToHex("rgb(3, 133, 255)"),
  },
};

const ANDROID_COLORS = {
  light: {
    grey6: rgbToHex("rgb(249, 249, 255)"),
    grey5: rgbToHex("rgb(215, 217, 228)"),
    grey4: rgbToHex("rgb(193, 198, 215)"),
    grey3: rgbToHex("rgb(113, 119, 134)"),
    grey2: rgbToHex("rgb(65, 71, 84)"),
    grey: rgbToHex("rgb(24, 28, 35)"),
    background: rgbToHex("rgb(249, 249, 255)"),
    foreground: rgbToHex("rgb(0, 0, 0)"),
    root: rgbToHex("rgb(255, 255, 255)"),
    card: rgbToHex("rgb(255, 255, 255)"),
    destructive: rgbToHex("rgb(186, 26, 26)"),
    primary: rgbToHex("rgb(0, 112, 233)"),
  },
  dark: {
    grey6: rgbToHex("rgb(16, 19, 27)"),
    grey5: rgbToHex("rgb(39, 42, 50)"),
    grey4: rgbToHex("rgb(49, 53, 61)"),
    grey3: rgbToHex("rgb(54, 57, 66)"),
    grey2: rgbToHex("rgb(139, 144, 160)"),
    grey: rgbToHex("rgb(193, 198, 215)"),
    background: rgbToHex("rgb(0, 0, 0)"),
    foreground: rgbToHex("rgb(255, 255, 255)"),
    root: rgbToHex("rgb(0, 0, 0)"),
    card: rgbToHex("rgb(16, 19, 27)"),
    destructive: rgbToHex("rgb(147, 0, 10)"),
    primary: rgbToHex("rgb(3, 133, 255)"),
  },
};

// Use Android colors for web
const WEB_COLORS = ANDROID_COLORS;

// Create platform-specific color maps
const PLATFORM_COLORS = {
  ios: IOS_COLORS,
  android: ANDROID_COLORS,
  web: WEB_COLORS,
} as const;

function generateColorMap(platform: ColorMode, mode: Theme) {
  const colors = PLATFORM_COLORS[platform][mode];
  const map: Record<string, string> = {};

  // Add all color variations
  Object.entries(colors).forEach(([key, value]) => {
    map[value] = key;
    // Also add uppercase version
    map[value.toUpperCase()] = key;
  });

  return map;
}

async function processFile(filePath: string) {
  try {
    const content = await readFile(filePath, "utf-8");
    let modifiedContent = content;

    // Determine the platform from the file path
    const fileName = filePath.split("/").pop() || "";
    let platform: ColorMode = "web"; // default
    if (fileName.includes("ios")) {
      platform = "ios";
    } else if (fileName.includes("android")) {
      platform = "android";
    }

    // Process both light and dark mode colors
    ["light", "dark"].forEach((mode) => {
      const colorMap = generateColorMap(platform, mode as Theme);

      // Replace hex colors with theme variables
      Object.entries(colorMap).forEach(([staticColor, themeColor]) => {
        const regex = new RegExp(staticColor, "gi");
        modifiedContent = modifiedContent.replace(
          regex,
          `{colors["${mode}"][${JSON.stringify(platform)}].${themeColor}}`
        );
      });

      // Replace rgb/rgba colors
      const rgbRegex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g;
      modifiedContent = modifiedContent.replace(rgbRegex, (match) => {
        const hex = Color(match).hex().toLowerCase();
        return colorMap[hex]
          ? `{colors["${mode}"][${JSON.stringify(platform)}].${colorMap[hex]}}`
          : match;
      });
    });

    // Save the modified content
    await writeFile(filePath, modifiedContent, "utf-8");
    console.log(`Processed: ${filePath} (${platform})`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function processDirectory(dirPath: string) {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.name.endsWith(".tsx")) {
        await processFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

// Main execution
const previewPath = join(process.cwd(), "src", "components", "preview");

console.log("Starting SVG theme color replacement...");
processDirectory(previewPath)
  .then(() => console.log("Completed theme color replacement"))
  .catch((error) => console.error("Error:", error));
