"use client";

import Link from "next/link";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }) {
  return (
    <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-[36px] bg-surface px-6 py-16 text-center">
      <span className="pointer-events-none absolute -bottom-28 -left-20 size-[220px] rounded-full bg-a-200/70" />
      <p className="relative text-[clamp(56px,10vw,96px)] leading-none">⚠️</p>
      <h1 className="relative text-[clamp(26px,4vw,40px)]">দাম লোড করা যায়নি</h1>
      <p className="relative max-w-[46ch] text-n-800">
        বাজারের তথ্য আনতে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।
      </p>
      <div className="relative mt-2 flex flex-wrap justify-center gap-3">
        <Button size="lg" onClick={() => reset()}>
          <RotateCw strokeWidth={2.75} /> আবার চেষ্টা করুন
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">হোম পেজে ফিরে যান</Link>
        </Button>
      </div>
    </div>
  );
}
