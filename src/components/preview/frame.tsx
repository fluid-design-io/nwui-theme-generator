import { cva, VariantProps } from "class-variance-authority";

const frameVariants = cva(
  "ring-5 ring-border transition-all overflow-hidden flex m-4 lg:m-8 2xl:h-full",
  {
    variants: {
      variant: {
        ios: "rounded-4xl",
        android: "rounded-md",
        web: "rounded-md",
      },
    },
  }
);

type FrameVariant = VariantProps<typeof frameVariants>["variant"];

export const Frame = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: FrameVariant;
}) => {
  return <div className={frameVariants({ variant })}>{children}</div>;
};
