import { Suspense } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { bnDate } from "@/lib/bn";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import HeroStats from "@/components/HeroStats";

export default function Hero() {
  return (
    <section className="relative flex flex-wrap items-center gap-8 overflow-hidden rounded-[36px] bg-surface p-[clamp(28px,5vw,56px)]">
      <span className="pointer-events-none absolute -bottom-[110px] -left-20 size-[220px] rounded-full bg-a-200/70" />

      <div className="relative flex flex-[1_1_380px] flex-col items-start gap-[18px]">
        <span className="rounded-full bg-g-100 px-3.5 py-1.5 text-sm font-semibold text-g-800">{bnDate()}</span>
        <h1 className="text-[clamp(34px,5.6vw,60px)] leading-[1.08] text-balance">
          আজকের বাজারের দাম <span className="text-brand">এক নজরে</span>
        </h1>
        <p className="max-w-[52ch] text-[clamp(16px,1.6vw,18px)] leading-[1.7] text-n-800">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের
          পরিবর্তন এক জায়গায়।
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="shadow-md">
            <a href="#সব-পণ্য">
              সব পণ্য দেখুন <ArrowRight strokeWidth={2.75} />
            </a>
          </Button>
          <Suspense
            fallback={
              <div className="flex gap-2">
                <Skeleton className="h-9 w-28 rounded-full bg-n-200" />
                <Skeleton className="h-9 w-28 rounded-full bg-n-200" />
              </div>
            }
          >
            <HeroStats />
          </Suspense>
        </div>
      </div>

      <div className="relative grid min-h-[260px] flex-[1_1_260px] place-items-center">
        <span className="absolute size-[min(340px,80vw)] rounded-full bg-g-300" />
        <span className="absolute top-[6%] right-[12%] size-[70px] rounded-full bg-a-400" />
        <span className="absolute bottom-[12%] left-[14%] size-[34px] rounded-full bg-bg" />
        <Image
          src="/bazar-hero.png"
          alt="বাজারের ঝুড়ি"
          width={315}
          height={263}
          preload
          className="relative h-auto w-[min(320px,75vw)] animate-float"
        />
      </div>
    </section>
  );
}
