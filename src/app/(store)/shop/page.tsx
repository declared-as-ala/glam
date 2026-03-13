import { EmptyState } from "@/components/storefront/empty-state";
import { PageHero } from "@/components/storefront/page-hero";
import { ProductGrid } from "@/components/storefront/product-grid";
import { StoreContainer } from "@/components/storefront/store-container";
import { getProducts } from "@/lib/queries";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const { products, brands, categories } = (await getProducts({
    search: typeof params.q === "string" ? params.q : undefined,
    categorySlug: typeof params.category === "string" ? params.category : undefined,
    brandSlug: typeof params.brand === "string" ? params.brand : undefined,
    sort: typeof params.sort === "string" ? params.sort : undefined,
  })) as any;

  return (
    <>
      <PageHero
        eyebrow="Boutique"
        title="Shop GLAM Parapharmacie"
        description="Explorez nos soins visage, corps, cheveux, bebes, solaires et complements alimentaires."
      />
      <StoreContainer className="py-12">
        <form className="mb-8 grid gap-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-gray-100 lg:grid-cols-4">
          <input
            name="q"
            defaultValue={typeof params.q === "string" ? params.q : ""}
            placeholder="Recherche"
            className="h-12 rounded-xl border border-gray-200 px-4"
          />
          <select
            name="category"
            defaultValue={typeof params.category === "string" ? params.category : ""}
            className="h-12 rounded-xl border border-gray-200 px-4"
          >
            <option value="">Toutes les categories</option>
            {categories.map((category: any) => (
              <option key={category._id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            name="brand"
            defaultValue={typeof params.brand === "string" ? params.brand : ""}
            className="h-12 rounded-xl border border-gray-200 px-4"
          >
            <option value="">Toutes les marques</option>
            {brands.map((brand: any) => (
              <option key={brand._id} value={brand.slug}>
                {brand.name}
              </option>
            ))}
          </select>
          <select
            name="sort"
            defaultValue={typeof params.sort === "string" ? params.sort : ""}
            className="h-12 rounded-xl border border-gray-200 px-4"
          >
            <option value="">Plus recents</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix decroissant</option>
            <option value="best-rated">Mieux notes</option>
          </select>
          <button className="rounded-full bg-[#3AB7A5] px-6 py-3 font-semibold text-white lg:col-span-4">
            Appliquer les filtres
          </button>
        </form>

        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState
            title="Aucun produit trouve"
            description="Essayez d'elargir votre recherche ou de modifier les filtres."
          />
        )}
      </StoreContainer>
    </>
  );
}
