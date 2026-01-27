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

export const useGetOrgEvents = (queries?: PaginationQueries) => {
  const session = useSession();

  return useQuery({
    queryKey: ["org-events", queries],
    queryFn: async () => {
      const uid = session.data!.user.id;
      const res = await veeniuApi.get(`/events/organizer/${uid}`, {
        params: queries,
      });

      return res.data;
    },
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
