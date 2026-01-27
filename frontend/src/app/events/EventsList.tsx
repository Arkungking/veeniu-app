import { EventCard } from "@/components/event-card";
import { EventCardProps } from "@/props/eventCard.props";

export const EventsList = ({ eventCard }: { eventCard: EventCardProps[] }) => {
  const hasData = eventCard && eventCard.length > 0;

  if (!hasData) {
    return (
      <div className="text-muted-foreground mt-5 flex h-[400px] w-full items-center justify-center rounded-2xl border-2 border-dashed">
        No events available
      </div>
    );
  }

  return (
    <section className="mt-5 grid gap-5 md:grid-cols-3 xl:grid-cols-4">
      {eventCard.map((event, i) => (
        <div key={i}>
          <EventCard eventCard={event} />
        </div>
      ))}
    </section>
  );
};
