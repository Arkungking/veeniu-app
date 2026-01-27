"use client";

import { LoadingScreen } from "@/components/ui/loading-animation";
import { useGetEvent } from "@/hooks/event/useGetEvent";
import React, { Suspense } from "react";
import { Cart } from "./Cart";
import { Data } from "./Data";

interface EventDetailProps {
  slug: string;
}

export default function EventDetail({ slug }: EventDetailProps) {
  const { data, isPending } = useGetEvent({ slug });

  if (isPending || !data) return <LoadingScreen />;

  return (
    <main>
      <Suspense>
        <section className="mt-[70px] h-min space-y-10 md:flex md:gap-10">
          <div className="md:flex-[70%]">
            <Data eventDetail={data.data} />
          </div>
          <div className="md:flex-[30%]">
            <Cart eventDetail={data.data} />
          </div>
        </section>
      </Suspense>
    </main>
  );
}
