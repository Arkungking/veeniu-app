"use client";

import { LoadingScreen } from "@/components/ui/loading-animation";
import { Wrapper } from "@/components/ui/wrapper";
import { useGetTransaction } from "@/hooks/transaction/useGetTransaction";
import { Suspense } from "react";
import { Countdown } from "./Countdown";
import { Detail } from "./Detail";
import { Proof } from "./Proof";

export default function Payment({ uuid }: { uuid: string }) {
  const { data, isPending } = useGetTransaction(uuid);
  const transaction = data?.data ?? [];

  if (isPending) return <LoadingScreen />;

  return (
    <main>
      <Suspense>
        <Wrapper>
          <Countdown expiresAt={transaction.expiresAt} />
          <section className="mt-20 h-min gap-10 space-y-5 md:flex md:space-y-0">
            <div className="flex-[65%]">
              <Proof transaction={transaction} />
            </div>
            <div className="flex-[35%]">
              <Detail transaction={transaction} />
            </div>
          </section>
        </Wrapper>
      </Suspense>
    </main>
  );
}
