"use client";

import { SignInNeededDialog } from "@/components/popup-confirmation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionText } from "@/components/ui/section-text";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { useCreateTransaction } from "@/hooks/transaction/useCreateTransaction";
import { formatCurrency } from "@/lib/utils";
import {
  EventDetailProps,
  TicketProps,
  VoucherProps,
} from "@/props/event.props";
import { useCartStore } from "@/store/cart-store";
import { TicketPercent } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const Cart = ({ eventDetail }: { eventDetail: EventDetailProps }) => {
  return (
    <section className="bg-card sticky top-[70px] mx-5 mr-5 rounded-lg p-5 md:mx-0 md:mr-20">
      <div>
        <SectionTitle className="mb-5" variant="small">
          Available tickets
        </SectionTitle>
        <EventTicket tickets={eventDetail.tickets} />
        <Separator className="my-5" />
        <EventVoucher vouchers={eventDetail.vouchers} />
        <Separator className="my-5" />
        <Subtotal />
      </div>
    </section>
  );
};

const EventTicket = ({ tickets }: { tickets: TicketProps[] }) => {
  const {
    addTicket,
    removeTicket,
    getTicketQuantity,
    getTotalTickets,
    maxTickets,
  } = useCartStore();
  const totalTickets = getTotalTickets();

  return (
    <div className="space-y-5">
      {tickets.map((ticket) => {
        return (
          <div key={ticket.id} className="flex items-center justify-between">
            <div>
              <p className="text-sm md:text-base">{ticket.name}</p>
              <SectionText>{formatCurrency(ticket.price)}</SectionText>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  removeTicket(ticket.id);
                }}
                disabled={totalTickets === 0}
              >
                −
              </Button>
              <p className="w-3">{getTicketQuantity(ticket.id)}</p>
              <Button
                variant="outline"
                onClick={() => {
                  addTicket({ ...ticket });
                }}
                disabled={totalTickets >= 5}
              >
                +
              </Button>
            </div>
          </div>
        );
      })}

      <SectionText className="text-right">
        Total selected: {totalTickets}/{maxTickets}
      </SectionText>
    </div>
  );
};

const EventVoucher = ({ vouchers }: { vouchers: VoucherProps[] }) => {
  const {
    addVoucher,
    removeVoucher,
    isVoucherSelected,
    maxVoucher,
    getTotalVoucher,
  } = useCartStore();
  const totalVoucher = getTotalVoucher();
  const isMax = totalVoucher >= maxVoucher;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <SectionTitle variant="small">Vouchers & Points</SectionTitle>
        </AccordionTrigger>
        <AccordionContent className="space-y-2">
          {vouchers.map((voucher, i) => {
            const voucherSelected = isVoucherSelected(voucher.id);

            return (
              <div
                key={i}
                className={`flex cursor-pointer items-center gap-5 rounded-lg p-5 transition-all duration-200 ${voucherSelected ? "bg-primary/20 hover:bg-destructive/20" : ""} ${isMax ? "hover:bg-destructive/20" : "hover:bg-[var(--container-hover)] active:bg-[var(--container-hover)]"}`}
                onClick={() => {
                  voucherSelected
                    ? removeVoucher(voucher.id)
                    : addVoucher({ ...voucher });
                }}
              >
                <TicketPercent className="h-7 w-7" />
                <div>
                  <p className="font-bold md:text-lg">{voucher.code}</p>
                  <SectionText>{formatCurrency(voucher.value)}</SectionText>
                </div>
              </div>
            );
          })}
          <SectionText className="text-right">
            Total selected: {totalVoucher}/{maxVoucher}
          </SectionText>
          <UserPoint />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const UserPoint = () => (
  <Label className="flex cursor-pointer items-center justify-between p-5">
    <div className="flex items-center gap-5">
      <Checkbox id="point" />
      <div className="grid space-y-1">
        <Label htmlFor="point">Use my point</Label>
        <SectionText>You have 15.000 points.</SectionText>
      </div>
    </div>
    <p>-Rp 15.000</p>
  </Label>
);

const Subtotal = () => {
  const router = useRouter();
  const { subtotal, discount, total, isCartEmpty, getTransactionPayload } =
    useCartStore();
  const { data: session } = useSession();
  const [openDialog, setOpenDialog] = useState(false);
  const { mutateAsync, isPending } = useCreateTransaction();

  const PriceDetail = ({ title, value }: { title: string; value: string }) => (
    <div className="flex justify-between">
      <SectionText>{title}</SectionText>
      <SectionText>{value}</SectionText>
    </div>
  );

  const isSignin = async () => {
    if (!session) {
      setOpenDialog(true);
      return;
    }
    if (isCartEmpty()) {
      toast.warning("Cart is empty");
      return;
    }
    const data = getTransactionPayload(session.user.email);
    await mutateAsync(data);
  };

  return (
    <div className="space-y-2">
      <PriceDetail title="subtotal" value={subtotal} />
      <PriceDetail title="discount" value={discount} />
      <div className="flex justify-between text-xl font-bold">
        <p>Total</p>
        <p>{total}</p>
      </div>
      <Button className="mt-5 w-full" onClick={isSignin}>
        {isPending ? <LoadingAnimation /> : "Checkout"}
      </Button>
      <SignInNeededDialog open={openDialog} onOpenChange={setOpenDialog} />
    </div>
  );
};
