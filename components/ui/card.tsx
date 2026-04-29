import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("border border-[#e5e7eb] bg-white text-[#111827]", className)}
      {...props}
    />
  );
}
