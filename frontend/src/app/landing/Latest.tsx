import { EventCard } from "@/components/event-card";
import { SectionTitle } from "@/components/ui/section-title";
import { TextLink } from "@/components/ui/textlink";
import { Wrapper } from "@/components/ui/wrapper";
import { EventCardProps } from "@/props/eventCard.props";

export const Latest = ({ eventCard }: { eventCard: EventCardProps[] }) => {
  const hasData = eventCard && eventCard.length > 0;

  return (
    <section className="flex w-full justify-center">
      <Wrapper>
        <div className="flex items-end justify-between">
          <SectionTitle className="mt-10">Latest event</SectionTitle>
          <TextLink link={"/events"} />
        </div>

        {hasData ? (
          <div className="mt-5 grid gap-5 md:grid-cols-3 xl:grid-cols-4">
            {eventCard.map((event, i) => (
              <div key={i}>
                <EventCard eventCard={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground mt-5 flex h-[400px] w-full items-center justify-center rounded-2xl border-2 border-dashed">
            No events available
          </div>
        )}
      </Wrapper>
    </section>
  );
};
