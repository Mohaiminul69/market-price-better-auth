import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-[30px] bg-n-100 p-[18px] shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="size-[52px] rounded-full bg-n-200" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4 bg-n-200" />
          <Skeleton className="h-3.5 w-1/3 bg-n-200" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-16 bg-n-200" />
          <Skeleton className="h-8 w-24 bg-n-200" />
        </div>
        <Skeleton className="h-7 w-16 rounded-full bg-n-200" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-4" aria-busy="true">
      <span className="sr-only">Loading…</span>
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SectionSkeleton({ count = 6 }) {
  return (
    <section className="flex flex-col gap-5">
      <Skeleton className="h-10 w-64 rounded-full bg-n-200" />
      <GridSkeleton count={count} />
    </section>
  );
}
