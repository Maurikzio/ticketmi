"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export type SortOption = {
  label: string;
  value: string;
}

interface SearchInputProps {
  options: SortOption[]
  onChange: (value: string) => void;
  value: string;
}

const SortSelector = ({ options, onChange, value }: SearchInputProps) => {
  return (
    <Select defaultValue={value} onValueChange={onChange}>
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
