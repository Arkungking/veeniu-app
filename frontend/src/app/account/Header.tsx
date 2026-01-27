import { PageTitle } from "@/components/ui/page-title";
import { SectionText } from "@/components/ui/section-text";

export const Header = () => (
  <section>
    <PageTitle className="mb-2">My Account</PageTitle>
    <SectionText>
      Manage your profile, points, and transaction history.
    </SectionText>
  </section>
);
