import { RotateCw } from "lucide-react";

export function AgainLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center text-brand">
        <RotateCw className="size-[29px] stroke-[2.7]" aria-hidden="true" />
      </span>
      {!compact && (
        <span className="text-[22px] font-bold tracking-[-1.2px] text-ink">
          Again<span className="text-brand">.</span>
        </span>
      )}
    </div>
  );
}
