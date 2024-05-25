"use client"
 
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/global/atoms/button"
import { Calendar } from "@/components/global/atoms/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/global/atoms/popover"
import { PopoverClose } from "@radix-ui/react-popover"

interface DatePickerProps {
  initialDate?: Date
  onChange?: (date: Date) => void
}

export function DatePicker({ initialDate, onChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate)

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return
    setDate(selectedDate)
    if (onChange) {
      onChange(selectedDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <PopoverClose>

        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}       
          initialFocus
          fromDate={new Date()}
          />
          </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
