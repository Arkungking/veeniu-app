"use client";

import { PasswordChangeConfirmation } from "@/components/popup-confirmation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { useNewPassword } from "@/hooks/auth/useNewPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const Forms = () => {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const {
    mutateAsync: newPassword,
    isPending,
    openDialog,
    setOpenDialog,
  } = useNewPassword();

  function onSubmit(data: z.infer<typeof NewPasswordSchema>) {
    newPassword(data);
  }

  return (
    <section className="flex-1">
      <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form">New password</FieldLabel>
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
            {isPending ? <LoadingAnimation /> : "Change password"}
          </Button>
        </FieldGroup>
      </form>
      <PasswordChangeConfirmation
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </section>
  );
};
