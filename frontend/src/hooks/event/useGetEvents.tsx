import { veeniuApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface PaginationQueries {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
}

interface GetBlogsQuery extends PaginationQueries {
  search?: string;
  category?: string;
  location?: string;
}

export const useGetEvents = (queries?: GetBlogsQuery) => {
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const res = await veeniuApi.get("/events", { params: queries });
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
