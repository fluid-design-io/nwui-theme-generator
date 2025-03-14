import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva("tracking-tight text-pretty", {
  variants: {
    level: {
      1: "text-4xl font-bold text-foreground md:text-5xl/tight",
      2: "text-3xl font-semibold text-foreground md:text-4xl/tight",
      3: "text-xl font-medium text-foreground md:text-2xl/tight",
      4: "text-lg font-medium text-muted-foreground",
      5: "text-base font-medium text-muted-foreground",
      6: "text-sm font-medium text-muted-foreground",
    },
  },
  defaultVariants: {
    level: 1,
  },
});

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> &
  VariantProps<typeof headingVariants>;

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={clsx(headingVariants({ level, className }))}
    />
  );
}

const subheadingVariants = cva("text-pretty", {
  variants: {
    level: {
      1: "text-xl text-muted-foreground/90 max-w-3xl mt-4",
      2: "text-lg text-muted-foreground/80 max-w-2xl mt-3",
      3: "text-base text-muted-foreground/70 max-w-xl mt-2",
      4: "text-sm text-muted-foreground/60 max-w-lg mt-2",
      5: "text-sm text-muted-foreground/60 max-w-md mt-1",
      6: "text-xs text-muted-foreground/60 max-w-md mt-1",
    },
  },
  defaultVariants: {
    level: 2,
  },
});

type SubheadingProps = HeadingProps & VariantProps<typeof subheadingVariants>;

export function Subheading({
  className,
  level = 2,
  ...props
}: SubheadingProps) {
  const Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={clsx(subheadingVariants({ level, className }))}
    />
  );
}
