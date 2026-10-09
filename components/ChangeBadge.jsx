import { formatPct } from "@/lib/bn";
import { cn } from "@/lib/utils";

const STYLES = {
  up: { sign: "▲", className: "bg-green-100 text-green-800" },
  down: { sign: "▼", className: "bg-red-100 text-red-700" },
  flat: { sign: "—", className: "bg-n-200 text-n-800" },
};

export default function ChangeBadge({ change, className }) {
  const style = STYLES[change.dir] ?? STYLES.flat;

  return (
    <span
      className={cn(
        "rounded-full px-[11px] py-[5px] text-[13px] font-bold whitespace-nowrap",
        style.className,
        className
      )}
    >
      {style.sign} {formatPct(change.pct)}
    </span>
  );
}
