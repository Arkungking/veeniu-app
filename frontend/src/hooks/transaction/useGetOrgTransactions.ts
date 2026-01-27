import { veeniuApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export interface PaginationQueries {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

export const useGetOrgTransactions = (queries?: PaginationQueries) => {
  const session = useSession();

  return useQuery({
    queryKey: ["org-transactions", queries],
    queryFn: async () => {
      const uid = session.data!.user.id;
      const token = session.data!.user.accessToken;
      const res = await veeniuApi.get(`/transactions/organizer/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: queries,
      });
      return res.data;
    },
  });
};
