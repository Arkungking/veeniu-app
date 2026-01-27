"use client";

import { formatDate } from "@/lib/utils";
import { useEventStore } from "@/store/event-store";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageDialog } from "./popup-confirmation";
import { SectionText } from "./ui/section-text";

interface TicketCardProps {
  ticketData: {
    id: string;
    uuid: string;
    finalAmount: number;
    status: string;
    event: {
      id: string;
      title: string;
      location: string;
      startDate: string | Date;
      endDate: string | Date;
    };
  };
  width?: string;
}

export const TicketCard = (data: TicketCardProps) => {
  const router = useRouter();
  const { setSelectedEvent } = useEventStore();

  const ticketData = data.ticketData;
  const eventData = ticketData.event;
  const eventEndDate = new Date(eventData?.endDate ?? eventData?.startDate);
  const now = new Date();

  const isFinished = eventEndDate.getTime() < now.getTime();

  const [uuid, setUuid] = useState<string | null>(null);

  return (
    <section>
      <div
        onClick={() => {
          if (isFinished) {
            setSelectedEvent(ticketData);
            router.push(`/evemts/review/${ticketData.uuid}`);
          } else {
            setUuid(ticketData.uuid);
          }
        }}
        className={`relative flex-shrink-0 cursor-pointer rounded-lg border bg-[var(--container)] p-5 transition-all duration-200 hover:bg-[var(--container-hover)] active:bg-[var(--container-hover)] ${data.width}`}
      >
        <div className={clsx(isFinished && "blur-xs")}>
          <p className="line-clamp-2 font-semibold">{ticketData.event.title}</p>
          <SectionText className="mt-2 text-sm">
            {eventData.location}
          </SectionText>
          <SectionText className="text-sm">
            {formatDate(eventData.startDate, "date")}
          </SectionText>
        </div>

        {isFinished && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/40">
            <p className="text-lg font-bold">Finished</p>
          </div>
        )}
      </div>
      {uuid && (
        <ImageDialog
          src={uuid}
          open={true}
          onOpenChange={(open) => {
            if (!open) setUuid(null);
          }}
          isUuid={true}
        />
      )}
    </section>
  );
};
