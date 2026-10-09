import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <Skeleton className="h-5 w-56 bg-n-200" />
      <Skeleton className="h-[260px] rounded-[36px] bg-surface" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-36 rounded-[30px] bg-n-200" />
        ))}
      </div>
      <Skeleton className="h-96 rounded-[30px] bg-n-200" />
    </div>
  );
}
