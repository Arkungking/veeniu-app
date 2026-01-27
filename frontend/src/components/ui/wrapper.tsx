import clsx from "clsx";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <section className="flex w-full justify-center">
      <section className={clsx("mx-5 w-[1920px] md:mx-20", className)}>
        {children}
      </section>
    </section>
  );
};
