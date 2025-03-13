import { TextMono } from "@/components/ui/text";
import { useThemeStore } from "@/store/theme-store";

const ColorGridComponent = ({ prefix = "ios" }: { prefix?: string }) => {
  return (
    <div className="grid h-full grid-cols-4 content-center items-center gap-px p-px">
      <ColorBox
        color={`var(--${prefix}-foreground)`}
        foregroundColor={`var(--${prefix}-background)`}
        name="Foreground"
      />
      <ColorBox
        color={`var(--${prefix}-background)`}
        foregroundColor={`var(--${prefix}-foreground)`}
        name="Background"
      />
      <ColorBox
        color={`var(--${prefix}-primary)`}
        foregroundColor={`var(--${prefix}-primary-foreground)`}
        name="Primary"
      />
      <ColorBox
        color={`var(--${prefix}-primary-foreground)`}
        foregroundColor={`var(--${prefix}-primary)`}
        name="Primary Foreground"
      />
      <ColorBox
        color={`var(--${prefix}-secondary)`}
        foregroundColor={`var(--${prefix}-secondary-foreground)`}
        name="Secondary"
      />
      <ColorBox
        color={`var(--${prefix}-secondary-foreground)`}
        foregroundColor={`var(--${prefix}-secondary)`}
        name="Secondary Foreground"
      />
      <ColorBox
        color={`var(--${prefix}-accent)`}
        foregroundColor={`var(--${prefix}-accent-foreground)`}
        name="Accent"
      />
      <ColorBox
        color={`var(--${prefix}-accent-foreground)`}
        foregroundColor={`var(--${prefix}-accent)`}
        name="Accent Foreground"
      />
      <ColorBox
        color={`var(--${prefix}-muted)`}
        foregroundColor={`var(--${prefix}-muted-foreground)`}
        name="Muted"
      />
      <ColorBox
        color={`var(--${prefix}-muted-foreground)`}
        foregroundColor={`var(--${prefix}-muted)`}
        name="Muted Foreground"
      />
      <ColorBox
        color={`var(--${prefix}-card)`}
        foregroundColor={`color-mix(in srgb, var(--${prefix}-card-foreground) 50%, transparent)`}
        name="Card"
      />
      <ColorBox
        color={`var(--${prefix}-card-foreground)`}
        foregroundColor={`color-mix(in srgb, var(--${prefix}-card) 50%, transparent)`}
        name="Card Foreground"
      />
      <ColorBox
        color={`var(--${prefix}-destructive)`}
        foregroundColor={`var(--${prefix}-destructive-foreground)`}
        name="Destructive"
      />
      <ColorBox
        color={`var(--${prefix}-destructive-foreground)`}
        foregroundColor={`var(--${prefix}-destructive)`}
        name="Destructive Foreground"
      />
      <ColorBox
        color={`var(--${prefix}-root)`}
        foregroundColor={`color-mix(in srgb, var(--${prefix}-foreground) 50%, transparent)`}
        name="Root"
      />
      {Array.from({ length: 6 }).map((_, index) => {
        const grayExt = index === 0 ? "" : index + 1;
        return (
          <ColorBox
            key={index}
            color={`var(--${prefix}-grey${grayExt})`}
            foregroundColor={`color-mix(in srgb, var(--${prefix}-foreground) 50%, transparent)`}
            name={`Grey${grayExt}`}
          />
        );
      })}
      {["border", "input", "ring"].map((name, index) => {
        return (
          <ColorBox
            key={`${name}-${index}`}
            color={`var(--${prefix}-${name})`}
            foregroundColor={`color-mix(in srgb, var(--${prefix}-foreground) 50%, transparent)`}
            name={name}
          />
        );
      })}
    </div>
  );
};

const ColorBox = ({
  color,
  foregroundColor,
  name,
}: {
  color: string;
  foregroundColor: string;
  name: string;
}) => {
  return (
    <div className="bg-background flex flex-col">
      <div
        className="flex h-20 w-full min-w-24 items-end"
        style={{ backgroundColor: color }}
      >
        <TextMono
          className="px-1 py-2 !text-[0.675rem]/3.5 sm:!text-[0.675rem]/3.5 lg:px-2"
          style={{
            color: foregroundColor,
          }}
        >
          {name}
        </TextMono>
      </div>
    </div>
  );
};

const platformComponents = {
  ios: () => ColorGridComponent({ prefix: "ios" }),
  android: () => ColorGridComponent({ prefix: "android" }),
  web: () => ColorGridComponent({ prefix: "web" }),
};

export const ColorGrid = () => {
  const platform = useThemeStore((state) => state.platform);
  const Component = platformComponents[platform];
  return <Component />;
};
