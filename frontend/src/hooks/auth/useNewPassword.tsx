import { NewPasswordSchema } from "@/app/auth/new-password/[token]/Forms";
import { veeniuApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import z from "zod";

export const useNewPassword = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: async (body: z.infer<typeof NewPasswordSchema>) => {
      const { data } = await veeniuApi.patch("/auth/reset-password", body);
      return data;
    },
    onSuccess: async () => {
      setOpenDialog(true);
    },
    onError: () => {
      setOpenDialog(true);
    },
  });

  return { ...mutation, openDialog, setOpenDialog };
};
