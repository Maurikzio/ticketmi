"use client"

import { useQueryStates } from "nuqs";
import { paginationOptions, paginationParser } from "../definitions";
import Pagination from "@/components/pagination";

interface TicketPaginationProps {
  paginatedTicketMetadata: {
    count: number;
    hasNextPage: boolean;
  }
}

const TicketPagination = ({ paginatedTicketMetadata }: TicketPaginationProps) => {

  const [pagination, setPagination] = useQueryStates(paginationParser, paginationOptions)
  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  )
};

export default TicketPagination;
