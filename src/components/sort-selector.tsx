"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

type SortOption = {
  label: string;
  value: string;
}

interface SearchInputProps {
  defaultValue?: string
  options: SortOption[]
  sort?: string
}

const SortSelector = ({ defaultValue, options, sort }: SearchInputProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value === defaultValue) {
      params.delete("sort")
    } else if (value) {
      params.set("sort", value)
    } else {
      params.delete("sort")
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  };

  return (
    <Select defaultValue={sort || defaultValue} onValueChange={handleSort}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SortSelector;
