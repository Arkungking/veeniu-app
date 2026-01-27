import Markdown from "@/components/Markdown";
import { PageTitle } from "@/components/ui/page-title";
import { SectionText } from "@/components/ui/section-text";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { EventDetailProps } from "@/props/event.props";

export const Data = ({ eventDetail }: { eventDetail: EventDetailProps }) => {
  return (
    <section className="px-5 pl-5 md:px-0 md:pl-20">
      <EventThumbnail eventDetail={eventDetail} />
      <EventData eventDetail={eventDetail} />
    </section>
  );
};

const EventThumbnail = ({ eventDetail }: { eventDetail: EventDetailProps }) => (
  <img
    src={eventDetail.imageUrl}
    className="w-full rounded-lg object-cover md:h-[600px]"
  />
);

const EventInfo = ({ eventDetail }: { eventDetail: EventDetailProps }) => {
  const eventInfoData = [
    { title: "Date & Time", data: formatDate(eventDetail.startDate, "date") },
    { title: "Location", data: eventDetail.location },
    {
      title: "Available tickets",
      data: `${eventDetail.availableSeats}/${eventDetail.totalSeats}`,
    },
  ];
  return (
    <div className="justify-between md:flex">
      {eventInfoData.map((item, i) => (
        <div key={i} className="my-5 min-w-[100px]">
          <SectionText>{item.title}</SectionText>
          <p className="mt-2 text-sm md:text-base">{item.data}</p>
        </div>
      ))}
      <div className="active:bg-[var(--container-hover)]s my-3 cursor-pointer rounded-sm py-2 transition-all duration-200 hover:bg-[var(--container-hover)] active:bg-[var(--container-hover)] md:min-w-[220px] md:px-2">
        <SectionText>Organize by</SectionText>
        <p className="mt-2">{eventDetail.organizer.name}</p>
      </div>
    </div>
  );
};

const EventData = ({ eventDetail }: { eventDetail: EventDetailProps }) => {
  return (
    <div>
      <PageTitle className="mt-10 mb-5 line-clamp-2">
        {eventDetail.title}
      </PageTitle>
      <Separator />
      <EventInfo eventDetail={eventDetail} />
      <Separator />
      <SectionTitle className="mt-10 mb-5">Event detail</SectionTitle>
      <Markdown content={eventDetail.description} />
    </div>
  );
};
