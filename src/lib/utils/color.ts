import Color from "color";

export function getRgbValues(colorStr: string): string {
  try {
    const color = Color(colorStr);
    return color.rgb().array().join(" ");
  } catch (error) {
    console.error("Invalid color:", colorStr, error);
    return "0 0 0"; // fallback to black
  }
}
