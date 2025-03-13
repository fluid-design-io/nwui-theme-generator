import { DEFAULT_COLORS } from "@/store/theme-store";
import { toDashCase } from "./utils";

export const ColorGridIos = ({ prefix = "ios" }: { prefix?: string }) => {
  const colors = DEFAULT_COLORS.ios.light;
  return (
    <div className="grid grid-cols-3 gap-px">
      {Object.entries(colors).map(([key]) => (
        <div
          key={key}
          className="h-24"
          style={{ backgroundColor: `var(--${prefix}-${toDashCase(key)})` }}
        >
          {key}
        </div>
      ))}
    </div>
  );
};
