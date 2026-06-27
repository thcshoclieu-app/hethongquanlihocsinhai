import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
        <input
          type="search"
          className={cn(
            "flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
