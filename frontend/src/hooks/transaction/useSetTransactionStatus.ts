import { z } from "zod";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { veeniuApi } from "@/lib/axios";

export const editTransactionStatusSchema = z.object({
  uuid: z.uuid("Invalid transaction UUID"),
  status: z.string().min(1, "Status is required"),
});

export const useEditTransactionStatus = () => {
  const session = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: z.infer<typeof editTransactionStatusSchema>) => {
      const token = session.data!.user.accessToken;

      const { data } = await veeniuApi.patch(
        `/transactions/status/${body.uuid}`,
        { status: body.status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return data;
    },

    onSuccess: () => {
      toast.success("Transaction status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["org-transactions"] });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};
