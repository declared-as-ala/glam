import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { ReviewModerationActions } from "@/components/admin/review-moderation-actions";
import { getAdminCollections } from "@/lib/queries";

export default async function AdminReviewsPage() {
  const { reviews } = await getAdminCollections();

  return (
    <div>
      <AdminPageHeader title="Reviews" description="Moderer, approuver, masquer ou supprimer les avis clients." />
      <AdminTable headers={["Produit", "Client", "Note", "Statut", "Actions"]}>
        {reviews.map((review: any) => (
          <tr key={review._id}>
            <td className="px-6 py-4">{review.product?.name}</td>
            <td className="px-6 py-4">{review.user?.name}</td>
            <td className="px-6 py-4">{review.rating}/5</td>
            <td className="px-6 py-4">{review.status}</td>
            <td className="px-6 py-4">
              <ReviewModerationActions reviewId={review._id} />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
