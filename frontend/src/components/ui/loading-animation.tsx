import { Loader } from "lucide-react";

export const LoadingScreen = ({
  isDashboard = false,
}: {
  isDashboard?: boolean;
}) => {
  return (
    <main
      className={`flex ${isDashboard ? "h-full" : "h-screen"} items-center justify-center`}
    >
      <Loader className="animate-spin [animation-duration:1500ms]" />
    </main>
  );
};

export const LoadingAnimation = () => {
  return (
    <main className="">
      <Loader className="animate-spin [animation-duration:1500ms]" />
    </main>
  );
};
