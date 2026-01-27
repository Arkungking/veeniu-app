import { auth } from "@/auth";
import { Wrapper } from "@/components/ui/wrapper";
import { redirect } from "next/navigation";
import { Data } from "./Data";
import { Header } from "./Header";
import { Points } from "./Points";
import { ReferenceCode } from "./ReferenceCode";
import { Tickets } from "./Tickets";
import { TransactionHistory } from "./TransactionHistory";

const Account = async () => {
  const session = await auth();

  if (!session?.user.id) return redirect("/auth/signin");

  const userData = session.user;

  return (
    <main className="w-full justify-center">
      <Wrapper className="mt-[100px]">
        <Header />
        <Data data={userData} />
        <div className="gap-10 md:flex">
          <ReferenceCode data={userData} />
          <Points />
        </div>
        <Tickets />
        <TransactionHistory />
      </Wrapper>
    </main>
  );
};

export default Account;
