"use client"

import React from "react"

// This file re-exports MUI components with Tailwind styling
// It's a simplified approach to use MUI-like components with Tailwind

import { type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

// Typography
export function Typography({
  variant = "body1",
  className = "",
  children,
  ...props
}: {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption" | "overline"
  className?: string
  children: ReactNode
}) {
  const variantClasses = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-bold",
    h5: "text-lg font-bold",
    h6: "text-base font-bold",
    body1: "text-base",
    body2: "text-sm",
    caption: "text-xs",
    overline: "text-xs uppercase tracking-wider",
  }

  const Component = variant.startsWith("h") ? variant : "p"

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  )
}

// Button
export function Button({
  variant = "text",
  className = "",
  children,
  startIcon,
  endIcon,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "text" | "contained" | "outlined"
  className?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
}) {
  const variantClasses = {
    text: "bg-transparent hover:bg-gray-100",
    contained: "bg-blue-600 text-white hover:bg-blue-700",
    outlined: "bg-transparent border border-gray-300 hover:bg-gray-50",
  }

  return (
    <button
      className={cn(
        "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  )
}

// Container
export function Container({
  maxWidth = "lg",
  className = "",
  children,
  ...props
}: {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  children: ReactNode
}) {
  const maxWidthClasses = {
    xs: "max-w-md",
    sm: "max-w-xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
  }

  return (
    <div className={cn("mx-auto px-4", maxWidthClasses[maxWidth], className)} {...props}>
      {children}
    </div>
  )
}

// Card
export function Card({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("bg-white rounded-md overflow-hidden", className)} {...props}>
      {children}
    </div>
  )
}

// Box
export function Box({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

// Paper
export function Paper({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("bg-white rounded-md shadow-sm", className)} {...props}>
      {children}
    </div>
  )
}

// TextField
export const TextField = forwardRef(
  ({
    label,
    variant = "outlined",
    fullWidth = false,
    className = "",
    InputProps = {},
    select = false,
    children,
    multiline = false,
    rows = 1,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    variant?: "outlined" | "filled" | "standard"
    fullWidth?: boolean
    className?: string
    InputProps?: {
      startAdornment?: ReactNode
      endAdornment?: ReactNode
    }
    select?: boolean
    children?: ReactNode
    multiline?: boolean
    rows?: number
  }) => {
    const variantClasses = {
      outlined: "border border-gray-300 rounded-md",
      filled: "bg-gray-100 rounded-md",
      standard: "border-b border-gray-300",
    }

    if (select) {
      return (
        <div className={cn("flex flex-col", fullWidth && "w-full", className)}>
          {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
          <div className={cn("relative", variantClasses[variant], fullWidth && "w-full")}>
            <select
              className={cn(
                "w-full px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md",
                fullWidth && "w-full",
              )}
              {...props}
            >
              {children}
            </select>
            {InputProps.startAdornment && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">{InputProps.startAdornment}</div>
            )}
            {InputProps.endAdornment && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">{InputProps.endAdornment}</div>
            )}
          </div>
        </div>
      )
    }

    if (multiline) {
      return (
        <div className={cn("flex flex-col", fullWidth && "w-full", className)}>
          {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
          <textarea
            className={cn(
              "px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
              variantClasses[variant],
              fullWidth && "w-full",
            )}
            rows={rows}
            {...props}
          />
        </div>
      )
    }

    return (
      <div className={cn("flex flex-col", fullWidth && "w-full", className)}>
        {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
        <div className={cn("relative", variantClasses[variant], fullWidth && "w-full")}>
          <input
            className={cn(
              "w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md",
              InputProps.startAdornment && "pl-10",
              InputProps.endAdornment && "pr-10",
            )}
            {...props}
          />
          {InputProps.startAdornment && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">{InputProps.startAdornment}</div>
          )}
          {InputProps.endAdornment && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">{InputProps.endAdornment}</div>
          )}
        </div>
      </div>
    )
  },
)

TextField.displayName = "TextField"

// InputAdornment
export function InputAdornment({
  position = "start",
  children,
}: {
  position?: "start" | "end"
  children: ReactNode
}) {
  return <div className="flex items-center justify-center">{children}</div>
}

// IconButton
export function IconButton({
  className = "",
  children,
  size = "medium",
  edge,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  size?: "small" | "medium" | "large"
  edge?: "start" | "end" | false
}) {
  const sizeClasses = {
    small: "p-1",
    medium: "p-2",
    large: "p-3",
  }

  return (
    <button
      className={cn(
        "rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// Avatar
export function Avatar({
  className = "",
  children,
  src,
  alt = "",
  ...props
}: {
  className?: string
  children?: ReactNode
  src?: string
  alt?: string
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full bg-gray-200 w-10 h-10",
        className,
      )}
      {...props}
    >
      {src ? <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" /> : children}
    </div>
  )
}

// AppBar
export function AppBar({
  position = "static",
  className = "",
  children,
  ...props
}: {
  position?: "static" | "fixed" | "absolute" | "sticky" | "relative"
  className?: string
  children: ReactNode
}) {
  const positionClasses = {
    static: "relative",
    fixed: "fixed top-0 left-0 right-0 z-50",
    absolute: "absolute top-0 left-0 right-0",
    sticky: "sticky top-0 z-40",
    relative: "relative",
  }

  return (
    <header className={cn("bg-white shadow-sm", positionClasses[position], className)} {...props}>
      {children}
    </header>
  )
}

// Toolbar
export function Toolbar({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("flex items-center px-4 py-2 min-h-[64px]", className)} {...props}>
      {children}
    </div>
  )
}

// Table components
export function Table({
  className = "",
  children,
  size = "medium",
  ...props
}: {
  className?: string
  children: ReactNode
  size?: "small" | "medium"
}) {
  return (
    <table className={cn("w-full border-collapse", className)} {...props}>
      {children}
    </table>
  )
}

export function TableHead({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <thead className={cn("bg-gray-50", className)} {...props}>
      {children}
    </thead>
  )
}

export function TableBody({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  )
}

export function TableRow({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <tr className={cn("border-b border-gray-200 hover:bg-gray-50", className)} {...props}>
      {children}
    </tr>
  )
}

export function TableCell({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <td className={cn("px-4 py-2", className)} {...props}>
      {children}
    </td>
  )
}

export function TableContainer({
  className = "",
  children,
  component = "div",
  ...props
}: {
  className?: string
  children: ReactNode
  component?: any
}) {
  const Component = component
  return (
    <Component className={cn("w-full overflow-x-auto", className)} {...props}>
      {children}
    </Component>
  )
}

// Dialog components
export function Dialog({
  open = false,
  onClose,
  maxWidth = "sm",
  fullWidth = false,
  children,
  ...props
}: {
  open: boolean
  onClose: () => void
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
  fullWidth?: boolean
  children: ReactNode
}) {
  if (!open) return null

  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className={cn(
          "bg-white rounded-lg shadow-xl overflow-hidden",
          maxWidthClasses[maxWidth],
          fullWidth && "w-full",
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

export function DialogTitle({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("px-6 py-4 font-semibold text-lg", className)} {...props}>
      {children}
    </div>
  )
}

export function DialogContent({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("px-6 py-2", className)} {...props}>
      {children}
    </div>
  )
}

export function DialogActions({
  className = "",
  children,
  ...props
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("px-6 py-4 flex justify-end gap-2", className)} {...props}>
      {children}
    </div>
  )
}

// Tabs components
export function Tabs({
  value = 0,
  onChange,
  className = "",
  children,
  ...props
}: {
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("flex", className)} {...props}>
      {React.Children.map(children, (child: any, index) => {
        return React.cloneElement(child, {
          selected: value === index,
          onClick: (e: React.SyntheticEvent) => onChange(e, index),
        })
      })}
    </div>
  )
}

export function Tab({
  label,
  selected = false,
  onClick,
  className = "",
  ...props
}: {
  label: string
  selected?: boolean
  onClick?: (e: React.SyntheticEvent) => void
  className?: string
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 font-medium transition-colors focus:outline-none",
        selected ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  )
}

// Grid components
export function Grid({
  container = false,
  item = false,
  spacing = 0,
  xs,
  sm,
  md,
  lg,
  xl,
  className = "",
  children,
  ...props
}: {
  container?: boolean
  item?: boolean
  spacing?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  className?: string
  children: ReactNode
}) {
  const spacingClasses = {
    0: "",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
  }

  const colClasses = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  }

  const responsiveClasses = [
    xs && `xs:${colClasses[xs]}`,
    sm && `sm:${colClasses[sm]}`,
    md && `md:${colClasses[md]}`,
    lg && `lg:${colClasses[lg]}`,
    xl && `xl:${colClasses[xl]}`,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      className={cn(
        container && "grid grid-cols-12",
        container && spacing && spacingClasses[spacing],
        item && responsiveClasses,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// MenuItem
export function MenuItem({
  className = "",
  children,
  value,
  ...props
}: {
  className?: string
  children: ReactNode
  value: string
}) {
  return (
    <option className={className} value={value} {...props}>
      {children}
    </option>
  )
}
