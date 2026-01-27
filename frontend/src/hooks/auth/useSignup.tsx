import { veeniuApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import z from "zod";
import { signupSchema } from "../../app/auth/signup/Forms";
import { toast } from "sonner";

export const useSignup = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: async (body: z.infer<typeof signupSchema>) => {
      const { data } = await veeniuApi.post("/auth/register", body);
      return data;
    },
    onSuccess: async () => {
      setOpenDialog(true);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return { ...mutation, openDialog, setOpenDialog };
};
