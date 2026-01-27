"use client";

import { DashboardSheet } from "@/components/dashboard-sheet";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useEditTicket } from "@/hooks/ticket/useEditTicket";
import { formatCurrency } from "@/lib/utils";
import { TicketProps } from "@/props/event.props";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const SheetEdit = ({
  data,
  onClose,
}: {
  data: TicketProps;
  onClose: () => void;
}) => {
  const { mutateAsync, isPending } = useEditTicket();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setOpen(true);
    }
  }, [data]);

  const handleClose = (state: boolean) => {
    setOpen(state);
    if (!state) onClose();
  };

  return (
    <DashboardSheet
      trigger="Edit"
      title="Edit ticket"
      open={open}
      setOpen={setOpen}
    >
      <EditTicketForm
        ticket={data}
        mutateAsync={mutateAsync}
        isPending={isPending}
        onSuccess={() => handleClose(false)}
      />
    </DashboardSheet>
  );
};

const editTicketSchema = z.object({
  name: z.string().nonempty("Ticket name is required."),
  price: z.number().min(1000, "Value must be at least Rp1.000."),
  stock: z.number().min(1, "Stock must be at least 1."),
  eventId: z.string().nonempty("Parent event is required."),
});

export const EditTicketForm = ({
  ticket,
  mutateAsync,
  isPending,
  onSuccess,
}: {
  ticket: TicketProps;
  mutateAsync: any;
  isPending: boolean;
  onSuccess: () => void;
}) => {
  const form = useForm<z.infer<typeof editTicketSchema>>({
    resolver: zodResolver(editTicketSchema),
    defaultValues: {
      name: ticket?.name ?? "",
      price: ticket?.price ?? 0,
      stock: ticket?.stock ?? 0,
      eventId: ticket?.eventId ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof editTicketSchema>) {
    const finalData = {
      id: ticket?.id,
      ...data,
    };
    await mutateAsync(finalData);
    onSuccess();
  }

  return (
    <section className="flex h-full flex-col">
      <form
        id="create-ticket-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col"
      >
        <FieldGroup className="flex h-full flex-col">
          <div className="scroll-hidden flex-1 space-y-5 overflow-y-auto px-5 pb-24">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Ticket name</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter ticket name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Price</FieldLabel>
                  <div className="relative">
                    <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                      Rp
                    </span>
                    <Input
                      {...field}
                      className="pl-9"
                      value={
                        field.value
                          ? formatCurrency(Number(field.value), false)
                          : ""
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
              name="stock"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Stock</FieldLabel>
                  <Input
                    {...field}
                    value={
                      field.value
                        ? formatCurrency(Number(field.value), false)
                        : ""
                    }
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^\d]/g, "");
                      field.onChange(Number(raw || 0));
                    }}
                    aria-invalid={fieldState.invalid}
                  />
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
                  <Input
                    {...field}
                    value={ticket?.event.title ?? ""}
                    disabled={true}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="bg-background sticky bottom-0 p-5 shadow-sm">
            <Button className="w-full" type="submit">
              {isPending ? <LoadingAnimation /> : "Edit ticket"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </section>
  );
};
