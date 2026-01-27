"use client";

import { UploadPaymentProofConfirmation } from "@/components/popup-confirmation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionText } from "@/components/ui/section-text";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { useUploadPaymentProof } from "@/hooks/transaction/useUploadProof";
import { bankData } from "@/lib/const-data";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const Proof = ({ transaction }: { transaction: any }) => {
  return (
    <section className="bg-card rounded-lg p-5">
      <BankInfo />
      <Separator className="my-5" />
      <SectionTitle variant="small" className="mb-2">
        Upload payment proof
      </SectionTitle>
      <SectionText>Acceptedformats: JPG. PNG, PDE Max size: 5MB.</SectionText>
      <PaymentProof transaction={transaction} />
    </section>
  );
};

const BankInfo = () => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>
        <SectionTitle variant="small">Bank tranfers details</SectionTitle>
      </AccordionTrigger>
      <AccordionContent className="space-y-2">
        <SectionText>
          Please transfer the exact total amount to the following bank account.
        </SectionText>
        <div className="mt-5 rounded-lg border bg-black/5 p-5 dark:bg-black/30">
          {bankData.map((data, i) => (
            <div key={i} className="flex justify-between space-y-2">
              <SectionText>{data.key}</SectionText>
              <p>{data.val}</p>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

const PaymentProof = ({ transaction }: { transaction: any }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isPending, success, setSuccess } =
    useUploadPaymentProof();

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleButton = async () => {
    if (!file) return toast.warning("no image selected");

    const data = {
      uuid: transaction.uuid,
      file,
    };
    await mutateAsync(data);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="border-primary/50 my-5 flex h-[250px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-all duration-200 hover:bg-[var(--container-hover)] active:bg-[var(--container-hover)] md:h-[500px]"
      >
        {preview ? (
          <img
            src={preview}
            alt="Payment proof"
            className="h-full w-full object-cover"
          />
        ) : (
          <SectionText className="text-center">
            upload payment proof
          </SectionText>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
      />
      <Button className="w-full" onClick={handleButton}>
        {isPending ? <LoadingAnimation /> : "Upload proof"}
      </Button>
      <UploadPaymentProofConfirmation
        open={success}
        onOpenChange={setSuccess}
      />
    </>
  );
};
