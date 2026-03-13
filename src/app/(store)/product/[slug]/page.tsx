import Image from "next/image";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/storefront/add-to-cart-button";
import { ProductGrid } from "@/components/storefront/product-grid";
import { ReviewForm } from "@/components/storefront/review-form";
import { StoreContainer } from "@/components/storefront/store-container";
import { WishlistToggle } from "@/components/storefront/wishlist-toggle";
import { getProductBySlug } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  if (!data) notFound();

  const { product, relatedProducts, reviews } = data;

  return (
    <StoreContainer className="py-12">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gray-50">
            <Image
              src={
                product.primaryImage ||
                "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&auto=format&fit=crop&q=80"
              }
              alt={product.name}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.slice(0, 4).map((image: { url: string }, index: number) => (
              <div key={`${image.url}-${index}`} className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
                <Image src={image.url} alt={product.name} fill className="object-cover" sizes="12vw" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3AB7A5]">
                {product.brandName}
              </p>
              <h1 className="mt-2 text-4xl font-bold text-gray-900">{product.name}</h1>
            </div>
            <WishlistToggle productId={product._id} />
          </div>
          <p className="mt-4 text-lg text-gray-600">{product.shortDescription}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-bold text-[#3AB7A5]">
              {formatPrice(product.promoPrice ?? product.price)}
            </span>
            {product.promoPrice ? (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
            ) : null}
          </div>
          <p className="mt-3 text-sm text-gray-500">Stock disponible: {product.stockQuantity}</p>
          <div className="mt-8">
            <AddToCartButton productId={product._id} />
          </div>
          <div className="mt-8 grid gap-6 border-t pt-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
              <p className="mt-2 text-gray-600">{product.fullDescription}</p>
            </div>
            {product.ingredients ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Ingredients</h2>
                <p className="mt-2 text-gray-600">{product.ingredients}</p>
              </div>
            ) : null}
            {product.usageInfo ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Conseils d'utilisation</h2>
                <p className="mt-2 text-gray-600">{product.usageInfo}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Avis clients</h2>
          <div className="space-y-4">
            {reviews.map((review: any) => (
              <div key={review._id} className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.title || "Avis client"}</h3>
                    <p className="text-sm text-gray-500">{review.user?.name}</p>
                  </div>
                  <div className="rounded-full bg-[#3AB7A5]/10 px-3 py-1 text-sm font-semibold text-[#3AB7A5]">
                    {review.rating}/5
                  </div>
                </div>
                <p className="mt-3 text-gray-600">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
        <ReviewForm productId={product._id} />
      </section>

      <section className="mt-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">Vous aimerez aussi</h2>
        <ProductGrid products={relatedProducts} />
      </section>
    </StoreContainer>
  );
}
