import { getCategory, getProducts } from "@/lib/api";
import CategoryView from "@/components/CategoryView";
import EmptyState from "@/components/EmptyState";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: category ? `${category.nameBn} | বাজার দর` : "ক্যাটাগরি পাওয়া যায়নি | বাজার দর" };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [category, products] = await Promise.all([getCategory(slug), getProducts(slug)]);

  if (!category) {
    return (
      <EmptyState
        title="ক্যাটাগরি পাওয়া যায়নি"
        message="এই নামে কোনো ক্যাটাগরি নেই। উপরের তালিকা থেকে একটি ক্যাটাগরি বেছে নিন।"
      />
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        code={category.icon}
        title={`${category.nameBn} — কোনো পণ্য নেই`}
        message="এই ক্যাটাগরিতে এখনো কোনো পণ্যের দাম পাওয়া যায়নি।"
      />
    );
  }

  return <CategoryView category={category} products={products} />;
}
