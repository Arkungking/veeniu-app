import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  take: number;
}

interface PaginationProps {
  onChangePage: (page: number) => void;
  meta: PaginationMeta;
}

export const DataPagination = (props: PaginationProps) => {
  const handlePrev = () => {
    if (props.meta.page > 1) {
      props.onChangePage(props.meta.page - 1);
    }
  };

  const handleNext = () => {
    const totalPage = Math.ceil(props.meta.total / props.meta.take);

    if (props.meta.page < totalPage) {
      props.onChangePage(props.meta.page + 1);
    }
  };

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrev} />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink>{props.meta.page}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
