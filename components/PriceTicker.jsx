import { getProducts } from "@/lib/api";
import { formatPct, formatPrice, unitShort } from "@/lib/bn";

const CHANGE_STYLE = {
  up: { sign: "▲", color: "text-a-300" },
  down: { sign: "▼", color: "text-g-300" },
  flat: { sign: "—", color: "text-n-300" },
};

export default async function PriceTicker() {
  const products = await getProducts().catch(() => []);
  if (!products.length) return <div className="h-[42px] bg-g-800" />;

  const items = [...products, ...products];

  return (
    <div className="flex h-[42px] items-center overflow-hidden bg-g-800 text-sm text-g-100">
      <div className="flex w-max animate-ticker">
        {items.map((p, i) => {
          const style = CHANGE_STYLE[p.change.dir] ?? CHANGE_STYLE.flat;
          return (
            <span
              key={i}
              aria-hidden={i >= products.length}
              className="flex items-center gap-2 border-r border-g-100/20 px-[22px] whitespace-nowrap"
            >
              <span>{p.image}</span>
              <span className="font-semibold text-n-100">{p.nameBn}</span>
              <span>
                {formatPrice(p.today)} টাকা/{unitShort(p.unit)}
              </span>
              <span className={`font-bold ${style.color}`}>
                {style.sign} {formatPct(p.change.pct)}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
