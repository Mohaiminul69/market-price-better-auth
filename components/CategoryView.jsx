"use client";

import { useMemo, useState } from "react";
import { toBn } from "@/lib/bn";
import ProductGrid from "@/components/ProductGrid";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function CategoryView({ category, products }) {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    if (sort === "price-asc") return [...products].sort((a, b) => a.today - b.today);
    if (sort === "price-desc") return [...products].sort((a, b) => b.today - a.today);
    return products;
  }, [products, sort]);

  return (
    <div className="flex flex-col gap-6">
      <section className="relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[36px] bg-g-200 p-[clamp(24px,4vw,40px)]">
        <span className="pointer-events-none absolute -top-[120px] -right-[60px] size-[260px] rounded-full bg-g-300" />

        <div className="relative flex items-center gap-5">
          <span className="grid size-24 shrink-0 place-items-center rounded-full bg-n-100 text-5xl shadow-md">
            {category.icon}
          </span>
          <div>
            <h1 className="text-[clamp(36px,5vw,52px)] leading-tight text-g-900">{category.nameBn}</h1>
            <p className="text-[17px] text-g-800">{toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>

        <div className="relative flex items-center gap-3">
          <Label htmlFor="sort" className="text-[15px] font-semibold text-g-900">
            সাজান
          </Label>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger
              id="sort"
              className="h-11 min-w-52 rounded-full border-border bg-n-100 px-4 text-[15px] font-semibold data-[size=default]:h-11"
            >
              <SelectValue>{SORT_OPTIONS.find((o) => o.value === sort)?.label}</SelectValue>
            </SelectTrigger>
            <SelectContent position="popper" align="end" className="rounded-2xl bg-n-100 p-1">
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value} className="rounded-xl py-2 text-[15px]">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <p className="text-sm text-n-700">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={sorted} />
    </div>
  );
}
