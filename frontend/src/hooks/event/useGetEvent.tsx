import { veeniuApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetEvent = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: ["events", slug],
    queryFn: async () => {
      const res = await veeniuApi.get(`/events/${slug}`);
      return res.data;
    },
  });
};