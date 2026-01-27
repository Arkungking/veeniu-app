import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Forms } from "./Forms";
import { Greet } from "./Greet";

const Signup = async () => {
  const session = await auth();

  if (session?.user.role === "ORGANIZER") return redirect("/dashboard");
  else if (session?.user.id) return redirect("/");

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="bg-card scroll-hidden h-[80%] w-[80%] items-center space-y-5 overflow-y-auto rounded-lg border p-5 md:flex md:h-[60%] md:w-[60%] md:space-y-0 md:px-15">
        <Greet />
        <Forms />
      </section>
    </main>
  );
};

export default Signup;
