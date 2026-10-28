import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DemoNotice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p role="note" className={cn("flex items-start gap-2 border-l-2 border-olive bg-beige/60 px-4 py-3 text-sm text-graphite", className)}>
      <Info className="mt-0.5 size-4 shrink-0 text-olive" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
