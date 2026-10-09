import { TrendingDown, TrendingUp } from "lucide-react";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";

export default async function HomeSections() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.pct > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.pct < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <section className="flex flex-col gap-5">
        <SectionHeader
          icon={<TrendingUp className="size-5" strokeWidth={2.75} />}
          iconClassName="bg-brand"
          title="আজ দাম বেড়েছে ▲"
          note="গতকালের তুলনায় সবচেয়ে বেশি বেড়েছে"
        />
        <ProductGrid products={risers} />
      </section>

      <section className="flex flex-col gap-5">
        <SectionHeader
          icon={<TrendingDown className="size-5" strokeWidth={2.75} />}
          iconClassName="bg-sage"
          title="আজ দাম কমেছে ▼"
          note="গতকালের তুলনায় সবচেয়ে বেশি কমেছে"
        />
        <ProductGrid products={fallers} />
      </section>

      <section id="সব-পণ্য" className="flex scroll-mt-[200px] flex-col gap-5">
        <SectionHeader
          title="সব পণ্য"
          note={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        />
        <ProductGrid products={products} />
      </section>
    </>
  );
}
