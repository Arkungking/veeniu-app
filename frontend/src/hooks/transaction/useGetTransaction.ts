import { veeniuApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetTransaction = (uuid: string) => {
  const session = useSession();

  return useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const token = session.data!.user.accessToken;
      const res = await veeniuApi.get(`/transactions/${uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
