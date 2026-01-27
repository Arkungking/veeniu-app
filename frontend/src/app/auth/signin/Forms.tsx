"use client";

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
import { useSignin } from "../../../hooks/auth/useSignin";

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const Forms = () => {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signin, isPending } = useSignin();

  function onSubmit(data: z.infer<typeof signinSchema>) {
    signin(data);
  }

  return (
    <section className="flex-1">
      <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signin-form">Email</FieldLabel>
                <Input
                  {...field}
                  id="signin-form"
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
                <FieldLabel htmlFor="signin-form">Password</FieldLabel>
                <Input
                  {...field}
                  id="signin-form"
                  type="password"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Link
            href={"/auth/forgot-password"}
            className="hover:text-primary text-sm font-light transition-all duration-200"
          >
            Forgot Password?
          </Link>
          <Button>{isPending ? <LoadingAnimation /> : "Sign in"}</Button>
          <div className="flex flex-col text-center text-sm font-light">
            <p>
              New to veeniu?{" "}
              <Link
                href={"/auth/signup"}
                className="hover:text-primary underline transition-all duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </FieldGroup>
      </form>
    </section>
  );
};
