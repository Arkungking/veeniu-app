import { veeniuApi } from "@/lib/axios";
import { VoucherProps } from "@/props/event.props";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const useEditVoucher = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const token = session.data!.user.accessToken;

  const mutation = useMutation({
    mutationFn: async (data: VoucherProps) => {
      const expire = new Date(data.expiresAt).toISOString();
      const id = data.id;
      const uid = session.data!.user.id;
      const updatedData = { ...data, expiresAt: expire, organizerId: uid };

      await veeniuApi.patch(`/vouchers/edit/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("Edit voucher success");
      queryClient.invalidateQueries({ queryKey: ["org-vouchers"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });
  return {
    mutateAsync: mutation.mutate,
    isPending: mutation.isPending,
    open,
  };
};
