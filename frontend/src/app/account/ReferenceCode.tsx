"use client";

import { Button } from "@/components/ui/button";
import { SectionText } from "@/components/ui/section-text";
import { SectionTitle } from "@/components/ui/section-title";
import { useState } from "react";
import { toast } from "sonner";

export const ReferenceCode = ({ data }: { data: any }) => {
  const code = data.referralCode;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    toast("Copied to clipboard!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-card mt-10 flex-1 rounded-lg p-5 md:p-15">
      <SectionTitle variant="small">Refer a friend</SectionTitle>
      <SectionText>Share your code and you both get 500 points!</SectionText>

      <div className="mt-5 flex items-center rounded-lg border-2 border-dashed p-3">
        <SectionText className="flex-1 text-center text-xl">{code}</SectionText>
        <Button
          onClick={handleCopy}
          className="text-primary bg-primary/20 hover:bg-primary/30 border-primary w-[130px] rounded-sm border py-6 font-medium transition"
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </section>
  );
};
