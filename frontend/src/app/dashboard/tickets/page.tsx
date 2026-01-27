"use client";

import { DataPagination } from "@/components/data-pagination";
import { SidebarTriggerMobile } from "@/components/sidebar-trigger-mobile";
import { Table } from "@/components/table";
import { Input } from "@/components/ui/input";
import { LoadingScreen } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { useGetOrgEvents } from "@/hooks/event/useGetOrgEvents";
import { useGetOrgTickets } from "@/hooks/ticket/useGetOrgTickets";
import { TicketProps } from "@/props/event.props";
import { Suspense, useState } from "react";
import { Sheet } from "./Sheet";
import { SheetEdit } from "./SheetEdit";

export default function page() {
  const [data, setData] = useState<TicketProps | null>();
  const [page, setPage] = useState(1);
  const { data: ticket, isPending } = useGetOrgTickets({
    page,
    limit: 20,
  });
  const { data: event, isPending: isPending2 } = useGetOrgEvents();
  const dashboardTableData = {
    title: "",
    columns: [
      { key: "no", title: "No" },
      { key: "name", title: "Ticket title" },
      { key: "price", title: "Price" },
      { key: "stock", title: "Stock" },
      { key: "event.title", title: "Parent event" },
    ],
    data: ticket?.data ?? [],
    actions: {
      label: "Ticket action",
      items: [
        {
          label: "Edit",
          onClick: (row: TicketProps) => {
            console.log(row);
            setData(row);
          },
        },
        {
          label: "Delete",
          onClick: (row: Record<string, any>) => {
            console.log(row);
          },
          destructive: true,
        },
      ],
    },
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  if (isPending || isPending2) return <LoadingScreen isDashboard={true} />;

  return (
    <section>
      <SidebarTriggerMobile>
        <SectionTitle className="mt-10">My tickets</SectionTitle>
      </SidebarTriggerMobile>
      <div className="mt-10 mb-5 flex justify-between gap-2">
        <Input type="text" placeholder="Search" className="w-[280px]"></Input>
        <Suspense>
          <Sheet events={event.data} />
        </Suspense>
      </div>
      <Suspense>
        <section className="my-5 grid w-full grid-cols-1">
          <Table {...dashboardTableData} />
        </section>
        <DataPagination onChangePage={onChangePage} meta={ticket.meta} />
      </Suspense>
      <div className="hidden">
        <SheetEdit data={data!} onClose={() => setData(null)} />
      </div>
    </section>
  );
}
