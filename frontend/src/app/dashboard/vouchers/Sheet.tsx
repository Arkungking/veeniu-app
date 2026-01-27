"use client";

import { DashboardSheet } from "@/components/dashboard-sheet";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateVoucher } from "@/hooks/voucher/useCreateVoucher";
import { randomCodeGenerator } from "@/lib/utils";
import { EventCardProps } from "@/props/eventCard.props";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const Sheet = ({ events }: { events: EventCardProps[] }) => {
  const { mutateAsync, isPending, open, setOpen } = useCreateVoucher();

  return (
    <DashboardSheet
      trigger="Create"
      title="Create new voucher"
      open={open}
      setOpen={setOpen}
    >
      <CreateVoucherForm
        events={events}
        mutateAsync={mutateAsync}
        isPending={isPending}
      />
    </DashboardSheet>
  );
};

const createVoucherSchema = z.object({
  code: z
    .string()
    .min(3, "Min voucher code length is 6 characters.")
    .max(6, "Max voucher code length is 6 characters."),
  value: z.number().min(1000, "Value must be at least Rp1.000."),
  eventId: z.string().nonempty("Parent event is required."),
  expiresAt: z.date(),
});

const CreateVoucherForm = ({
  events,
  mutateAsync,
  isPending,
}: {
  events: EventCardProps[];
  mutateAsync: any;
  isPending: boolean;
}) => {
  const form = useForm<z.infer<typeof createVoucherSchema>>({
    resolver: zodResolver(createVoucherSchema),
    defaultValues: {
      code: "",
      value: 0,
      eventId: "",
      expiresAt: new Date(),
    },
  });

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  function onSubmit(data: z.infer<typeof createVoucherSchema>) {
    mutateAsync(data);
  }

  return (
    <section className="flex h-full flex-col">
      <form
        id="create-voucher-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col"
      >
        <FieldGroup className="flex h-full flex-col">
          <div className="scroll-hidden flex-1 space-y-5 overflow-y-auto px-5 pb-24">
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Voucher Code</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      placeholder="Enter voucher code"
                      className="flex-1"
                      aria-invalid={fieldState.invalid}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const newCode = randomCodeGenerator();
                        field.onChange(newCode);
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="value"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Value</FieldLabel>
                  <div className="relative">
                    <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                      Rp
                    </span>
                    <Input
                      {...field}
                      className="pl-9"
                      value={
                        field.value ? formatRupiah(Number(field.value)) : ""
                      }
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^\d]/g, "");
                        field.onChange(Number(raw || 0));
                      }}
                      aria-invalid={fieldState.invalid}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="expiresAt"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Voucher Expiration</FieldLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="eventId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Parent Event</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map((event, i) => (
                        <SelectItem key={i} value={event.id}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="bg-background sticky bottom-0 p-5 shadow-sm">
            <Button className="w-full" type="submit">
              {isPending ? <LoadingAnimation /> : "Create voucher"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </section>
  );
};
