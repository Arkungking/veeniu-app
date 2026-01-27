import { SectionText } from "@/components/ui/section-text";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/utils";

export const Detail = ({ transaction }: { transaction: any }) => {
  return (
    <section className="bg-card rounded-lg p-5">
      <OrderSummary transaction={transaction} />
      <Separator className="my-5" />
      <OrderDetail transaction={transaction} />
      <Separator className="my-5" />
      <OrderPriceDetail transaction={transaction} />
    </section>
  );
};

const OrderSummary = ({ transaction }: { transaction: any }) => (
  <div>
    <SectionTitle variant="small">Order summary</SectionTitle>
    <div className="mt-5 space-y-3 md:space-y-2">
      <div className="justify-between space-y-1 md:flex">
        <SectionText>Order ID</SectionText>
        <p>{transaction.uuid}</p>
      </div>
      <div className="justify-between space-y-1 md:flex">
        <SectionText>Transaction date</SectionText>
        <p>{formatDate(transaction.createdAt)}</p>
      </div>
    </div>
  </div>
);

const OrderDetail = ({ transaction }: { transaction: any }) => (
  <div>
    <SectionTitle variant="small">{transaction.event.title}</SectionTitle>
    <div className="mt-5 space-y-2">
      <SectionText>
        {formatDate(transaction.event.startDate, "date")}
      </SectionText>
      <SectionText>{transaction.event.location}</SectionText>
    </div>
  </div>
);

const OrderPriceDetail = ({ transaction }: { transaction: any }) => (
  <div>
    <div className="flex justify-between">
      <SectionText>Ticket price</SectionText>
      <SectionText>{formatCurrency(transaction.totalAmount)}</SectionText>
    </div>
    <div className="flex justify-between">
      <SectionText>Discount</SectionText>
      <SectionText>{formatCurrency(transaction.discountAmount)}</SectionText>
    </div>
    <div className="flex justify-between font-semibold">
      <p>Total</p>
      <p className="text-primary">{formatCurrency(transaction.finalAmount)}</p>
    </div>
  </div>
);
