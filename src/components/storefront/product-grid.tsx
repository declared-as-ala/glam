import { ProductCard } from "@/components/storefront/product-card";

export function ProductGrid({
  products,
}: {
  products: Array<Record<string, any>>;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product as any} />
      ))}
    </div>
  );
}
