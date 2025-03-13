import clsx from "clsx";
import { Link } from "./link";

export function Text({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      data-slot="text"
      {...props}
      className={clsx(className, "text-foreground/95 text-base/6 sm:text-sm/6")}
    />
  );
}

export function Caption({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      className={clsx(className, "text-muted-foreground text-xs/4")}
    />
  );
}

export function TextMono({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...props}
      className={clsx(
        "text-muted-foreground font-mono text-[0.8125rem]/6 font-medium tracking-widest text-pretty uppercase",
        className,
      )}
    />
  );
}

export function TextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        "text-zinc-950 underline decoration-zinc-950/50 data-hover:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-hover:decoration-white",
      )}
    />
  );
}

export function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      {...props}
      className={clsx(className, "font-medium text-zinc-950 dark:text-white")}
    />
  );
}

export function Code({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        "rounded-sm border border-zinc-950/10 bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white",
      )}
    />
  );
}
