"use client";

import { SendLinkConfirmation } from "@/components/popup-confirmation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const forgotSchema = z.object({
  email: z.email(),
});

export const Forms = () => {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutateAsync: forgotPassword,
    isPending,
    openDialog,
    setOpenDialog,
  } = useForgotPassword();

  function onSubmit(data: z.infer<typeof forgotSchema>) {
    forgotPassword(data);
  }

  return (
    <section className="flex-1">
      <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form">Email</FieldLabel>
                <Input
                  {...field}
                  id="signup-form"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button>
            {isPending ? <LoadingAnimation /> : "Send reset link"}
          </Button>
          <div className="flex flex-col text-center text-sm font-light">
            <p>
              Already a Hooman?{" "}
              <Link
                href={"/auth/signin"}
                className="hover:text-primary underline transition-all duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </FieldGroup>
      </form>
      <SendLinkConfirmation open={openDialog} onOpenChange={setOpenDialog} />
    </section>
  );
};
