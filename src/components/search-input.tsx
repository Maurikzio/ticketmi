"use client"

import { Input } from "./ui/input"
import { useDebouncedCallback } from "use-debounce"

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
  const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }, 250);

  return (
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      defaultValue={value}
    />
  )
}

export default SearchInput;
