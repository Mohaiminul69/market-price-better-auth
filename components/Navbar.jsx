import Link from "next/link";
import { Suspense } from "react";
import { ShoppingCart } from "lucide-react";
import { getCategories } from "@/lib/api";
import { bnDate } from "@/lib/bn";
import { Button } from "@/components/ui/button";
import CategoryNav from "@/components/CategoryNav";
import PriceTicker from "@/components/PriceTicker";

export default async function Navbar() {
  const categories = await getCategories().catch(() => []);

  return (
    <header className="sticky top-0 z-30 bg-bg/90 backdrop-blur-md">
      <div className="container-page">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-brand text-bg shadow-sm">
              <ShoppingCart className="size-[22px]" strokeWidth={2.75} />
            </span>
            <span className="min-w-0">
              <span className="block font-heading text-2xl leading-none font-extrabold">
                বাজার দর
              </span>
              <span className="block truncate text-xs text-n-700">
                {bnDate()}
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Button
              asChild
              variant="ghost"
              className="h-9 px-3 text-sm sm:h-11 sm:px-5 sm:text-[15px]"
            >
              <Link href="/signin">সাইন ইন</Link>
            </Button>
            <Button
              asChild
              className="h-9 px-4 text-sm sm:h-11 sm:px-5 sm:text-[15px]"
            >
              <Link href="/signup">সাইন আপ</Link>
            </Button>
          </div>
        </div>
        <CategoryNav categories={categories} />
      </div>
      <Suspense fallback={<div className="h-[42px] bg-g-800" />}>
        <PriceTicker />
      </Suspense>
    </header>
  );
}
