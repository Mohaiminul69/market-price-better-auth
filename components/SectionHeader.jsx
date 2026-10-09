import { cn } from "@/lib/utils";

export default function SectionHeader({ icon, iconClassName, title, note }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
      <div className="flex items-center gap-3">
        {icon && (
          <span
            className={cn("grid size-10 shrink-0 place-items-center rounded-full text-n-100", iconClassName)}
          >
            {icon}
          </span>
        )}
        <h2 className="text-[clamp(26px,3.2vw,34px)] leading-tight">{title}</h2>
      </div>
      {note && <p className="text-sm text-n-700">{note}</p>}
    </div>
  );
}
