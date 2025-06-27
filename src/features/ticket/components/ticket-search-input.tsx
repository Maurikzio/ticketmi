"use client"

import SearchInput from "@/components/search-input";
import { useQueryState } from "nuqs"
import { searchParser } from "@/features/ticket/definitions";

interface TicketSearchInputProps {
  placeholder: string;
}

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput
      onChange={setSearch}
      value={search}
      placeholder={placeholder}
    />
  )
}

export default TicketSearchInput;
