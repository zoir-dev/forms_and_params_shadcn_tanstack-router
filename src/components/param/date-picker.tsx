import { X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect } from "react"
import { DatePicker } from "../ui/date-picker"
import { CalendarProps } from "../ui/calendar"

interface IProps {
    name?: string
    dateFormat?: string
    className?: string
    date?: Date | undefined
    setDate?: (date: Date | undefined) => void
    disabled?: boolean
    paramName?: string
    defaultValue?: Date | string,
}

export default function ParamDatePicker({
    dateFormat = "yyyy-MM-dd",
    className,
    paramName = "date",
    defaultValue,
    disabled,
    date,
    name,
    setDate,
    ...props
}: IProps & CalendarProps) {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "__root__" }) as Record<
        string,
        string | undefined
    >

    const dateString = search[paramName]
    const parsedDate = dateString ? new Date(dateString?.toString()?.replace('/', '-')) : undefined

    const handleOnChange = (date: string | Date | null | undefined) => {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [paramName]: date ? format(date, dateFormat) : undefined,
                },
            })
            return new Date()
        }
        return new Date()
    }

    function reset() {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [paramName]: undefined,
                },
            })
        }
    }

    useEffect(() => {
        navigate({ search: { ...search, [paramName]: defaultValue } })
    }, [])
    return (
        <div
            className={cn(
                "relative flex items-center justify-between w-auto",
                className,
            )}
        >
            <DatePicker
                date={parsedDate}
                disabled={disabled}
                onDayClick={handleOnChange}
                {...props}
                className={className}
            />
            {parsedDate && !disabled && (
                <X
                    onClick={reset}
                    size={16}
                    className="text-destructive absolute right-2 cursor-pointer"
                />
            )}
        </div>
    )
}
