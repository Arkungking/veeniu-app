import { veeniuApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface VoucherProps {
  code: string;
  value: number;
  eventId: string;
  expiresAt: Date;
}

export const useCreateVoucher = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const token = session.data!.user.accessToken;

  const mutation = useMutation({
    mutationFn: async (data: VoucherProps) => {
      const expire = new Date(data.expiresAt).toISOString();
      const uid = session.data!.user.id;
      const updatedData = { ...data, expiresAt: expire, organizerId: uid };
      await veeniuApi.post("/vouchers/create", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Create voucher success");
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
    setOpen,
  };
};
