import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EventDetail from "./EventDetail";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: EventPageProps) {
  const { slug } = await params;

  const session = await auth();

  if (session?.user.role === "ORGANIZER") {
    return redirect("/dashboard");
  }

  return <EventDetail slug={slug} />;
}
