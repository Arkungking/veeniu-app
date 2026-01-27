import { StarRating } from "@/components/rating";
import { SectionText } from "@/components/ui/section-text";
import { SectionTitle } from "@/components/ui/section-title";
import { Textarea } from "@/components/ui/textarea";
import { TicketData } from "@/props/ticket.props";

export const EventRating = ({ data }: { data: TicketData }) => (
  <section className="flex-1">
    <SectionTitle>Rate the event</SectionTitle>
    <SectionText className="mt-3">{`How was your experience at "${data.event.title}"?`}</SectionText>
    <StarRating className="my-10" />
    <SectionTitle className="mb-5">Your command</SectionTitle>
    <Textarea className="h-36" placeholder="Share your experience..." />
  </section>
);
