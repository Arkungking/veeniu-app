import { auth } from "@/auth";
import { Landing } from "./Landing";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session?.user.role === "ORGANIZER") return redirect("/dashboard");

  return <Landing />;
};

export default Page;
