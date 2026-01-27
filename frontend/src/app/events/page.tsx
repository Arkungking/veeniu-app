"use client";

import { DataPagination } from "@/components/data-pagination";
import { LoadingScreen } from "@/components/ui/loading-animation";
import { Wrapper } from "@/components/ui/wrapper";
import { EventCardProps } from "@/props/eventCard.props";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import { useGetEvents } from "../../hooks/event/useGetEvents";
import { EventsList } from "./EventsList";
import Toolbar from "./Toolbar";

export default function Event() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });
  const [location, setLocation] = useQueryState("location", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [debounceSearch] = useDebounceValue(search, 500);
  const { data, isPending } = useGetEvents({
    page,
    category,
    location,
    limit: 12,
    search: debounceSearch,
  });

  const eventCard: EventCardProps[] = data?.data ?? [];

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <main>
      <Wrapper className="mt-[100px]">
        <Toolbar
          setSearch={setSearch}
          setCategory={setCategory}
          setCity={setLocation}
        />
        {isPending ? <LoadingScreen /> : <EventsList eventCard={eventCard} />}
        {!!data?.meta && (
          <DataPagination onChangePage={onChangePage} meta={data.meta} />
        )}
      </Wrapper>
    </main>
  );
}
