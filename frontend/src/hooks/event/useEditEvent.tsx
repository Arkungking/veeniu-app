import { veeniuApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Payload {
  id: string;
  thumbnail: File;
  title: string;
  category: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  totalSeats: number;
}

export const useEditEvent = () => {
  const session = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: Payload) => {
      const form = new FormData();
      const startDt = new Date(payload.startDate).toISOString();
      const endDt = new Date(payload.endDate).toISOString();
      const seats = payload.totalSeats.toString();
      const id = payload.id;
      const uid = session.data!.user.id;
      const token = session.data!.user.accessToken;
      const category = payload.category.toUpperCase();
      const location = payload.location.toUpperCase();

      if (payload.thumbnail instanceof File) {
        form.append("thumbnail", payload.thumbnail);
      }
      form.append("id", payload.id);
      form.append("title", payload.title);
      form.append("description", payload.description);
      form.append("category", category);
      form.append("location", location);
      form.append("startDate", startDt);
      form.append("endDate", endDt);
      form.append("totalSeats", seats);
      form.append("organizerId", uid);

      await veeniuApi.patch(`/events/edit/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("Edit event success");
      queryClient.invalidateQueries({ queryKey: ["org-events"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });
  return {
    mutateAsync: mutation.mutate,
    isPending: mutation.isPending,
  };
};
