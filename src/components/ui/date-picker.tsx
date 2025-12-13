import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  value?: string
  onChange: (date: string | undefined) => void
  placeholder?: string
  className?: string
  label?: string
}

export function DatePicker({ 
  value, 
  onChange, 
  placeholder = "Pick a date", 
  className,
  label 
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  // Parse YYYY-MM-DD string as local date to avoid timezone issues
  const date = value ? (() => {
    try {
      const parts = value.split('-')
      if (parts.length !== 3) return undefined
      const year = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10)
      const day = parseInt(parts[2], 10)
      if (isNaN(year) || isNaN(month) || isNaN(day)) return undefined
      const dateObj = new Date(year, month - 1, day)
      // Validate the date is valid
      if (dateObj.getFullYear() !== year || dateObj.getMonth() !== month - 1 || dateObj.getDate() !== day) {
        return undefined
      }
      return dateObj
    } catch {
      return undefined
    }
  })() : undefined

  return (
    <div className={cn(className)}>
      {label && (
        <label className="text-sm font-medium mb-1 block">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                // Format as YYYY-MM-DD using local timezone to avoid timezone issues
                const year = selectedDate.getFullYear()
                const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
                const day = String(selectedDate.getDate()).padStart(2, '0')
                onChange(`${year}-${month}-${day}`)
              } else {
                onChange(undefined)
              }
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
