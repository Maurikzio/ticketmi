"use client"

import { useQueryState, useQueryStates } from "nuqs";
import { paginationOptions, paginationParser, searchParser } from "../definitions";
import Pagination from "@/components/pagination";
import { useEffect, useRef } from "react";

interface TicketPaginationProps {
  paginatedTicketMetadata: {
    count: number;
    hasNextPage: boolean;
  }
}

const TicketPagination = ({ paginatedTicketMetadata }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(paginationParser, paginationOptions)
  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search); //save the most recent search

  useEffect(() => {
    if (search === prevSearch.current) return; //compare current search with most recent search
    // if search changed
    prevSearch.current = search;

    setPagination({ ...pagination, page: 0 })
  }, [pagination, search, setPagination])

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  )
};

export default TicketPagination;
