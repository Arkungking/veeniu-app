"use client";

import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { Separator } from "@/components/ui/separator";
import { Wrapper } from "@/components/ui/wrapper";
import { useEventStore } from "@/store/event-store";
import { useRouter } from "next/navigation";
import React from "react";
import { Banner } from "./Banner";
import { EventRating } from "./EventRating";
import { OrgRating } from "./OrgRating";

interface EventReviewProps {
  params: Promise<{ slug: string }>;
}

export default function EventReview({ params }: EventReviewProps) {
  const router = useRouter();
  const { slug } = React.use(params);
  const { selectedEvent: passedData } = useEventStore();

  return (
    <main className="flex w-full justify-center">
      <Wrapper className="mt-[100px] px-70">
        <PageTitle>Leave a review</PageTitle>
        <Banner data={passedData!} />
        <div className="mt-20 flex gap-10">
          <EventRating data={passedData!} />
          <OrgRating data={passedData!} />
        </div>
        <Separator className="my-10" />
        <div className="flex justify-end">
          <Button onClick={() => router.back()}>Submit</Button>
        </div>
      </Wrapper>
    </main>
  );
}
