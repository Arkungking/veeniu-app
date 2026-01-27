"use client";

import Markdown from "@/components/Markdown";
import { TicketCard } from "@/components/ticket-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { PageTitle } from "@/components/ui/page-title";
import { SectionText } from "@/components/ui/section-text";
import { SectionTitle } from "@/components/ui/section-title";
import { TextLink } from "@/components/ui/textlink";
import { Wrapper } from "@/components/ui/wrapper";
import { formatDate } from "@/lib/utils";
import { EventCardProps } from "@/props/eventCard.props";
import Autoplay from "embla-carousel-autoplay";

export const Highlight = ({
  eventCard,
  transactions,
}: {
  eventCard: EventCardProps[];
  transactions: any[];
}) => {
  return (
    <section className="pt-[70px]">
      <LatestCarousel eventCard={eventCard} />
      <UserTickets transactions={transactions} />
    </section>
  );
};

const LatestCarousel = ({ eventCard }: { eventCard: EventCardProps[] }) => {
  const hasData = eventCard && eventCard.length > 0;

  if (!hasData)
    return (
      <Wrapper>
        <div className="text-muted-foreground flex h-[400px] w-full items-center justify-center rounded-2xl border-2 border-dashed">
          No events available
        </div>
      </Wrapper>
    );

  return (
    <Carousel
      opts={{
        loop: true,
        duration: 60,
      }}
      plugins={[
        Autoplay({
          delay: 7000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {eventCard.map((event, index) => (
          <CarouselItem key={index}>
            <div className="relative md:h-[700px]">
              <img
                src={event.imageUrl}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />

              <div className="absolute inset-0 flex flex-col justify-end p-5 text-[var(--footer-text)] select-none md:px-20 md:py-10">
                <PageTitle>{event.title}</PageTitle>

                <div className="mt-10 hidden justify-between md:flex">
                  <div className="space-y-1 md:space-y-2">
                    <SectionText variant="default">
                      {event.location}
                    </SectionText>
                    <SectionText variant="default">
                      {formatDate(event.startDate, "date")}
                    </SectionText>
                    {/* <SectionText variant="default">
                    {formatCurrency(event.price)}
                  </SectionText> */}
                  </div>

                  <div className="line-clamp-4 w-[40%] font-light">
                    <Markdown content={event.description} />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const UserTickets = ({ transactions }: { transactions: any[] }) => {
  return (
    <section>
      <div className="mt-5 flex items-end justify-between px-5 md:px-20">
        <SectionTitle>My tickets</SectionTitle>
        <TextLink link={"/account"} />
      </div>
      <div className="scroll-hidden mt-5 flex h-fit w-full gap-3 overflow-x-auto px-5 md:px-20">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction, i) => (
            <TicketCard
              key={i}
              ticketData={transaction}
              width="w-[360px]"
            />
          ))
        ) : (
          <div className="text-muted-foreground flex h-[110px] w-full items-center justify-center rounded-2xl border-2 border-dashed">
            No tickets
          </div>
        )}
      </div>
    </section>
  );
};
