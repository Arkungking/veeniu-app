"use client";

import { DataPagination } from "@/components/data-pagination";
import { SidebarTriggerMobile } from "@/components/sidebar-trigger-mobile";
import { Table } from "@/components/table";
import { Input } from "@/components/ui/input";
import { LoadingScreen } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { EventCardProps } from "@/props/eventCard.props";
import { Suspense, useState } from "react";
import { useGetOrgEvents } from "../../../hooks/event/useGetOrgEvents";
import { Sheet } from "./Sheet";
import { SheetEdit } from "./SheetEdit";

export default function page() {
  const [data, setData] = useState<EventCardProps | null>();
  const [page, setPage] =useState(1);
  const { data: event, isPending } = useGetOrgEvents({
    page,
    limit: 20,
  });
  const dashboardTableData = {
    title: "",
    columns: [
    { key: "no", title: "No" },
      { key: "title", title: "Event title" },
      { key: "category", title: "Category" },
      { key: "location", title: "Location" },
      { key: "startDate", title: "Date" },
      { key: "totalSeats", title: "Total seats" },
      { key: "availableSeats", title: "Available seats" },
    ],
    data: event?.data ?? [],
    actions: {
      label: "Event action",
      items: [
        {
          label: "Edit",
          onClick: (row: EventCardProps) => {
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

  if (isPending) return <LoadingScreen isDashboard={true} />;

  return (
    <section>
      <SidebarTriggerMobile>
        <SectionTitle className="mt-10">My events</SectionTitle>
      </SidebarTriggerMobile>
      <div className="mt-10 mb-5 flex justify-between gap-2">
        <Input type="text" placeholder="Search" className="w-[280px]" />
        <Sheet />
      </div>
      <Suspense>
        <section className="my-5 grid w-full grid-cols-1">
          <Table {...dashboardTableData} />
        </section>
        <DataPagination onChangePage={onChangePage} meta={event.meta} />
      </Suspense>
      <div className="hidden">
        <SheetEdit data={data!} onClose={() => setData(null)} />
      </div>
    </section>
  );
}
