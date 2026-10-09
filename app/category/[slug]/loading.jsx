import { Skeleton } from "@/components/ui/skeleton";
import { GridSkeleton } from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-5 rounded-[36px] bg-g-200 p-[clamp(24px,4vw,40px)]">
        <Skeleton className="size-24 rounded-full bg-g-300" />
        <div className="space-y-3">
          <Skeleton className="h-11 w-40 bg-g-300" />
          <Skeleton className="h-5 w-64 bg-g-300" />
        </div>
      </div>
      <Skeleton className="h-4 w-48 bg-n-200" />
      <GridSkeleton />
    </div>
  );
}
