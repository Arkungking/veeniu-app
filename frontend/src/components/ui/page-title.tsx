import clsx from "clsx";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "transparant";
}

export const PageTitle = ({ children, className }: PageTitleProps) => {
  return (
    <p className={clsx("text-3xl font-bold md:text-5xl", className)}>
      {children}
    </p>
  );
};
