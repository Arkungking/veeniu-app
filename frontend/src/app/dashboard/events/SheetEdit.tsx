"use client";

import { DashboardSheet } from "@/components/dashboard-sheet";
import { DatePicker } from "@/components/date-picker";
import TiptapRichtexteditor from "@/components/TiptapRichtextEditor";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditEvent } from "@/hooks/event/useEditEvent";
import { categories, cities } from "@/lib/const-data";
import { EventCardProps } from "@/props/eventCard.props";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

function capitalizeWord(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const SheetEdit = ({
  data,
  onClose,
}: {
  data: EventCardProps;
  onClose: () => void;
}) => {
  const { mutateAsync, isPending } = useEditEvent();
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
      title="Edit Event"
      open={open}
      setOpen={handleClose}
    >
      <EditEventForm
        mutateAsync={mutateAsync}
        isPending={isPending}
        event={data}
        onSuccess={() => handleClose(false)}
      />
    </DashboardSheet>
  );
};

export const createEventSchema = z.object({
  thumbnail: z.instanceof(File).optional(),
  title: z.string().min(3, "Event name must be at least 3 characters long."),
  category: z.string().nonempty("Category is required."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long."),
  location: z.string().nonempty("Location is required."),
  startDate: z.date(),
  endDate: z.date(),
  totalSeats: z.number().min(1, "Must have at least 1 seat available."),
});

export const EditEventForm = ({
  mutateAsync,
  isPending,
  event,
  onSuccess,
}: {
  mutateAsync: any;
  isPending: boolean;
  event: EventCardProps;
  onSuccess: () => void;
}) => {
  const [preview, setPreview] = useState<string>(event?.imageUrl ?? "");
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [mode, setMode] = useState<"event" | "file">(
    event?.imageUrl ? "event" : "file",
  );
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (event?.imageUrl) {
      setPreview(event.imageUrl);
      setMode("event");
    } else {
      setPreview("");
      setMode("file");
    }
  }, [event]);

  const handleDivClick = () => {
    if (mode === "file" && fileSelected) {
      // reset ke event
      setPreview(event?.imageUrl ?? "");
      setFileSelected(null);
      form.setValue("thumbnail", undefined);
      setMode("event");
    } else {
      // buka file picker
      fileRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setFileSelected(file);
    form.setValue("thumbnail", file);
    setMode("file");
  };

  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      thumbnail: undefined,
      title: event?.title ?? "",
      category: capitalizeWord(event?.category) ?? "",
      description: event?.description ?? "",
      location: capitalizeWord(event?.location) ?? "",
      startDate: new Date(event?.startDate ?? new Date()),
      endDate: new Date(event?.endDate ?? new Date()),
      totalSeats: event?.totalSeats ?? 0,
    },
  });

  async function onSubmit(data: z.infer<typeof createEventSchema>) {
    const finalData = {
      id: event?.id,
      ...data,
    };
    await mutateAsync(finalData);
    onSuccess();
  }

  return (
    <section className="flex h-full flex-col">
      <form
        id="create-event-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col"
      >
        <FieldGroup className="flex h-full flex-col">
          <div className="scroll-hidden flex-1 space-y-5 overflow-y-auto px-5 pb-24">
            <Label>Event thumbnail</Label>

            <div
              onClick={handleDivClick}
              className="bg-card text-muted-foreground hover:border-primary hover:text-primary relative flex h-[220px] w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="absolute inset-0 h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Image className="mb-2 h-8 w-8" />
                  <p className="text-sm font-light">Upload event thumbnail</p>
                </div>
              )}

              <input
                key={fileSelected ? fileSelected.name : "file-input"}
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Event name</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter event name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <section className="gap-5 space-y-5 md:flex md:space-y-0">
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Event category</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat, i) =>
                          cat === "Category" ? null : (
                            <SelectItem key={i} value={cat}>
                              {cat}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="location"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Event location</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city, i) =>
                          city === "Location" ? null : (
                            <SelectItem key={i} value={city}>
                              {city}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </section>

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <TiptapRichtexteditor
                    content={field.value}
                    onChange={(content) => {
                      field.onChange(content);
                    }}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="startDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Start Date</FieldLabel>
                    <DatePicker value={field.value} onChange={field.onChange} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="endDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>End Date</FieldLabel>
                    <DatePicker value={field.value} onChange={field.onChange} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="totalSeats"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Available Seats</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Number of available seats"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    aria-invalid={fieldState.invalid}
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
              {isPending ? <LoadingAnimation /> : "Edit Event"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </section>
  );
};
