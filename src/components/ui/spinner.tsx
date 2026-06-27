import React from 'react';
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number | string
  className?: string
}

export function Spinner({ className, size = 24, ...props }: SpinnerProps) {
  return (
    <Loader2 
      size={size} 
      className={cn("animate-spin text-blue-600 dark:text-blue-500", className)} 
      {...props} 
    />
  )
}
