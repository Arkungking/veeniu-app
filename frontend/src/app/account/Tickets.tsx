"use client";

import { DataPagination } from "@/components/data-pagination";
import { TicketCard } from "@/components/ticket-card";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { useGetTickets } from "@/hooks/transaction/useGetTickets";
import { useEffect, useState } from "react";

export const Tickets = () => {
  const [page, setPage] = useState(1);
  const {
    data: tickets,
    isPending,
    refetch,
  } = useGetTickets({ page, limit: 10 });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  console.log(tickets);

  return (
    <section className="bg-card mt-10 flex-1 rounded-lg p-5 md:p-15">
      <SectionTitle variant="small">My tickets</SectionTitle>
      {isPending ? (
        <div className="h-[400px] items-center justify-center md:flex">
          <LoadingAnimation />
        </div>
      ) : tickets.data.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-5 xl:grid-cols-4">
          {tickets.data.map((ticket: any, i: number) => (
            <TicketCard key={i} ticketData={ticket} />
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground mt-5 flex h-[200px] w-full items-center justify-center rounded-2xl border-2 border-dashed">
          No tickets
        </div>
      )}
      {!!tickets?.meta && (
        <DataPagination onChangePage={onChangePage} meta={tickets.meta} />
      )}
    </section>
  );
};
