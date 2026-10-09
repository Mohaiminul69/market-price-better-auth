import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProductBySlug } from "@/lib/api";
import { formatPrice, unitLabel, unitShort } from "@/lib/bn";
import { requireUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import ChangeBadge from "@/components/ChangeBadge";
import MarketTable from "@/components/MarketTable";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.nameBn} | বাজার দর` : "পণ্য পাওয়া যায়নি | বাজার দর" };
}

const PRICE_BADGE = {
  up: "bg-a-300 text-a-900",
  down: "bg-g-300 text-g-900",
  flat: "bg-n-300 text-n-900",
};

function summaryLine(product) {
  const diff = product.today - product.yesterday;
  if (diff === 0) return "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
  return `গতকালের তুলনায় আজ দাম ${diff > 0 ? "বেড়েছে" : "কমেছে"} · ${formatPrice(Math.abs(diff))} টাকা`;
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  await requireUser(`/product/${slug}`);

  const markets = product.markets.map((m) => ({ ...m, avg: (m.min + m.max) / 2 }));
  const cheapest = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const priciest = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const average = markets.reduce((sum, m) => sum + m.avg, 0) / markets.length;
  const unit = unitShort(product.unit);

  return (
    <div className="flex flex-col gap-[clamp(28px,4vw,44px)]">
      <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[15px] text-n-700">
        <Link href="/" className="hover:text-brand">
          হোম
        </Link>
        <ChevronRight className="size-3.5" strokeWidth={2.75} />
        <Link href={`/category/${product.category}`} className="hover:text-brand">
          {product.categoryNameBn}
        </Link>
        <ChevronRight className="size-3.5" strokeWidth={2.75} />
        <span className="font-semibold text-ink">{product.nameBn}</span>
      </nav>

      <section className="relative flex flex-wrap items-center gap-7 overflow-hidden rounded-[36px] bg-surface p-[clamp(24px,4vw,44px)]">
        <span className="pointer-events-none absolute -top-24 -left-20 size-60 rounded-full bg-a-200" />
        <span className="relative grid size-[120px] shrink-0 place-items-center rounded-full bg-n-100 text-6xl shadow-md">
          {product.image}
        </span>

        <div className="relative flex min-w-[240px] flex-[1_1_300px] flex-col items-start gap-2">
          <p className="text-[15px] text-n-700">
            {unitLabel(product.unit)} · {product.categoryNameBn}
          </p>
          <h1 className="text-[clamp(34px,5vw,54px)] leading-tight">{product.nameBn}</h1>
          <p className="text-n-800">{summaryLine(product)}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            <Link
              href={`/category/${product.category}`}
              className="rounded-full bg-g-100 px-3.5 py-1.5 text-sm font-semibold text-g-800 hover:bg-g-200"
            >
              {product.categoryIcon} {product.categoryNameBn}
            </Link>
            <span className="rounded-full bg-n-100 px-3.5 py-1.5 text-sm font-semibold text-n-800">
              {unitLabel(product.unit)}
            </span>
          </div>
        </div>

        <div className="relative flex min-w-[200px] flex-[0_1_240px] flex-col items-start gap-1 rounded-[30px] bg-g-800 px-[26px] py-[22px]">
          <p className="text-sm text-g-100">আজকের দাম</p>
          <p className="font-baloo text-[56px] leading-[1.1] font-extrabold text-n-100">{formatPrice(product.today)}</p>
          <p className="text-sm text-g-100">টাকা / {unit}</p>
          <ChangeBadge change={product.change} className={cn("mt-2", PRICE_BADGE[product.change.dir])} />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-[clamp(26px,3.2vw,34px)]">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
          <StatCard
            label="সর্বনিম্ন দাম"
            value={cheapest.min}
            note={`সবচেয়ে কম দামের বাজার: ${cheapest.market}`}
            className="bg-g-100"
            valueClassName="text-g-800"
          />
          <StatCard
            label="সর্বাধিক দাম"
            value={priciest.max}
            note={`সবচেয়ে বেশি দামের বাজার: ${priciest.market}`}
            className="bg-a-100"
            valueClassName="text-a-700"
          />
          <StatCard
            label="গড় দাম"
            value={average}
            note={`প্রতি ${unit}-এর হিসাবে`}
            className="bg-n-100 shadow-sm"
          />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-[clamp(26px,3.2vw,34px)]">বাজারভিত্তিক আজকের দাম</h2>
        <MarketTable markets={markets} lowest={cheapest.min} highest={priciest.max} />
      </section>
    </div>
  );
}

function StatCard({ label, value, note, className, valueClassName }) {
  return (
    <div className={cn("flex flex-col gap-1 rounded-[30px] px-6 py-[22px]", className)}>
      <p className="text-[15px] font-semibold text-n-800">{label}</p>
      <p className={cn("font-baloo text-[40px] leading-tight font-extrabold", valueClassName)}>
        {formatPrice(value)} <span className="font-sans text-base font-normal text-n-700">টাকা</span>
      </p>
      <p className="text-sm text-n-700">{note}</p>
    </div>
  );
}
