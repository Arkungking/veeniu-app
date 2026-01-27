"use client";

import { CreateAccountConfirmation } from "@/components/popup-confirmation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useSignup } from "../../../hooks/auth/useSignup";

export const signupSchema = z.object({
  name: z.string().min(4, "Username must be at least 4 characters long."),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  referralCode: z.string().optional(),
});

export const Forms = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      referralCode: "",
    },
  });

  const {
    mutateAsync: signup,
    isPending,
    openDialog,
    setOpenDialog,
  } = useSignup();

  function onSubmit(data: z.infer<typeof signupSchema>) {
    signup(data);
  }

  return (
    <section className="flex-1">
      <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form">Username</FieldLabel>
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
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form">Password</FieldLabel>
                <Input
                  {...field}
                  id="signup-form"
                  type="password"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="referralCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form">Referral code</FieldLabel>
                <Input
                  {...field}
                  id="signup-form"
                  aria-invalid={fieldState.invalid}
                  placeholder="optional"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button>{isPending ? <LoadingAnimation /> : "Sign up"}</Button>
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
            <p>
              Hosting events?{" "}
              <Link
                href={"/auth/signup/organizer"}
                className="hover:text-primary underline transition-all duration-200"
              >
                Sign up as Organizer
              </Link>
            </p>
          </div>
        </FieldGroup>
      </form>
      <CreateAccountConfirmation
        open={openDialog}
        onOpenChange={setOpenDialog}
        title={"Welcome aboard new Hooman!"}
        desc={
          "You’re officially joining the pack. Let’s make your first event unforgettable!"
        }
      />
    </section>
  );
};
