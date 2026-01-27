"use client";

import { DataPagination } from "@/components/data-pagination";
import { ImageDialog } from "@/components/popup-confirmation";
import { SidebarTriggerMobile } from "@/components/sidebar-trigger-mobile";
import { Table } from "@/components/table";
import { Input } from "@/components/ui/input";
import { LoadingScreen } from "@/components/ui/loading-animation";
import { SectionTitle } from "@/components/ui/section-title";
import { useGetOrgTransactions } from "@/hooks/transaction/useGetOrgTransactions";
import { useEditTransactionStatus } from "@/hooks/transaction/useSetTransactionStatus";
import { Suspense, useState } from "react";

export default function page() {
  const { mutate: editStatus } = useEditTransactionStatus();
  const [image, setImage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { data: ticket, isPending } = useGetOrgTransactions({
    page,
    limit: 20,
  });
  const dashboardTableData = {
    title: "",
    columns: [
      { key: "no", title: "No" },
      { key: "user.name", title: "Buyer Name" },
      { key: "event.title", title: "Event title" },
      { key: "finalAmount", title: "Total Amount" },
      { key: "status", title: "Status" },
      { key: "createdAt", title: "Date" },
    ],
    data: ticket?.data ?? [],
    actions: {
      label: "Transaction action",
      items: [
        {
          label: "payment proof",
          onClick: (row: any) => {
            setImage(row.paymentProof);
          },
        },
        {
          label: "set status",
          isPortal: true,
          children: [
            {
              label: "Accept payment",
              onClick: (row: any) =>
                editStatus({
                  uuid: row.uuid,
                  status: "DONE",
                }),
            },
            {
              label: "Reject payment",
              onClick: (row: any) =>
                editStatus({
                  uuid: row.uuid,
                  status: "REJECTED",
                }),
            },
          ],
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
        <SectionTitle className="mt-10">Transactions</SectionTitle>
      </SidebarTriggerMobile>
      <div className="mt-10 mb-5 flex justify-between">
        <Input type="text" placeholder="Search" className="w-[280px]"></Input>
      </div>
      <Suspense>
        <section className="my-5 grid w-full grid-cols-1">
          <Table {...dashboardTableData} />
        </section>
        <DataPagination onChangePage={onChangePage} meta={ticket.meta} />
      </Suspense>
      {image && (
        <ImageDialog
          src={image}
          open={true}
          onOpenChange={(open) => {
            if (!open) setImage(null);
          }}
        />
      )}
    </section>
  );
}
