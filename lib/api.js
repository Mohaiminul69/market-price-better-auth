import { cache } from "react";

const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function request(path) {
  let lastError;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export async function getProducts() {
  return (await request("/products")) ?? [];
}

export async function getCategories() {
  return (await request("/categories")) ?? [];
}

export const getProductBySlug = cache(async (slug) => {
  const products = await request(`/products?slug=${encodeURIComponent(slug)}`);
  return products?.find((p) => p.slug === slug) ?? null;
});
