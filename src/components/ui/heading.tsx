import clsx from "clsx";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={clsx(
        className,
        "max-w-3xl text-3xl font-medium tracking-tight text-pretty md:text-[2.5rem]/14 text-zinc-950 dark:text-white"
      )}
    />
  );
}

export function Subheading({ className, level = 2, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={clsx(
        className,
        "max-w-2xl text-base/7 text-gray-600 sm:text-sm/6 dark:text-gray-400 mt-4"
      )}
    />
  );
}
