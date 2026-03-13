import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CouponForm } from "@/components/admin/coupon-form";
import { getCouponById } from "@/lib/queries";

export default async function AdminEditCouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coupon = (await getCouponById(id)) as any;
  if (!coupon) notFound();

  return (
    <div>
      <AdminPageHeader title="Editer coupon" description={coupon.code} />
      <CouponForm initialData={coupon} />
    </div>
  );
}
