import { auth } from "@/auth";
import { SidebarTriggerMobile } from "@/components/sidebar-trigger-mobile";
import { SectionTitle } from "@/components/ui/section-title";
import { formatCurrency, getGreeting } from "@/lib/utils";
import { redirect } from "next/navigation";

interface StatCardProps {
  title: string;
  value: number | string;
  isCurrency?: boolean;
}

const StatCard = ({ title, value, isCurrency = false }: StatCardProps) => {
  return (
    <div className="md:bg-card p-5 md:rounded-lg">
      <SectionTitle variant="small">{title}</SectionTitle>
      <p className="text-3xl font-bold">
        {isCurrency && typeof value === "number"
          ? formatCurrency(value)
          : value}
      </p>
    </div>
  );
};

const Page = async () => {
  const session = await auth();

  if (session?.user.role !== "ORGANIZER") return redirect("/");

  return (
    <main>
      <SidebarTriggerMobile>
        <SectionTitle className="mt-10">{getGreeting("Hooman")}</SectionTitle>
      </SidebarTriggerMobile>
      <section className="bg-card mt-10 gap-5 rounded-lg md:mt-20 md:flex md:rounded-none md:bg-transparent">
        <StatCard title="Total revenue" value={formatCurrency(1000000)} />
        <StatCard title="Ticket sold" value={15.0} />
        <StatCard title="Total attendees" value={15.0} />
      </section>
    </main>
  );
};

export default Page;
