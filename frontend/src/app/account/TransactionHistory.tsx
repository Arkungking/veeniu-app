"use client";

import { DataPagination } from "@/components/data-pagination";
import { Table } from "@/components/table";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { useGetUserTransactions } from "@/hooks/transaction/useGetUserTransactions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const TransactionHistory = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const {
    data: transaction,
    isPending,
    refetch,
  } = useGetUserTransactions({
    page,
    limit: 10,
  });
  const hasWaitingPayment = transaction?.data?.some(
    (t: any) => t.status === "WAITING_FOR_PAYMENT",
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const dashboardTableData = {
    title: "",
    columns: [
      { key: "no", title: "No" },
      { key: "event.title", title: "Event title" },
      { key: "event.location", title: "Event location" },
      { key: "finalAmount", title: "Amount" },
      { key: "status", title: "Status" },
      { key: "event.startDate", title: "Date" },
    ],
    data: transaction?.data ?? [],
    actions: hasWaitingPayment
      ? {
          label: "Transaction action",
          items: [
            {
              label: "Upload Payment Proof",
              onClick: (row: any) => router.push(`payment/${row.uuid}`),
            },
          ],
        }
      : undefined,
  };

  return (
    <section className="bg-card mt-10 flex-1 rounded-lg p-5 md:p-15">
      <SectionTitle variant="small">Transaction history</SectionTitle>
      {isPending ? (
        <div className="h-[400px] items-center justify-center md:flex">
          <LoadingAnimation />
        </div>
      ) : (
        <div className="grid h-[400px] w-full grid-cols-1">
          <Table {...dashboardTableData} />
        </div>
      )}
      {!!transaction?.meta && (
        <DataPagination onChangePage={onChangePage} meta={transaction.meta} />
      )}
    </section>
  );
};
