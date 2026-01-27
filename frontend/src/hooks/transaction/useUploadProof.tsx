import { useMutation } from "@tanstack/react-query";
import { veeniuApi } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useState } from "react";

interface Payload {
  uuid: string;
  file: File;
}

export const useUploadPaymentProof = () => {
  const session = useSession();
  const token = session.data!.user.accessToken;
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (payload: Payload) => {
      const form = new FormData();
      form.append("uuid", payload.uuid);
      form.append("paymentProof", payload.file);

      const res = await veeniuApi.patch("/transactions/payment-proof", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    },
    onSuccess: () => {
      setSuccess(true);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });

  return {
    mutateAsync: mutation.mutate,
    isPending: mutation.isPending,
    success,
    setSuccess
  };
};
