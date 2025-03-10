import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { Platform, DEFAULT_COLORS } from "@/store/theme-store";

// Create platform-specific color maps
const PLATFORM_COLORS = {
  ios: DEFAULT_COLORS.ios.light,
  android: DEFAULT_COLORS.android.light,
  web: DEFAULT_COLORS.web.light,
} as const;

function generateColorMap(platform: Platform) {
  const colors = PLATFORM_COLORS[platform];
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
    let platform: Platform = "web"; // default
    if (fileName.includes("ios")) {
      platform = "ios";
    } else if (fileName.includes("android")) {
      platform = "android";
    }

    // Process both light and dark mode colors
    const colorMap = generateColorMap(platform);

    // Replace hex colors with theme variables
    Object.entries(colorMap).forEach(([staticColor, themeColor]) => {
      const regex = new RegExp(`'${staticColor}'`, "gi");
      modifiedContent = modifiedContent.replace(
        regex,
        `{colors.${JSON.stringify(platform)}[theme].${themeColor}}`
      );
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
const previewPath = join(process.cwd(), "src", "components", "preview", "svg");

console.log("Starting SVG theme color replacement...");
processDirectory(previewPath)
  .then(() => console.log("Completed theme color replacement"))
  .catch((error) => console.error("Error:", error));
