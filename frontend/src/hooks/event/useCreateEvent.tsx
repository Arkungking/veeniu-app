import { veeniuApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface Payload {
  thumbnail: File;
  title: string;
  category: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  totalSeats: number;
}

export const useCreateEvent = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (payload: Payload) => {
      const form = new FormData();
      const startDt = new Date(payload.startDate).toISOString();
      const endDt = new Date(payload.endDate).toISOString();
      const seats = payload.totalSeats.toString();
      const uid = session.data!.user.id;
      const token = session.data!.user.accessToken;
      const category = payload.category.toUpperCase();
      const location = payload.location.toUpperCase();

      form.append("thumbnail", payload.thumbnail);
      form.append("title", payload.title);
      form.append("description", payload.description);
      form.append("category", category);
      form.append("location", location);
      form.append("startDate", startDt);
      form.append("endDate", endDt);
      form.append("totalSeats", seats);
      form.append("organizerId", uid);

      await veeniuApi.post("/events/create", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Create event success");
      queryClient.invalidateQueries({ queryKey: ["org-events"] });
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
