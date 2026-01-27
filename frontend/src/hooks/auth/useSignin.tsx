import { veeniuApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { signinSchema } from "../../app/auth/signin/Forms";

export const useSignin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: z.infer<typeof signinSchema>) => {
      const { data } = await veeniuApi.post("/auth/login", body);
      return data;
    },
    onSuccess: async (data) => {
      await signIn("credentials", { ...data, redirect: false });

      router.replace(data.role === "ORGANIZER" ? "/dashboard" : "/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};
