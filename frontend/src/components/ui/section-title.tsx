import clsx from "clsx";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "small";
}

export const SectionTitle = ({
  children,
  className,
  variant = "default",
}: SectionTitleProps) => {
  const variantClass = {
    default: "md:text-3xl font-semibold text-2xl",
    small: "md:text-xl font-semibold text-lg",
  }[variant];

  return <p className={clsx(variantClass, className)}>{children}</p>;
};
