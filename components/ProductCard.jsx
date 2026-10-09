import Link from "next/link";
import { formatPrice, unitLabel } from "@/lib/bn";
import ChangeBadge from "@/components/ChangeBadge";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col gap-4 rounded-[30px] bg-n-100 p-[18px] shadow-sm transition duration-180 ease-out hover:-translate-y-[3px] hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-[52px] shrink-0 place-items-center rounded-full bg-surface text-[26px]">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="font-baloo text-[19px] leading-tight font-bold">{product.nameBn}</h3>
          <p className="text-[13px] text-n-700">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-n-600">আজকের দাম</p>
          <p className="font-baloo text-[28px] leading-[1.3] font-extrabold">
            {formatPrice(product.today)}{" "}
            <span className="font-sans text-sm font-normal text-n-700">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={product.change} className="mb-1.5" />
      </div>
    </Link>
  );
}
