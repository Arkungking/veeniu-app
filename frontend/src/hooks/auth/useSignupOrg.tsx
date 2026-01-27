import { veeniuApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { signupOrgSchema } from "../../app/auth/signup/organizer/Forms";

export const useSignupOrg = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: async (body: z.infer<typeof signupOrgSchema>) => {
      const updatedBody = { ...body, role: "ORGANIZER" };
      const { data } = await veeniuApi.post("/auth/register", updatedBody);
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
