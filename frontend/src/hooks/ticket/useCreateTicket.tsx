import { veeniuApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface TicketProps {
  name: string;
  price: number;
  stock: number;
  eventId: string;
}

export const useCreateTicket = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const token = session.data!.user.accessToken;

  const mutation = useMutation({
    mutationFn: async (data: TicketProps) => {
      const uid = session.data!.user.id;
      const updatedData = { ...data, organizerId: uid };
      await veeniuApi.post("/tickets/create", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Create ticket success");
      queryClient.invalidateQueries({ queryKey: ["org-tickets"] });
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
