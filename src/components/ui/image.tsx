import { Skeleton } from "./skeleton"
import { cn } from "@/lib/utils"

interface thisProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    contain?: boolean
    width?: number | string
    height?: number | string
    isZoomed?: boolean
}
export default function Image({ contain, width, height, isZoomed, ...imgProps }: thisProps) {
    return (
        <div
            className={cn("relative overflow-hidden w-max", imgProps.className)}
            style={{ width: typeof width === 'number' ? width + 'px' : width, height: typeof height === 'number' ? height + 'px' : height }}
        >
            <img {...imgProps}
                loading="lazy"
                onLoad={() => console.log(1)}
                className={cn(imgProps.className, 'relative z-10 object-cover w-full h-full', contain && '!object-contain', isZoomed && 'hover:scale-125 duration-300 [transition-timing-function:cubic-bezier(0.33,1,0.68,1)]')}
            />
            <Skeleton className={cn(imgProps.className, 'w-full h-full absolute top-0 left-0 rounded-none z-0')} />
        </div>
    )
}
