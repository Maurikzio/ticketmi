"use client"

import { useState } from "react"
import { Calendar1 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
}

export default function DatePicker({ id, label, name, defaultValue }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined)

  const formattedStringDate = date ? date.toISOString().split('T')[0] : "";
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger id={id} asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {/* {date ? date.toLocaleDateString() : "Select date"} */}
            {date ? date.toISOString().split('T')[0] : "Select Date"}
            <Calendar1 />
            <input type="hidden" id={id} name={name} value={formattedStringDate} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            id={id}
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
