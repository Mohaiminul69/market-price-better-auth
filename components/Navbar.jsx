import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getCategories } from "@/lib/api";
import { bnDate } from "@/lib/bn";
import AuthButtons from "@/components/AuthButtons";
import CategoryNav from "@/components/CategoryNav";
import PriceTicker from "@/components/PriceTicker";

export default async function Navbar() {
  const categories = await getCategories().catch(() => []);

  return (
    <header className="sticky top-0 z-30 bg-bg/90 backdrop-blur-md">
      <div className="container-page">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-g-300 shadow-sm">
              <Image src="/bazar-hero.png" alt="বাজার দর লোগো" width={315} height={263} preload className="h-auto w-[38px]" />
            </span>
            <span className="min-w-0">
              <span className="block font-heading text-2xl leading-none font-extrabold">
                🛒 বাজার দর
              </span>
              <span className="block truncate text-xs text-n-700">
                {bnDate()}
              </span>
            </span>
          </Link>

          <AuthButtons />
        </div>
        <CategoryNav categories={categories} />
      </div>
      <Suspense fallback={<div className="h-[42px] bg-g-800" />}>
        <PriceTicker />
      </Suspense>
    </header>
  );
}
