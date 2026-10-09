"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CategoryNav({ categories }) {
  const pathname = usePathname();

  return (
    <nav className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-3">
      {categories.map((cat) => {
        const active = pathname === `/category/${cat.slug}`;
        return (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors",
              active
                ? "border-brand bg-brand text-n-100"
                : "border-border bg-n-100 hover:border-a-300 hover:bg-a-100"
            )}
          >
            <span>{cat.icon}</span>
            {cat.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}
