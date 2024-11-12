import { Controller, Path, UseFormReturn, FieldValues } from "react-hook-form"
import { CalendarProps } from "../ui/calendar"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"
import ErrorMessage from "../ui/error-message"
import { parse } from "date-fns"
import { DateRangePicker } from "../ui/date-range-picker"
import { DatePicker } from "../ui/date-picker"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>;
    name: Path<IForm>;
    label?: string;
    wrapperClassName?: ClassNameValue;
    hideError?: boolean
    disabled?: boolean
    format?: string
}

export function FormDatePicker<IForm extends FieldValues>({
    methods,
    name,
    label,
    hideError = false,
    disabled,
    format,
    ...calendarProps
}: IProps<IForm> & CalendarProps) {
    const {
        formState: { errors },
    } = methods
    const value = methods.getValues(name)
    const parsedDate = (value && calendarProps?.mode !== 'range') ? (format ? parse(value as string, format, new Date()) : value) : undefined;
    return (
        <fieldset className="flex flex-col gap-2">
            {label && (
                <Label htmlFor={name} className={cn(!!errors?.[name] && 'text-destructive', 'cursor-pointer')}>
                    {label}
                </Label>
            )}
            <Controller
                name={name}
                control={methods.control}
                render={({ field }) => (
                    <DatePicker
                        calendarProps={{
                            ...calendarProps,
                            defaultMonth:
                                field.value ? parsedDate : undefined,
                        }}
                        date={field.value}
                        setDate={field.onChange}
                        format={format}
                        placeholder={label}
                        disabled={field.disabled || disabled}
                        fullWidth
                    />
                )}
            />
            {!hideError && errors[name] && (
                <ErrorMessage className="-mt-1">{errors[name].message as string}</ErrorMessage>
            )}
        </fieldset>
    )
}
