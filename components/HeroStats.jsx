import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

export default async function HeroStats() {
  const products = await getProducts().catch(() => []);
  if (!products.length) return null;

  const upCount = products.filter((p) => p.change.pct > 0).length;
  const downCount = products.filter((p) => p.change.pct < 0).length;

  return (
    <div className="flex flex-wrap gap-2">
      <span className="rounded-full bg-a-100 px-3.5 py-2 text-sm font-semibold text-a-800">
        ▲ {toBn(upCount)}টি বেড়েছে
      </span>
      <span className="rounded-full bg-g-100 px-3.5 py-2 text-sm font-semibold text-g-800">
        ▼ {toBn(downCount)}টি কমেছে
      </span>
    </div>
  );
}
