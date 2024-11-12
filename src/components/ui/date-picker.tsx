import { isValid, format as formatter, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
    date,
    setDate,
    placeholder = "Select a date",
    fullWidth,
    disabled,
    calendarProps,
    defaultValue,
    format = 'dd/MM/yyyy',
}: {
    date: Date | string | undefined;
    setDate: (date: Date | string | null) => void;
    placeholder?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    calendarProps?: CalendarProps | undefined;
    defaultValue?: Date;
    format?: string;
}) {
    const parsedDate = date ? (format ? parse(date as string, format, new Date()) : date) : undefined;
    const displayDate = parsedDate && isValid(parsedDate) ? formatter(parsedDate, 'dd/MM/yyyy') : placeholder;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !parsedDate && "text-muted-foreground",
                        fullWidth && "w-full",
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {displayDate}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    {...calendarProps}
                    mode="single"
                    selected={new Date(parsedDate || defaultValue || '')}
                    onSelect={(newDate) => {
                        if (newDate && isValid(new Date(newDate))) {
                            setDate(format ? formatter(new Date(newDate), format) : newDate);
                        } else {
                            setDate(null);
                        }
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
