"use client";

import { PageTitle } from "@/components/ui/page-title";
import { SectionText } from "@/components/ui/section-text";
import { useEffect, useState } from "react";

interface TimerContainerProps {
  data: string;
  label: string;
}

interface CountdownProps {
  expiresAt: string;
}

export const Countdown = ({ expiresAt }: CountdownProps) => {
  return (
    <section className="mt-[100px] md:mt-[140px]">
      <PageTitle className="mb-2">Complete Your Payment</PageTitle>
      <SectionText>
        Please upload payment proof within the time limit below.
      </SectionText>
      <CountdownTimer expiresAt={expiresAt} />
    </section>
  );
};

const CountdownTimer = ({ expiresAt }: CountdownProps) => {
  const target = new Date(expiresAt).getTime();

  const [timeLeft, setTimeLeft] = useState(() => {
    return Math.max(0, Math.floor((target - Date.now()) / 1000));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
      setTimeLeft(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  const hours = Math.floor(timeLeft / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timeLeft % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const TimerContainer = ({ data, label }: TimerContainerProps) => (
    <div>
      <div className="bg-card flex w-22 flex-col items-center justify-center rounded-lg border p-5 text-center md:w-36">
        <p className="text-destructive text-2xl font-semibold md:text-4xl">
          {data}
        </p>
      </div>
      <SectionText className="mt-1 text-center">{label}</SectionText>
    </div>
  );

  return (
    <div className="mt-5 flex gap-5">
      <TimerContainer data={hours} label="Hours" />
      <TimerContainer data={minutes} label="Minutes" />
      <TimerContainer data={seconds} label="Seconds" />
    </div>
  );
};
