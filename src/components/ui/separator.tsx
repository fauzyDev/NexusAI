"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import React from "react";
import { cn } from "@/lib/utils"

interface SeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive> {
  orientation?: "horizontal" | "vertical";
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive>,
  SeparatorProps
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <SeparatorPrimitive
    ref={ref}
    data-slot="separator"
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
      className
    )}
    {...props} />
))

Separator.displayName = "Separator"

export { Separator }
