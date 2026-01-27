import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { veeniuApi } from "@/lib/axios";

interface UserProps {
  id: string;
  name?: string;
  password?: string;
  profilePicture?: File;
}

export const useUpdateUser = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.user?.accessToken;

  const mutation = useMutation({
    mutationFn: async (data: UserProps) => {
      if (!token) throw new Error("User not authenticated");

      const { id, name, password, profilePicture } = data;

      // ✅ create FormData for image & text
      const formData = new FormData();
      if (name) formData.append("name", name);
      if (password) formData.append("password", password);
      if (profilePicture) formData.append("profilePicture", profilePicture);

      const response = await veeniuApi.patch(`/users/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Update user success ✅");
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
  });

  return {
    updateUser: mutation.mutateAsync, // ✅ renamed for clarity
    isPending: mutation.isPending,
  };
};
