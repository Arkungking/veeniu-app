import { PageTitle } from "@/components/ui/page-title";
import { SectionTitle } from "@/components/ui/section-title";

export const Points = () => (
  <section className="bg-card mt-10 flex-1 rounded-lg p-5 md:p-15">
    <SectionTitle variant="small">Point balance</SectionTitle>
    <div className="mt-5 flex items-end gap-3">
      <PageTitle className="text-primary">2,500</PageTitle> Points
    </div>
  </section>
);
