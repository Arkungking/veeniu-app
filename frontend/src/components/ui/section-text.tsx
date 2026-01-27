import clsx from "clsx";

interface SectionTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "transparant";
}

export const SectionText = ({
  children,
  className,
  variant = "transparant",
}: SectionTextProps) => {
  const variantClass = {
    default: "font-light",
    transparant: "md:text-sm font-light opacity-70 text-xs",
  }[variant];

  return <p className={clsx(variantClass, className)}>{children}</p>;
};
