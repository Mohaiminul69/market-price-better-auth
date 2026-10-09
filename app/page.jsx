import { Suspense } from "react";
import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";
import { SectionSkeleton } from "@/components/ProductSkeleton";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-[clamp(32px,5vw,56px)]">
      <Hero />
      <Suspense
        fallback={
          <>
            <SectionSkeleton />
            <SectionSkeleton />
            <SectionSkeleton count={8} />
          </>
        }
      >
        <HomeSections />
      </Suspense>
    </div>
  );
}
