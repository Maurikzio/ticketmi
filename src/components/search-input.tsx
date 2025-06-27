"use client"

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input"
import { useDebouncedCallback } from "use-debounce"
import { useQueryState } from "nuqs"
import { searchParser } from "@/features/ticket/definitions";

interface SearchInputProps {
  placeholder: string;
}

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, 250);

  return (
    <Input placeholder={placeholder} onChange={handleSearch} defaultValue={search} />
  )
}

export default SearchInput;
