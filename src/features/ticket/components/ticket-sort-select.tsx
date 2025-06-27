"use client"

import SortSelector, { SortOption } from "@/components/sort-selector";
import { useQueryState } from "nuqs"
import { sortParser } from "@/features/ticket/definitions";

interface TicketSortSelectProps {
  options: SortOption[]
}

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryState("sort", sortParser);

  return (
    <SortSelector
      value={sort}
      options={options}
      onChange={setSort}
    />
  )
}

export default TicketSortSelect;
