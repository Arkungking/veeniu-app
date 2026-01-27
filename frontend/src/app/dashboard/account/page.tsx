import { SectionTitle } from "@/components/ui/section-title";
import { Data } from "./Data";
import { SidebarTriggerMobile } from "@/components/sidebar-trigger-mobile";

export default function Account() {
  return (
    <section>
      <SidebarTriggerMobile>
        <SectionTitle className="mt-10">My account</SectionTitle>
      </SidebarTriggerMobile>
      <Data />
    </section>
  );
}
