import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteProductAction } from "@/lib/actions";
import { getAdminCollections } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";

export default async function AdminProductsPage() {
  const { products } = await getAdminCollections();

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Catalogue produits, stock, activations et pricing."
        actionHref="/admin/products/new"
        actionLabel="Nouveau produit"
      />
      <AdminTable headers={["Produit", "Prix", "Stock", "Etat", "Actions"]}>
        {products.map((product: any) => (
          <tr key={product._id}>
            <td className="px-6 py-4">
              <div className="font-semibold text-gray-900">{product.name}</div>
              <div className="text-xs text-gray-500">{product.brandName}</div>
            </td>
            <td className="px-6 py-4">{formatPrice(product.promoPrice ?? product.price)}</td>
            <td className="px-6 py-4">{product.stockQuantity}</td>
            <td className="px-6 py-4">{product.isFlashSale ? "Flash sale" : product.isFeatured ? "Featured" : "Standard"}</td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <Link href={`/admin/products/${product._id}`} className="text-[#3AB7A5]">
                  Editer
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await deleteProductAction(product._id);
                  }}
                >
                  <button className="text-red-600">Supprimer</button>
                </form>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
