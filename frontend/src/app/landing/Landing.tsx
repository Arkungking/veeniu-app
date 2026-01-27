"use client";

import { LoadingScreen } from "@/components/ui/loading-animation";
import { useGetTickets } from "@/hooks/transaction/useGetTickets";
import { EventCardProps } from "@/props/eventCard.props";
import { useGetEvents } from "../../hooks/event/useGetEvents";
import { Highlight } from "./Highlight";
import { Latest } from "./Latest";

export const Landing = () => {
  const { data, isPending } = useGetEvents();
  const { data: transactions, isPending: isPending2 } = useGetTickets({
    limit: 6,
  });
  const eventCard: EventCardProps[] = data?.data ?? [];
  const transactionCard = transactions?.data ?? [];

  if (isPending || isPending2) return <LoadingScreen />;

  return (
    <main>
      <Highlight eventCard={eventCard} transactions={transactionCard} />
      <Latest eventCard={eventCard} />
    </main>
  );
};
