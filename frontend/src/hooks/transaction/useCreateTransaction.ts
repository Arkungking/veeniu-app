import { veeniuApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import z from "zod";

export const transactionItemSchema = z.object({
  ticketId: z.string().min(1, "ticketId is required"),
  qty: z.number().int().min(1, "qty must be at least 1"),
});

export const createTransactionSchema = z.object({
  payload: z.array(transactionItemSchema),
  voucherId: z.string().optional(),
  usePoints: z.number().optional(),
  email: z.email("Invalid email format"),
});

export const useCreateTransaction = () => {
  const session = useSession();

  return useMutation({
    mutationFn: async (body: z.infer<typeof createTransactionSchema>) => {
      const token = session.data!.user.accessToken;

      const { data } = await veeniuApi.post("/transactions/create", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: async () => {},
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};
