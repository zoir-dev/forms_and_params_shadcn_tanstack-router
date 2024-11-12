import { format as formatter } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { uz } from "date-fns/locale";

export function DateRangePicker({
    className,
    disabled,
    date,
    setDate,
    format = "dd/MM/yyyy",
    placeholder,
    defaultValue,
    ...calendarProps
}: {
    date: DateRange | undefined;
    setDate: (range: DateRange | { from: string | undefined, to: string | undefined }) => void;
    disabled?: boolean;
    calendarProps?: CalendarProps;
    placeholder?: string;
    format?: string;
    defaultValue?: DateRange
} & {
    className?: string;
}) {
    console.log(date)
    return (
        < Popover >
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground", className
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon
                        className={cn(
                            "mr-2 h-4 w-4 text-muted-foreground",
                            date?.from && "text-foreground"
                        )}
                    />
                    {date?.from ? (
                        date.to ? (
                            <>
                                {formatter(date.from, format)} -{" "}
                                {formatter(date.to, format)}
                            </>
                        ) : (
                            formatter(date.from, format)
                        )
                    ) : (
                        placeholder
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date?.from ? { from: new Date(date?.from), to: new Date(date?.to || '') } : { from: new Date(defaultValue?.from || ''), to: new Date(defaultValue?.to || '') }}
                    onSelect={(newDate) => {
                        if (!newDate?.to) {
                            setDate({ from: formatter(newDate?.from as Date, format), to: undefined })
                        } else if (newDate?.to) {
                            setDate({ from: formatter(newDate?.from as Date, format), to: formatter(newDate?.to as Date, format) })
                        }
                    }}
                    numberOfMonths={2}
                    locale={uz}
                    {...calendarProps}
                />
            </PopoverContent>
        </Popover >
    );
}
