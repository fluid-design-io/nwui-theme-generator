/**
 * Convert `foregroundPrimary` to `foreground-primary`
 */
export const toDashCase = (str: string) => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};
