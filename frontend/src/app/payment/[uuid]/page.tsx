import Payment from "./Payment";

interface PaymentPageProps {
  params: Promise<{ uuid: string }>;
}

export default async function Page({ params }: PaymentPageProps) {
  const { uuid } = await params;

  return <Payment uuid={uuid} />;
}
