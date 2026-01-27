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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTicket } from "@/hooks/ticket/useCreateTicket";
import { EventCardProps } from "@/props/eventCard.props";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const Sheet = ({ events }: { events: EventCardProps[] }) => {
  const { mutateAsync, isPending, open, setOpen } = useCreateTicket();
  return (
    <DashboardSheet
      trigger="Create"
      title="Create new ticket"
      open={open}
      setOpen={setOpen}
    >
      <CreateTicketForm
        events={events}
        mutateAsync={mutateAsync}
        isPending={isPending}
      />
    </DashboardSheet>
  );
};

const createTicketSchema = z.object({
  name: z.string().nonempty("Ticket name is required."),
  price: z.number().min(1000, "Value must be at least Rp1.000."),
  stock: z.number().min(1, "Stock must be at least 1."),
  eventId: z.string().nonempty("Parent event is required."),
});

export const CreateTicketForm = ({
  events,
  mutateAsync,
  isPending,
}: {
  events: EventCardProps[];
  mutateAsync: any;
  isPending: boolean;
}) => {
  const form = useForm<z.infer<typeof createTicketSchema>>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      eventId: "",
    },
  });

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  function onSubmit(data: z.infer<typeof createTicketSchema>) {
    mutateAsync(data);
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
              name="stock"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Stock</FieldLabel>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
              {isPending ? <LoadingAnimation /> : "Create ticket"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </section>
  );
};
