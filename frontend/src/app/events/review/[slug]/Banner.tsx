import { SectionText } from "@/components/ui/section-text";
import { SectionTitle } from "@/components/ui/section-title";
import { formatDate } from "@/lib/utils";
import { TicketData } from "@/props/ticket.props";

export const Banner = ({ data }: { data: TicketData }) => (
  <section className="bg-card mt-10 w-full rounded-lg p-5">
    <div className="flex justify-between">
      <div className="flex flex-col justify-center gap-5">
        <SectionText>{`Organize by ${data.event.organizer.name}`}</SectionText>
        <SectionTitle>{data.event.title}</SectionTitle>
        <SectionText>{formatDate(data.event.startDate, "date")}</SectionText>
      </div>
      <img
        src={data.event.imageUrl}
        className="aspect-video h-[150px] rounded-lg object-cover"
        alt={data.event.title}
      />
    </div>
  </section>
);
